import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Download, Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react";
import { formatDuration } from "../../utils/format";
import styles from "./AudioPlayer.module.css";

const SPEEDS = [1, 1.25, 1.5, 2, 0.75];

interface AudioPlayerProps {
  src: string;
  title: string;
  /** Used to remember where the listener stopped. */
  storageKey?: string;
}

/**
 * Custom audio player: play/pause, ±15s skip, scrubbing, playback speed,
 * mute, download, and "resume where you left off".
 */
export function AudioPlayer({ src, title, storageKey }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const posKey = storageKey ? `audio-pos:${storageKey}` : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration);
      const saved = posKey ? Number(localStorage.getItem(posKey)) : 0;
      if (saved > 5 && saved < audio.duration - 5) audio.currentTime = saved;
    };
    const onTime = () => {
      setCurrent(audio.currentTime);
      if (posKey && Math.floor(audio.currentTime) % 5 === 0) {
        try {
          localStorage.setItem(posKey, String(audio.currentTime));
        } catch {
          /* ignore */
        }
      }
    };
    const onEnded = () => {
      setPlaying(false);
      if (posKey) localStorage.removeItem(posKey);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setError(true);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, [posKey]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => setError(true));
    else audio.pause();
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + seconds), duration || audio.duration);
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  };

  const cycleSpeed = () => {
    const next = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(next);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className={styles.player} role="region" aria-label={`Audio player: ${title}`}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className={styles.controls}>
        <button type="button" className={styles.iconBtn} onClick={() => skip(-15)} aria-label="Back 15 seconds">
          <RotateCcw size={22} />
          <span className={styles.skipLabel}>15</span>
        </button>
        <button type="button" className={styles.play} onClick={toggle} aria-label={playing ? "Pause" : "Play"} disabled={error}>
          {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
        </button>
        <button type="button" className={styles.iconBtn} onClick={() => skip(15)} aria-label="Forward 15 seconds">
          <RotateCw size={22} />
          <span className={styles.skipLabel}>15</span>
        </button>
      </div>

      <div className={styles.timeline}>
        <span className={styles.time}>{formatDuration(current)}</span>
        <input
          type="range"
          className={styles.range}
          min={0}
          max={duration || 0}
          step={1}
          value={current}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
          aria-valuetext={`${formatDuration(current)} of ${formatDuration(duration)}`}
          style={{ "--progress": `${progress}%` } as CSSProperties}
          disabled={!duration}
        />
        <span className={styles.time}>{formatDuration(duration)}</span>
      </div>

      <div className={styles.extras}>
        <button type="button" className={styles.pill} onClick={cycleSpeed} aria-label={`Playback speed ${SPEEDS[speedIndex]}x`}>
          {SPEEDS[speedIndex]}×
        </button>
        <button type="button" className={styles.iconBtn} onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <a className={styles.iconBtn} href={src} download aria-label="Download audio">
          <Download size={20} />
        </a>
      </div>

      {error && <p className={styles.error}>This audio couldn't be loaded. Try downloading it instead.</p>}
    </div>
  );
}
