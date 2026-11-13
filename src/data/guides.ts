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
    "slug": "turn-a-messy-note-into-a-next-step",
    "image": "/images/guides/one-front-door.webp",
    "title": "Turn a messy note into one clear next step",
    "tag": "start here",
    "summary": "Bring a rough note or a list that is stuck in your head. Use one prompt to sort it and choose a small action.",
    "readMinutes": 3,
    "published": "2026-11-11",
    "sections": [
      {
        "type": "p",
        "text": "You do not need an automation or a collection of prompts to start. Use an AI chat you already have and a note you actually want help with. The goal is one clear next action."
      },
      {
        "type": "h2",
        "text": "1. Pick one small mess"
      },
      {
        "type": "p",
        "text": "Use a rough to-do list, a voice-note transcript, or a paragraph about something you keep putting off. Leave out passwords, account details, and anything you do not want to share with that chat service."
      },
      {
        "type": "h2",
        "text": "2. Paste this prompt above your note"
      },
      {
        "type": "callout",
        "text": "Help me turn this note into one useful next step. Briefly separate facts, tasks, and open questions. Keep my meaning and do not invent dates, commitments, or missing details. Pick one action I can finish in ten minutes or less. If you need information to choose it, ask me one question. Keep the answer short. Here is my note: [paste your note]"
      },
      {
        "type": "h2",
        "text": "3. Check what it gave you"
      },
      {
        "type": "ul",
        "items": [
          "Did it keep the meaning of your note? Correct anything it misunderstood.",
          "Did it invent a deadline or assume you agreed to something? Remove it.",
          "Is the next action small and specific? If not, ask: \u201cWhat is the first thing I can actually do?\u201d"
        ]
      },
      {
        "type": "h2",
        "text": "A small example"
      },
      {
        "type": "p",
        "text": "Example note: \u201cNeed to get the bike fixed. Not sure which shop. Keep forgetting to check when they open.\u201d A useful next action could be: \u201cFind the opening hours for one nearby bike shop and save its number.\u201d The AI should not claim the shop is open unless it has checked a current source."
      },
      {
        "type": "h2",
        "text": "4. Do the action"
      },
      {
        "type": "p",
        "text": "Finish that one step, or put it in the task list you already use. You are done when the note has led to an action you understand and can carry out. A longer AI answer is not the goal."
      },
      {
        "type": "h2",
        "text": "Use the same approach at work"
      },
      {
        "type": "p",
        "text": "Once this feels useful, try it on your own meeting notes or a project list you are allowed to share. Keep reviewing the output before making commitments or sending anything to another person."
      }
    ]
  },
  {
    "slug": "noop-whoop-without-subscription",
    "image": "/images/guides/noop-whoop-without-subscription.svg",
    "title": "NOOP: Use your WHOOP without the subscription",
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
  {
    "slug": "my-ai-staff",
    "image": "/images/guides/write-the-rules-down.webp",
    "title": "My AI Staff: The Exact System Behind My One-Man Operation",
    "tag": "systems",
    "summary": "How I run a one-man floor coating company with a small staff of AI agents: one email inbox, a printed morning page, and one agent that keeps the whole picture.",
    "readMinutes": 10,
    "published": "2026-11-13",
    "sections": [
      {
        "type": "p",
        "text": "I run a floor coating company in Phoenix. I don't have an assistant. I have a staff of them, and none are human. This is the full setup: the actual stack, how each piece works, and how to copy it."
      },
      {
        "type": "h2",
        "text": "The principle"
      },
      {
        "type": "p",
        "text": "AI doesn't replace the operator. It multiplies him."
      },
      {
        "type": "p",
        "text": "Everything below survived a real Monday before it earned a place here. I didn't build this in a weekend of enthusiasm. I built it one bottleneck at a time, usually at 6 AM, usually annoyed."
      },
      {
        "type": "p",
        "text": "The test for every piece: does it remove a decision, a handoff of context, or a thing I'd forget? If yes, it stays. If it's clever but needs babysitting, it goes."
      },
      {
        "type": "p",
        "text": "There are four pieces. None of them is exotic. What makes them work is that they connect."
      },
      {
        "type": "h2",
        "text": "The chief of staff"
      },
      {
        "type": "p",
        "text": "One agent sits above the rest. I call it my chief of staff."
      },
      {
        "type": "p",
        "text": "It holds around 287 skills, which are playbooks for everything from inbox triage to travel booking to reviewing a contract. When I give it a job, it doesn't ask me which tool to use. It already knows."
      },
      {
        "type": "p",
        "text": "The skill count isn't the important part. The context flow is."
      },
      {
        "type": "p",
        "text": "My other agents, the ones that run my prompts, sweep my inbox and draft my replies, all keep chat histories. My chief of staff reads those histories directly. I never copy and paste between agents, and I never brief one agent on what another one did."
      },
      {
        "type": "p",
        "text": "This is where most people go wrong. They build five clever agents and become the full-time secretary carrying information between them. That's not help, that's a new job."
      },
      {
        "type": "callout",
        "text": "The rule: agents read each other's work. I only make the decisions."
      },
      {
        "type": "p",
        "text": "If you're starting from zero, start here: one main agent that can read everything your other agents produce, even if that's just two agents and a notes folder."
      },
      {
        "type": "h2",
        "text": "My inbox runs the prompts"
      },
      {
        "type": "p",
        "text": "I have an agent inbox, which is just a plain email address. When I want something done, I email it with a tag in the subject line, and the body is the instruction."
      },
      {
        "type": "p",
        "text": "Every 15 minutes, a runner checks that inbox. If there's a new tagged email, it does what the body says, then archives the email."
      },
      {
        "type": "p",
        "text": "Why email and not an app?"
      },
      {
        "type": "ul",
        "items": [
          "It's everywhere. Every device I own sends email. No new app, no login.",
          "It keeps a record. My Sent folder is a timestamped log of every instruction I've given. When something goes wrong, I can see exactly what I asked for.",
          "I don't have to wait. I send it from a job site at 7 AM, the runner picks it up within 15 minutes, and I'm back to work."
        ]
      },
      {
        "type": "p",
        "text": "The tags matter. Every email my agents create uses one consistent tag, so the runners never pick up each other's mail. Mine is simple: one tag per agent, and each runner only touches its own."
      },
      {
        "type": "callout",
        "text": "Copy this today: one email address, a check every 15 minutes, and one rule. The subject tag says which job, and the body is the instruction. Everything else is polish."
      },
      {
        "type": "h2",
        "text": "One page before coffee"
      },
      {
        "type": "p",
        "text": "Every morning I get one printed page. It puts itself together overnight from four places:"
      },
      {
        "type": "ul",
        "items": [
          "Todoist: what's due, what's overdue, what got added yesterday",
          "Calendar: today's commitments, with times",
          "Inbox: anything that came in overnight and needs me",
          "My agents: what they did while I slept, and what they need from me"
        ]
      },
      {
        "type": "p",
        "text": "Not a dashboard I have to open, and not a notification I'll swipe away. Paper on the counter. I read it while the coffee brews, and by the time I'm dressed I know what the day holds."
      },
      {
        "type": "p",
        "text": "It always has the same layout: top 3 priorities, today's commitments, what's waiting on me, and what the agents are doing. After two weeks I stopped reading every line and started scanning, because I knew where everything was."
      },
      {
        "type": "p",
        "text": "The catch is that the page is only as good as what feeds it. If your task list is a mess, your morning page is a mess. It doesn't fix bad inputs. It just shows them to you every morning until you fix them."
      },
      {
        "type": "h2",
        "text": "Every idea lands in under 10 seconds"
      },
      {
        "type": "p",
        "text": "This is the piece people copy first, because it's the simplest and it pays off right away."
      },
      {
        "type": "p",
        "text": "One email is the whole thing. I send it to my agent inbox with a word at the front:"
      },
      {
        "type": "ul",
        "items": [
          "\"task:\" goes to my Todoist inbox",
          "\"idea:\" or \"note:\" gets added to today's note in my notes",
          "\"reminder:\" with a date goes to Todoist with a due time",
          "\"receipt:\" gets filed and archived"
        ]
      },
      {
        "type": "p",
        "text": "Attachments get saved and linked. Processed emails get labeled and archived, and my Sent folder keeps the record."
      },
      {
        "type": "p",
        "text": "It works because there's exactly one way to capture, so there's nothing to decide. Every time I tried a fancier app with inboxes, tags and projects, ideas died at \"I'll file this properly later.\" One email address, four words, no decisions."
      },
      {
        "type": "callout",
        "text": "The 10-second rule: if capturing takes longer than 10 seconds, you'll stop doing it when you're busy, which is exactly when the ideas matter. Time yourself. If it's over 10 seconds, make it simpler."
      },
      {
        "type": "h2",
        "text": "How the pieces connect"
      },
      {
        "type": "p",
        "text": "Each piece is fine on its own. Together they make a loop:"
      },
      {
        "type": "ul",
        "items": [
          "Capture feeds my task list and notes all day, from anywhere.",
          "The runners do the routine work those captures create, every 15 minutes.",
          "The morning page shows me what the loop produced and what needs my judgment.",
          "The chief of staff holds the whole picture, so when I ask it something at 2 PM, it already knows what the runners did at 9 and what I captured at lunch."
        ]
      },
      {
        "type": "p",
        "text": "No single piece is the system. When I look at a new tool now, I don't ask if it's clever. I ask what it connects to and what it takes off my plate."
      },
      {
        "type": "h2",
        "text": "Start small"
      },
      {
        "type": "p",
        "text": "You don't need 287 skills. Here's the starter version, in order:"
      },
      {
        "type": "ul",
        "items": [
          "Capture first. One email address and three words: \"task:\", \"note:\", \"reminder:\". Use it for a week. If you won't capture, nothing after this matters.",
          "One runner. A check every 15 minutes that sends those emails to your task list and notes. A simple script counts.",
          "A morning page. Something that pulls your tasks, calendar and yesterday's notes into one page. Read it before your phone.",
          "One main agent that can read all of the above. This comes last, because it needs the other three to be worth reading."
        ]
      },
      {
        "type": "p",
        "text": "Build them in that order. Each one pays for itself before you build the next."
      },
      {
        "type": "p",
        "text": "I'm writing all of this down as I go: what works, what breaks, and the 6 AM rebuilds."
      }
    ]
  }
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
