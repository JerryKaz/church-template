import { Play } from "lucide-react";
import { home } from "../../content/home";
import { site } from "../../content/site";
import { Button } from "../../components/Button";
import { VideoEmbed } from "../../components/VideoEmbed";
import { revealDelay } from "../../utils/reveal";
import styles from "./Hero.module.css";

export function Hero() {
  const { hero } = home;
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      aria-labelledby="hero-title"
    >
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} reveal`}>{hero.eyebrow}</p>
          <h1 id="hero-title" className={`${styles.title} reveal`} style={revealDelay(80)}>
            <span className={styles.line}>{hero.titleLine1}</span>
            <em className={styles.line}>{hero.titleLine2}</em>
          </h1>
          <p className={`${styles.body} reveal`} style={revealDelay(160)}>
            {hero.body}
          </p>
          <div className={`${styles.ctas} reveal`} style={revealDelay(240)}>
            <Button variant="soft" to={hero.primaryCta.to}>
              {hero.primaryCta.label}
            </Button>
            <Button variant="primary" to={hero.secondaryCta.to} icon={<Play fill="currentColor" />}>
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className={`${styles.media} reveal`} style={revealDelay(200)}>
          <VideoEmbed youtubeId={site.live.youtubeVideoId} channelId={site.live.youtubeChannelId} title="Latest service" />
        </div>
      </div>
    </section>
  );
}
