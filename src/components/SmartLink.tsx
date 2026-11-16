import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router";

export interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
}

const isExternal = (to: string) => /^(https?:)?\/\//.test(to);
const isSpecial = (to: string) => /^(mailto:|tel:|#)/.test(to) || /\.(pdf|mp3|docx?)$/i.test(to);

/**
 * One link component for everything: client-side routing for internal paths,
 * a new tab (safely) for external URLs, and a plain anchor for mailto/tel/files.
 */
export function SmartLink({ to, children, ...rest }: SmartLinkProps) {
  if (isExternal(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  if (isSpecial(to)) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}
