/**
 * Placeholder photos (picsum.photos). Replace with your own:
 * drop files in /public/images and return `/images/<name>.jpg` here.
 */
export const photo = (seed: string, w = 1600, h = 900) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** Local date as YYYY-MM-DD, `days` from today. Keeps demo events always upcoming. */
export function inDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Next given weekday (0 = Sunday) at least `minDays` from today, plus `extraWeeks`. YYYY-MM-DD. */
export function nextWeekday(weekday: number, minDays = 1, extraWeeks = 0): string {
  const startDow = (new Date().getDay() + minDays) % 7;
  return inDays(minDays + ((weekday - startDow + 7) % 7) + extraWeeks * 7);
}
