import type { PublicPrayer } from "../../shared/schemas";

/** Example prayer-wall entries for the local demo adapter and the API's first run. */
export const seedPrayers: PublicPrayer[] = [
  {
    id: "seed-1",
    name: "Anonymous",
    kind: "request",
    message: "Please pray for my family as we go through a season of change. We need wisdom and peace.",
    createdAt: "2026-11-10T09:00:00.000Z",
    count: 4,
  },
  {
    id: "seed-2",
    name: "Sam",
    kind: "praise",
    message: "Thank you all for praying! I got the job I interviewed for last month. God is faithful.",
    createdAt: "2026-11-06T18:30:00.000Z",
    count: 12,
  },
  {
    id: "seed-3",
    name: "Grace",
    kind: "request",
    message: "Praying for strength and healing for my mother who is recovering from surgery.",
    createdAt: "2026-11-02T14:15:00.000Z",
    count: 9,
  },
];
