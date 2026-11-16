import { Button } from "../Button";
import { revealDelay } from "../../utils/reveal";
import styles from "./NumberedCards.module.css";

interface Card {
  title: string;
  body: string;
  cta: string;
  to: string;
  image?: string;
}

/** "01. Title / body / link" cards used for next-step style navigation. */
export function NumberedCards({ items, numbered = true }: { items: readonly Card[]; numbered?: boolean }) {
  return (
    <ul className={styles.grid}>
      {items.map((c, i) => (
        <li key={c.title} className={`${styles.card} reveal`} style={revealDelay(i * 80)}>
          {c.image && (
            <div className={styles.media}>
              <img src={c.image} alt="" loading="lazy" decoding="async" />
            </div>
          )}
          <div className={styles.content}>
            <h3 className={styles.title}>
              {numbered && <span className={styles.num}>{String(i + 1).padStart(2, "0")}.</span>} {c.title}
            </h3>
            <p className={styles.body}>{c.body}</p>
            <Button variant="link" to={c.to} className={styles.link}>
              {c.cta}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
