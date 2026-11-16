import { ArrowRight, FileText } from "lucide-react";
import { Button } from "../../components/Button";
import { MediaSplit } from "../../components/blocks/MediaSplit";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { family } from "../../content/pages";
import styles from "./FamilyPage.module.css";

export default function FamilyPage() {
  return (
    <>
      <Seo title="Family" description={family.intro.body} />
      <PageHero title={family.hero.title} image={family.hero.image} />

      <Section title={family.intro.title} intro={family.intro.body} narrow />

      <Section tone="soft">
        <MediaSplit image={family.resources.image} title={family.resources.title}>
          <ul className={styles.links}>
            {family.resources.links.map((l) => (
              <li key={l.label}>
                <a href={l.href}>
                  <FileText size={18} aria-hidden="true" /> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </MediaSplit>
      </Section>

      <Section title={family.learn.title} intro={family.learn.body}>
        <div className={`${styles.buttons} reveal`}>
          {family.learn.links.map((l) => (
            <Button key={l.label} variant="soft" to={l.href} icon={<ArrowRight />}>
              {l.label}
            </Button>
          ))}
        </div>
      </Section>

      <Section tone="brand" title={family.connect.title} intro={family.connect.body}>
        <div className={`${styles.buttons} reveal`}>
          {family.connect.links.map((l) => (
            <Button key={l.label} variant="outline-light" to={l.to}>
              {l.label}
            </Button>
          ))}
        </div>
      </Section>
    </>
  );
}
