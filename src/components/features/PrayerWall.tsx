import { useEffect, useState } from "react";
import type { PublicPrayer } from "../../../shared/schemas";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { api } from "../../services/api";
import { formatDate } from "../../utils/format";
import styles from "./PrayerWall.module.css";

type Filter = "all" | "request" | "praise";

/**
 * Public prayer wall: lists shared requests and praise reports, with one
 * "I prayed" / "Celebrate" reaction per visitor (remembered in localStorage).
 * Pass a changing `refreshKey` to reload after a new submission.
 */
export function PrayerWall({ refreshKey = 0, limit }: { refreshKey?: number; limit?: number }) {
  const [prayers, setPrayers] = useState<PublicPrayer[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [reacted, setReacted] = useLocalStorage<string[]>("prayer-reactions", []);

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    api
      .listPrayers()
      .then((list) => {
        if (!active) return;
        setPrayers(list);
        setError(null);
      })
      .catch((e: unknown) => active && setError(e instanceof Error ? e.message : "Couldn't load prayers."));
    return () => {
      active = false;
    };
  }, [refreshKey, attempt]);

  const retry = () => {
    setError(null);
    setPrayers(null);
    setAttempt((n) => n + 1);
  };

  const react = async (id: string) => {
    if (reacted.includes(id)) return;
    // Optimistic update, rolled back if the request fails.
    setReacted((r) => [...r, id]);
    setPrayers((list) => list?.map((p) => (p.id === id ? { ...p, count: p.count + 1 } : p)) ?? null);
    try {
      const count = await api.reactToPrayer(id);
      setPrayers((list) => list?.map((p) => (p.id === id ? { ...p, count } : p)) ?? null);
    } catch {
      setReacted((r) => r.filter((x) => x !== id));
      setPrayers((list) => list?.map((p) => (p.id === id ? { ...p, count: p.count - 1 } : p)) ?? null);
    }
  };

  if (error) {
    return (
      <div className={styles.state}>
        <p>{error}</p>
        <button type="button" className={styles.retry} onClick={retry}>
          Try again
        </button>
      </div>
    );
  }

  if (!prayers) {
    return (
      <ul className={styles.list} aria-busy="true" aria-label="Loading prayers">
        {[0, 1, 2].map((i) => (
          <li key={i} className={`${styles.card} ${styles.skeleton}`} />
        ))}
      </ul>
    );
  }

  const visible = prayers.filter((p) => filter === "all" || p.kind === filter).slice(0, limit);

  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filter prayers">
        {(["all", "request", "praise"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.chip} ${filter === f ? styles.chipActive : ""}`}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f === "request" ? "Prayer requests" : "Praise reports"}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.state}>Nothing here yet. Be the first to share.</p>
      ) : (
        <ul className={styles.list}>
          {visible.map((p) => {
            const done = reacted.includes(p.id);
            const isPraise = p.kind === "praise";
            return (
              <li key={p.id} className={`${styles.card} ${isPraise ? styles.praise : ""}`}>
                <div className={styles.meta}>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.badge}>{isPraise ? "Praise" : "Prayer"}</span>
                </div>
                <p className={styles.message}>{p.message}</p>
                <div className={styles.footer}>
                  <time dateTime={p.createdAt} className={styles.date}>
                    {formatDate(p.createdAt)}
                  </time>
                  <button
                    type="button"
                    className={`${styles.react} ${done ? styles.reacted : ""}`}
                    onClick={() => react(p.id)}
                    disabled={done}
                    aria-label={`${isPraise ? "Celebrate" : "I prayed"}. ${p.count} so far`}
                  >
                    <span aria-hidden="true">{isPraise ? "🙌" : "🙏"}</span>
                    {done ? (isPraise ? "Celebrated" : "Prayed") : isPraise ? "Celebrate" : "I Prayed"}
                    <span className={styles.count}>{p.count}</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
