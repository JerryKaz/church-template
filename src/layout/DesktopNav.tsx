import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ChevronDown } from "lucide-react";
import { site, type NavItem } from "../content/site";
import styles from "./DesktopNav.module.css";

const items: NavItem[] = site.nav.filter((item: NavItem) => item.desktop !== false);

/**
 * Inline navigation for wide screens. Dropdowns open on hover, on keyboard
 * focus, or by clicking the chevron (for touch laptops); Esc and outside
 * clicks close them. The mobile drawer in Header.tsx covers small screens.
 */
export function DesktopNav() {
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // Close any open dropdown when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
  }

  // After clicking a dropdown link the link keeps focus, which would hold the menu
  // open via :focus-within. Release focus from the nav once the new page loads.
  useEffect(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && navRef.current?.contains(active)) active.blur();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Return focus to the toggle so keyboard users keep their place.
      navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)?.focus();
      setOpen(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Main">
      <ul className={styles.list}>
        {items.map((item) => {
          const children = item.children;
          // Highlight a parent when you're on any of its pages (e.g. Watch while on /sermons).
          const sectionActive =
            pathname === item.to ||
            (item.to !== "/" && pathname.startsWith(`${item.to}/`)) ||
            !!children?.some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`));

          if (!children) {
            return (
              <li key={item.label} className={styles.item}>
                <NavLink to={item.to} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
                  {item.label}
                </NavLink>
              </li>
            );
          }

          const isOpen = open === item.label;
          const menuId = `desktop-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <li
              key={item.label}
              className={`${styles.item} ${styles.hasMenu} ${isOpen ? styles.open : ""}`}
              onMouseLeave={() => isOpen && setOpen(null)}
            >
              <NavLink to={item.to} className={`${styles.link} ${sectionActive ? styles.active : ""}`} end>
                {item.label}
              </NavLink>
              <button
                type="button"
                className={styles.toggle}
                data-menu={item.label}
                aria-expanded={isOpen}
                aria-controls={menuId}
                aria-label={`${item.label} menu`}
                onClick={() => setOpen(isOpen ? null : item.label)}
              >
                <ChevronDown size={16} aria-hidden="true" />
              </button>
              <ul id={menuId} className={styles.dropdown}>
                {children.map((child) => (
                  <li key={child.label}>
                    <NavLink
                      to={child.to}
                      className={({ isActive }) => `${styles.dropLink} ${isActive ? styles.dropActive : ""}`}
                    >
                      {child.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
