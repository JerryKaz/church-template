import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { home } from "../../content/home";
import { Button } from "../../components/Button";
import styles from "./NextSteps.module.css";

/**
 * Horizontal card carousel built on native scroll-snap:
 * works with touch, trackpad and keyboard out of the box; arrows are an enhancement.
 */
export function NextSteps() {
  const { nextSteps } = home;
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <section className={styles.section} aria-labelledby="next-steps-title">
      <div className="container">
        <h2 id="next-steps-title" className={`${styles.title} reveal`}>
          {nextSteps.title}
        </h2>

        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          <ul ref={trackRef} className={styles.track} aria-label={nextSteps.title}>
            {nextSteps.items.map((item, i) => (
              <li key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>
                  {String(i + 1).padStart(2, "0")}: {item.title}
                </h3>
                <p className={styles.cardBody}>{item.description}</p>
                <Button variant="link" to={item.to} className={styles.cardLink}>
                  {item.cta}
                </Button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
