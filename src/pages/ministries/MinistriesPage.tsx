import { CtaBanner } from "../../components/blocks/CtaBanner";
import { NumberedCards } from "../../components/blocks/NumberedCards";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { ministries } from "../../content/pages";

export default function MinistriesPage() {
  return (
    <>
      <Seo title="Ministries" description={ministries.intro.body} />
      <PageHero title={ministries.hero.title} image={ministries.hero.image} />
      <Section title={ministries.intro.title} intro={ministries.intro.body}>
        <NumberedCards items={ministries.items} numbered={false} />
      </Section>
      <CtaBanner
        title={ministries.cta.title}
        body={ministries.cta.body}
        primary={ministries.cta.primary}
        secondary={ministries.cta.secondary}
      />
    </>
  );
}
