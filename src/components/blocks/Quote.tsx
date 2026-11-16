import styles from "./Quote.module.css";

/** Full-width brand band with a large serif quote (e.g. a key scripture). */
export function Quote({ text, cite }: { text: string; cite?: string }) {
  return (
    <section className={styles.band}>
      <figure className={`container ${styles.figure} reveal`}>
        <blockquote className={styles.quote}>“{text}”</blockquote>
        {cite && <figcaption className={styles.cite}>{cite}</figcaption>}
      </figure>
    </section>
  );
}
