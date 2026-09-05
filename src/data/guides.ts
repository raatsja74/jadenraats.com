export type GuideSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type Guide = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  readMinutes: number;
  published: string;
  sections: GuideSection[];
};

/** First AI playbooks for business owners. Every claim has to survive a real Monday. */
export const GUIDES: Guide[] = [
  {
    slug: "write-the-rules-down",
    title: "Write the rules down before you automate more",
    tag: "systems",
    summary:
      "The biggest unlock in my AI assistant wasn't a new model. It was a one-page filing guide both I and the agents could read.",
    readMinutes: 6,
    published: "2026-09-05",
    sections: [
      {
        type: "p",
        text: "I spent six weeks building a multi-agent assistant that pulled nine apps into one place. Then it broke for two weeks and I didn't notice. When I came back, I didn't rewrite the code. I wrote the filing rules on a single page.",
      },
      {
        type: "p",
        text: "Same models. Same stack. Usage roughly doubled. The useful lesson wasn't technical.",
      },
      {
        type: "h2",
        text: "The failure mode nobody demos",
      },
      {
        type: "p",
        text: "Most AI write-ups stop at \"it works.\" Mine failed quietly. An expired token. Two automations pointed at a folder I'd deleted. Nothing crashed — it just stopped being useful, and I stopped opening it without deciding to.",
      },
      {
        type: "callout",
        text: "Silent failure is worse than loud failure. If the system needs you to notice it's broken, it will eventually fail without you.",
      },
      {
        type: "h2",
        text: "What \"the rules\" actually are",
      },
      {
        type: "p",
        text: "Not a second brain manifesto. A short list of where things go, in language a tired human and a literal agent can both follow.",
      },
      {
        type: "ul",
        items: [
          "What lands in tasks vs notes vs reference files",
          "Which chat / inbox means \"file this\" vs \"answer me now\"",
          "What never gets auto-filed (money, people, irreversible sends)",
          "What \"done\" looks like so you can audit it later",
        ],
      },
      {
        type: "h2",
        text: "How to write yours in an afternoon",
      },
      {
        type: "ul",
        items: [
          "List the last 20 things you captured across apps. Group them into 4–6 buckets max.",
          "Name one home for each bucket. If two homes feel right, pick the worse one on purpose — ambiguity is the bug.",
          "Write the routing rule as a sentence: \"If it's a next action with a date, it goes to Todoist. Everything else that isn't a file goes to Obsidian inbox.\"",
          "Put that page somewhere both you and your agents read on every run. If it's only in your head, you don't have a system.",
        ],
      },
      {
        type: "h2",
        text: "What to measure instead of vanity",
      },
      {
        type: "p",
        text: "I tracked cost and message counts because they were free. I should have tracked whether I could find what I'd saved. That's the only number that justified the project.",
      },
      {
        type: "p",
        text: "If you build something this week, make the rules page first. Automate second.",
      },
    ],
  },
  {
    slug: "one-front-door",
    title: "One front door: stop making AI guess your intent",
    tag: "capture",
    summary:
      "I stopped asking models to classify my mess. Which chat I open is the classification. The agent just files.",
    readMinutes: 5,
    published: "2026-09-05",
    sections: [
      {
        type: "p",
        text: "I was capturing work in eight places and finding it in none of them. Links in one app, ideas in another, tasks somewhere else — plus five agents that couldn't see each other's work.",
      },
      {
        type: "p",
        text: "The problem was never lost data. It was that I couldn't get anything back out.",
      },
      {
        type: "h2",
        text: "Destination is the decision",
      },
      {
        type: "p",
        text: "The fix was one front door. Everything goes to a chat app. Which chat you send it to decides where it ends up. No model guessing whether this message is a task, a note, or a file.",
      },
      {
        type: "callout",
        text: "You already made the decision when you picked the chat. Don't pay a model to re-decide it badly.",
      },
      {
        type: "h2",
        text: "A pattern that survives real ops",
      },
      {
        type: "ul",
        items: [
          "One chat = inbox / capture only",
          "One chat = tasks that need a date or owner",
          "One chat = reference that should be searchable later",
          "One chat = \"talk to me\" — answers, not filing",
        ],
      },
      {
        type: "p",
        text: "Under the hood mine routed Telegram, Slack, iMessage, CLI, and cron into a gateway, then into one sqlite store with full-text search, then out to Obsidian, Todoist, and Drive. The topology can change. The rule shouldn't: destination decides home.",
      },
      {
        type: "h2",
        text: "Start smaller than Hermes",
      },
      {
        type: "p",
        text: "You don't need nine apps. Pick two capture surfaces you already use and one filing home. Make the routing boring. If the agent has to be clever about intent, your front door is wrong.",
      },
    ],
  },
  {
    slug: "follow-up-that-survives-monday",
    title: "Follow-up that survives a Monday on a job site",
    tag: "ops",
    summary:
      "The lead that goes cold is the most expensive thing a service business owns. Here's the filter I use before any AI touches lead response.",
    readMinutes: 7,
    published: "2026-09-05",
    sections: [
      {
        type: "p",
        text: "I run Award Coatings in Phoenix. Leads, quotes, crews, callbacks. If a tool can't survive a real Monday here, it doesn't get shared — and it doesn't get installed.",
      },
      {
        type: "p",
        text: "Lead follow-up is the first place owners want \"AI.\" It's also the first place vague automation embarrasses you in front of a customer.",
      },
      {
        type: "h2",
        text: "The non-negotiables",
      },
      {
        type: "ul",
        items: [
          "Every web form, missed call, and Google message lands in one place — not four inboxes you check after dinner.",
          "A human-sounding first response goes out fast, even if you're on a floor with a sprayer in your hand.",
          "The thread stays searchable. \"What did we already tell them?\" should take seconds.",
          "Nothing irreversible auto-sends without a clear rule. Pricing promises and schedule commits stay gated.",
        ],
      },
      {
        type: "h2",
        text: "Where AI helps vs where it lies",
      },
      {
        type: "p",
        text: "AI is good at drafting the first reply from a short template bank, tagging intent (quote vs spam vs supplier), and reminding you when a lead went quiet. It is bad at inventing availability, inventing square footage, or sounding like you when you haven't given it your voice.",
      },
      {
        type: "callout",
        text: "If you wouldn't send the draft while standing next to the customer, don't automate the send. Automate the draft and the nudge.",
      },
      {
        type: "h2",
        text: "A Monday-proof starter setup",
      },
      {
        type: "ul",
        items: [
          "One intake destination for every lead channel.",
          "Three reply templates: new lead, missing info, \"still interested?\"",
          "A same-day SLA you can keep on your busiest week — not a fantasy five-minute bot if you can't support the handoff.",
          "A weekly 15-minute review of threads the automation touched. Fix the rules, not just the one lead.",
        ],
      },
      {
        type: "p",
        text: "Ship the boring version first. Speed-to-lead that actually runs beats a clever agent that ghosts half your form fills.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
