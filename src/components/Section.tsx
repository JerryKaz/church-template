import type { CSSProperties, ReactNode } from "react";
import styles from "./Section.module.css";

export type Tone = "light" | "soft" | "dark" | "brand";

interface SectionProps {
  tone?: Tone;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  align?: "center" | "left";
  /** Narrow text column for long-form copy. */
  narrow?: boolean;
  backgroundImage?: string;
  id?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Standard vertical section with consistent spacing, heading and colour tone.
 * Most page content is composed from this plus a few layout helpers.
 */
export function Section({
  tone = "light",
  eyebrow,
  title,
  intro,
  align = "center",
  narrow,
  backgroundImage,
  id,
  className,
  children,
}: SectionProps) {
  const style: CSSProperties | undefined = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined;
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={[styles.section, styles[tone], backgroundImage && styles.withImage, className].filter(Boolean).join(" ")}
      style={style}
      aria-labelledby={title ? headingId : undefined}
    >
      {backgroundImage && <div className={styles.overlay} aria-hidden="true" />}
      <div className={`container ${narrow ? styles.narrow : ""}`}>
        {(eyebrow || title || intro) && (
          <header className={`${styles.header} ${styles[align]} reveal`}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className={styles.title}>
                {title}
              </h2>
            )}
            {intro && <div className={styles.intro}>{intro}</div>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
