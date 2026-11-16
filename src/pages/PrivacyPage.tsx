import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { Seo } from "../components/Seo";
import { privacy } from "../content/pages";
import styles from "./PrivacyPage.module.css";

export default function PrivacyPage() {
  return (
    <>
      <Seo title="Privacy Policy" />
      <PageHero title={privacy.hero.title} image={privacy.hero.image} />
      <Section align="left" narrow>
        <p className={styles.updated}>Last updated: {privacy.updated}</p>
        <div className={styles.prose}>
          {privacy.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
