import {
  chatMessageSchema,
  contactSchema,
  prayerSchema,
  registrationSchema,
  toFieldErrors,
  visitSchema,
  type ChatMessage,
  type PublicPrayer,
} from "../../shared/schemas";
import { seedPrayers } from "../content/seed";
import { ApiValidationError, type Api } from "./types";
import type { ZodType } from "zod";

/**
 * Browser-only adapter: validates with the shared schemas and persists to
 * localStorage. Chat syncs across tabs with BroadcastChannel.
 * Good for demos and static hosting; swap for the HTTP adapter in production.
 */

const KEY = "church-template:v1";
interface Store {
  prayers: (PublicPrayer & { share: string })[];
  chat: ChatMessage[];
  submissions: { type: string; at: string; data: unknown }[];
}

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Store;
  } catch {
    /* corrupted or unavailable storage: fall through to a fresh store */
  }
  return { prayers: seedPrayers.map((p) => ({ ...p, share: "public" })), chat: [], submissions: [] };
}

function save(store: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* storage full or blocked (private mode): data lives for this session only */
  }
}

const delay = (ms = 450) => new Promise((r) => setTimeout(r, ms));
const id = () => crypto.randomUUID();

function validate<T>(schema: ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw new ApiValidationError(toFieldErrors(result.error));
  return result.data;
}

export function createLocalApi(): Api {
  const listeners = new Map<string, Set<(m: ChatMessage) => void>>();
  const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("church-chat") : null;

  const emit = (m: ChatMessage) => listeners.get(m.room)?.forEach((fn) => fn(m));
  channel?.addEventListener("message", (e: MessageEvent<ChatMessage>) => emit(e.data));

  async function record(type: string, data: unknown) {
    await delay();
    const store = load();
    store.submissions.push({ type, at: new Date().toISOString(), data });
    save(store);
    if (import.meta.env.DEV) console.info(`[local api] ${type}`, data);
  }

  return {
    async submitVisit(input) {
      await record("visit", validate(visitSchema, input));
    },
    async submitContact(input) {
      await record("contact", validate(contactSchema, input));
    },
    async registerForEvent(slug, input) {
      await record(`registration:${slug}`, validate(registrationSchema, input));
    },

    async submitPrayer(input) {
      const data = validate(prayerSchema, input);
      await delay();
      const store = load();
      store.prayers.unshift({
        id: id(),
        name: data.share === "anonymous" ? "Anonymous" : data.name.split(" ")[0],
        kind: data.kind,
        message: data.message,
        createdAt: new Date().toISOString(),
        count: 0,
        share: data.share,
      });
      save(store);
    },
    async listPrayers() {
      await delay(250);
      return load()
        .prayers.filter((p) => p.share !== "private")
        .map(({ share: _share, ...pub }) => pub);
    },
    async reactToPrayer(prayerId) {
      const store = load();
      const prayer = store.prayers.find((p) => p.id === prayerId);
      if (!prayer) throw new Error("This prayer is no longer available.");
      prayer.count += 1;
      save(store);
      return prayer.count;
    },

    async listChat(room) {
      return load().chat.filter((m) => m.room === room).slice(-100);
    },
    async sendChat(room, author, text) {
      const data = validate(chatMessageSchema, { author, text });
      const message: ChatMessage = { id: id(), room, author: data.author, text: data.text, createdAt: new Date().toISOString() };
      const store = load();
      store.chat = [...store.chat, message].slice(-500);
      save(store);
      emit(message);
      channel?.postMessage(message);
      return message;
    },
    subscribeChat(room, onMessage) {
      const set = listeners.get(room) ?? new Set();
      set.add(onMessage);
      listeners.set(room, set);
      return () => set.delete(onMessage);
    },
  };
}
