import { home } from "../../content/home";
import styles from "./Mission.module.css";

export function Mission() {
  return (
    <section
     
      className={styles.section}
      style={{ backgroundImage: `url(${home.mission.backgroundImage})` }}
      aria-label="Our mission"
    >
      <div className={styles.overlay} aria-hidden="true" />
      <div className="container">
        <h2 className={`${styles.statement} reveal`}>{home.mission.statement}</h2>
      </div>
    </section>
  );
}
