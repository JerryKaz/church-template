import { home } from "../../content/home";
import styles from "./Gallery.module.css";

export function Gallery() {
  return (
    <section className={styles.gallery} aria-label="Photo gallery">
      {home.gallery.map((img) => (
        <figure key={img.src} className={styles.item}>
          <img src={img.src} alt={img.alt} loading="lazy" decoding="async" width={600} height={600} />
        </figure>
      ))}
    </section>
  );
}
