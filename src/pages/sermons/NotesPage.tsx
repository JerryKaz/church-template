import { NotesEditor } from "../../components/features/NotesEditor";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { SmartLink } from "../../components/SmartLink";
import { photo } from "../../content/media";
import { sermonsSorted } from "../../content/sermons";
import { formatDate } from "../../utils/format";
import styles from "./NotesPage.module.css";

/** This week's sermon outline with a personal notes area (saved on the device). */
export default function NotesPage() {
  const sermon = sermonsSorted[0];

  return (
    <>
      <Seo title="Sermon Notes" description={`Notes for ${sermon.title}`} />
      <PageHero title="Sermon Notes" image={photo("notes-hero")} />

      <Section align="left">
        <div className={styles.layout}>
          <article className={`${styles.outline} reveal`}>
            <p className={styles.date}>{formatDate(sermon.date)}</p>
            <h2 className={styles.title}>{sermon.title}</h2>
            <p className={styles.meta}>
              {sermon.speaker} • {sermon.series}
            </p>
            {sermon.scripture && (
              <p className={styles.scripture}>
                <strong>Key scripture:</strong> {sermon.scripture}
              </p>
            )}
            <p>{sermon.summary}</p>
            <ol className={styles.points}>
              <li>Main point one: replace with the sermon outline.</li>
              <li>Main point two: keep these short so people can follow along.</li>
              <li>Main point three: add scripture references for each point.</li>
            </ol>
            <p className={styles.apply}>
              <strong>This week:</strong> One practical step to put the message into action.
            </p>
            <SmartLink to={`/sermons/${sermon.slug}`} className={styles.listen}>
              Listen to this message →
            </SmartLink>
          </article>

          <div className={`${styles.editor} reveal`}>
            <NotesEditor key={sermon.slug} storageKey={sermon.slug} title={sermon.title} />
            <p className={styles.privacy}>Your notes are saved privately in this browser. Nothing is sent to us.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
