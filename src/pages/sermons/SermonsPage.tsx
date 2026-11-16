import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Headphones, Search } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { SmartLink } from "../../components/SmartLink";
import { sermonsSorted } from "../../content/sermons";
import { photo } from "../../content/media";
import { formatDate } from "../../utils/format";
import styles from "./SermonsPage.module.css";

const PAGE_SIZE = 6;
const seriesList = [...new Set(sermonsSorted.map((s) => s.series))];
const speakers = [...new Set(sermonsSorted.map((s) => s.speaker))];

/** Search and filters live in the URL, so filtered views can be shared and survive refresh. */
export default function SermonsPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const series = params.get("series") ?? "";
  const speaker = params.get("speaker") ?? "";
  const [visible, setVisible] = useState(PAGE_SIZE);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
    setVisible(PAGE_SIZE);
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return sermonsSorted.filter(
      (s) =>
        (!series || s.series === series) &&
        (!speaker || s.speaker === speaker) &&
        (!term || [s.title, s.summary, s.scripture, s.speaker, s.series].some((f) => f?.toLowerCase().includes(term))),
    );
  }, [q, series, speaker]);

  return (
    <>
      <Seo title="Sermons" description="Listen to recent messages anytime, anywhere." />
      <PageHero title="Sermon Audio" image={photo("sermons-hero")} />

      <Section
        title="Listen to Biblical Teaching Anytime"
        intro="Stay connected wherever you are. Listen to recent messages and be encouraged through practical, Bible-based teaching."
      >
        <form className={`${styles.filters} reveal`} role="search" onSubmit={(e) => e.preventDefault()}>
          <label className={styles.search}>
            <Search size={18} aria-hidden="true" />
            <span className="visually-hidden">Search sermons</span>
            <input type="search" placeholder="Search by title, topic or scripture" value={q} onChange={(e) => update("q", e.target.value)} />
          </label>
          <label>
            <span className="visually-hidden">Series</span>
            <select value={series} onChange={(e) => update("series", e.target.value)}>
              <option value="">All series</option>
              {seriesList.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="visually-hidden">Speaker</span>
            <select value={speaker} onChange={(e) => update("speaker", e.target.value)}>
              <option value="">All speakers</option>
              {speakers.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </form>

        <p className={styles.count} aria-live="polite">
          {results.length} {results.length === 1 ? "message" : "messages"}
          {(q || series || speaker) && (
            <button type="button" className={styles.clear} onClick={() => setParams({}, { replace: true })}>
              Clear filters
            </button>
          )}
        </p>

        {results.length === 0 ? (
          <p className={styles.empty}>No sermons match your search.</p>
        ) : (
          <ul className={styles.list}>
            {results.slice(0, visible).map((s) => (
              <li key={s.slug} className={styles.card}>
                <SmartLink to={`/sermons/${s.slug}`} className={styles.cardLink}>
                  <span className={styles.icon} aria-hidden="true">
                    <Headphones size={22} />
                  </span>
                  <span className={styles.series}>{s.series}</span>
                  <h3 className={styles.title}>{s.title}</h3>
                  <span className={styles.meta}>
                    <time dateTime={s.date}>{formatDate(s.date)}</time> • {s.speaker}
                  </span>
                  <p className={styles.summary}>{s.summary}</p>
                  <span className={styles.listen}>Listen now →</span>
                </SmartLink>
              </li>
            ))}
          </ul>
        )}

        {visible < results.length && (
          <div className={styles.more}>
            <button type="button" className={styles.moreBtn} onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Load more
            </button>
          </div>
        )}
      </Section>
    </>
  );
}
