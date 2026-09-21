/** CaptureVault mind-map — current locked system (2026-09-20). */

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
  principles?: string[];
  chain?: string[];
  bracketNote?: string;
};

export type StageColumn = {
  id: string;
  label: string;
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
    moduleIds: ["project-context", "layer-map", "reference", "key-truths"],
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
  slogan: "CURRENT TRUTH. ACTIVE CONTEXT.",
} as const;

export const MODULES: VaultModule[] = [
  {
    id: "capture",
    num: "01",
    title: "Capture",
    tagline: "Get it out",
    stages: ["CAPTURE"],
    items: [
      { label: "ChatGPT Agents email → Todoist", note: "default" },
      { label: "Gmail = sent-record layer" },
      { label: "Telegram for notes / Hermes", note: "not default" },
      { label: "00Inbox" },
      { label: "Raw thoughts, links, screenshots" },
    ],
  },
  {
    id: "process",
    num: "02",
    title: "Process",
    tagline: "Route once",
    stages: ["PROCESS"],
    items: [
      { label: "Classify: action / context / habit / archive / trash" },
      { label: "Capture folder = temporary working area" },
      { label: "Combine related captures" },
      { label: "No parallel task lists" },
      { label: "Prepare handoffs" },
    ],
  },
  {
    id: "project-context",
    num: "03",
    title: "Project context",
    tagline: "Where I resume",
    stages: ["CONTEXT"],
    bracketNote: "Lives in CaptureVault (current truth).",
    items: [
      { label: "Folder Note" },
      { label: "Current Goal" },
      { label: "Current State" },
      { label: "Decisions" },
      { label: "Key Links / Files" },
      { label: "Next Action pointer" },
      { label: "Agent Handoff" },
    ],
  },
  {
    id: "layer-map",
    num: "04",
    title: "Layer map",
    tagline: "Who is truth",
    stages: ["CONTEXT"],
    items: [
      { label: "CaptureVault = current truth / active context" },
      { label: "MyDriveVault = reference / depth" },
      { label: "GitHub = code + repo docs" },
      { label: "Drive vault mirrors = not live", note: "do not write as SoT" },
    ],
  },
  {
    id: "agent-workflow",
    num: "05",
    title: "Agent workflow",
    tagline: "Context, then leverage",
    stages: ["HANDOFF", "SESSION", "UPDATE"],
    chain: [
      "Project context",
      "Agent Handoff",
      "Agent Session",
      "Session Note",
      "Update project context",
    ],
    principles: [
      "Session note = history (Vault-Write Contract)",
      "Link the Daily Note",
      "Real follow-ups go to Todoist",
      "Hermes reviews pending sessions",
    ],
    items: [],
  },
  {
    id: "daily-note",
    num: "06",
    title: "Daily note",
    tagline: "Timeline hub",
    stages: ["SESSION", "UPDATE"],
    items: [
      { label: "Hermes Main owns (Codex backup)" },
      { label: "Summary / timeline — not dumps" },
      { label: "Completed work" },
      { label: "Decisions" },
      { label: "Carry-forward items" },
      { label: "Links to sessions / projects" },
      { label: "Not full transcripts", note: "guardrail" },
    ],
  },
  {
    id: "todoist",
    num: "07",
    title: "Todoist",
    tagline: "Actions only",
    stages: ["UPDATE"],
    items: [
      { label: "Next actions (short titles)" },
      { label: "Deadlines" },
      { label: "Follow-ups" },
      { label: "Habits in one place only" },
      { label: "Inbox → My Website for site ship" },
    ],
  },
  {
    id: "reference",
    num: "08",
    title: "Reference",
    tagline: "MyDriveVault",
    stages: ["CONTEXT"],
    items: [
      { label: "Reusable knowledge" },
      { label: "Research / depth" },
      { label: "Not a second task list" },
      { label: "Not LLM-Wiki", note: "scrubbed" },
    ],
  },
  {
    id: "archive",
    num: "09",
    title: "Archive",
    tagline: "Close the loop",
    stages: ["UPDATE"],
    items: [
      { label: "Done but worth keeping" },
      { label: "Delete junk first" },
      { label: "No zombie open tasks" },
    ],
  },
  {
    id: "key-truths",
    num: "10",
    title: "Key truths",
    tagline: "Keep these",
    stages: ["CONTEXT"],
    items: [],
    principles: [
      "Capture = temporary",
      "Project context = where I resume",
      "CaptureVault = current truth",
      "MyDriveVault = reference",
      "GitHub = code",
      "Session Note = history",
      "Daily Note = timeline",
      "Todoist = action",
      "Views ≠ truth",
      "Gmail = record layer",
    ],
  },
];

export function moduleById(id: string): VaultModule | undefined {
  return MODULES.find((m) => m.id === id);
}
