/**
 * Global, site-wide content: identity, navigation, contact details, giving.
 * Page-specific copy lives in the other files in this folder.
 */

export type SocialPlatform = "facebook" | "instagram" | "x" | "youtube" | "podcast";

export interface NavItem {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
}

export const site = {
  name: "Your Church",
  tagline: "Community Church",
  description: "A place to belong. Worship with us in person or online.",

  nav: [
    { label: "Home", to: "/" },
    {
      label: "About",
      to: "/about",
      children: [
        { label: "Our Beliefs", to: "/about/beliefs" },
        { label: "Our Story", to: "/about/story" },
        { label: "Our Lifestyle", to: "/about/lifestyle" },
      ],
    },
    { label: "Plan a Visit", to: "/visit" },
    {
      label: "Watch",
      to: "/watch",
      children: [
        { label: "Sermons", to: "/sermons" },
        { label: "Sermon Notes", to: "/notes" },
        { label: "Resources", to: "/resources" },
      ],
    },
    {
      label: "Ministries",
      to: "/ministries",
      children: [
        { label: "Kids", to: "/ministries/kids" },
        { label: "Youth", to: "/ministries/youth" },
        { label: "Family", to: "/family" },
      ],
    },
    { label: "Events", to: "/events" },
    { label: "Prayer", to: "/prayer" },
    { label: "Give", to: "/give" },
  ] satisfies NavItem[],

  socials: [
    { platform: "facebook", href: "https://facebook.com/", label: "Facebook" },
    { platform: "instagram", href: "https://instagram.com/", label: "Instagram" },
    { platform: "x", href: "https://x.com/", label: "X" },
    { platform: "youtube", href: "https://youtube.com/", label: "YouTube" },
    { platform: "podcast", href: "https://podcasts.apple.com/", label: "Podcast" },
  ] satisfies { platform: SocialPlatform; href: string; label: string }[],

  contact: {
    email: "hello@yourchurch.org",
    phone: "+1 (555) 010-0000",
    phoneHref: "tel:+15550100000",
    address: "123 Main Street, Your City",
    mapsUrl: "https://maps.google.com/?q=123+Main+Street",
  },

  give: {
    /** Your payment provider's hosted checkout (Paystack, Stripe, Hubtel, ExpressPay…). */
    providerUrl: "https://example.com/give",
    /** Appended as ?amount=&fund= when the provider supports prefilled links. */
    supportsPrefill: false,
    currency: "GHS",
    presetAmounts: [50, 100, 200, 500, 1000],
    funds: ["Tithe", "Offering", "Missions", "Building Project", "Benevolence"],
    otherWays: [
      { title: "Mobile Money", detail: "Dial *000# and choose Your Church • Merchant ID 000000" },
      { title: "Bank Transfer", detail: "Your Bank • Account name: Your Church • Acc. 0000000000" },
      { title: "In Person", detail: "Give during any service at the offering points or the welcome desk." },
    ],
  },

  live: {
    /** YouTube channel ID for live streams (shows the current live broadcast). */
    youtubeChannelId: "",
    /** Fallback: a specific YouTube video ID (e.g. last service) when no channel ID is set. */
    youtubeVideoId: "",
    youtubeChannelUrl: "https://youtube.com/",
  },

  legal: [{ label: "Privacy Policy", to: "/privacy" }],
} as const;

export type Site = typeof site;
