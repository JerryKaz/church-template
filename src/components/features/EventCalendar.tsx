import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ChurchEvent } from "../../content/events";
import type { ServiceTime } from "../../content/services";
import { parseLocalDate, toISODate } from "../../utils/format";
import { SmartLink } from "../SmartLink";
import styles from "./EventCalendar.module.css";

interface CalendarEntry {
  key: string;
  title: string;
  time: string;
  to?: string;
  kind: "event" | "service";
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Month grid showing one-off/multi-day events plus recurring weekly services. */
export function EventCalendar({ events, services }: { events: ChurchEvent[]; services: ServiceTime[] }) {
  const [today] = useState(() => new Date());
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<string>(toISODate(today));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  // 6-week grid starting on the Sunday on/before the 1st.
  const days = useMemo(() => {
    const start = new Date(year, month, 1 - new Date(year, month, 1).getDay());
    return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }, [year, month]);

  const entriesFor = (date: Date): CalendarEntry[] => {
    const iso = toISODate(date);
    const evs: CalendarEntry[] = events
      .filter(
        (e) =>
          iso >= e.date &&
          iso <= (e.endDate ?? e.date) &&
          (!e.weekly || parseLocalDate(e.date).getDay() === date.getDay()),
      )
      .map((e) => ({ key: e.slug, title: e.title, time: e.time, to: `/events/${e.slug}`, kind: "event" }));
    const svc: CalendarEntry[] = services
      .filter((s) => s.weekday === date.getDay())
      .map((s) => ({ key: `svc-${s.day}`, title: s.name, time: s.detail, kind: "service" }));
    return [...evs, ...svc];
  };

  const go = (delta: number) => setCursor(new Date(year, month + delta, 1));
  const goToday = () => {
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelected(toISODate(today));
  };

  const selectedEntries = entriesFor(parseLocalDate(selected));
  const monthLabel = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <div className={styles.calendar}>
      <div className={styles.toolbar}>
        <h3 className={styles.month} aria-live="polite">
          {monthLabel}
        </h3>
        <div className={styles.nav}>
          <button type="button" onClick={() => go(-1)} aria-label="Previous month" className={styles.navBtn}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" onClick={goToday} className={styles.todayBtn}>
            Today
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next month" className={styles.navBtn}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.grid} aria-label={monthLabel} role="group">
          {WEEKDAYS.map((d) => (
            <div key={d} className={styles.weekday} aria-hidden="true">
              {d}
            </div>
          ))}
          {days.map((date) => {
            const iso = toISODate(date);
            const entries = entriesFor(date);
            const outside = date.getMonth() !== month;
            const isToday = iso === toISODate(today);
            const hasEvent = entries.some((e) => e.kind === "event");
            return (
              <button
                key={iso}
                type="button"
                aria-pressed={selected === iso}
                aria-label={`${date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}${entries.length ? `, ${entries.length} item${entries.length > 1 ? "s" : ""}` : ""}`}
                className={[
                  styles.day,
                  outside && styles.outside,
                  isToday && styles.today,
                  selected === iso && styles.selected,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setSelected(iso)}
              >
                <span className={styles.dayNum}>{date.getDate()}</span>
                <span className={styles.chips}>
                  {entries.slice(0, 2).map((e) => (
                    <span key={e.key} className={`${styles.chip} ${e.kind === "service" ? styles.chipService : ""}`}>
                      {e.title}
                    </span>
                  ))}
                  {entries.length > 2 && <span className={styles.more}>+{entries.length - 2} more</span>}
                </span>
                {entries.length > 0 && <span className={`${styles.dot} ${hasEvent ? "" : styles.dotService}`} aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <aside className={styles.agenda} aria-live="polite">
          <h4 className={styles.agendaTitle}>
            {parseLocalDate(selected).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
          </h4>
          {selectedEntries.length === 0 ? (
            <p className={styles.empty}>Nothing scheduled.</p>
          ) : (
            <ul className={styles.agendaList}>
              {selectedEntries.map((e) => (
                <li key={e.key} className={e.kind === "service" ? styles.agendaService : ""}>
                  {e.to ? (
                    <SmartLink to={e.to} className={styles.agendaLink}>
                      {e.title}
                    </SmartLink>
                  ) : (
                    <span className={styles.agendaLink}>{e.title}</span>
                  )}
                  <span className={styles.agendaTime}>{e.time}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
