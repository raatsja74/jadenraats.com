"use client";

import { useMemo, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import Nav from "@/components/Nav";
import { SKILL_CATEGORIES, SKILLS } from "./skills";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.7, ease: EASE },
};

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function SkillRow({ id, name, category, desc, prompt, uses }: (typeof SKILLS)[number]) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (await copyText(prompt)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

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
        <button
          type="button"
          onClick={onCopy}
          className="btn btn-secondary text-xs"
        >
          {copied ? "COPIED ✓" : "COPY PROMPT"}
        </button>
        <a
          href={`mailto:me@jadenraats.com?subject=USE SKILL: ${encodeURIComponent(name)}`}
          className="btn btn-primary text-xs"
        >
          USE SKILL <span className="btn-arrow">→</span>
        </a>
      </div>
    </article>
  );
}

export default function PromptLab() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILLS.filter((s) => {
      if (category !== "ALL" && s.category !== category) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of SKILLS) map.set(s.category, (map.get(s.category) ?? 0) + 1);
    return map;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Nav />

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
        <section className="border-t-2 border-line pt-10">
          <motion.p
            className="kicker kicker-accent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <span className="ast-host inline-flex items-center gap-1.5">
              the lab
              <span className="ast">*</span>
            </span>
          </motion.p>

          <motion.h1
            className="display mt-6 max-w-4xl text-6xl sm:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
          >
            Skills &amp; prompt library
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-soft"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          >
            A public database of the AI skills, prompts, workflows, and agent
            instructions that run a real business. Copy any prompt, or hit USE
            SKILL and I&apos;ll set it up with you.
          </motion.p>
        </section>

        <section className="mt-12" aria-label="Search and filter">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <label className="block">
              <span className="kicker kicker-faint">search</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="skills, prompts, workflows…"
                aria-label="Search the library"
                className="mt-2 w-full border-2 border-ink bg-cream px-4 py-3 font-mono text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
              />
            </label>

            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={() => setCategory("ALL")}
                aria-pressed={category === "ALL"}
                className={`btn min-h-[44px] text-xs ${category === "ALL" ? "btn-primary" : "btn-secondary"}`}
              >
                ALL · {SKILLS.length}
              </button>
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat === category ? "ALL" : cat)}
                  aria-pressed={category === cat}
                  className={`btn min-h-[44px] text-xs ${category === cat ? "btn-primary" : "btn-secondary"}`}
                >
                  {cat} · {counts.get(cat) ?? 0}
                </button>
              ))}
            </div>
          </div>

          <p className="kicker kicker-faint mt-6" aria-live="polite">
            {filtered.length} skill{filtered.length === 1 ? "" : "s"}
            {query.trim() ? ` matching “${query.trim()}”` : ""}
            {category !== "ALL" ? ` in ${category}` : ""}
          </p>
        </section>

        <section className="mt-6 grid gap-4">
          {filtered.map((skill, i) => (
            <motion.div key={skill.id} {...fadeUp} transition={{ duration: 0.6, ease: EASE, delay: Math.min(i * 0.03, 0.3) }}>
              <SkillRow {...skill} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p className="border-2 border-dashed border-line p-10 text-center font-mono text-sm text-faint">
              Nothing matches. Widen the search or drop the category filter.
            </p>
          )}
        </section>
      </main>
    </MotionConfig>
  );
}