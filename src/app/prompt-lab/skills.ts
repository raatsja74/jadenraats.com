/** Skills Lab — copyable prompts and workflows. Plain labels, no sales copy. */

export type Skill = {
  id: string;
  name: string;
  category: string;
  desc: string;
  prompt: string;
  uses: number;
};

export const SKILL_CATEGORIES = [
  "AGENTS",
  "AUTOMATIONS",
  "WORKFLOWS",
  "VAULT",
  "PROMPTS",
  "OPS",
] as const;

export const SKILLS: Skill[] = [
  {
    id: "capture-triage",
    name: "Capture triage",
    category: "WORKFLOWS",
    desc: "Route a raw capture to the right vault, task, or trash in one pass.",
    prompt:
      "Triage this capture: 1) one-line summary, 2) destination (vault / task queue / reference / trash), 3) next physical action if any. If it needs nothing, say so and stop.",
    uses: 214,
  },
  {
    id: "monday-proof-automation",
    name: "Fail-loud automation",
    category: "AUTOMATIONS",
    desc: "Design automations that alert you when they break. Monitoring first.",
    prompt:
      "Before building this automation, specify: what breaks silently, how I find out within 24 hours, and what the manual fallback is. No silent cron.",
    uses: 96,
  },
  {
    id: "lead-followup",
    name: "Lead follow-up sequence",
    category: "OPS",
    desc: "First touch, scheduled nudges, and a clear next step for quiet leads.",
    prompt:
      "Draft a follow-up for a flooring lead gone quiet after the quote. Plain language, one clear ask, specific time window. No hype, no discount begging.",
    uses: 143,
  },
  {
    id: "quote-plain-english",
    name: "Quote in plain English",
    category: "OPS",
    desc: "Turn job notes into a short quote a customer can actually read.",
    prompt:
      "Rewrite these job notes as a customer quote: short sentences, what happens each day, what it costs, what I need from them. Cut every word that doesn't change the decision.",
    uses: 88,
  },
  {
    id: "second-brain-filing",
    name: "Vault filing rules",
    category: "VAULT",
    desc: "One page of filing rules for you and every agent. Same rules everywhere.",
    prompt:
      "File this note per the vault rules: project link, status tag, next action with owner and date. If no rule covers it, propose the rule in one sentence.",
    uses: 178,
  },
  {
    id: "daily-note-roll",
    name: "Daily note roll",
    category: "VAULT",
    desc: "Open today's note with yesterday's open items and today's schedule already on it.",
    prompt:
      "Open today's daily note. Copy forward: unfinished next actions, yesterday's open questions, today's scheduled events. Keep it under one screen.",
    uses: 121,
  },
  {
    id: "agent-instruction-writer",
    name: "Agent instruction writer",
    category: "AGENTS",
    desc: "Write short instructions an agent can follow: rules, not vibes.",
    prompt:
      "Write system instructions for this agent: what it owns, what it never touches, its output format, and one example of a perfect answer. Less than 80 words.",
    uses: 73,
  },
  {
    id: "teardown-writer",
    name: "Teardown writer",
    category: "AGENTS",
    desc: "Turn a broken build into a short write-up: what failed, cost, what changed.",
    prompt:
      "Write a teardown of this project: what I built, the three things that broke, what each one cost in time, and the one change that mattered most. No excuses, no hype.",
    uses: 41,
  },
  {
    id: "ship-checklist",
    name: "Ship checklist",
    category: "AUTOMATIONS",
    desc: "Pre-merge gate: what breaks, what's untested, how to revert.",
    prompt:
      "Review these changes like a release gate: 1) what breaks, 2) what has no test, 3) what violates the design law, 4) how to revert in one command. Block the ship if 1 or 4 is unclear.",
    uses: 67,
  },
  {
    id: "plain-english-rewrite",
    name: "Plain-English rewrite",
    category: "PROMPTS",
    desc: "Cut jargon until only the decision is left.",
    prompt:
      "Rewrite this in plain English: short sentences, concrete nouns, no buzzwords. Keep the facts and the action. Cut every sentence that doesn't change a decision.",
    uses: 155,
  },
  {
    id: "teach-me-the-system",
    name: "Teach me the system",
    category: "PROMPTS",
    desc: "Learn a tool with a short operator brief and one 10-minute task.",
    prompt:
      "Teach me this tool like an operator: what it's actually for, its sharp edges, the one mistake everyone makes, and a 10-minute task to prove it works. Skip the marketing page.",
    uses: 59,
  },
  {
    id: "daily-standup-draft",
    name: "Daily standup draft",
    category: "WORKFLOWS",
    desc: "Three lines: done, blocked, next.",
    prompt:
      "Draft my standup from these notes: one line done, one line blocked, one line next. If nothing changed, say so. No filler.",
    uses: 84,
  },
];

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}
