"use client";

import { CONTACT_EMAIL } from "@/data/site";
import { useCopyToClipboard } from "@/lib/clipboard";
import type { Skill } from "@/app/prompt-lab/skills";

/** One entry in the public library: metadata, its prompt, and two actions. */
export function SkillRow({ id, name, category, desc, prompt, uses }: Skill) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <article className="data-row">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="display text-2xl leading-none">{name}</h3>
          <span className="status-tag status-live">{category}</span>
        </div>
        <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-soft">{desc}</p>
        <p className="kicker kicker-faint mt-3">
          {String(uses).padStart(3, "0")} uses · id:{id}
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button type="button" onClick={() => copy(prompt)} className="btn btn-secondary text-xs">
          {copied ? "COPIED ✓" : "COPY PROMPT"}
        </button>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=USE SKILL: ${encodeURIComponent(name)}`}
          className="btn btn-primary text-xs"
        >
          USE SKILL <span className="btn-arrow">→</span>
        </a>
      </div>
    </article>
  );
}
