"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Nav from "@/components/Nav";
import { GUIDES } from "@/data/guides";
import { SKILLS, SKILL_CATEGORIES } from "@/app/prompt-lab/skills";

const TOPICS = [...new Set(GUIDES.map((guide) => guide.tag))];

export default function SystemsPage() {
  const [topic, setTopic] = useState("all");
  const [guideQuery, setGuideQuery] = useState("");
  const [skillQuery, setSkillQuery] = useState("");
  const [category, setCategory] = useState("all");

  const guides = useMemo(() => {
    const query = guideQuery.trim().toLowerCase();
    return GUIDES.filter((guide) => {
      const matchesTopic = topic === "all" || guide.tag === topic;
      const matchesQuery =
        !query || `${guide.title} ${guide.summary} ${guide.tag}`.toLowerCase().includes(query);
      return matchesTopic && matchesQuery;
    });
  }, [topic, guideQuery]);

  const skills = useMemo(() => {
    const query = skillQuery.trim().toLowerCase();
    return SKILLS.filter((skill) => {
      const matchesCategory = category === "all" || skill.category === category;
      const matchesQuery =
        !query || `${skill.name} ${skill.desc} ${skill.category}`.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [category, skillQuery]);

  return (
    <>
      <Nav />
      <main id="main" className="min-h-screen bg-cream text-ink">
        <section id="top" className="scroll-mt-24 border-b-2 border-line px-6 pb-16 pt-32 sm:px-10 sm:pb-24 sm:pt-40 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="kicker kicker-accent">Personal systems / built in the open</p>
              <h1 className="display mt-8 max-w-5xl text-6xl leading-[0.88] sm:text-8xl lg:text-[7vw]">
                Systems for thinking, working &amp; shipping.
              </h1>
              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
                I build practical workflows that connect people, AI tools, and knowledge. This is where I document what survives real use.
              </p>
            </div>
            <a href="#guides" className="btn btn-primary w-fit">Explore the guides <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section id="guides" className="scroll-mt-24 border-b-2 border-line px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="kicker kicker-accent">01 / Field guides</p>
              <h2 className="display mt-5 text-5xl sm:text-7xl">Guides, not content.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
                Working notes refined into useful systems. Filter by topic or search the published guides.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-2" aria-label="Filter guides by topic">
              {["all", ...TOPICS].map((item) => (
                <button key={item} type="button" aria-pressed={topic === item} onClick={() => setTopic(item)} className={`border-2 border-line px-4 py-2 font-mono text-xs uppercase transition-colors ${topic === item ? "bg-ink text-cream" : "hover:bg-ink hover:text-cream"}`}>
                  {item === "all" ? "All topics" : item}
                </button>
              ))}
              <label className="sr-only" htmlFor="guide-search">Search guides</label>
              <input id="guide-search" type="search" value={guideQuery} onChange={(event) => setGuideQuery(event.target.value)} placeholder="Search guides" className="min-h-11 min-w-48 flex-1 border-2 border-line bg-cream px-4 font-mono text-sm placeholder:text-soft focus:outline focus:outline-2 focus:outline-accent" />
            </div>

            {guides.length ? (
              <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide, index) => (
                  <li key={guide.slug}>
                    <Link href={`/guides/${guide.slug}`} className="group flex h-full min-h-64 flex-col justify-between border-2 border-line p-6 transition-colors hover:border-accent">
                      <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase">
                        <span>G–{String(index + 1).padStart(3, "0")}</span><span className="text-soft">{guide.tag} / {guide.readMinutes} min</span>
                      </div>
                      <div className="mt-10">
                        <h3 className="display-sentence text-2xl sm:text-3xl">{guide.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-soft">{guide.summary}</p>
                      </div>
                      <span className="kicker kicker-accent mt-8">Open guide <span aria-hidden="true">↗</span></span>
                    </Link>
                  </li>
                ))}
              </ol>
            ) : <p className="mt-8 border-2 border-line p-6 font-mono text-sm">No guides match that search.</p>}
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="kicker kicker-accent">02 / Skill cabinet</p>
                <h2 className="display mt-5 text-5xl sm:text-7xl">The working database.</h2>
              </div>
              <Link href="/prompt-lab" className="kicker kicker-accent">Open skills library <span aria-hidden="true">→</span></Link>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
              Skills and prompts collected across the tools I use. Search the published inventory or narrow it by category.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor="skill-search">Search skills and prompts</label>
              <input id="skill-search" type="search" value={skillQuery} onChange={(event) => setSkillQuery(event.target.value)} placeholder="Search skills and prompts" className="min-h-12 border-2 border-line bg-cream px-4 font-mono text-sm placeholder:text-soft focus:outline focus:outline-2 focus:outline-accent" />
              <label className="sr-only" htmlFor="skill-category">Filter skills by category</label>
              <select id="skill-category" value={category} onChange={(event) => setCategory(event.target.value)} className="min-h-12 border-2 border-line bg-cream px-4 font-mono text-xs uppercase focus:outline focus:outline-2 focus:outline-accent">
                <option value="all">All categories</option>
                {SKILL_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <p className="mt-5 font-mono text-xs uppercase text-soft" aria-live="polite">{skills.length} results / {SKILLS.length} total</p>
            <ul className="mt-3 border-2 border-line">
              {skills.map((skill) => (
                <li key={skill.id} className="border-b-2 border-line last:border-0">
                  <Link href={`/prompt-lab?q=${encodeURIComponent(skill.name)}`} className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 transition-colors hover:bg-ink hover:text-cream sm:px-6">
                    <span className="display-sentence text-xl">{skill.name}</span>
                    <span className="max-w-xl flex-1 font-mono text-xs leading-relaxed text-soft group-hover:text-cream/75">{skill.desc}</span>
                    <span className="kicker kicker-accent shrink-0 group-hover:text-cream">{skill.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {skills.length === 0 && <p className="border-x-2 border-b-2 border-line p-6 font-mono text-sm">No skills match that search.</p>}
          </div>
        </section>
      </main>
    </>
  );
}
