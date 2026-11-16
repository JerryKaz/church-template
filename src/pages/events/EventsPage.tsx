import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { EventCalendar } from "../../components/features/EventCalendar";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { SmartLink } from "../../components/SmartLink";
import { eventCategories, events, type EventCategory } from "../../content/events";
import { photo } from "../../content/media";
import { serviceTimes } from "../../content/services";
import { formatDateRange, toISODate } from "../../utils/format";
import styles from "./EventsPage.module.css";

export default function EventsPage() {
  const [params, setParams] = useSearchParams();
  const category = (params.get("category") ?? "") as EventCategory | "";
  const [today] = useState(() => toISODate(new Date()));

  // Upcoming = hasn't ended yet. Sorted soonest first.
  const upcoming = useMemo(
    () =>
      events
        .filter((e) => (e.endDate ?? e.date) >= today)
        .filter((e) => !category || e.category === category)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [category, today],
  );

  const setCategory = (c: string) => setParams(c ? { category: c } : {}, { replace: true });

  return (
    <>
      <Seo title="Events" description="Upcoming services, conferences, youth nights and community events." />
      <PageHero title="Events" image={photo("events-hero")} />

      <Section
        title="Upcoming Events"
        intro="Whether you're looking to worship, learn, serve or connect, there's something for every age and stage of life."
      >
        <div className={`${styles.filters} reveal`} role="group" aria-label="Filter by category">
          {["", ...eventCategories].map((c) => (
            <button
              key={c || "all"}
              type="button"
              className={`${styles.chip} ${category === c ? styles.active : ""}`}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c || "All"}
            </button>
          ))}
        </div>

        {upcoming.length === 0 ? (
          <p className={styles.empty}>No upcoming {category.toLowerCase()} events right now. Check back soon!</p>
        ) : (
          <ul className={styles.grid}>
            {upcoming.map((e) => (
              <li key={e.slug} className={styles.card}>
                <SmartLink to={`/events/${e.slug}`} className={styles.cardLink}>
                  <div className={styles.media}>
                    <img src={e.image} alt="" loading="lazy" decoding="async" />
                    <span className={styles.category}>{e.category}</span>
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.title}>{e.title}</h3>
                    <ul className={styles.meta}>
                      <li>
                        <CalendarDays size={16} aria-hidden="true" /> {formatDateRange(e.date, e.endDate)}
                      </li>
                      <li>
                        <Clock size={16} aria-hidden="true" /> {e.time}
                      </li>
                      <li>
                        <MapPin size={16} aria-hidden="true" /> {e.location}
                      </li>
                    </ul>
                    <p className={styles.summary}>{e.summary}</p>
                    <span className={styles.cta}>{e.registration?.open ? "Details & registration →" : "Event details →"}</span>
                  </div>
                </SmartLink>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        tone="soft"
        title="See the Full Church Calendar"
        intro="Browse our complete schedule of services, ministry gatherings and special events."
      >
        <div className="reveal">
          <EventCalendar events={events} services={serviceTimes} />
        </div>
      </Section>
    </>
  );
}
