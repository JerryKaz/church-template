import styles from "./PageHero.module.css";

interface PageHeroProps {
  title: string;
  image?: string;
  subtitle?: string;
}

/** Banner at the top of every inner page: background photo, dark overlay, centred title. */
export function PageHero({ title, image, subtitle }: PageHeroProps) {
  return (
    <section className={styles.hero} style={image ? { backgroundImage: `url(${image})` } : undefined}>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <h1 className={`${styles.title} reveal`}>{title}</h1>
        {subtitle && <p className={`${styles.subtitle} reveal`}>{subtitle}</p>}
      </div>
    </section>
  );
}
