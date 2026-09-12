// In-memory sliding window rate limiter ($0 cost, no external dependencies)

const rateLimitStore = new Map();

// Periodic cleanup to avoid memory leaks (runs every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function getClientIp(req) {
  if (!req) return "127.0.0.1";
  const forwarded = req.headers?.get?.("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers?.get?.("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

/**
 * Check if a request exceeds rate limit.
 * @param {string} key - Unique key (e.g., `login:${ip}`)
 * @param {number} maxAttempts - Max allowed requests in window
 * @param {number} windowMs - Window duration in milliseconds
 * @returns {{ allowed: boolean, remaining: number, retryAfter: number }}
 */
export function checkRateLimit(key, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  let record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, record);
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      retryAfter: 0,
    };
  }

  record.count += 1;

  if (record.count > maxAttempts) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
    };
  }

  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    retryAfter: 0,
  };
}
