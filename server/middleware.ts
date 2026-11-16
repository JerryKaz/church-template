import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodType } from "zod";
import { toFieldErrors } from "../shared/schemas.ts";

/** Validate req.body against a shared schema; replaces it with the parsed (trimmed, coerced) value. */
export const validate =
  (schema: ZodType): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      const fieldErrors = toFieldErrors(result.error);
      // Silently accept honeypot hits so bots don't learn they were caught.
      if (fieldErrors.website) {
        res.status(204).end();
        return;
      }
      res.status(422).json({ error: "Validation failed", fieldErrors });
      return;
    }
    req.body = result.data;
    next();
  };

/**
 * Fixed-window rate limiter kept in memory. Good enough for one instance;
 * use Redis (or your platform's limiter) if you run several.
 */
export function rateLimit({ windowMs, max }: { windowMs: number; max: number }): RequestHandler {
  const hits = new Map<string, { count: number; resetAt: number }>();
  setInterval(() => {
    const now = Date.now();
    for (const [key, v] of hits) if (v.resetAt <= now) hits.delete(key);
  }, windowMs).unref();

  return (req, res, next) => {
    const key = `${req.ip}:${req.baseUrl}${req.route?.path ?? req.path}`;
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    entry.count += 1;
    if (entry.count > max) {
      res.setHeader("Retry-After", Math.ceil((entry.resetAt - now) / 1000));
      res.status(429).json({ error: "Too many requests" });
      return;
    }
    next();
  };
}

/** Bearer-token guard for the small admin API. Disabled entirely when ADMIN_TOKEN isn't set. */
export const requireAdmin: RequestHandler = (req, res, next) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (req.get("authorization") !== `Bearer ${token}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status = (err as { status?: number }).status;
  if (status === 400 || status === 413) {
    res.status(status).json({ error: status === 413 ? "Request too large" : "Malformed request" });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong. Please try again." });
}
