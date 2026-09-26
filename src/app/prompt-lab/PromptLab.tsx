"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";
import { SKILL_CATEGORIES, SKILLS } from "./skills";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function SkillRow({
  id,
  name,
  category,
  desc,
  prompt,
}: (typeof SKILLS)[number]) {
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
          <h3 className="display-sentence text-xl leading-tight sm:text-2xl">
            {name}
          </h3>
          <span className="status-tag status-live">{category}</span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-soft">{desc}</p>
        <p className="kicker kicker-faint mt-3">id:{id}</p>
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
          href={`mailto:ai@jadenraats.com?subject=USE SKILL: ${encodeURIComponent(name)}`}
          className="btn btn-primary text-xs"
        >
          USE SKILL <span className="btn-arrow">→</span>
        </a>
      </div>
    </article>
  );
}

export default function PromptLab() {
  const params = useSearchParams();
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const [category, setCategory] = useState(() => {
    const cat = params.get("cat");
    return cat && (SKILL_CATEGORIES as readonly string[]).includes(cat)
      ? cat
      : "ALL";
  });

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
    <>
      <Nav />

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
        <section className="border-t-2 border-line pt-10">
          <p className="kicker kicker-accent">skills library</p>
          <h1 className="display mt-6 max-w-4xl text-5xl sm:text-6xl">
            AI Skills Library
          </h1>
        </section>

        <section className="mt-12" aria-label="Search and filter">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <label className="block">
              <span className="kicker kicker-faint">search</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="name or keyword…"
                aria-label="Search the library"
                className="mt-2 w-full border-2 border-ink bg-cream px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-accent"
              />
            </label>

            <div className="flex flex-wrap items-end gap-2">
              <button
                type="button"
                onClick={() => setCategory("ALL")}
                aria-pressed={category === "ALL"}
                className={`chip ${category === "ALL" ? "chip-active" : "chip-idle"}`}
              >
                ALL · {SKILLS.length}
              </button>
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat === category ? "ALL" : cat)}
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
            {category !== "ALL" ? ` in ${category}` : ""}
          </p>
        </section>

        <section className="mt-6 grid gap-4">
          {filtered.map((skill) => (
            <SkillRow key={skill.id} {...skill} />
          ))}
          {filtered.length === 0 && (
            <p className="border-2 border-dashed border-line p-10 text-center text-sm text-faint">
              Nothing matches. Try a wider search or clear the filter.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
