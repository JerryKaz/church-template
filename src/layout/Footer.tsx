import { CreditCard, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Link } from "react-router";
import { site } from "../content/site";
import { SmartLink } from "../components/SmartLink";
import { SocialIcon } from "../components/SocialIcon";
import { revealDelay } from "../utils/reveal";
import styles from "./Footer.module.css";

const YEAR = new Date().getFullYear();

const contactItems: { icon: LucideIcon; label: string; value: string; to: string }[] = [
  { icon: Mail, label: "Email", value: site.contact.email, to: `mailto:${site.contact.email}` },
  { icon: Phone, label: "Call", value: site.contact.phone, to: site.contact.phoneHref },
  { icon: MapPin, label: "Location", value: site.contact.address, to: site.contact.mapsUrl },
  { icon: CreditCard, label: "Give Online", value: "Give online", to: "/give" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.contact}`}>
        {contactItems.map(({ icon: Icon, label, value, to }, i) => (
          <div key={label} className={`${styles.contactItem} reveal`} style={revealDelay(i * 80)}>
            <Icon size={22} aria-hidden="true" className={styles.contactIcon} />
            <h2 className={styles.contactLabel}>{label}:</h2>
            <SmartLink to={to} className={styles.contactValue}>
              {value}
            </SmartLink>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <ul className={styles.socials}>
          {site.socials.map((s) => (
            <li key={s.platform}>
              <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                <SocialIcon platform={s.platform} size={18} />
              </a>
            </li>
          ))}
        </ul>

        <ul className={styles.legal}>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {site.legal.map((l) => (
            <li key={l.label}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <p className={styles.copy}>
          © {YEAR} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
