import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import type { ChatMessage } from "../../../shared/schemas";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { api, apiMode } from "../../services/api";
import styles from "./ChatPanel.module.css";

/**
 * Live chat for the stream page. Uses Server-Sent Events with the API,
 * or BroadcastChannel (syncs across tabs on one device) in local demo mode.
 */
export function ChatPanel({ room }: { room: string }) {
  const [name, setName, clearName] = useLocalStorage("chat-name", "");
  const [nameDraft, setNameDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    let active = true;
    api
      .listChat(room)
      .then((m) => active && setMessages(m))
      .catch(() => active && setError("Couldn't load the chat."));
    const unsubscribe = api.subscribeChat(room, (m) =>
      setMessages((prev) => (prev.some((p) => p.id === m.id) ? prev : [...prev, m].slice(-200))),
    );
    return () => {
      active = false;
      unsubscribe();
    };
  }, [room]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const join = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = nameDraft.trim();
    if (trimmed.length < 2) {
      setError("Please enter at least 2 characters.");
      return;
    }
    setError(null);
    setName(trimmed.slice(0, 40));
  };

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    setError(null);
    try {
      const msg = await api.sendChat(room, name, text);
      setMessages((prev) => (prev.some((p) => p.id === msg.id) ? prev : [...prev, msg]));
      setText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Message not sent.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.chat}>
      <ol ref={listRef} className={styles.messages} aria-live="polite" aria-label="Chat messages">
        {messages.length === 0 && <li className={styles.empty}>No messages yet. Say hello!</li>}
        {messages.map((m) => (
          <li key={m.id} className={`${styles.message} ${m.author === name ? styles.mine : ""}`}>
            <span className={styles.author}>{m.author}</span>
            <span className={styles.text}>{m.text}</span>
            <time className={styles.time} dateTime={m.createdAt}>
              {new Date(m.createdAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
            </time>
          </li>
        ))}
      </ol>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {name ? (
        <form className={styles.composer} onSubmit={send}>
          <label htmlFor="chat-input" className="visually-hidden">
            Message
          </label>
          <input
            id="chat-input"
            className={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            placeholder={`Chat as ${name}…`}
            autoComplete="off"
          />
          <button type="submit" className={styles.send} disabled={!text.trim() || sending} aria-label="Send message">
            <Send size={18} />
          </button>
        </form>
      ) : (
        <form className={styles.composer} onSubmit={join}>
          <label htmlFor="chat-name" className="visually-hidden">
            Your name
          </label>
          <input
            id="chat-name"
            className={styles.input}
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            maxLength={40}
            placeholder="Enter your name to join"
            autoComplete="given-name"
          />
          <button type="submit" className={styles.join}>
            Join
          </button>
        </form>
      )}

      <div className={styles.footer}>
        {name && (
          <button type="button" className={styles.link} onClick={clearName}>
            Change name
          </button>
        )}
        {apiMode === "local" && <span>Demo mode: messages sync between tabs on this device.</span>}
      </div>
    </div>
  );
}
