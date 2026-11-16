import { serviceTimes } from "../../content/services";
import { revealDelay } from "../../utils/reveal";
import styles from "./ServiceTimesGrid.module.css";

export function ServiceTimesGrid({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul className={`${styles.grid} ${styles[tone]}`}>
      {serviceTimes.map((t, i) => (
        <li key={t.day} className="reveal" style={revealDelay(i * 80)}>
          <h3 className={styles.day}>{t.day}</h3>
          <p className={styles.detail}>{t.detail}</p>
        </li>
      ))}
    </ul>
  );
}
