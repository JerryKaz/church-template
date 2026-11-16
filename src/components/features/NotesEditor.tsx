import { useEffect, useRef, useState } from "react";
import { Check, Copy, Download, Mail, Trash2 } from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./NotesEditor.module.css";

interface NotesEditorProps {
  /** Notes are saved per key, e.g. the sermon slug or service date. */
  storageKey: string;
  title: string;
  compact?: boolean;
}

/**
 * Personal sermon notes: autosaved to this device, with copy, download (.txt),
 * email-to-self and clear. No account needed.
 */
export function NotesEditor({ storageKey, title, compact }: NotesEditorProps) {
  const [notes, setNotes, clearNotes] = useLocalStorage(`notes:${storageKey}`, "");
  const [draft, setDraft] = useState(notes);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // Debounced autosave so we don't write to storage on every keystroke.
  useEffect(() => {
    if (draft === notes) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setNotes(draft), 600);
    return () => window.clearTimeout(timer.current);
  }, [draft, notes, setNotes]);

  const saved = draft === notes;
  const body = `${title}\n${"=".repeat(title.length)}\n\n${draft}`;
  const empty = draft.trim().length === 0;

  const download = () => {
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-notes.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the user can still download */
    }
  };

  const clear = () => {
    if (!window.confirm("Clear your notes for this message? This can't be undone.")) return;
    clearNotes();
    setDraft("");
  };

  const mailto = `mailto:?subject=${encodeURIComponent(`My notes: ${title}`)}&body=${encodeURIComponent(body)}`;

  return (
    <div className={`${styles.editor} ${compact ? styles.compact : ""}`}>
      <div className={styles.head}>
        <label htmlFor={`notes-${storageKey}`} className={styles.label}>
          Take notes
        </label>
        <span className={styles.status} aria-live="polite">
          {empty ? "Saved on this device" : saved ? "Saved" : "Saving…"}
        </span>
      </div>
      <textarea
        id={`notes-${storageKey}`}
        className={styles.textarea}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Key points, scriptures, questions, things to pray about…"
        rows={compact ? 8 : 14}
      />
      <div className={styles.actions}>
        <button type="button" onClick={copy} disabled={empty} className={styles.action}>
          {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" onClick={download} disabled={empty} className={styles.action}>
          <Download size={16} /> Download
        </button>
        <a href={empty ? undefined : mailto} aria-disabled={empty} className={styles.action}>
          <Mail size={16} /> Email to me
        </a>
        <button type="button" onClick={clear} disabled={empty} className={`${styles.action} ${styles.danger}`}>
          <Trash2 size={16} /> Clear
        </button>
      </div>
    </div>
  );
}
