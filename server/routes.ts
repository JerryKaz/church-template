import { Router, type Response } from "express";
import {
  chatMessageSchema,
  contactSchema,
  prayerSchema,
  registrationSchema,
  visitSchema,
  type ChatMessage,
} from "../shared/schemas.ts";
import { findEvent } from "../src/content/events.ts";
import { rateLimit, requireAdmin, validate } from "./middleware.ts";
import { notify } from "./notify.ts";
import { store } from "./store.ts";

export const api = Router();

const formLimit = rateLimit({ windowMs: 60_000, max: 5 });
const reactLimit = rateLimit({ windowMs: 60_000, max: 30 });
const chatLimit = rateLimit({ windowMs: 10_000, max: 5 });
const ROOM = /^[a-z0-9-]{1,40}$/;

api.get("/health", (_req, res) => {
  res.json({ ok: true });
});

/* ---------- Forms ---------- */

api.post("/visits", formLimit, validate(visitSchema), async (req, res) => {
  const { website: _hp, ...data } = req.body;
  await store.addSubmission("visit", data);
  await notify("visit", `${data.fullName} plans to visit on ${data.visitDate}`, data);
  res.status(201).json({ ok: true });
});

api.post("/contact", formLimit, validate(contactSchema), async (req, res) => {
  const { website: _hp, ...data } = req.body;
  await store.addSubmission("contact", data);
  await notify("contact", `${data.name}: ${data.topic}`, data);
  res.status(201).json({ ok: true });
});

api.post("/events/:slug/registrations", formLimit, validate(registrationSchema), async (req, res) => {
  const event = findEvent(String(req.params.slug));
  if (!event) {
    res.status(404).json({ error: "Event not found" });
    return;
  }
  if (!event.registration?.open) {
    res.status(409).json({ error: "Registration for this event is closed." });
    return;
  }
  const { website: _hp, ...data } = req.body;
  await store.addSubmission("registration", data, { event: event.slug });
  await notify("registration", `${data.firstName} ${data.lastName} → ${event.title}`, data);
  res.status(201).json({ ok: true });
});

/* ---------- Prayer wall ---------- */

api.get("/prayers", async (_req, res) => {
  res.set("Cache-Control", "no-store").json(await store.listPublicPrayers());
});

api.post("/prayers", formLimit, validate(prayerSchema), async (req, res) => {
  const { name, email, phone, share, kind, message } = req.body;
  await store.addPrayer({ realName: name, email, phone, share, kind, message });
  await notify("prayer", `${kind} from ${name} (${share})`, req.body);
  res.status(201).json({ ok: true });
});

api.post("/prayers/:id/react", reactLimit, async (req, res) => {
  const count = await store.reactToPrayer(String(req.params.id));
  if (count === null) {
    res.status(404).json({ error: "Prayer not found" });
    return;
  }
  res.json({ count });
});

/* ---------- Live chat (Server-Sent Events) ---------- */

const subscribers = new Map<string, Set<Response>>();

function broadcast(message: ChatMessage) {
  const payload = `data: ${JSON.stringify(message)}\n\n`;
  subscribers.get(message.room)?.forEach((res) => res.write(payload));
}

api.get("/chat/:room", async (req, res) => {
  if (!ROOM.test(String(req.params.room))) {
    res.status(400).json({ error: "Invalid room" });
    return;
  }
  res.json(await store.listChat(String(req.params.room)));
});

api.post("/chat/:room", chatLimit, validate(chatMessageSchema), async (req, res) => {
  const room = String(req.params.room);
  if (!ROOM.test(room)) {
    res.status(400).json({ error: "Invalid room" });
    return;
  }
  const message = await store.addChat(room, req.body.author, req.body.text);
  broadcast(message);
  res.status(201).json(message);
});

api.get("/chat/:room/stream", (req, res) => {
  const room = String(req.params.room);
  if (!ROOM.test(room)) {
    res.status(400).end();
    return;
  }
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no", // stop nginx buffering the stream
  });
  res.write(": connected\n\n");

  const set = subscribers.get(room) ?? new Set();
  set.add(res);
  subscribers.set(room, set);

  // Comment heartbeat keeps proxies from closing idle connections.
  const heartbeat = setInterval(() => res.write(": ping\n\n"), 25_000);
  req.on("close", () => {
    clearInterval(heartbeat);
    set.delete(res);
  });
});

/* ---------- Admin (enabled only when ADMIN_TOKEN is set) ---------- */

const admin = Router();
admin.use(requireAdmin);

admin.get("/submissions", async (req, res) => {
  const type = req.query.type as "visit" | "contact" | "registration" | undefined;
  res.json(await store.listSubmissions(type));
});

admin.get("/prayers", async (_req, res) => {
  res.json(await store.listAllPrayers());
});

admin.patch("/prayers/:id", async (req, res) => {
  const ok = await store.setPrayerHidden(String(req.params.id), Boolean(req.body?.hidden));
  res.status(ok ? 204 : 404).end();
});

api.use("/admin", admin);
