import { useState } from "react";
import { useParams } from "react-router";
import { ArrowLeft, CalendarDays, CalendarPlus, Clock, MapPin } from "lucide-react";
import { RegistrationForm } from "../../components/form/RegistrationForm";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { SmartLink } from "../../components/SmartLink";
import { findEvent, type ChurchEvent } from "../../content/events";
import { site } from "../../content/site";
import { formatDateRange, parseLocalDate, toISODate } from "../../utils/format";
import NotFoundPage from "../NotFoundPage";
import styles from "./EventPage.module.css";

/** Build a downloadable .ics so people can add the event to any calendar app. */
function downloadIcs(event: ChurchEvent) {
  const compact = (iso: string) => iso.replace(/-/g, "");
  const end = parseLocalDate(event.endDate ?? event.date);
  end.setDate(end.getDate() + 1); // all-day DTEND is exclusive
  const escape = (s: string) => s.replace(/[,;\\]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Events//EN`,
    "BEGIN:VEVENT",
    `UID:${event.slug}@${window.location.host}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${compact(event.date)}`,
    `DTEND;VALUE=DATE:${compact(toISODate(end))}`,
    `SUMMARY:${escape(event.title)}`,
    `DESCRIPTION:${escape(`${event.time}. ${event.summary}`)}`,
    `LOCATION:${escape(event.location)}`,
    `URL:${window.location.href}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.slug}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function EventPage() {
  const { slug = "" } = useParams();
  const event = findEvent(slug);
  const [today] = useState(() => toISODate(new Date()));
  if (!event) return <NotFoundPage />;

  const ended = (event.endDate ?? event.date) < today;
  const canRegister = event.registration?.open && !ended;

  return (
    <>
      <Seo title={event.title} description={event.summary} />

      <section className={styles.hero} style={{ backgroundImage: `url(${event.image})` }}>
        <div className={styles.overlay} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <SmartLink to="/events" className={styles.back}>
            <ArrowLeft size={16} aria-hidden="true" /> All events
          </SmartLink>
          <span className={styles.category}>{event.category}</span>
          <h1 className={styles.title}>{event.title}</h1>
          <p className={styles.lead}>{event.summary}</p>
        </div>
      </section>

      <Section align="left">
        <div className={styles.layout}>
          <div className={styles.details}>
            <ul className={styles.facts}>
              <li>
                <CalendarDays aria-hidden="true" />
                <span>
                  <small>Date</small>
                  {formatDateRange(event.date, event.endDate)}
                </span>
              </li>
              <li>
                <Clock aria-hidden="true" />
                <span>
                  <small>Time</small>
                  {event.time}
                </span>
              </li>
              <li>
                <MapPin aria-hidden="true" />
                <span>
                  <small>Location</small>
                  {event.location}
                </span>
              </li>
            </ul>

            <button type="button" className={styles.addCal} onClick={() => downloadIcs(event)}>
              <CalendarPlus size={18} aria-hidden="true" /> Add to calendar
            </button>

            <div className={styles.description}>
              {event.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <aside className={styles.register} id="register">
            {ended ? (
              <p className={styles.closed}>This event has ended.</p>
            ) : canRegister ? (
              <>
                <h2 className={styles.registerTitle}>Register</h2>
                <RegistrationForm event={event} />
              </>
            ) : (
              <>
                <h2 className={styles.registerTitle}>No registration needed</h2>
                <p>Just come along. Everyone is welcome! Questions? <SmartLink to="/contact">Contact us</SmartLink>.</p>
              </>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
