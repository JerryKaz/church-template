import { Building2, Landmark, Smartphone, type LucideIcon } from "lucide-react";
import { GiveForm } from "../components/features/GiveForm";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { Seo } from "../components/Seo";
import { give } from "../content/pages";
import { site } from "../content/site";
import { revealDelay } from "../utils/reveal";
import styles from "./GivePage.module.css";

const icons: LucideIcon[] = [Smartphone, Landmark, Building2];

export default function GivePage() {
  return (
    <>
      <Seo title="Give" description={give.body} />
      <PageHero title={give.hero.title} image={give.hero.image} />

      <Section tone="soft" align="left">
        <div className={styles.layout}>
          <div className="reveal">
            <h2 className={styles.title}>{give.title}</h2>
            <p className={styles.body}>{give.body}</p>

            <h3 className={styles.otherTitle}>Other ways to give</h3>
            <ul className={styles.other}>
              {site.give.otherWays.map((w, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <li key={w.title} className="reveal" style={revealDelay(i * 80)}>
                    <span className={styles.icon} aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <span>
                      <strong>{w.title}</strong>
                      <span className={styles.detail}>{w.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="reveal">
            <GiveForm />
          </div>
        </div>
      </Section>
    </>
  );
}
