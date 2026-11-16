import { useEffect } from "react";

/**
 * Adds `.is-visible` to `.reveal` elements as they scroll into view.
 * A MutationObserver picks up elements added later (route changes, async data),
 * so components just add the class and never wire anything up themselves.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      const showAll = () => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const observeNew = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => io.observe(el));

    observeNew(document);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(".reveal:not(.is-visible)")) io.observe(node);
          observeNew(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
