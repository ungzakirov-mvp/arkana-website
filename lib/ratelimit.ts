import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Lazy singleton — only constructed when first called (server-side only)
let ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  // Skip if env vars not configured (local dev without Upstash)
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    if (process.env.NODE_ENV === "production") {
      console.error("[ratelimit] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set in production");
    }
    return null;
  }

  if (!ratelimit) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // 5 submissions per IP per hour using sliding window
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "arkana:contact",
      analytics: true, // record to Upstash console
    });
  }

  return ratelimit;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const rl = getRatelimit();

  // No Upstash configured — allow (dev/preview without credentials)
  if (!rl) {
    return { allowed: true, remaining: 4, resetAt: new Date() };
  }

  const { success, remaining, reset } = await rl.limit(identifier);

  if (!success) {
    // Log rate-limit event for observability
    console.warn(
      JSON.stringify({
        event: "rate_limit_exceeded",
        identifier: identifier.slice(0, 8) + "…", // partial IP for privacy
        remaining,
        resetAt: new Date(reset).toISOString(),
        ts: new Date().toISOString(),
      })
    );
  }

  return {
    allowed: success,
    remaining,
    resetAt: new Date(reset),
  };
}
