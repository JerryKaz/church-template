import type { ReactNode } from "react";
import styles from "./MediaSplit.module.css";

interface MediaSplitProps {
  image: string;
  imageAlt?: string;
  title: string;
  children: ReactNode;
  reverse?: boolean;
  eyebrow?: string;
}

/** Image on one side, copy on the other. Stacks on mobile. */
export function MediaSplit({ image, imageAlt = "", title, children, reverse, eyebrow }: MediaSplitProps) {
  return (
    <div className={`${styles.split} ${reverse ? styles.reverse : ""}`}>
      <div className={`${styles.media} reveal`}>
        <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
      </div>
      <div className={`${styles.copy} reveal`}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
