import { site, type SocialPlatform } from "../../content/site";
import { SocialIcon } from "../SocialIcon";
import styles from "./SocialRow.module.css";

/** Large social buttons, optionally filtered to specific platforms. */
export function SocialRow({ platforms }: { platforms?: SocialPlatform[] }) {
  const items = platforms ? site.socials.filter((s) => platforms.includes(s.platform)) : site.socials;
  return (
    <ul className={`${styles.row} reveal`}>
      {items.map((s) => (
        <li key={s.platform}>
          <a href={s.href} className={styles.link} target="_blank" rel="noopener noreferrer">
            <SocialIcon platform={s.platform} size={22} />
            <span>{s.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
