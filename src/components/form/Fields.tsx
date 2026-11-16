import { useEffect, useRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import styles from "./Fields.module.css";

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  full?: boolean;
}

function FieldShell({ id, label, error, hint, required, children, full }: FieldShellProps) {
  return (
    <div className={`${styles.field} ${full ? styles.full : ""}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type Base = { label: string; error?: string; hint?: string; full?: boolean; id: string };

export function TextField({ label, error, hint, full, ...input }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={input.id} label={label} error={error} hint={hint} required={input.required} full={full}>
      <input className={styles.control} {...input} />
    </FieldShell>
  );
}

export function TextAreaField({ label, error, hint, full = true, ...input }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={input.id} label={label} error={error} hint={hint} required={input.required} full={full}>
      <textarea className={`${styles.control} ${styles.textarea}`} rows={5} {...input} />
    </FieldShell>
  );
}

export function SelectField({
  label,
  error,
  hint,
  full,
  options,
  placeholder = "Select an option",
  ...input
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly { value: string; label: string }[]; placeholder?: string }) {
  return (
    <FieldShell id={input.id} label={label} error={error} hint={hint} required={input.required} full={full}>
      <select className={`${styles.control} ${styles.select}`} {...input}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function CheckboxField({ label, error, ...input }: Omit<Base, "hint" | "full"> & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`${styles.field} ${styles.full}`}>
      <label className={styles.checkbox}>
        <input type="checkbox" {...input} />
        <span>{label}</span>
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

/** Invisible to people, tempting to bots. Server and client reject any value. */
export function Honeypot(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}

export function FormGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className={styles.formError} role="alert">
      <CircleAlert size={20} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

export function FormSuccess({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Move focus to the confirmation so screen readers announce it and keyboard users aren't lost.
  useEffect(() => ref.current?.focus(), []);
  return (
    <div className={styles.success} role="status" tabIndex={-1} ref={ref}>
      <CircleCheck size={40} aria-hidden="true" className={styles.successIcon} />
      <h3 className={styles.successTitle}>{title}</h3>
      {children && <div className={styles.successBody}>{children}</div>}
      {action}
    </div>
  );
}
