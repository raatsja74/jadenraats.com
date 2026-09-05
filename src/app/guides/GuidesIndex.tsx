"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { GUIDES } from "@/data/guides";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.75, ease: EASE },
};

export default function GuidesIndex() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main className="grain min-h-screen bg-cream text-ink">
        <section className="relative overflow-hidden px-6 pb-16 pt-40 sm:px-10 sm:pb-20 sm:pt-44 lg:px-16">
          <div className="wash" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl">
            <motion.p
              className="mb-8 font-mono text-sm text-accent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            >
              <span className="ast-host inline-flex items-center gap-1.5">
                guides
                <span className="ast">*</span>
              </span>
            </motion.p>

            <motion.h1
              className="max-w-3xl text-5xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
            >
              Plain-English playbooks that{" "}
              <span className="font-serif italic tracking-[-0.02em]">
                survived a real Monday
              </span>
              .
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-lg leading-relaxed text-soft"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            >
              AI systems for business owners — tested in Award Coatings first.
              If it can&apos;t survive ops, it doesn&apos;t get a page.
            </motion.p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-28 sm:px-10 sm:pb-36 lg:px-16">
          <div className="border-t border-ink/10">
            {GUIDES.map((g, i) => (
              <motion.article
                key={g.slug}
                className="group border-b border-ink/10 py-10 sm:py-12"
                {...fadeUp}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.06 }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="max-w-2xl text-2xl font-medium tracking-tight transition-transform duration-500 ease-soft group-hover:translate-x-2 sm:text-3xl">
                    <Link href={`/guides/${g.slug}`} className="hover:text-ink">
                      {g.title}
                    </Link>
                  </h2>
                  <span className="font-mono text-sm text-faint">
                    {g.tag} · {g.readMinutes} min
                  </span>
                </div>
                <p className="mt-4 max-w-2xl leading-relaxed text-soft">
                  {g.summary}
                </p>
                <Link
                  href={`/guides/${g.slug}`}
                  className="link-underline mt-5 inline-block font-mono text-sm text-accent"
                >
                  read the playbook →
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
