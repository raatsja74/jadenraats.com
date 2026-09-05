"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import type { Guide } from "@/data/guides";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE },
};

export default function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main className="grain min-h-screen bg-cream text-ink">
        <article className="mx-auto max-w-3xl px-6 pb-28 pt-40 sm:px-10 sm:pb-36 sm:pt-44">
          <motion.p
            className="mb-6 font-mono text-sm text-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Link href="/guides" className="hover:text-ink">
              guides
            </Link>
            <span className="text-faint"> / </span>
            <span className="ast-host inline-flex items-center gap-1.5">
              {guide.tag}
              <span className="ast">*</span>
            </span>
          </motion.p>

          <motion.h1
            className="text-4xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            {guide.title}
          </motion.h1>

          <motion.p
            className="mt-6 font-mono text-sm text-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            {guide.readMinutes} min read
          </motion.p>

          <motion.p
            className="mt-8 text-lg leading-relaxed text-soft"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            {guide.summary}
          </motion.p>

          <div className="mt-14 space-y-8 border-t border-ink/10 pt-12">
            {guide.sections.map((section, i) => {
              if (section.type === "h2") {
                return (
                  <motion.h2
                    key={i}
                    {...fadeUp}
                    className="pt-4 text-2xl font-medium tracking-tight sm:text-3xl"
                  >
                    {section.text}
                  </motion.h2>
                );
              }
              if (section.type === "ul") {
                return (
                  <motion.ul
                    key={i}
                    {...fadeUp}
                    className="list-none space-y-3 border-l-2 border-accent/40 pl-5"
                  >
                    {section.items.map((item) => (
                      <li key={item} className="leading-relaxed text-soft">
                        {item}
                      </li>
                    ))}
                  </motion.ul>
                );
              }
              if (section.type === "callout") {
                return (
                  <motion.aside
                    key={i}
                    {...fadeUp}
                    className="border border-ink/10 bg-surface px-5 py-5 font-serif text-lg italic leading-relaxed text-ink sm:px-7 sm:py-6"
                  >
                    {section.text}
                  </motion.aside>
                );
              }
              return (
                <motion.p
                  key={i}
                  {...fadeUp}
                  className="text-lg leading-relaxed text-soft"
                >
                  {section.text}
                </motion.p>
              );
            })}
          </div>

          <motion.div
            {...fadeUp}
            className="mt-16 flex flex-wrap gap-8 border-t border-ink/10 pt-10 font-mono text-sm"
          >
            <Link href="/guides" className="link-underline text-accent">
              ← all guides
            </Link>
            <a href="mailto:me@jadenraats.com" className="link-underline text-soft">
              ask about this →
            </a>
          </motion.div>
        </article>
      </main>
    </MotionConfig>
  );
}
