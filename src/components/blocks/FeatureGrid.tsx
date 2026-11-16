import {
  BookOpen,
  Hand,
  Music,
  Newspaper,
  NotebookPen,
  PartyPopper,
  Shirt,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { revealDelay } from "../../utils/reveal";
import styles from "./FeatureGrid.module.css";

/** Content files reference icons by name so copy stays free of imports. */
const icons: Record<string, LucideIcon> = {
  hand: Hand,
  music: Music,
  book: BookOpen,
  shirt: Shirt,
  users: Users,
  party: PartyPopper,
  notebook: NotebookPen,
  sun: Sun,
  newspaper: Newspaper,
};

interface Feature {
  icon?: string;
  title: string;
  body: string;
}

export function FeatureGrid({ items, tone = "light" }: { items: readonly Feature[]; tone?: "light" | "dark" }) {
  return (
    <ul className={`${styles.grid} ${styles[tone]}`} style={{ "--cols": Math.min(items.length, 4) } as CSSProperties}>
      {items.map((f, i) => {
        const Icon = f.icon ? icons[f.icon] : undefined;
        return (
          <li key={f.title} className={`${styles.item} reveal`} style={revealDelay(i * 80)}>
            {Icon && (
              <span className={styles.icon} aria-hidden="true">
                <Icon size={26} />
              </span>
            )}
            <h3 className={styles.title}>{f.title}</h3>
            <p className={styles.body}>{f.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
