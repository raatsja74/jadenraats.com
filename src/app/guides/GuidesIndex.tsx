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
      <main className="min-h-screen bg-cream text-ink">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-40">
          <div className="border-t-2 border-line pt-10">
            <motion.p
              className="kicker kicker-accent"
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
              className="display mt-6 max-w-4xl text-6xl sm:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
            >
              Plain-English playbooks that{" "}
              <span className="font-serif italic normal-case">
                survived a real Monday
              </span>
              .
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-sm leading-relaxed text-soft"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            >
              AI systems for business owners — tested in Award Coatings first.
              If it can&apos;t survive ops, it doesn&apos;t get a page.
            </motion.p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10 sm:pb-36">
          <div className="grid gap-4 md:grid-cols-2">
            {GUIDES.map((g, i) => (
              <motion.article key={g.slug} {...fadeUp}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex h-full flex-col border-2 border-line bg-cream p-6 transition-colors duration-200 hover:border-accent sm:p-8"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="kicker kicker-faint">
                      {g.tag} · {g.readMinutes} min
                    </span>
                  </div>
                  <h2 className="display mt-8 text-3xl leading-tight transition-colors duration-200 group-hover:text-accent sm:text-4xl">
                    {g.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-soft">
                    {g.summary}
                  </p>
                  <span className="kicker kicker-accent mt-8">
                    Read guide <span className="btn-arrow">→</span>
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.aside
            {...fadeUp}
            className="mt-10 border-2 border-ink bg-cream p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8"
            aria-label="CaptureVault system map"
          >
            <div>
              <p className="kicker kicker-accent">systems map</p>
              <h2 className="display mt-3 text-3xl sm:text-4xl">
                CaptureVault
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-soft">
                How capture becomes context, then agent leverage, then real
                progress — interactive modules you can filter and expand, not a
                static diagram.
              </p>
            </div>
            <Link
              href="/capturevault"
              className="btn btn-primary mt-6 shrink-0 sm:mt-0"
            >
              View system map <span className="btn-arrow">→</span>
            </Link>
          </motion.aside>
        </section>
      </main>
    </MotionConfig>
  );
}
