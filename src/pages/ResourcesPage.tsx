import { Newspaper, NotebookPen, Sun, type LucideIcon } from "lucide-react";
import { Button } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { Seo } from "../components/Seo";
import { resources } from "../content/pages";
import { revealDelay } from "../utils/reveal";
import styles from "./ResourcesPage.module.css";

const icons: Record<string, LucideIcon> = { notebook: NotebookPen, sun: Sun, newspaper: Newspaper };

export default function ResourcesPage() {
  return (
    <>
      <Seo title="Resources" />
      <PageHero title={resources.hero.title} image={resources.hero.image} />
      <Section title={resources.title}>
        <ul className={styles.grid}>
          {resources.items.map((r, i) => {
            const Icon = icons[r.icon];
            const to = "to" in r ? r.to : r.href;
            return (
              <li key={r.title} className={`${styles.card} reveal`} style={revealDelay(i * 80)}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={28} />
                </span>
                <h3 className={styles.title}>{r.title}</h3>
                <p className={styles.body}>{r.body}</p>
                <Button variant="primary" to={to} {...("href" in r ? { download: true } : {})}>
                  {r.cta}
                </Button>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
