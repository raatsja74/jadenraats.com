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

/** Desktop / map columns — reading order within each stage group. */
export type StageColumn = {
  id: string;
  label: string;
  /** Short kicker shown above the column. */
  kicker: string;
  moduleIds: string[];
};

export const STAGE_COLUMNS: StageColumn[] = [
  {
    id: "capture",
    label: "Capture",
    kicker: "01",
    moduleIds: ["capture"],
  },
  {
    id: "process",
    label: "Process",
    kicker: "02",
    moduleIds: ["process"],
  },
  {
    id: "context",
    label: "Context",
    kicker: "03–04 · 08 · 10",
    moduleIds: ["project-context", "canonical-home", "reference", "key-truths"],
  },
  {
    id: "handoff",
    label: "Handoff · Session · Update",
    kicker: "05–07 · 09",
    moduleIds: ["agent-workflow", "daily-note", "todoist", "archive"],
  },
];

export const HUB = {
  title: "CaptureVault System",
  slogan: "A CLEARER MIND BUILDS A BRIGHTER TOMORROW.",
} as const;

export const MODULES: VaultModule[] = [
  {
    id: "capture",
    num: "01",
    title: "Capture",
    tagline: "Get things out of your head",
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
    title: "Process",
    tagline: "Turn chaos into clarity",
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
    title: "Project context",
    tagline: "A simple template that scales",
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
    title: "Canonical home",
    tagline: "One source of truth",
    stages: ["CONTEXT"],
    items: [
      { label: "GitHub / Drive / designated repo" },
      { label: "Authoritative source of truth" },
    ],
  },
  {
    id: "agent-workflow",
    num: "05",
    title: "Agent workflow",
    tagline: "Human context. Agent leverage. Real progress.",
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
    title: "Daily note",
    tagline: "A daily anchor for momentum",
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
    title: "Todoist",
    tagline: "Turn intent into action",
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
    title: "Reference",
    tagline: "Build a second brain",
    stages: ["CONTEXT"],
    items: [{ label: "Reusable knowledge" }],
  },
  {
    id: "archive",
    num: "09",
    title: "Archive",
    tagline: "Close the loop",
    stages: ["UPDATE"],
    items: [{ label: "Done but worth keeping" }],
  },
  {
    id: "key-truths",
    num: "10",
    title: "Key truths",
    tagline: "Keep these in mind",
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

export function moduleById(id: string): VaultModule | undefined {
  return MODULES.find((m) => m.id === id);
}
