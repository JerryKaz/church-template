import { CtaBanner } from "../../components/blocks/CtaBanner";
import { FeatureGrid } from "../../components/blocks/FeatureGrid";
import { MediaSplit } from "../../components/blocks/MediaSplit";
import { Quote } from "../../components/blocks/Quote";
import { SocialRow } from "../../components/blocks/SocialRow";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { youth } from "../../content/pages";

export default function YouthPage() {
  return (
    <>
      <Seo title="Youth" description={youth.intro.body} />
      <PageHero title={youth.hero.title} image={youth.hero.image} />

      <Section>
        <MediaSplit image={youth.intro.image} title={youth.intro.title}>
          <p>{youth.intro.body}</p>
        </MediaSplit>
      </Section>

      <Quote text={youth.quote} />

      <Section title={youth.gatherings.title}>
        <FeatureGrid items={youth.gatherings.items} />
      </Section>

      <Section tone="soft" title={youth.social.title} intro={youth.social.body}>
        <SocialRow platforms={["instagram", "facebook", "youtube"]} />
      </Section>

      <CtaBanner title={youth.cta.title} body={youth.cta.body} primary={youth.cta.primary} secondary={youth.cta.secondary} />
    </>
  );
}
