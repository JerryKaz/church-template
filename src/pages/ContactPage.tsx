import { useSearchParams } from "react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "../components/form/ContactForm";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { Seo } from "../components/Seo";
import { SmartLink } from "../components/SmartLink";
import { contact } from "../content/pages";
import { site } from "../content/site";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [params] = useSearchParams();
  const topic = params.get("topic") ?? "";

  return (
    <>
      <Seo title="Contact" description={contact.body} />
      <PageHero title={contact.hero.title} image={contact.hero.image} />

      <Section align="left">
        <div className={styles.layout}>
          <div className="reveal">
            <h2 className={styles.title}>{contact.title}</h2>
            <p className={styles.body}>{contact.body}</p>
            <ul className={styles.details}>
              <li>
                <Mail aria-hidden="true" />
                <SmartLink to={`mailto:${site.contact.email}`}>{site.contact.email}</SmartLink>
              </li>
              <li>
                <Phone aria-hidden="true" />
                <SmartLink to={site.contact.phoneHref}>{site.contact.phone}</SmartLink>
              </li>
              <li>
                <MapPin aria-hidden="true" />
                <SmartLink to={site.contact.mapsUrl}>{site.contact.address}</SmartLink>
              </li>
            </ul>
          </div>
          <div className={`${styles.card} reveal`}>
            {/* key resets the form if the topic in the URL changes */}
            <ContactForm key={topic} initialTopic={topic} />
          </div>
        </div>
      </Section>
    </>
  );
}
