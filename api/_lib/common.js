const crypto = require('crypto');
const { Redis } = require('@upstash/redis');

let _redis = null;
function getRedis() {
  if (_redis) return _redis;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error('Brak zmiennych srodowiskowych bazy Redis (KV_REST_API_URL / KV_REST_API_TOKEN). Zainstaluj integracje Upstash Redis z Vercel Marketplace.');
  }
  _redis = new Redis({ url, token });
  return _redis;
}

// Porownanie stalym czasem, odporne na timing attacks. Wymaga rownej dlugosci wejsc.
function timingSafeEqualStr(a, b) {
  const ba = Buffer.from(String(a || ''), 'utf8');
  const bb = Buffer.from(String(b || ''), 'utf8');
  if (ba.length === 0 || bb.length === 0 || ba.length !== bb.length) return false;
  try { return crypto.timingSafeEqual(ba, bb); } catch (e) { return false; }
}

// Klucz produktu PayHip ("product_key" w payloadzie webhooka) -> pakiet.
// Ceny w najmniejszej jednostce waluty (grosze), zgodnie z formatem pol PayHip "price".
const PRODUCTS = {
  jUaCl: { tier: 'podstawowy', priceMinor: 4900, currency: 'PLN', label: 'Podstawowy' },
  PAcED: { tier: 'premium', priceMinor: 9900, currency: 'PLN', label: 'Premium' },
  JjgRA: { tier: 'premiumplus', priceMinor: 21900, currency: 'PLN', label: 'Premium+' }
};

function fixPem(v) {
  const s = String(v || '');
  return s.indexOf('\\n') !== -1 ? s.replace(/\\n/g, '\n') : s;
}
function getPrivateKey() { return fixPem(process.env.RSA_PRIVATE_KEY); }
function getPublicKey() { return fixPem(process.env.RSA_PUBLIC_KEY); }

function hashEmail(email) {
  return crypto.createHash('sha256').update(String(email || '').trim().toLowerCase()).digest('hex');
}

module.exports = { getRedis, timingSafeEqualStr, PRODUCTS, getPrivateKey, getPublicKey, hashEmail };
