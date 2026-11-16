import { Accordion } from "../../components/Accordion";
import { CtaBanner } from "../../components/blocks/CtaBanner";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { lifestyle } from "../../content/pages";

export default function LifestylePage() {
  return (
    <>
      <Seo title="Our Lifestyle" />
      <PageHero title={lifestyle.hero.title} image={lifestyle.hero.image} />
      <Section title={lifestyle.intro.title} intro={lifestyle.intro.body} narrow>
        <div className="reveal">
          <Accordion items={lifestyle.items.map((i) => ({ title: i.title, body: <p>{i.body}</p> }))} defaultOpen={[0]} />
        </div>
      </Section>
      <CtaBanner
        title="Explore More"
        primary={{ label: "Our Beliefs", to: "/about/beliefs" }}
        secondary={{ label: "Our Story", to: "/about/story" }}
      />
    </>
  );
}
