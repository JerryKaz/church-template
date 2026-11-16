import { ArrowRight } from "lucide-react";
import { Accordion } from "../../components/Accordion";
import { Button } from "../../components/Button";
import { FeatureGrid } from "../../components/blocks/FeatureGrid";
import { MediaSplit } from "../../components/blocks/MediaSplit";
import { ServiceTimesGrid } from "../../components/blocks/ServiceTimesGrid";
import { VisitForm } from "../../components/form/VisitForm";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { visit } from "../../content/pages";
import { site } from "../../content/site";
import styles from "./VisitPage.module.css";

export default function VisitPage() {
  return (
    <>
      <Seo title="Plan a Visit" description={visit.welcome.body} />
      <PageHero title={visit.hero.title} image={visit.hero.image} />

      <Section title={visit.welcome.title} intro={visit.welcome.body}>
        <div className={`${styles.actions} reveal`}>
          <Button variant="soft" to="#plan">
            Plan a Visit
          </Button>
          <Button to={site.contact.mapsUrl} icon={<ArrowRight />}>
            Get Directions
          </Button>
        </div>
      </Section>

      <Section tone="soft" title="Service Times" intro="Worship with us in person or online throughout the week.">
        <ServiceTimesGrid />
      </Section>

      <Section tone="dark" eyebrow={visit.expect.eyebrow} title={visit.expect.title} intro={visit.expect.intro} backgroundImage={visit.expect.image}>
        <FeatureGrid items={visit.expect.items} tone="dark" />
      </Section>

      <Section>
        <MediaSplit image={visit.kids.image} title={visit.kids.title}>
          <p>{visit.kids.body}</p>
          <Button variant="soft" to={visit.kids.cta.to}>
            {visit.kids.cta.label}
          </Button>
        </MediaSplit>
      </Section>

      <Section id="plan" tone="brand" className="on-dark">
        <div className={styles.planGrid}>
          <div className="reveal">
            <h2 className={styles.planTitle}>{visit.form.title}</h2>
            <p className={styles.planBody}>{visit.form.body}</p>
            <div className={styles.faq}>
              <p className={styles.eyebrow}>{visit.faq.eyebrow}</p>
              <h3 className={styles.faqTitle}>{visit.faq.title}</h3>
              <Accordion tone="dark" items={visit.faq.items.map((f) => ({ title: f.title, body: <p>{f.body}</p> }))} />
            </div>
          </div>
          <div className={`${styles.formCard} reveal`}>
            <VisitForm />
          </div>
        </div>
      </Section>
    </>
  );
}
