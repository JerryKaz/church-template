import { Accordion } from "../../components/Accordion";
import { MediaSplit } from "../../components/blocks/MediaSplit";
import { NumberedCards } from "../../components/blocks/NumberedCards";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { about } from "../../content/pages";

export default function AboutPage() {
  return (
    <>
      <Seo title="About" description={about.whoWeAre.body} />
      <PageHero title={about.hero.title} image={about.hero.image} />

      <Section title={about.whoWeAre.title} intro={about.whoWeAre.body} narrow />

      <Section tone="soft">
        <MediaSplit image={about.name.image} title={about.name.title}>
          {about.name.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </MediaSplit>
      </Section>

      <Section tone="dark" title={about.mission.title} intro={about.mission.body} narrow />
      <Section tone="brand" title={about.affiliation.title} intro={about.affiliation.body} narrow />

      <Section title={about.values.title} narrow>
        <div className="reveal">
          <Accordion items={about.values.items.map((v) => ({ title: v.title, body: <p>{v.body}</p> }))} defaultOpen={[0]} />
        </div>
      </Section>

      <Section tone="soft" title={about.getToKnow.title} intro={about.getToKnow.intro}>
        <NumberedCards items={about.getToKnow.items} />
      </Section>
    </>
  );
}
