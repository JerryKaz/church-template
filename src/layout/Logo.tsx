import { site } from "../content/site";
import styles from "./Logo.module.css";

/** Placeholder wordmark. Replace with <img src="/logo.svg" alt={site.name} /> when you have one. */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`${styles.logo} ${inverted ? styles.inverted : ""}`}>
      <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path d="M14 7h4v6h6v4h-6v8h-4v-8H8v-4h6z" fill="#fff" />
      </svg>
      <span className={styles.text}>
        <span className={styles.name}>{site.name}</span>
        <span className={styles.tagline}>{site.tagline}</span>
      </span>
    </span>
  );
}
