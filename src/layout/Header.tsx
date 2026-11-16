import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ChevronDown, X } from "lucide-react";
import { site } from "../content/site";
import { SocialIcon } from "../components/SocialIcon";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  // Close the drawer whenever the route changes (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // The drawer is for small screens: close it if the window grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1100px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock scroll, close on Escape, and manage focus while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);
  const linkClass = ({ isActive }: { isActive: boolean }) => `${styles.menuLink} ${isActive ? styles.active : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to="/" className={styles.logoLink} aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <DesktopNav />

        <div className={styles.actions}>
          <ul className={styles.socials}>
            {site.socials.map((s) => (
              <li key={s.platform}>
                <a href={s.href} aria-label={s.label} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                  <SocialIcon platform={s.platform} />
                </a>
              </li>
            ))}
          </ul>

          <Link to="/give" className={styles.give}>
            Give
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className={styles.hamburger}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="site-drawer"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`} onClick={close} aria-hidden="true" />

      <nav
        id="site-drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-label="Mobile"
        aria-hidden={!open}
        inert={!open}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={close} aria-label="Close menu">
          <X size={28} />
        </button>

        <ul className={styles.menu}>
          {site.nav.map((item) => {
            const children = "children" in item ? item.children : undefined;
            const isExpanded = expanded === item.label;
            return (
              <li key={item.label}>
                <div className={styles.menuRow}>
                  <NavLink to={item.to} end={item.to === "/"} className={linkClass} onClick={close}>
                    {item.label}
                  </NavLink>
                  {children && (
                    <button
                      type="button"
                      className={`${styles.expand} ${isExpanded ? styles.expandOpen : ""}`}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label} submenu`}
                      aria-expanded={isExpanded}
                      onClick={() => setExpanded(isExpanded ? null : item.label)}
                    >
                      <ChevronDown size={20} />
                    </button>
                  )}
                </div>
                {children && (
                  <div className={`${styles.submenu} ${isExpanded ? styles.submenuOpen : ""}`} inert={!isExpanded}>
                    <ul className={styles.submenuList}>
                      {children.map((child) => (
                        <li key={child.label}>
                          <NavLink to={child.to} className={({ isActive }) => (isActive ? styles.subActive : "")} onClick={close}>
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <ul className={styles.drawerSocials}>
          {site.socials.map((s) => (
            <li key={s.platform}>
              <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                <SocialIcon platform={s.platform} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
