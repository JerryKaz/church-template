import { ArrowRight } from "lucide-react";
import { Button } from "../components/Button";
import { Seo } from "../components/Seo";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={styles.page}>
      <Seo title="Page not found" />
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>We couldn't find that page</h1>
        <p className={styles.body}>It may have moved, or the link might be out of date.</p>
        <div className={styles.actions}>
          <Button to="/">Go home</Button>
          <Button variant="soft" to="/events" icon={<ArrowRight />}>
            See events
          </Button>
        </div>
      </div>
    </section>
  );
}
