import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Built on the native <dialog> element: focus trapping, Esc-to-close and
 * the inert background come from the browser instead of custom code.
 */
export function Modal({ open, onClose, title, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Click on the backdrop (outside the content box) closes the dialog.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </header>
        {open && children}
      </div>
    </dialog>
  );
}
