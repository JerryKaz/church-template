import { useState } from "react";
import { HandHeart } from "lucide-react";
import { Button } from "../components/Button";
import { PrayerWall } from "../components/features/PrayerWall";
import { PrayerForm } from "../components/form/PrayerForm";
import { Modal } from "../components/Modal";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { Seo } from "../components/Seo";
import { prayer } from "../content/pages";
import styles from "./PrayerPage.module.css";

export default function PrayerPage() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <Seo title="Prayer" description={prayer.body} />
      <PageHero title={prayer.hero.title} image={prayer.hero.image} />

      <Section title={prayer.title} intro={prayer.body}>
        <div className={`${styles.cta} reveal`}>
          <Button onClick={() => setOpen(true)} icon={<HandHeart />}>
            Submit a Prayer Request
          </Button>
        </div>
      </Section>

      <Section tone="soft" title="Prayer Wall" intro="Join others in prayer and celebrate what God is doing.">
        <PrayerWall refreshKey={refreshKey} />
      </Section>

      <Modal open={open} onClose={() => setOpen(false)} title="Submit a Prayer Request">
        <PrayerForm onSubmitted={() => setRefreshKey((k) => k + 1)} onDone={() => setOpen(false)} />
      </Modal>
    </>
  );
}
