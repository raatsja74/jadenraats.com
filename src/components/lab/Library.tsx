"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SkillRow } from "./SkillRow";
import { SKILL_CATEGORIES, SKILLS } from "@/app/prompt-lab/skills";
import { fadeUp } from "@/lib/motion";

const ALL = "ALL";

/** Searchable, filterable list of every published skill. */
export function Library() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const skill of SKILLS) map.set(skill.category, (map.get(skill.category) ?? 0) + 1);
    return map;
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return SKILLS.filter((skill) => {
      if (category !== ALL && skill.category !== category) return false;
      if (!needle) return true;
      return [skill.name, skill.desc, skill.category, skill.id].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [query, category]);

  return (
    <>
      <section className="mt-12" aria-label="Search and filter">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="kicker kicker-faint">search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="skills, prompts, workflows…"
              aria-label="Search the library"
              className="mt-2 w-full border-2 border-ink bg-cream px-4 py-3 font-mono text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap items-end gap-2">
            <button
              type="button"
              onClick={() => setCategory(ALL)}
              aria-pressed={category === ALL}
              className={`chip ${category === ALL ? "chip-active" : "chip-idle"}`}
            >
              {ALL} · {SKILLS.length}
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat === category ? ALL : cat)}
                aria-pressed={category === cat}
                className={`chip ${category === cat ? "chip-active" : "chip-idle"}`}
              >
                {cat} · {counts.get(cat) ?? 0}
              </button>
            ))}
          </div>
        </div>

        <p className="kicker kicker-faint mt-6" aria-live="polite">
          {filtered.length} skill{filtered.length === 1 ? "" : "s"}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
          {category !== ALL ? ` in ${category}` : ""}
        </p>
      </section>

      <section className="mt-6 grid gap-4">
        {filtered.map((skill, index) => (
          <motion.div key={skill.id} {...fadeUp} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.03, 0.3) }}>
            <SkillRow {...skill} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="border-2 border-dashed border-line p-10 text-center font-mono text-sm text-faint">
            Nothing matches. Widen the search or drop the category filter.
          </p>
        )}
      </section>
    </>
  );
}
