/** Parse YYYY-MM-DD as a local date (new Date("2026-01-05") would be UTC midnight). */
export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) =>
  (iso.length === 10 ? parseLocalDate(iso) : new Date(iso)).toLocaleDateString(undefined, opts);

export function formatDateRange(start: string, end?: string) {
  if (!end || end === start) return formatDate(start, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const s = parseLocalDate(start);
  const e = parseLocalDate(end);
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  return sameMonth
    ? `${s.getDate()}–${e.getDate()} ${e.toLocaleDateString(undefined, { month: "long", year: "numeric" })}`
    : `${formatDate(start, { day: "numeric", month: "short" })} – ${formatDate(end, { day: "numeric", month: "short", year: "numeric" })}`;
}

export function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

export function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return formatDate(iso, { day: "numeric", month: "short", year: "numeric" });
}

export const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
