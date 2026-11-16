import { useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "../../components/Button";
import { ChatPanel } from "../../components/features/ChatPanel";
import { NotesEditor } from "../../components/features/NotesEditor";
import { PrayerForm } from "../../components/form/PrayerForm";
import { Modal } from "../../components/Modal";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { Seo } from "../../components/Seo";
import { VideoEmbed } from "../../components/VideoEmbed";
import { watch } from "../../content/pages";
import { sermonsSorted } from "../../content/sermons";
import { site } from "../../content/site";
import styles from "./WatchPage.module.css";

type PanelId = "notes" | "chat" | "give" | "prayer" | "contact";

export default function WatchPage() {
  const [openPanel, setOpenPanel] = useState<PanelId | null>("chat");
  const [prayerOpen, setPrayerOpen] = useState(false);
  const latest = sermonsSorted[0];

  const panels: { id: PanelId; title: string; content: ReactNode }[] = [
    {
      id: "notes",
      title: "Sermon Notes",
      content: <NotesEditor key={latest.slug} storageKey={latest.slug} title={latest.title} compact />,
    },
    { id: "chat", title: "Live Chat", content: <ChatPanel room={watch.room} /> },
    {
      id: "give",
      title: "Give",
      content: (
        <div className={styles.panelBody}>
          <p>Thank you for supporting the ministry. Giving online is quick and secure.</p>
          <Button to="/give" icon={<ArrowRight />}>
            Give Here
          </Button>
        </div>
      ),
    },
    {
      id: "prayer",
      title: "Prayer Request",
      content: (
        <div className={styles.panelBody}>
          <p>Our prayer team would love to pray with you during the service.</p>
          <Button onClick={() => setPrayerOpen(true)}>Submit a Prayer Request</Button>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contact Us",
      content: (
        <div className={styles.panelBody}>
          <p>Watching for the first time, or want to take a next step? We'd love to hear from you.</p>
          <Button variant="soft" to="/contact?topic=Next%20steps">
            Get in Touch
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Seo title="Watch Live" description={watch.body} />
      <PageHero title={watch.hero.title} image={watch.hero.image} />

      <Section title={watch.title} intro={watch.body}>
        <div className={`${styles.links} reveal`}>
          <Button variant="soft" to={site.live.youtubeChannelUrl} icon={<ExternalLink />}>
            Join Us on YouTube
          </Button>
          <Button to="/sermons" icon={<ArrowRight />}>
            Sermon Archives
          </Button>
        </div>

        <div className={styles.stage}>
          <div className={`${styles.video} reveal`}>
            <VideoEmbed youtubeId={site.live.youtubeVideoId} channelId={site.live.youtubeChannelId} title="Live service" />
            <div className={styles.nowPlaying}>
              <p className={styles.label}>This week</p>
              <h3 className={styles.sermonTitle}>{latest.title}</h3>
              <p className={styles.meta}>
                {latest.speaker} • {latest.series}
                {latest.scripture && ` • ${latest.scripture}`}
              </p>
            </div>
          </div>

          <aside className={`${styles.side} reveal`} aria-label="Service tools">
            {panels.map((panel) => {
              const isOpen = openPanel === panel.id;
              return (
                <div key={panel.id} className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
                  <button
                    type="button"
                    className={styles.panelHead}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${panel.id}`}
                    onClick={() => setOpenPanel(isOpen ? null : panel.id)}
                  >
                    {panel.title}
                    <ChevronDown size={20} className={styles.chevron} aria-hidden="true" />
                  </button>
                  <div id={`panel-${panel.id}`} className={styles.panelContent} hidden={!isOpen}>
                    {panel.content}
                  </div>
                </div>
              );
            })}
          </aside>
        </div>
      </Section>

      <Modal open={prayerOpen} onClose={() => setPrayerOpen(false)} title="Submit a Prayer Request">
        <PrayerForm onDone={() => setPrayerOpen(false)} />
      </Modal>
    </>
  );
}
