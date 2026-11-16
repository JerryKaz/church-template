/**
 * Sermon library. In production this usually comes from a podcast RSS feed,
 * a CMS or your API: keep the same shape and swap the source.
 */
export interface Sermon {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  speaker: string;
  series: string;
  scripture?: string;
  summary: string;
  audioUrl: string;
  durationSeconds?: number;
  youtubeId?: string;
  notesUrl?: string;
}

const SAMPLE_AUDIO = "/audio/sample-sermon.mp3";

export const sermons: Sermon[] = [
  {
    slug: "the-power-of-hope",
    title: "The Power of Hope",
    date: "2026-11-08",
    speaker: "Pastor Jane Doe",
    series: "Anchored",
    scripture: "Romans 15:13",
    summary: "Hope isn't wishful thinking. It's a confident expectation rooted in who God is. Discover how hope anchors us when life feels uncertain.",
    audioUrl: SAMPLE_AUDIO,
  },
  {
    slug: "rooted-in-love",
    title: "Rooted in Love",
    date: "2026-11-01",
    speaker: "Pastor John Smith",
    series: "Anchored",
    scripture: "Ephesians 3:17-19",
    summary: "What would change if you truly understood how wide and deep God's love is for you?",
    audioUrl: SAMPLE_AUDIO,
  },
  {
    slug: "faith-that-works",
    title: "Faith That Works",
    date: "2026-10-25",
    speaker: "Pastor Jane Doe",
    series: "Practical Faith",
    scripture: "James 2:14-26",
    summary: "Real faith shows up on Monday morning. A practical look at living out what we believe.",
    audioUrl: SAMPLE_AUDIO,
  },
  {
    slug: "words-that-heal",
    title: "Words That Heal",
    date: "2026-10-18",
    speaker: "Guest Speaker",
    series: "Practical Faith",
    scripture: "James 3:1-12",
    summary: "Our words can build up or tear down. Learning to speak life at home, at work and online.",
    audioUrl: SAMPLE_AUDIO,
  },
  {
    slug: "pressure-to-please",
    title: "The Pressure to Please",
    date: "2026-10-11",
    speaker: "Pastor John Smith",
    series: "Free Indeed",
    scripture: "Galatians 1:10",
    summary: "Breaking free from the exhausting need for approval and finding security in God's acceptance.",
    audioUrl: SAMPLE_AUDIO,
  },
  {
    slug: "rest-for-the-weary",
    title: "Rest for the Weary",
    date: "2026-10-04",
    speaker: "Pastor Jane Doe",
    series: "Free Indeed",
    scripture: "Matthew 11:28-30",
    summary: "Jesus invites the tired and burdened to find real rest. What it looks like to accept that invitation.",
    audioUrl: SAMPLE_AUDIO,
  },
];

export const sermonsSorted = [...sermons].sort((a, b) => b.date.localeCompare(a.date));
export const findSermon = (slug: string) => sermons.find((s) => s.slug === slug);
