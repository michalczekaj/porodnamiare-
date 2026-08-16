const jwt = require('jsonwebtoken');
const { getRedis, getPrivateKey, rateLimit } = require('./_lib/common');

const SID_RE = /^[a-zA-Z0-9_-]{8,64}$/;
const JWT_TTL = '30d';
const ISSUER = 'porodnamiare.pl';

module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const sid = String((req.method === 'GET' ? req.query.sid : (req.body || {}).sid) || '').trim();
  if (!SID_RE.test(sid)) {
    res.status(400).json({ error: 'bad_sid' });
    return;
  }

  let redis;
  try { redis = getRedis(); }
  catch (e) { console.error('[unlock]', e.message); res.status(500).json({ error: 'kv_unconfigured' }); return; }

  // Anty-enumeracja SID: 30 zapytan/min per IP (klient legalnie odpytuje co kilka sekund przez ~1 min).
  if (!(await rateLimit(redis, req, 'unlock', 30, 60))) {
    res.status(429).json({ error: 'rate_limited' });
    return;
  }

  let raw;
  try {
    // GETDEL: atomowy odczyt + usuniecie - gwarantuje jednorazowosc tokenu.
    raw = await redis.getdel(`claim:${sid}`);
  } catch (e) {
    console.error('[unlock] blad redis', e);
    res.status(500).json({ error: 'kv_error' });
    return;
  }

  if (!raw) {
    // Brak claimu - albo webhook jeszcze nie dotarl (typowe, dociera zwykle w kilka sekund),
    // albo sid nigdy nie zostal opłacony/wygasl. Klient dopytuje ponownie po stronie przegladarki.
    res.status(404).json({ status: 'pending' });
    return;
  }

  let claim;
  try { claim = typeof raw === 'string' ? JSON.parse(raw) : raw; }
  catch (e) { console.error('[unlock] uszkodzony claim', e); res.status(500).json({ error: 'corrupt_claim' }); return; }

  try {
    const revoked = await redis.get(`revoked:${sid}`);
    if (revoked) { res.status(403).json({ error: 'revoked' }); return; }
  } catch (e) { /* awaria odczytu revoke nie powinna blokowac legalnego odbioru */ }

  const privateKey = getPrivateKey();
  if (!privateKey) {
    console.error('[unlock] brak RSA_PRIVATE_KEY w env');
    res.status(500).json({ error: 'server_misconfigured' });
    return;
  }

  let token;
  try {
    token = jwt.sign(
      { sid, tier: claim.tier, tx: claim.tx },
      privateKey,
      { algorithm: 'RS256', expiresIn: JWT_TTL, issuer: ISSUER }
    );
  } catch (e) {
    console.error('[unlock] blad podpisywania JWT', e);
    res.status(500).json({ error: 'sign_error' });
    return;
  }

  res.status(200).json({ status: 'ok', jwt: token, tier: claim.tier });
};
