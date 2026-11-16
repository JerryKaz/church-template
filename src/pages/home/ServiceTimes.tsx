import { ArrowRight } from "lucide-react";
import { home } from "../../content/home";
import { Button } from "../../components/Button";
import { ServiceTimesGrid } from "../../components/blocks/ServiceTimesGrid";
import styles from "./ServiceTimes.module.css";

export function ServiceTimes() {
  const { services } = home;
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <div className="container">
        <header className={`${styles.header} reveal`}>
          <h2 id="services-title" className={styles.title}>
            {services.title}
          </h2>
          <p className={styles.subtitle}>{services.subtitle}</p>
        </header>

        <div className={styles.grid}>
          <ServiceTimesGrid />
        </div>

        <div className={`${styles.ctas} reveal`}>
          <Button variant="soft" to={services.primaryCta.to}>
            {services.primaryCta.label}
          </Button>
          <Button variant="primary" to={services.secondaryCta.to} icon={<ArrowRight />}>
            {services.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
