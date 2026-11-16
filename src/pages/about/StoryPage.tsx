import { CtaBanner } from "../../components/blocks/CtaBanner";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { story } from "../../content/pages";
import { revealDelay } from "../../utils/reveal";
import styles from "./StoryPage.module.css";

export default function StoryPage() {
  return (
    <>
      <Seo title="Our Story" />
      <PageHero title={story.hero.title} image={story.hero.image} />

      <Section title={story.intro.title} intro={story.intro.body}>
        <ol className={styles.timeline}>
          {story.timeline.map((m, i) => (
            <li key={m.year} className={`${styles.item} reveal`} style={revealDelay(60)}>
              <span className={styles.marker} aria-hidden="true" />
              <div className={`${styles.card} ${i % 2 ? styles.right : ""}`}>
                <span className={styles.year}>{m.year}</span>
                <h3 className={styles.title}>{m.title}</h3>
                <p>{m.body}</p>
                {"image" in m && m.image && <img className={styles.image} src={m.image} alt="" loading="lazy" />}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBanner
        title="Be Part of the Next Chapter"
        body="Our story is still being written, and there's a place in it for you."
        primary={{ label: "Plan a Visit", to: "/visit" }}
        secondary={{ label: "Get Involved", to: "/ministries" }}
      />
    </>
  );
}
