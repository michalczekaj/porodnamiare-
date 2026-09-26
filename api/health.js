// GET /api/health — kontrola, czy backend odblokowania działa (Redis + klucze RSA + klucz PayHip).
// Powód: od wdrożenia poprawki K1 pobranie PDF zależy WYŁĄCZNIE od /api/unlock, a brak
// konfiguracji na produkcji przez tygodnie nie został zauważony. Ten endpoint podpina się
// pod darmowy monitoring (UptimeRobot / Better Stack): 200 = OK, 503 = alarm.
// Zwraca wyłącznie wartości tak/nie — żadnych sekretów ani treści zmiennych.
const jwt = require('jsonwebtoken');
const { getRedis, getPrivateKey, getPublicKey, rateLimit } = require('./_lib/common');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const out = {
    payhipKey: !!process.env.PAYHIP_API_KEY,
    rsaPrivate: /BEGIN (RSA )?PRIVATE KEY/.test(getPrivateKey()),
    rsaPublic: /BEGIN PUBLIC KEY/.test(getPublicKey()),
    redis: false,
    jwtRoundtrip: false
  };

  let redis = null;
  try { redis = getRedis(); } catch (e) { /* brak zmiennych KV */ }

  if (redis) {
    // 12 zapytań/min per IP — monitoring pyta co 1–5 min, więcej nie potrzeba.
    if (!(await rateLimit(redis, req, 'health', 12, 60))) {
      res.status(429).json({ ok: false, error: 'rate_limited' });
      return;
    }
    try {
      const key = 'health:' + Date.now() + ':' + Math.random().toString(36).slice(2, 8);
      await redis.set(key, '1', { ex: 30 });
      out.redis = (await redis.get(key)) !== null;
    } catch (e) { out.redis = false; }
  }

  try {
    const t = jwt.sign({ h: 1 }, getPrivateKey(), { algorithm: 'RS256', expiresIn: 60, issuer: 'porodnamiare.pl' });
    jwt.verify(t, getPublicKey(), { algorithms: ['RS256'], issuer: 'porodnamiare.pl' });
    out.jwtRoundtrip = true;
  } catch (e) { out.jwtRoundtrip = false; }

  const ok = out.payhipKey && out.rsaPrivate && out.rsaPublic && out.redis && out.jwtRoundtrip;
  res.status(ok ? 200 : 503).json(Object.assign({ ok: ok }, out));
};
