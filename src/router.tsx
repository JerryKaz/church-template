/* oxlint-disable react/only-export-components -- route table: lazy page components are declared here by design */
import { lazy } from "react";
import { createBrowserRouter, isRouteErrorResponse, useRouteError } from "react-router";
import { Layout } from "./layout/Layout";
import NotFoundPage from "./pages/NotFoundPage";

// Each page is its own chunk, so visitors only download the page they open.
const HomePage = lazy(() => import("./pages/home/HomePage"));
const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const BeliefsPage = lazy(() => import("./pages/about/BeliefsPage"));
const StoryPage = lazy(() => import("./pages/about/StoryPage"));
const LifestylePage = lazy(() => import("./pages/about/LifestylePage"));
const VisitPage = lazy(() => import("./pages/visit/VisitPage"));
const WatchPage = lazy(() => import("./pages/watch/WatchPage"));
const SermonsPage = lazy(() => import("./pages/sermons/SermonsPage"));
const SermonPage = lazy(() => import("./pages/sermons/SermonPage"));
const NotesPage = lazy(() => import("./pages/sermons/NotesPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const MinistriesPage = lazy(() => import("./pages/ministries/MinistriesPage"));
const KidsPage = lazy(() => import("./pages/ministries/KidsPage"));
const YouthPage = lazy(() => import("./pages/ministries/YouthPage"));
const FamilyPage = lazy(() => import("./pages/ministries/FamilyPage"));
const EventsPage = lazy(() => import("./pages/events/EventsPage"));
const EventPage = lazy(() => import("./pages/events/EventPage"));
const PrayerPage = lazy(() => import("./pages/PrayerPage"));
const GivePage = lazy(() => import("./pages/GivePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));

function RouteError() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;
  console.error(error);
  return (
    <div className="container" style={{ padding: "6rem 1rem", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p style={{ marginTop: "1rem" }}>Please refresh the page. If it keeps happening, let us know.</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "about/beliefs", element: <BeliefsPage /> },
      { path: "about/story", element: <StoryPage /> },
      { path: "about/lifestyle", element: <LifestylePage /> },
      { path: "visit", element: <VisitPage /> },
      { path: "watch", element: <WatchPage /> },
      { path: "sermons", element: <SermonsPage /> },
      { path: "sermons/:slug", element: <SermonPage /> },
      { path: "notes", element: <NotesPage /> },
      { path: "resources", element: <ResourcesPage /> },
      { path: "ministries", element: <MinistriesPage /> },
      { path: "ministries/kids", element: <KidsPage /> },
      { path: "ministries/youth", element: <YouthPage /> },
      { path: "family", element: <FamilyPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:slug", element: <EventPage /> },
      { path: "prayer", element: <PrayerPage /> },
      { path: "give", element: <GivePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
