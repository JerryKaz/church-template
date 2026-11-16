import { Accordion } from "../../components/Accordion";
import { CtaBanner } from "../../components/blocks/CtaBanner";
import { FeatureGrid } from "../../components/blocks/FeatureGrid";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { beliefs } from "../../content/pages";

export default function BeliefsPage() {
  return (
    <>
      <Seo title="Our Beliefs" />
      <PageHero title={beliefs.hero.title} image={beliefs.hero.image} />

      <Section title={beliefs.approach.title}>
        <FeatureGrid items={beliefs.approach.items} />
      </Section>

      <Section tone="soft" title={beliefs.essentials.title} narrow>
        <div className="reveal">
          <Accordion items={beliefs.essentials.items.map((b) => ({ title: b.title, body: <p>{b.body}</p> }))} multiple defaultOpen={[0]} />
        </div>
      </Section>

      <CtaBanner
        title="Have Questions About Faith?"
        body="We'd love to talk. No question is too big or too small."
        primary={{ label: "Contact Us", to: "/contact?topic=Next%20steps" }}
        secondary={{ label: "Plan a Visit", to: "/visit" }}
      />
    </>
  );
}
