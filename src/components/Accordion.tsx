import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.css";

export interface AccordionItem {
  title: string;
  body: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow several panels open at once (default: one at a time). */
  multiple?: boolean;
  defaultOpen?: number[];
  tone?: "light" | "dark";
}

export function Accordion({ items, multiple = false, defaultOpen = [], tone = "light" }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set(defaultOpen));
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={`${styles.accordion} ${styles[tone]}`}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.title} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
            <h3 className={styles.heading}>
              <button
                id={btnId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span>{item.title}</span>
                <ChevronDown className={styles.chevron} size={22} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className={styles.panel} inert={!isOpen}>
              <div className={styles.panelInner}>
                <div className={styles.body}>{item.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
