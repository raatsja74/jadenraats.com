/**
 * Site-wide content and connection points: who Jaden is, where else he lives on
 * the web, and the assistant case-study figures.
 *
 * The nav and the sitemap are two different things on purpose: the nav also
 * points at in-page anchors (`/#guides`, `/#contact`), the sitemap lists pages
 * that actually exist. Both live here so "how the site connects" is one file.
 */

export const SITE_URL = "https://jadenraats.com";
export const CONTACT_EMAIL = "me@jadenraats.com";
export const GITHUB_URL = "https://github.com/raatsja74";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jaden-raats-b6361213a";
export const AWARD_COATINGS_URL = "https://awardcoatings.com";

/** Header navigation, in order. */
export const NAV_LINKS = [
  { label: "about", href: "/about" },
  { label: "guides", href: "/guides" },
  { label: "lab", href: "/prompt-lab" },
  { label: "portfolio", href: "/portfolio" },
  { label: "contact", href: "/#contact" },
] as const;

/** Pages with their own URL, for sitemap.xml. Guide articles are appended from
 *  the GUIDES data so a new guide can never be missing from the sitemap. */
export const SITEMAP_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" },
  { path: "/prompt-lab", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.85, changeFrequency: "weekly" },
];

/**
 * The only place the assistant figures are written down. Home and About show
 * the same four numbers with their own labels — the facts live here so they
 * cannot drift apart.
 */
export const HERMES_FACTS = {
  appsUnified: "9",
  messages: "2,142",
  totalCost: "$14.15",
  daysLive: "55",
} as const;

export const HOME_STATS = [
  { n: HERMES_FACTS.appsUnified, l: "apps unified" },
  { n: HERMES_FACTS.messages, l: "messages" },
  { n: HERMES_FACTS.totalCost, l: "total cost" },
  { n: HERMES_FACTS.daysLive, l: "days live" },
];

export const ABOUT_STATS = [
  { n: HERMES_FACTS.appsUnified, l: "apps unified" },
  { n: HERMES_FACTS.daysLive, l: "days run live" },
  { n: HERMES_FACTS.totalCost, l: "total model cost" },
  { n: HERMES_FACTS.messages, l: "messages handled" },
];

export const HERMES_FLOW = [
  { k: "capture", v: "telegram · slack · imessage · cli · cron" },
  { k: "gateway", v: "always-on process, routes by destination" },
  { k: "state", v: "one sqlite db · full-text search" },
  { k: "homes", v: "obsidian · todoist · drive" },
];

export const HERMES_BROKE = [
  {
    t: "A 14-day outage that never alerted anyone",
    d: "An expired token plus two automations pointing at a folder I'd deleted. Nothing crashed — it just quietly stopped working, and I stopped using it without deciding to. Silent failure is worse than loud failure.",
  },
  {
    t: "The one scheduled job is still broken",
    d: "It refuses to run because a safety check is doing its job, and its error notification can't send. The job meant to keep the system from needing me is the part that needs me. I automated the filing before I automated the monitoring.",
  },
  {
    t: "I measured the wrong things",
    d: "I tracked cost and message counts because they were free to collect. I never tracked whether I could actually find what I'd saved — the only number that would have justified the whole project.",
  },
];

export const MARQUEE = [
  "real systems. real results.",
  "build. operate. automate. share.",
  "practical guides for real-world use",
  "phoenix, az",
  "tested in a real business",
  "plain english",
];

/** Busy / after numbers from the assistant's first 55 days. */
export const HERMES_COMPARISON = [
  { label: "days used", before: "28%", after: "53%" },
  { label: "messages / day", before: "21", after: "87" },
];

/** How AI actually runs the business. `stat` stays null until a real figure
 *  exists — an empty column keeps stat-less rows aligned. Do not estimate. */
export const SYSTEMS: { stat: string | null; title: string; body: string }[] = [
  {
    stat: null,
    title: "Leads get followed up whether or not I'm on a job site",
    body: "Web forms, missed calls and Google messages land in one place and get a response automatically, instead of sitting in somebody's phone until the evening. The lead that goes cold is the most expensive thing a service business owns.",
  },
  {
    stat: null,
    title: "Quotes get built from a price book, not from scratch at 9pm",
    body: "Measurements in, priced estimate out, same format every time. Quoting used to be the task that decided how long my day was.",
  },
  {
    stat: HERMES_FACTS.totalCost,
    title: "The whole back office runs on one assistant, for pocket change",
    body: "I pulled nine apps — messages, notes, tasks, files — behind a single front door, ran it as its only user for 55 days, and spent $14.15 in model costs doing it. Then I published everything that broke.",
  },
];

/** Off-site profiles. Keep in sync with the ProfilePage `sameAs` graph. */
export const ELSEWHERE = [
  { label: "Award Coatings", href: AWARD_COATINGS_URL, meta: "the company" },
  { label: "LinkedIn", href: LINKEDIN_URL, meta: "profile" },
  { label: "GitHub", href: GITHUB_URL, meta: "code" },
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, meta: "email" },
];

export const FOOTER_TYPEWRITER = "phoenix, az — made by me (and the machines)";
