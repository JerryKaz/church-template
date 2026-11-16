import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import { useReveal } from "../hooks/useReveal";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./Layout.module.css";

export function Layout() {
  useReveal();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Suspense fallback={<div className={styles.loading} aria-label="Loading page" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
