# Church Website Template — React + TypeScript + Express

A complete, multi-page church website: 21 pages, working forms, a public prayer
wall, live-stream chat, sermon audio, events calendar with registration, and
online giving hand-off. Front end is Vite + React 19 + React Router; the
optional API is Express 5. Validation is shared between both with Zod.

## Quick start

```bash
npm install

# Front end only (no backend; data saved in the browser):
npm run dev                 # http://localhost:5173

# Front end + API:
cp .env.example .env        # VITE_API_URL=/ is already set
npm run dev:all             # web on :5173, API on :3001 (proxied at /api)

# Production (one server hosts the site and the API):
VITE_API_URL=/ npm run build
npm start                   # http://localhost:3001
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run preview`.

## Pages

| Route | Page | Features |
| --- | --- | --- |
| `/` | Home | Hero + video, service times, mission, gallery, next-steps carousel |
| `/about` | About | Values accordion, links to the pages below |
| `/about/beliefs` · `/about/story` · `/about/lifestyle` | About sub-pages | Accordions, timeline |
| `/visit` | Plan a Visit | Visit form, FAQ, what to expect |
| `/watch` | Watch Live | YouTube live embed, live chat, sermon notes, give, prayer modal |
| `/sermons` · `/sermons/:slug` | Sermon library / detail | Search + filters (in URL), audio player, notes, share, prev/next |
| `/notes` | Sermon Notes | Outline + autosaved personal notes (copy, download, email) |
| `/resources` | Resources | Devotional, bulletin downloads |
| `/ministries` · `/ministries/kids` · `/ministries/youth` · `/family` | Ministries | Cards, features, CTAs |
| `/events` · `/events/:slug` | Events / detail | Category filter, month calendar, registration, add-to-calendar (.ics) |
| `/prayer` | Prayer | Request/praise form, public prayer wall with "I prayed" reactions |
| `/give` | Give | Amount + fund picker → your payment provider's checkout |
| `/contact` | Contact | Contact form; `?topic=` deep links preselect the topic |
| `/privacy` | Privacy policy | |
| `*` | 404 | |

## Rebranding

| What | Where |
| --- | --- |
| Name, nav, socials, contact, giving, live-stream IDs | `src/content/site.ts` |
| Home page copy | `src/content/home.ts` |
| Inner page copy | `src/content/pages.ts` |
| Sermons / events / service times | `src/content/sermons.ts`, `events.ts`, `services.ts` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Logo | `src/layout/Logo.tsx` |
| Photos | `src/content/media.ts` (placeholders from picsum.photos) |
| Sample audio / PDFs | `public/audio`, `public/files` |

Demo event dates are generated relative to today so they never look stale;
replace them with real ISO dates.

## How the data layer works

Components only talk to `src/services/api.ts`, which picks an adapter:

- **No `VITE_API_URL`** → `localApi.ts`: validates with the shared schemas and
  stores everything in `localStorage`. Chat syncs across tabs. Good for demos
  and static hosting.
- **`VITE_API_URL` set** → `httpApi.ts` calls the Express API. Use `/` for
  same-origin, or a full URL if the API is hosted separately.

To use Firebase, Supabase, a CMS, etc., write one more adapter that implements
the `Api` interface in `src/services/types.ts`.

## API (`/server`)

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/health` | |
| POST | `/api/visits` | Plan-a-visit form |
| POST | `/api/contact` | Contact form |
| POST | `/api/events/:slug/registrations` | 404 unknown event, 409 if registration closed |
| GET / POST | `/api/prayers` | List is public-safe: never email/phone/private requests |
| POST | `/api/prayers/:id/react` | "I prayed" / "Celebrate" |
| GET / POST | `/api/chat/:room` | History / send |
| GET | `/api/chat/:room/stream` | Server-Sent Events, 25s heartbeat |
| GET | `/api/admin/submissions?type=` | Needs `Authorization: Bearer $ADMIN_TOKEN` |
| GET / PATCH | `/api/admin/prayers[/:id]` | Moderate: `{ "hidden": true }` |

Built in: Zod validation (422 with per-field errors), honeypot spam trap,
per-IP rate limits, 20 KB body limit, security headers, atomic JSON-file
writes, SPA fallback with sensible cache headers.

**Storage:** `server/store.ts` is a JSON file, which is fine for a single
small instance. For multiple instances or larger volume, swap it for
PostgreSQL/MongoDB (only that file changes) and move rate limiting to Redis.

**Notifications:** `server/notify.ts` currently logs. Plug in email (Resend,
Postmark, Nodemailer) or SMS there.

**Payments:** giving redirects to your provider's hosted checkout
(`site.give.providerUrl`) so card data never touches your site. Set
`supportsPrefill: true` if the provider accepts `?amount=&fund=`.

## Deploying

- **One server (simplest):** Render/Railway/Fly/VPS → `npm install && VITE_API_URL=/ npm run build`, start with `npm start`. Mount a persistent disk at `DATA_DIR`.
- **Static only:** Vercel/Netlify with no `VITE_API_URL` (demo mode). Add a SPA rewrite (all paths → `/index.html`).
- **Split:** static front end with `VITE_API_URL=https://api.example.org`, API elsewhere with `CORS_ORIGIN` set to the site's origin.

## Project structure

```
shared/schemas.ts        Zod schemas used by forms AND the API
src/
  content/               all copy and data
  services/              api.ts (picks adapter), localApi.ts, httpApi.ts
  layout/                Header (drawer nav), Footer, Layout
  components/            Button, Section, PageHero, Accordion, Modal, Seo…
    blocks/              FeatureGrid, MediaSplit, CtaBanner, NumberedCards…
    features/            PrayerWall, AudioPlayer, EventCalendar, NotesEditor, ChatPanel, GiveForm
    form/                Field components + Visit/Prayer/Contact/Registration forms
  hooks/                 useForm, useLocalStorage, useReveal
  pages/                 one folder/file per route (each lazy-loaded)
server/                  Express API (index, routes, middleware, store, notify)
```

## Quality notes

- Accessibility: skip link, labelled landmarks, keyboard-friendly drawer,
  accordions, modal (native `<dialog>`) and calendar; focus moves to the first
  invalid field and to success messages; `prefers-reduced-motion` respected.
- Performance: every page is its own chunk; YouTube iframes load on click;
  images lazy-load.
- Tested end to end (Playwright) in both modes: all routes, every form,
  prayer wall, chat across tabs, calendar, registration + .ics, audio player,
  notes persistence, giving, deep links, and no mobile overflow.
