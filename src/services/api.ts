/**
 * Single data-access interface for the whole app.
 *
 * - With VITE_API_URL set, calls the Express API in /server (or any backend
 *   that implements the same endpoints).
 * - Without it, uses a localStorage adapter so the template works as a static
 *   demo with no backend at all.
 *
 * Components only ever import `api` from here, so switching backends
 * (Firebase, Supabase, a headless CMS…) means writing one new adapter.
 */
import { createHttpApi } from "./httpApi";
import { createLocalApi } from "./localApi";
import type { Api } from "./types";

export { ApiValidationError, type Api } from "./types";

const baseUrl = import.meta.env.VITE_API_URL as string | undefined;

export const api: Api = baseUrl ? createHttpApi(baseUrl.replace(/\/$/, "")) : createLocalApi();
export const apiMode: "http" | "local" = baseUrl ? "http" : "local";
