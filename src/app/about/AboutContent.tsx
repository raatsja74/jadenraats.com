"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { y: 28 },
  whileInView: { y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.75, ease: EASE },
};

// ── Data ──────────────────────────────────────────────────────────────────────

/** How AI actually runs Award Coatings. Every claim here has to be true of a real
 *  Monday — no projections, no "up to". If a figure isn't measured, it isn't here.
 *
 *  TO ADD REAL NUMBERS: drop a measured figure into `stat` on the first two items
 *  (e.g. "4 hrs/week back" or "38 leads/mo auto-followed"). Leave `stat` null and
 *  the row simply renders without one. Do not estimate. */
const SYSTEMS: { stat: string | null; title: string; body: string }[] = [
  {
    stat: null,
    title: "New leads get a reply while I'm on a job site",
    body: "Web forms, missed calls, and Google messages go to one inbox. My system sends the first reply, so customers don't have to wait until I check my phone that evening.",
  },
  {
    stat: null,
    title: "I build quotes from a price book",
    body: "I enter the measurements and the tool pulls prices from my price book. Every estimate comes out in the same format. I used to start each one from scratch at 9 p.m.",
  },
  {
    stat: "$14.15",
    title: "One assistant connects nine apps",
    body: "I ran it myself for 55 days and spent $14.15 on model calls. The case study shows what broke along the way.",
  },
];

/** Verified figures from the assistant build, measured over the 55-day run.
 *  These are the same numbers published in the case study on the homepage. */
const NUMBERS = [
  { n: "9", l: "apps connected" },
  { n: "55", l: "days in use" },
  { n: "$14.15", l: "total model cost" },
  { n: "2,142", l: "messages handled" },
];

const ELSEWHERE = [
  { label: "Award Coatings", href: "https://awardcoatings.com", meta: "the company" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jaden-raats-b6361213a",
    meta: "profile",
  },
  { label: "GitHub", href: "https://github.com/raatsja74", meta: "code" },
  { label: "ai@jadenraats.com", href: "mailto:ai@jadenraats.com", meta: "email" },
];

// ── Sections ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p {...fadeUp} className="kicker kicker-accent">
      <span className="ast-host inline-flex items-center gap-1.5">
        {children}
        <span className="ast">*</span>
      </span>
    </motion.p>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 sm:px-10 sm:pb-24 sm:pt-44">
      <div className="border-t border-line pt-10">
        <SectionLabel>about</SectionLabel>

        <motion.h1
          className="display mt-6 text-7xl sm:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
        >
          Jaden{" "}
          <span className="ast-host">
            Raats<span className="ast text-accent">*</span>
          </span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-3xl text-base leading-relaxed text-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          I own Award Coatings, a floor coating company in Phoenix. I build and test AI tools there before I write about them.
        </motion.p>

        <motion.p
          className="mt-10 max-w-2xl text-base leading-relaxed text-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        >
          I use those tools to follow up with customers, write quotes, and schedule jobs. If I get the setup wrong, I still have to run the business on Monday.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        >
          <a href="mailto:ai@jadenraats.com" className="btn btn-primary">
            Get in touch <span className="btn-arrow">→</span>
          </a>
          <Link href="/case-study" className="btn btn-secondary">
            Read the case study
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Systems() {
  return (
    <section className="mx-auto max-w-6xl border-t border-line px-6 py-24 sm:px-10 sm:py-28">
      <motion.h2
        {...fadeUp}
        className="display mt-6 max-w-3xl text-5xl sm:text-6xl"
      >
        How I use AI at <span className="font-serif italic normal-case">Award Coatings</span>
      </motion.h2>

      <div className="mt-14 border-t border-line">
        {SYSTEMS.map((s, i) => (
          <motion.article
            key={s.title}
            className="border-b border-line py-9 sm:py-11"
            initial={{ y: 28 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
              {/* Always rendered — an empty column keeps stat-less rows aligned
                  with the ones that do carry a figure. */}
              <span
                aria-hidden={!s.stat}
                className="display text-3xl text-accent sm:w-40 sm:shrink-0"
              >
                {s.stat}
              </span>
              <div>
                <h3 className="display text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-soft">{s.body}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="mx-auto max-w-6xl border-t border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>55 days with one assistant</SectionLabel>

      <motion.p {...fadeUp} className="mb-10 max-w-2xl text-base leading-relaxed text-soft">
        I tracked the assistant&apos;s usage for its first 55 days. It stopped working for two weeks before I noticed. I wrote about what happened in the{" "}
        <Link href="/case-study" className="link-underline text-ink">
          case study
        </Link>
        .
      </motion.p>

      <motion.div {...fadeUp} className="">
        <div className="border-grid-overlap grid grid-cols-2 sm:grid-cols-4">
          {NUMBERS.map((s) => (
            <div key={s.l} className="card-outline border-line px-5 py-7 text-center">
              <div className="display text-4xl sm:text-5xl">
                {s.n}
              </div>
              <div className="kicker kicker-faint mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Background() {
  return (
    <section className="mx-auto max-w-6xl border-t border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>background</SectionLabel>

      <div className="grid gap-8 text-base leading-relaxed text-soft sm:grid-cols-2 sm:gap-14">
        <motion.p {...fadeUp}>
          I started in sales. I taught myself to write software because the tools I needed either didn&apos;t exist or cost more than they saved. I wrote some bad software at first. I kept what worked on actual jobs.
        </motion.p>
        <motion.p {...fadeUp}>
          When a tool gets through a week at Award Coatings, I share how I set it up, what it cost, and what broke along the way.
        </motion.p>
      </div>
    </section>
  );
}

function Elsewhere() {
  return (
    <section className="border-t border-line rounded-[var(--modern-radius-inner)] bg-ink px-6 py-24 text-cream sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          {...fadeUp}
          className="display mt-6 max-w-2xl text-5xl sm:text-6xl"
        >
          Where to <span className="font-serif italic normal-case">find me</span>
        </motion.h2>

        <div className="mt-12 border-t border-cream/10">
          {ELSEWHERE.map((e, i) => (
            <motion.a
              key={e.href}
              href={e.href}
              {...(e.href.startsWith("http")
                ? { target: "_blank", rel: "me noreferrer" }
                : {})}
              className="group flex items-baseline justify-between gap-6 border-b border-cream/10 py-6 transition-colors duration-500 hover:underline decoration-accent underline-offset-8"
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
            >
              <span className="display text-2xl transition-colors duration-500 sm:text-3xl">
                {e.label}
              </span>
              <span className="kicker kicker-paper">{e.meta} ↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="rounded-[var(--modern-radius-inner)] bg-ink px-6 pb-8 pt-10 text-cream sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8 font-mono text-sm text-cream/75">
        <span>© 2026 Jaden Raats</span>
        <Link href="/" className="link-underline">
          back home
        </Link>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutContent() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Systems />
        <Numbers />
        <Background />
        <Elsewhere />
      </main>
      <Footer />
    </MotionConfig>
  );
}
