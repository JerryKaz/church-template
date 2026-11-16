import type { ChatMessage, PublicPrayer } from "../../shared/schemas";
import { ApiValidationError, type Api } from "./types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new Error("We couldn't reach the server. Check your connection and try again.");
  }

  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => ({}));

  if (res.status === 422 && body.fieldErrors) throw new ApiValidationError(body.fieldErrors);
  if (res.status === 429) throw new Error("Too many attempts. Please wait a minute and try again.");
  if (!res.ok) throw new Error(body.error ?? "Something went wrong. Please try again.");
  return body as T;
}

const post = <T>(url: string, data: unknown) => request<T>(url, { method: "POST", body: JSON.stringify(data) });

export function createHttpApi(base: string): Api {
  const u = (path: string) => `${base}/api${path}`;

  return {
    submitVisit: (input) => post(u("/visits"), input),
    submitContact: (input) => post(u("/contact"), input),
    registerForEvent: (slug, input) => post(u(`/events/${encodeURIComponent(slug)}/registrations`), input),

    submitPrayer: (input) => post(u("/prayers"), input),
    listPrayers: () => request<PublicPrayer[]>(u("/prayers")),
    reactToPrayer: async (id) => (await post<{ count: number }>(u(`/prayers/${id}/react`), {})).count,

    listChat: (room) => request<ChatMessage[]>(u(`/chat/${encodeURIComponent(room)}`)),
    sendChat: (room, author, text) => post<ChatMessage>(u(`/chat/${encodeURIComponent(room)}`), { author, text }),
    subscribeChat(room, onMessage) {
      const source = new EventSource(u(`/chat/${encodeURIComponent(room)}/stream`));
      source.onmessage = (e) => onMessage(JSON.parse(e.data) as ChatMessage);
      return () => source.close();
    },
  };
}
