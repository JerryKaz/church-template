import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ChatMessage, PublicPrayer } from "../shared/schemas.ts";
import { seedPrayers } from "../src/content/seed.ts";

/**
 * Tiny JSON-file store. Fine for a single small server; swap this module for
 * Postgres/MongoDB when you outgrow it. The rest of the server only uses the
 * functions exported here.
 */

export interface StoredPrayer extends PublicPrayer {
  email: string;
  phone?: string;
  share: "public" | "anonymous" | "private";
  realName: string;
  hidden?: boolean;
}

export interface Submission {
  id: string;
  type: "visit" | "contact" | "registration";
  createdAt: string;
  meta?: Record<string, string>;
  data: unknown;
}

interface Db {
  prayers: StoredPrayer[];
  chat: ChatMessage[];
  submissions: Submission[];
}

const DATA_DIR = process.env.DATA_DIR ?? path.resolve(import.meta.dirname, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

let db: Db | null = null;
let writeQueue: Promise<void> = Promise.resolve();

async function load(): Promise<Db> {
  if (db) return db;
  try {
    db = JSON.parse(await readFile(DB_FILE, "utf8")) as Db;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    db = {
      prayers: seedPrayers.map((p) => ({ ...p, email: "", share: "public", realName: p.name })),
      chat: [],
      submissions: [],
    };
    await persist();
  }
  return db;
}

/** Writes are serialised and atomic (write temp file, then rename) so a crash never corrupts the file. */
function persist(): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    const tmp = `${DB_FILE}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(db, null, 2));
    await rename(tmp, DB_FILE);
  });
  return writeQueue;
}

export const store = {
  async addSubmission(type: Submission["type"], data: unknown, meta?: Record<string, string>) {
    const d = await load();
    const entry: Submission = { id: randomUUID(), type, createdAt: new Date().toISOString(), meta, data };
    d.submissions.push(entry);
    await persist();
    return entry;
  },

  async listSubmissions(type?: Submission["type"]) {
    const d = await load();
    return d.submissions.filter((s) => !type || s.type === type).toReversed();
  },

  async addPrayer(input: Omit<StoredPrayer, "id" | "createdAt" | "count" | "name">) {
    const d = await load();
    const prayer: StoredPrayer = {
      ...input,
      id: randomUUID(),
      name: input.share === "anonymous" ? "Anonymous" : input.realName.split(" ")[0],
      createdAt: new Date().toISOString(),
      count: 0,
    };
    d.prayers.unshift(prayer);
    await persist();
    return prayer;
  },

  /** Only what is safe to show publicly: never email, phone or private requests. */
  async listPublicPrayers(limit = 100): Promise<PublicPrayer[]> {
    const d = await load();
    return d.prayers
      .filter((p) => p.share !== "private" && !p.hidden)
      .slice(0, limit)
      .map(({ id, name, kind, message, createdAt, count }) => ({ id, name, kind, message, createdAt, count }));
  },

  async listAllPrayers() {
    return (await load()).prayers;
  },

  async reactToPrayer(id: string) {
    const d = await load();
    const prayer = d.prayers.find((p) => p.id === id && p.share !== "private" && !p.hidden);
    if (!prayer) return null;
    prayer.count += 1;
    await persist();
    return prayer.count;
  },

  async setPrayerHidden(id: string, hidden: boolean) {
    const d = await load();
    const prayer = d.prayers.find((p) => p.id === id);
    if (!prayer) return false;
    prayer.hidden = hidden;
    await persist();
    return true;
  },

  async listChat(room: string, limit = 100) {
    const d = await load();
    return d.chat.filter((m) => m.room === room).slice(-limit);
  },

  async addChat(room: string, author: string, text: string) {
    const d = await load();
    const message: ChatMessage = { id: randomUUID(), room, author, text, createdAt: new Date().toISOString() };
    d.chat.push(message);
    if (d.chat.length > 2000) d.chat = d.chat.slice(-2000);
    await persist();
    return message;
  },
};
