import { Button } from "../../components/Button";
import { CtaBanner } from "../../components/blocks/CtaBanner";
import { FeatureGrid } from "../../components/blocks/FeatureGrid";
import { MediaSplit } from "../../components/blocks/MediaSplit";
import { Quote } from "../../components/blocks/Quote";
import { SocialRow } from "../../components/blocks/SocialRow";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { kids } from "../../content/pages";

export default function KidsPage() {
  return (
    <>
      <Seo title="Kids" description={kids.intro.body} />
      <PageHero title={kids.hero.title} image={kids.hero.image} />

      <Section>
        <MediaSplit image={kids.intro.image} title={kids.intro.title}>
          <p>{kids.intro.body}</p>
          <Button to="/visit">Plan Your Visit</Button>
        </MediaSplit>
      </Section>

      <Quote text={kids.quote} />

      <Section title={kids.expect.title}>
        <FeatureGrid items={kids.expect.items} />
      </Section>

      <Section tone="soft">
        <MediaSplit image={kids.partner.image} title={kids.partner.title} reverse>
          <p>{kids.partner.body}</p>
        </MediaSplit>
        <MediaSplit image={kids.volunteer.image} title={kids.volunteer.title}>
          <p>{kids.volunteer.body}</p>
          <Button variant="primary" to={kids.volunteer.cta.to}>
            {kids.volunteer.cta.label}
          </Button>
        </MediaSplit>
      </Section>

      <CtaBanner title={kids.checkIn.title} body={kids.checkIn.body} primary={kids.checkIn.cta} />

      <Section title="Stay Connected">
        <SocialRow />
      </Section>
    </>
  );
}
