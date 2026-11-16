import { useState } from "react";
import { Play } from "lucide-react";
import styles from "./VideoEmbed.module.css";

interface VideoEmbedProps {
  /** A specific YouTube video. */
  youtubeId?: string;
  /** A YouTube channel: embeds whatever that channel is currently streaming live. */
  channelId?: string;
  title: string;
  /** Load the player immediately instead of waiting for a click. */
  autoLoad?: boolean;
}

/**
 * Click-to-load YouTube embed: shows a lightweight poster first and only loads
 * the heavy iframe when the visitor presses play. With no ID it renders a placeholder.
 */
export function VideoEmbed({ youtubeId, channelId, title, autoLoad = false }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(autoLoad);
  const src = channelId
    ? `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channelId)}&autoplay=1`
    : youtubeId
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0`
      : null;

  if (src && playing) {
    return (
      <div className={styles.frame}>
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const thumb = youtubeId && !channelId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : undefined;

  return (
    <button
      type="button"
      className={`${styles.frame} ${styles.poster}`}
      style={thumb ? { backgroundImage: `url(${thumb})` } : undefined}
      onClick={() => src && setPlaying(true)}
      aria-label={src ? `Play video: ${title}` : "Video placeholder"}
      disabled={!src}
    >
      {!src && (
        <span className={styles.placeholderText}>
          <strong>Your latest service</strong>
          <span>
            Set <code>live.youtubeChannelId</code> or <code>live.youtubeVideoId</code> in content/site.ts
          </span>
        </span>
      )}
      {channelId && (
        <span className={styles.placeholderText}>
          <strong>Watch live</strong>
          <span>Press play to join the stream</span>
        </span>
      )}
      <span className={styles.play} aria-hidden="true">
        <Play size={26} fill="currentColor" />
      </span>
    </button>
  );
}
