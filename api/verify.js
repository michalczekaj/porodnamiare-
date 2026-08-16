const jwt = require('jsonwebtoken');
const { getRedis, getPublicKey, rateLimit } = require('./_lib/common');

const ISSUER = 'porodnamiare.pl';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ valid: false, error: 'method_not_allowed' });
    return;
  }

  // 60 weryfikacji/min per IP - z zapasem ponad normalne uzycie (kilka na sesje).
  try {
    if (!(await rateLimit(getRedis(), req, 'verify', 60, 60))) {
      res.status(429).json({ valid: false, error: 'rate_limited' });
      return;
    }
  } catch (e) { /* brak KV -> fail-open, dalsza logika i tak to obsluzy */ }

  let token = '';
  const auth = req.headers['authorization'] || '';
  if (auth.indexOf('Bearer ') === 0) token = auth.slice(7);
  else if (req.body && req.body.jwt) token = String(req.body.jwt);

  if (!token) {
    res.status(400).json({ valid: false, error: 'missing_token' });
    return;
  }

  const publicKey = getPublicKey();
  if (!publicKey) {
    console.error('[verify] brak RSA_PUBLIC_KEY w env');
    res.status(500).json({ valid: false, error: 'server_misconfigured' });
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, publicKey, { algorithms: ['RS256'], issuer: ISSUER });
  } catch (e) {
    // wygasly / zmanipulowany / zly podpis - zawsze traktuj jak niewazny, bez szczegolow do klienta
    res.status(200).json({ valid: false, error: 'invalid_or_expired' });
    return;
  }

  try {
    const redis = getRedis();
    const revokedBySid = payload.sid ? await redis.get(`revoked:${payload.sid}`) : null;
    const revokedByTx = payload.tx ? await redis.get(`revoked-tx:${payload.tx}`) : null;
    if (revokedBySid || revokedByTx) {
      res.status(200).json({ valid: false, error: 'revoked' });
      return;
    }
  } catch (e) {
    console.error('[verify] blad odczytu revoke z redis (ignorowany)', e);
    // awaria bazy nie powinna blokowac juz oplaconych klientow - fail open na samym revoke-check
  }

  res.status(200).json({ valid: true, tier: payload.tier });
};
