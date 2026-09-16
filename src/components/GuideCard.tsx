"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import type { Guide, GuideSection } from "@/data/guides";

export const guideNumber = (index: number) => String(index + 1).padStart(2, "0");

/**
 * One guide card. Home renders three across in `compact`; the guides index
 * renders two across in `full`. Previously two copies of the same markup.
 */
export function GuideCard({
  guide,
  index,
  variant = "compact",
}: {
  guide: Guide;
  index: number;
  variant?: "compact" | "full";
}) {
  const full = variant === "full";
  const Heading = full ? "h2" : "h3";

  return (
    <motion.article {...fadeUp}>
      <Link
        href={`/guides/${guide.slug}`}
        className={`group flex h-full flex-col border-2 border-line bg-cream p-6 transition-colors duration-200 hover:border-accent${
          full ? " sm:p-8" : ""
        }`}
      >
        {full ? (
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-xs text-accent">{guideNumber(index)}</span>
            <span className="kicker kicker-faint">
              {guide.tag} · {guide.readMinutes} min
            </span>
          </div>
        ) : (
          <span className="font-mono text-xs text-accent">{guideNumber(index)}</span>
        )}

        {!full ? <span className="kicker kicker-faint mt-6">{guide.tag}</span> : null}

        <Heading
          className={`display leading-tight transition-colors duration-200 group-hover:text-accent ${
            full ? "mt-8 text-3xl sm:text-4xl" : "mt-3 text-2xl"
          }`}
        >
          {guide.title}
        </Heading>

        <p className="mt-4 flex-1 font-mono text-sm leading-relaxed text-soft">{guide.summary}</p>

        <span className={`kicker kicker-accent ${full ? "mt-8" : "mt-6"}`}>
          Read guide <span className="btn-arrow">→</span>
        </span>
      </Link>
    </motion.article>
  );
}

/**
 * A guide body section. The renderer is looked up by section type rather than
 * branched with a chain of `if (section.type === ...)` checks, so adding a new
 * block type is one entry here and nothing else.
 */
const SECTION_RENDERERS: {
  [K in GuideSection["type"]]: (section: Extract<GuideSection, { type: K }>) => ReactNode;
} = {
  p: (section) => (
    <motion.p {...fadeUp} className="font-mono text-sm leading-relaxed text-soft sm:text-base">
      {section.text}
    </motion.p>
  ),
  h2: (section) => (
    <motion.h2 {...fadeUp} className="display pt-2 text-3xl">
      {section.text}
    </motion.h2>
  ),
  ul: (section) => (
    <motion.ul {...fadeUp} className="list-none space-y-3 border-l-2 border-accent pl-6">
      {section.items.map((item) => (
        <li key={item} className="font-mono text-sm leading-relaxed text-soft sm:text-base">
          {item}
        </li>
      ))}
    </motion.ul>
  ),
  callout: (section) => (
    <motion.aside
      {...fadeUp}
      className="border-2 border-line bg-surface px-6 py-6 font-serif text-lg italic leading-relaxed text-ink sm:px-8 sm:py-7"
    >
      {section.text}
    </motion.aside>
  ),
};

export function GuideBody({ sections }: { sections: GuideSection[] }) {
  return (
    <div className="mt-14 space-y-10 border-t-2 border-line pt-12">
      {sections.map((section, index) => (
        <div key={index}>{SECTION_RENDERERS[section.type](section as never)}</div>
      ))}
    </div>
  );
}
