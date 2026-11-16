import cors from "cors";
import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { errorHandler } from "./middleware.ts";
import { api } from "./routes.ts";

const PORT = Number(process.env.PORT ?? 3001);
const DIST = path.resolve(import.meta.dirname, "../dist");
const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173").split(",").map((s) => s.trim());

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1); // correct client IPs behind Render/Railway/nginx for rate limiting

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

app.use("/api", cors({ origin: allowedOrigins }), express.json({ limit: "20kb" }), api);
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// In production the same server can host the built site (single deploy).
if (existsSync(DIST)) {
  app.use(
    express.static(DIST, {
      index: false,
      // Hashed build assets never change; everything else (audio, PDFs, favicon) revalidates.
      setHeaders: (res, filePath) => {
        const hashed = filePath.includes(`${path.sep}assets${path.sep}`);
        res.setHeader("Cache-Control", hashed ? "public, max-age=31536000, immutable" : "public, max-age=3600");
      },
    }),
  );
  // SPA fallback: let React Router handle every non-API path.
  app.get("/{*splat}", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(DIST, "index.html"));
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
