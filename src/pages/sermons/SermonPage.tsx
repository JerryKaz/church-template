import { useParams } from "react-router";
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { useState } from "react";
import { AudioPlayer } from "../../components/features/AudioPlayer";
import { NotesEditor } from "../../components/features/NotesEditor";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { SmartLink } from "../../components/SmartLink";
import { VideoEmbed } from "../../components/VideoEmbed";
import { findSermon, sermonsSorted } from "../../content/sermons";
import { formatDate } from "../../utils/format";
import NotFoundPage from "../NotFoundPage";
import styles from "./SermonPage.module.css";

export default function SermonPage() {
  const { slug = "" } = useParams();
  const sermon = findSermon(slug);
  const [shared, setShared] = useState(false);
  if (!sermon) return <NotFoundPage />;

  const index = sermonsSorted.findIndex((s) => s.slug === sermon.slug);
  const newer = sermonsSorted[index - 1];
  const older = sermonsSorted[index + 1];

  const share = async () => {
    const data = { title: sermon.title, text: sermon.summary, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* user cancelled the share sheet */
    }
  };

  return (
    <>
      <Seo title={sermon.title} description={sermon.summary} />

      <section className={styles.header}>
        <div className="container">
          <SmartLink to="/sermons" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" /> All sermons
          </SmartLink>
          <p className={styles.series}>{sermon.series}</p>
          <h1 className={styles.title}>{sermon.title}</h1>
          <p className={styles.meta}>
            <time dateTime={sermon.date}>{formatDate(sermon.date)}</time> • {sermon.speaker}
            {sermon.scripture && ` • ${sermon.scripture}`}
          </p>
          <div className={styles.player}>
            <AudioPlayer src={sermon.audioUrl} title={sermon.title} storageKey={sermon.slug} />
          </div>
        </div>
      </section>

      <Section align="left">
        <div className={styles.body}>
          <div>
            <h2 className={styles.h2}>About this message</h2>
            <p className={styles.summary}>{sermon.summary}</p>
            {sermon.youtubeId && (
              <div className={styles.video}>
                <VideoEmbed youtubeId={sermon.youtubeId} title={sermon.title} />
              </div>
            )}
            <div className={styles.links}>
              <SmartLink to="/give">Give</SmartLink>
              <SmartLink to="/prayer">Prayer requests</SmartLink>
              <SmartLink to="/resources">Bulletin</SmartLink>
              <button type="button" onClick={share} className={styles.share}>
                <Share2 size={16} aria-hidden="true" /> {shared ? "Link copied" : "Share"}
              </button>
            </div>
          </div>
          <aside className={styles.notes}>
            <NotesEditor key={sermon.slug} storageKey={sermon.slug} title={sermon.title} />
          </aside>
        </div>

        <nav className={styles.pager} aria-label="More sermons">
          {older ? (
            <SmartLink to={`/sermons/${older.slug}`} className={styles.pagerLink}>
              <ArrowLeft size={18} aria-hidden="true" />
              <span>
                <small>Previous</small>
                {older.title}
              </span>
            </SmartLink>
          ) : (
            <span />
          )}
          {newer && (
            <SmartLink to={`/sermons/${newer.slug}`} className={`${styles.pagerLink} ${styles.next}`}>
              <span>
                <small>Next</small>
                {newer.title}
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </SmartLink>
          )}
        </nav>
      </Section>
    </>
  );
}
