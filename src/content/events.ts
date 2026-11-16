/**
 * Events. Dates are generated relative to today so the demo always shows
 * upcoming events. Replace with real ISO dates (or load from your API/CMS).
 */
import { inDays, nextWeekday, photo } from "./media";

export type EventCategory = "Worship" | "Conference" | "Youth" | "Kids" | "Community" | "Prayer";

export interface ChurchEvent {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD (start)
  endDate?: string; // YYYY-MM-DD for multi-day events
  /** With endDate: repeats weekly on the start date's weekday instead of every day. */
  weekly?: boolean;
  time: string;
  location: string;
  category: EventCategory;
  summary: string;
  description: string[];
  image: string;
  /** Show the registration form on the event page. */
  registration?: { open: boolean; capacityNote?: string; askTitle?: boolean };
}

export const events: ChurchEvent[] = [
  {
    slug: "leadership-conference",
    title: "Lead Conference",
    date: inDays(12),
    endDate: inDays(14),
    time: "9:00am – 4:00pm daily",
    location: "Main Auditorium",
    category: "Conference",
    summary: "Three days of training and inspiration for pastors, ministry leaders and volunteers.",
    description: [
      "Join leaders from across the region for three days of practical sessions, worship and networking.",
      "Sessions cover team building, preaching, pastoral care, media and more. Lunch is provided each day.",
    ],
    image: photo("event-conference", 1200, 700),
    registration: { open: true, capacityNote: "Limited to 300 delegates", askTitle: true },
  },
  {
    slug: "midweek-bible-series",
    title: "Midweek Bible Series: Healthy Habits",
    date: nextWeekday(3),
    endDate: nextWeekday(3, 1, 3),
    weekly: true,
    time: "Wednesdays • 6:30pm",
    location: "Main Auditorium & Online",
    category: "Worship",
    summary: "A four-week teaching series on the spiritual habits that help faith flourish.",
    description: ["Every Wednesday this month we're exploring prayer, Scripture, rest and generosity as everyday habits."],
    image: photo("event-habits", 1200, 700),
  },
  {
    slug: "youth-night",
    title: "Youth Night Out",
    date: inDays(6),
    time: "6:00pm – 9:00pm",
    location: "Youth Hall",
    category: "Youth",
    summary: "Games, food, worship and a special guest speaker. Bring a friend!",
    description: ["Our biggest youth night of the term. Open to all students aged 12–18."],
    image: photo("event-youth", 1200, 700),
    registration: { open: true },
  },
  {
    slug: "community-outreach",
    title: "Community Outreach Day",
    date: inDays(9),
    time: "8:00am – 1:00pm",
    location: "Meet at the church car park",
    category: "Community",
    summary: "Serve our neighbours with a health screening, food packs and a clean-up.",
    description: ["Volunteers of all ages welcome. Wear comfortable clothes and bring water."],
    image: photo("event-outreach", 1200, 700),
    registration: { open: true, capacityNote: "We'll assign teams on the day" },
  },
  {
    slug: "kids-fun-day",
    title: "Kids Fun Day",
    date: inDays(20),
    time: "10:00am – 2:00pm",
    location: "Church Grounds",
    category: "Kids",
    summary: "Bouncy castles, face painting, crafts and Bible stories for children 3–11.",
    description: ["Free for all children. Parents must stay on site."],
    image: photo("event-kids", 1200, 700),
  },
  {
    slug: "night-of-prayer",
    title: "All-Night Prayer",
    date: inDays(27),
    time: "10:00pm – 4:00am",
    location: "Main Auditorium",
    category: "Prayer",
    summary: "A night of worship and prayer for our families, our city and our nation.",
    description: ["Come for an hour or stay all night. Refreshments available."],
    image: photo("event-prayer", 1200, 700),
  },
];

export const eventCategories: EventCategory[] = ["Worship", "Conference", "Youth", "Kids", "Community", "Prayer"];
export const findEvent = (slug: string) => events.find((e) => e.slug === slug);
