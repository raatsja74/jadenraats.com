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
  image: string;
  readMinutes: number;
  published: string;
  sections: GuideSection[];
  sources?: { label: string; href: string }[];
};

/** First AI playbooks for business owners. Every claim has to survive a real Monday. */
export const GUIDES: Guide[] = [
  {
    "slug": "noop-whoop-without-subscription",
    "image": "/images/guides/noop-whoop-without-subscription.svg",
    "title": "NOOP: Use Your WHOOP Without the Subscription",
    "tag": "tools",
    "summary": "An unofficial, local-first way to use a compatible WHOOP strap without a membership. What it does, how to try it, and where the limits are.",
    "readMinutes": 5,
    "published": "2026-10-24",
    "sources": [
      {
        "label": "NOOP on GitHub",
        "href": "https://github.com/ryanbr/noop"
      },
      {
        "label": "NOOP terms",
        "href": "https://github.com/ryanbr/noop/blob/main/TERMS.md"
      }
    ],
    "sections": [
      {
        "type": "p",
        "text": "If you stop paying for WHOOP, the strap on your wrist doesn't stop working. WHOOP just stops collecting and analyzing your data. An unofficial project called NOOP picks up where they leave off."
      },
      {
        "type": "p",
        "text": "NOOP connects to a compatible WHOOP strap and does the math on your own phone. No WHOOP account. No subscription. The band itself still isn't free, and NOOP's numbers are its own estimates, not WHOOP's scores or medical measurements."
      },
      {
        "type": "h2",
        "text": "What NOOP actually does"
      },
      {
        "type": "p",
        "text": "It talks to the strap directly over Bluetooth, stores readings locally, and calculates sleep, heart-rate variability, recovery, and strain on your device. The project says plainly that it's unofficial and not affiliated with WHOOP. Its calculations approximate published methods. They don't copy WHOOP's proprietary algorithms."
      },
      {
        "type": "p",
        "text": "The X post that got me looking linked to Zhoop, a personal iPhone fork of NOOP that adds weight-loss tracking. Its developer says the Bluetooth connection, storage, and analytics all come from NOOP."
      },
      {
        "type": "h2",
        "text": "How to try it"
      },
      {
        "type": "ul",
        "items": [
          "Check your strap and phone. WHOOP 4.0 is the tested, supported path. WHOOP 5.0 and MG support is limited and still in progress.",
          "Read the official GitHub page first. Setup differs by device, so start at github.com/ryanbr/noop and read the current guide and platform notes.",
          "Install and pair. On iPhone it's a direct-download sideload, not the App Store. Some devices need extra setup.",
          "Import your history if you want it. NOOP can pull in WHOOP data exports and Apple Health history, or you can start fresh.",
          "Treat the results as estimates. Use the trends to reflect, not to diagnose. It's not a substitute for a doctor."
        ]
      },
      {
        "type": "h2",
        "text": "What to know before you switch"
      },
      {
        "type": "p",
        "text": "It's an independent project, so features, compatibility, and setup steps can change. The maintainers call some support, especially WHOOP 5.0 and MG, incomplete. Pairing may also affect the strap's connection to the official WHOOP app, so read the current pairing notes before you commit."
      },
      {
        "type": "p",
        "text": "The numbers won't match WHOOP's, because the algorithms aren't the same. And NOOP's terms limit use to noncommercial purposes."
      },
      {
        "type": "h2",
        "text": "The bigger point"
      },
      {
        "type": "p",
        "text": "You don't need AI to use a WHOOP for free. What's interesting is that one independent developer wrote software that gives people another way into data from hardware they already own. The core tracking runs locally. The optional AI Coach only works if you bring your own API key, so nothing depends on a paid AI service."
      },
      {
        "type": "p",
        "text": "If you already own a compatible strap and want out of the membership, NOOP is worth a look. Check compatibility first, know the scores are estimates, and decide if a simpler, independent app covers what you actually use."
      },
      {
        "type": "callout",
        "text": "This guide describes an unofficial third-party project. It isn't affiliated with or endorsed by WHOOP. Check NOOP's current docs and WHOOP's current terms before you use it."
      }
    ]
  },
  {
    slug: "write-the-rules-down",
    image: "/images/guides/write-the-rules-down.webp",
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
    image: "/images/guides/one-front-door.webp",
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
    image: "/images/guides/follow-up-that-survives-monday.webp",
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
