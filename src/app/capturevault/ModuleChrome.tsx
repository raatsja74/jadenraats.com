"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FLOW_STAGES,
  HUB,
  type FlowStage,
  type VaultModule,
} from "./modules";

export const EASE = [0.22, 1, 0.36, 1] as const;

export { FLOW_STAGES, HUB };
export type { FlowStage, VaultModule };

export function stageMatches(mod: VaultModule, stage: FlowStage | null): boolean {
  if (!stage) return true;
  return mod.stages.includes(stage);
}

export function ModuleCard({
  mod,
  active,
  dimmed,
  expanded,
  onToggle,
  panelId,
}: {
  mod: VaultModule;
  active: boolean;
  dimmed: boolean;
  expanded: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  return (
    <article
      className={`border-2 border-ink bg-cream transition-[opacity,border-color,background-color] duration-200 ${
        active ? "border-accent bg-accent/10" : ""
      } ${dimmed ? "opacity-35" : "opacity-100"}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="flex w-full flex-col gap-2 p-4 text-left sm:p-5"
      >
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-xs text-accent">{mod.num}</span>
          <span className="kicker kicker-faint" aria-hidden="true">
            {expanded ? "CLOSE ✕" : "OPEN →"}
          </span>
        </div>
        <h2 className="display text-2xl leading-none sm:text-3xl">{mod.title}</h2>
        <p className="kicker kicker-accent max-w-[28ch]">{mod.tagline}</p>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${mod.title} details`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t-2 border-ink"
          >
            <ModuleDetail mod={mod} />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function ModuleDetail({ mod }: { mod: VaultModule }) {
  return (
    <div className="space-y-4 bg-surface/40 p-4 sm:p-5">
      {mod.chain && mod.chain.length > 0 && (
        <ol className="flex flex-wrap items-center gap-2" aria-label="Workflow chain">
          {mod.chain.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="border border-ink bg-cream px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wide">
                {step}
              </span>
              {i < mod.chain!.length - 1 && (
                <span className="text-accent" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      )}

      {mod.items.length > 0 && (
        <ul className="space-y-2">
          {mod.items.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-2 text-sm leading-relaxed text-soft"
            >
              <span
                className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 ${
                  item.note === "guardrail" ? "bg-accent" : "bg-ink"
                }`}
                aria-hidden="true"
              />
              <span>
                {item.label}
                {item.note === "guardrail" && (
                  <span className="kicker kicker-accent ml-2">guardrail</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      {mod.bracketNote && (
        <p className="border-l-2 border-accent pl-3 font-mono text-xs uppercase tracking-[0.08em] text-soft">
          {mod.bracketNote}
        </p>
      )}

      {mod.principles && mod.principles.length > 0 && (
        <ol className="space-y-2">
          {mod.principles.map((p, i) => (
            <li key={p} className="flex items-start gap-3 text-sm text-soft">
              <span className="display shrink-0 bg-accent px-2 py-0.5 text-sm text-ink">
                {i + 1}
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export function HubNode({
  filtered,
  onClear,
}: {
  filtered: boolean;
  onClear: () => void;
}) {
  return (
    <div className="relative border-2 border-ink bg-accent p-5 text-center sm:p-7">
      <p className="kicker text-ink/70">hub</p>
      <h2 className="display mt-2 text-3xl leading-none text-ink sm:text-4xl lg:text-5xl">
        {HUB.title}
      </h2>
      <p className="mt-4 border-2 border-ink bg-ink px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-accent sm:text-xs">
        {HUB.slogan}
      </p>
      {filtered && (
        <button
          type="button"
          onClick={onClear}
          className="chip chip-idle mt-4 w-full sm:w-auto"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}
