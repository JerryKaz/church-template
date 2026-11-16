import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SmartLink, type SmartLinkProps } from "./SmartLink";
import styles from "./Button.module.css";

type Variant = "primary" | "soft" | "link" | "outline-light";

interface Common {
  variant?: Variant;
  icon?: ReactNode;
  loading?: boolean;
}

type LinkButtonProps = Common & SmartLinkProps;
type NativeButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };

/** Renders a link when given `to`, otherwise a real <button>. Same styling either way. */
export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", icon, loading, className, children, ...rest } = props;
  const cls = [styles.button, styles[variant], loading && styles.loading, className].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{children}</span>
      {icon && !loading && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {loading && <span className={styles.spinner} aria-hidden="true" />}
    </>
  );

  if ("to" in rest && rest.to !== undefined) {
    return (
      <SmartLink className={cls} {...(rest as SmartLinkProps)}>
        {content}
      </SmartLink>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={cls}
      type={buttonProps.type ?? "button"}
      aria-busy={loading || undefined}
      {...buttonProps}
      disabled={buttonProps.disabled || loading}
    >
      {content}
    </button>
  );
}
