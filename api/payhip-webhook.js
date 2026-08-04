const crypto = require('crypto');
const { getRedis, timingSafeEqualStr, PRODUCTS, hashEmail } = require('./_lib/common');

// PayHip: podpis w body ("signature") = sha256(Twoj_API_key), stala wartosc dla kazdego zdarzenia
// (nie jest to HMAC liczony z tresci payloadu - patrz help.payhip.com/article/115-webhooks).
// Dlatego jego jedyna funkcja to potwierdzic ze nadawca zna Twoj klucz API - traktuj go jak
// tajny bearer token: nigdy nie loguj pelnej wartosci, porownuj stalym czasem.

const TX_TTL_SEC = 60 * 60 * 24 * 3;      // okno idempotencji: dluzsze niz max. czas ponowien PayHip (3h) z zapasem
const CLAIM_TTL_SEC = 60 * 60 * 6;        // czas na odbior tokenu przez przegladarke klienta po powrocie z PayHip
const CLAIM_EMAIL_TTL_SEC = 60 * 60 * 24 * 3;
const REVOKE_TTL_SEC = 60 * 60 * 24 * 60; // 60 dni - okres w ktorym mozliwy jest zwrot/chargeback

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { res.status(400).json({ error: 'bad_json' }); return; }
  }
  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'bad_body' });
    return;
  }

  const apiKey = process.env.PAYHIP_API_KEY || '';
  if (!apiKey) {
    console.error('[payhip-webhook] brak PAYHIP_API_KEY w env');
    res.status(500).json({ error: 'server_misconfigured' });
    return;
  }

  const expectedSignature = crypto.createHash('sha256').update(apiKey).digest('hex');
  if (!timingSafeEqualStr(expectedSignature, body.signature)) {
    console.warn('[payhip-webhook] nieprawidlowy podpis, type=', body.type);
    res.status(401).json({ error: 'invalid_signature' });
    return;
  }

  let redis;
  try { redis = getRedis(); }
  catch (e) { console.error('[payhip-webhook]', e.message); res.status(500).json({ error: 'kv_unconfigured' }); return; }

  // Zwrot platnosci: unieważnij mozliwosc dalszego odbioru + oznacz do odrzucenia przy /api/verify.
  if (body.type === 'refunded') {
    const sid = extractSid(body);
    try {
      if (sid) await redis.set(`revoked:${sid}`, '1', { ex: REVOKE_TTL_SEC });
      if (body.id) await redis.set(`revoked-tx:${body.id}`, '1', { ex: REVOKE_TTL_SEC });
    } catch (e) { console.error('[payhip-webhook] blad zapisu revoke', e); }
    res.status(200).json({ ok: true });
    return;
  }

  if (body.type !== 'paid') {
    res.status(200).json({ ok: true, ignored: body.type || null });
    return;
  }

  const txId = body.id;
  if (!txId) { res.status(400).json({ error: 'missing_id' }); return; }

  // Idempotencja - PayHip ponawia dostawe do 3h jesli nie dostanie 200. SET NX zapobiega
  // podwojnemu wystawieniu claimu dla tej samej transakcji.
  try {
    const first = await redis.set(`tx:${txId}`, '1', { nx: true, ex: TX_TTL_SEC });
    if (!first) { res.status(200).json({ ok: true, dedup: true }); return; }
  } catch (e) {
    console.error('[payhip-webhook] blad idempotencji', e);
    res.status(500).json({ error: 'kv_error' });
    return;
  }

  const item = Array.isArray(body.items) && body.items[0] ? body.items[0] : null;
  const productKey = item && item.product_key;
  const product = productKey ? PRODUCTS[productKey] : null;

  if (!product) {
    console.error('[payhip-webhook] nieznany product_key', productKey, 'tx', txId);
    res.status(200).json({ ok: true, warning: 'unknown_product' });
    return;
  }

  // Kontrola ceny/waluty - obrona w glab (podpis PayHip nie chroni tresci payloadu, patrz komentarz wyzej).
  if (typeof body.price === 'number' && body.currency &&
      (body.price !== product.priceMinor || body.currency !== product.currency)) {
    console.error('[payhip-webhook] rozbieznosc ceny/waluty', { productKey, got: { price: body.price, currency: body.currency }, expected: product });
  }

  const sid = extractSid(body);
  const claim = JSON.stringify({ tier: product.tier, tx: txId, ts: Date.now() });

  try {
    if (sid) await redis.set(`claim:${sid}`, claim, { ex: CLAIM_TTL_SEC });
    if (body.email) await redis.set(`claim-email:${hashEmail(body.email)}`, claim, { ex: CLAIM_EMAIL_TTL_SEC });
  } catch (e) {
    console.error('[payhip-webhook] blad zapisu claim', e);
    res.status(500).json({ error: 'kv_error' });
    return;
  }

  if (!sid) {
    // Brak metadata[sid] w payloadzie - klient nie bedzie mogl automatycznie odebrac tokenu.
    // Nie jest to blad krytyczny (claim-email dziala jako zapasowa sciezka reczna), ale warto to zauwazyc.
    console.warn('[payhip-webhook] brak sid w metadata dla tx', txId, '- sprawdz ksztalt pola metadata w realnym payloadzie i w razie potrzeby dostosuj extractSid()');
  }

  res.status(200).json({ ok: true });
};

function extractSid(body) {
  if (body.metadata && typeof body.metadata === 'object' && body.metadata.sid) return String(body.metadata.sid).slice(0, 64);
  if (body['metadata[sid]']) return String(body['metadata[sid]']).slice(0, 64);
  if (body.metadata_sid) return String(body.metadata_sid).slice(0, 64);
  return null;
}
