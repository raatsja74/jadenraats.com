/** CaptureVault mind-map content — rebuilt from the editorial system map. */

export type FlowStage =
  | "CAPTURE"
  | "PROCESS"
  | "CONTEXT"
  | "HANDOFF"
  | "SESSION"
  | "UPDATE";

export const FLOW_STAGES: FlowStage[] = [
  "CAPTURE",
  "PROCESS",
  "CONTEXT",
  "HANDOFF",
  "SESSION",
  "UPDATE",
];

export type ModuleItem = {
  label: string;
  note?: string;
};

export type VaultModule = {
  id: string;
  num: string;
  title: string;
  tagline: string;
  stages: FlowStage[];
  items: ModuleItem[];
  /** Optional extra blocks (numbered principles, flow chains). */
  principles?: string[];
  chain?: string[];
  bracketNote?: string;
};

export const HUB = {
  title: "CaptureVault System",
  slogan: "A CLEARER MIND BUILDS A BRIGHTER TOMORROW.",
} as const;

export const MODULES: VaultModule[] = [
  {
    id: "capture",
    num: "01",
    title: "CAPTURE",
    tagline: "GET THINGS OUT OF YOUR HEAD",
    stages: ["CAPTURE"],
    items: [
      { label: "Calvin / ChatGPT" },
      { label: "Apple Notes" },
      { label: "00Inbox" },
      { label: "Reminders" },
      { label: "Raw thoughts, ideas, links, screenshots" },
    ],
  },
  {
    id: "process",
    num: "02",
    title: "PROCESS",
    tagline: "TURN CHAOS INTO CLARITY",
    stages: ["PROCESS"],
    items: [
      { label: "Capture folder = temporary working area" },
      { label: "Organize messy thoughts" },
      { label: "Combine related captures" },
      { label: "Decide what matters" },
      { label: "Prepare handoffs" },
    ],
  },
  {
    id: "project-context",
    num: "03",
    title: "PROJECT CONTEXT",
    tagline: "A SIMPLE TEMPLATE THAT SCALES",
    stages: ["CONTEXT"],
    bracketNote: "Where I resume the project.",
    items: [
      { label: "Folder Note" },
      { label: "Current Goal" },
      { label: "Current State" },
      { label: "Decisions" },
      { label: "Key Links / Files" },
      { label: "Next Action" },
      { label: "Agent Handoff" },
    ],
  },
  {
    id: "canonical-home",
    num: "04",
    title: "CANONICAL HOME",
    tagline: "ONE SOURCE OF TRUTH",
    stages: ["CONTEXT"],
    items: [
      { label: "GitHub / Drive / designated repo" },
      { label: "Authoritative source of truth" },
    ],
  },
  {
    id: "agent-workflow",
    num: "05",
    title: "AGENT WORKFLOW",
    tagline: "HUMAN CONTEXT. AGENT LEVERAGE. REAL PROGRESS.",
    stages: ["HANDOFF", "SESSION", "UPDATE"],
    chain: [
      "Project context",
      "Agent Handoff",
      "Agent Session",
      "Session Note",
      "Update project context",
    ],
    principles: [
      "Keep session note for history",
      "Add Daily Note reference",
      "Put real follow-up work in Todoist",
    ],
    items: [],
  },
  {
    id: "daily-note",
    num: "06",
    title: "DAILY NOTE",
    tagline: "A DAILY ANCHOR FOR MOMENTUM",
    stages: ["SESSION", "UPDATE"],
    items: [
      { label: "Daily summary / timeline" },
      { label: "Important activity" },
      { label: "Completed work" },
      { label: "Decisions" },
      { label: "Key captures" },
      { label: "Carry-forward items" },
      { label: "Links to sessions / projects" },
      { label: "Not full transcripts or giant logs", note: "guardrail" },
    ],
  },
  {
    id: "todoist",
    num: "07",
    title: "TODOIST",
    tagline: "TURN INTENT INTO ACTION",
    stages: ["UPDATE"],
    items: [
      { label: "Active commitments" },
      { label: "Next actions" },
      { label: "Deadlines" },
      { label: "Follow-ups" },
    ],
  },
  {
    id: "reference",
    num: "08",
    title: "REFERENCE",
    tagline: "BUILD A SECOND BRAIN",
    stages: ["CONTEXT"],
    items: [{ label: "Reusable knowledge" }],
  },
  {
    id: "archive",
    num: "09",
    title: "ARCHIVE",
    tagline: "CLOSE THE LOOP",
    stages: ["UPDATE"],
    items: [{ label: "Done but worth keeping" }],
  },
  {
    id: "key-truths",
    num: "10",
    title: "KEY TRUTHS",
    tagline: "KEEP THESE IN MIND",
    stages: ["CONTEXT"],
    items: [],
    principles: [
      "Capture = temporary thinking",
      "Project context = where I resume",
      "Canonical home = truth",
      "Session Note = history",
      "Daily Note = timeline",
      "Todoist = action",
      "Bases / Dataview = views, not truth",
    ],
  },
];
