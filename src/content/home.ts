import { photo } from "./media";
import { site } from "./site";

export const home = {
  hero: {
    eyebrow: "Welcome Home",
    titleLine1: "A Place to Belong.",
    titleLine2: "A Family to Grow With.",
    body: "Experience heartfelt worship, practical teaching,\nand real community as we grow together.",
    primaryCta: { label: "Plan a Visit", to: "/visit" },
    secondaryCta: { label: "Watch Online", to: "/watch" },
    backgroundImage: photo("hero-worship", 1920, 1080),
  },

  services: {
    title: "Service Times",
    subtitle: "Worship with us in person or online throughout the week.",
    primaryCta: { label: "Plan a Visit", to: "/visit" },
    secondaryCta: { label: "Get Directions", to: site.contact.mapsUrl },
  },

  mission: {
    statement:
      "Building a vibrant community that loves people well and serves our neighbourhood, our city and beyond with hope, generosity and purpose.",
    backgroundImage: photo("mission-texture", 1920, 600),
  },

  gallery: [1, 2, 3, 4, 5, 6].map((n) => ({
    src: photo(`gallery-${n}`, 600, 600),
    alt: `Placeholder gallery photo ${n}`,
  })),

  nextSteps: {
    title: "Planning a Visit?",
    items: [
      { title: "Sermon Notes", description: "Never miss a key takeaway from Sunday's message. Follow along live or revisit your notes during the week.", cta: "Open Sermon Notes", to: "/notes" },
      { title: "Daily Devotional", description: "Start each day with a short reading and practical reflection to keep you grounded wherever you are.", cta: "Read Today's Devotional", to: "/resources" },
      { title: "Weekly Bulletin", description: "Catch up on church news, upcoming events, ministry updates and ways to get involved.", cta: "Read Bulletin", to: "/resources" },
      { title: "Next Steps", description: "Exploring faith or ready to take a step? We'd love to walk alongside you on the journey.", cta: "Take Your Next Step", to: "/contact?topic=Next%20steps" },
      { title: "Kids Check-in", description: "Check your children in ahead of time so Sunday mornings run smoothly for the whole family.", cta: "Check In Your Child", to: "/ministries/kids" },
      { title: "Small Groups", description: "Find a group that meets near you and build friendships that last beyond Sunday.", cta: "Find a Group", to: "/contact?topic=Small%20groups" },
      { title: "Events", description: "See what's coming up and save the date for gatherings, conferences and outreach.", cta: "View Events", to: "/events" },
      { title: "Give", description: "Partner with us to serve our community. Giving online is simple and secure.", cta: "Give Online", to: "/give" },
      { title: "Prayer Request", description: "Share what's on your heart. Our prayer team would be honoured to pray with you.", cta: "Prayer Request", to: "/prayer" },
    ],
  },
};
