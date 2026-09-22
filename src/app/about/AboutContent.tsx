"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
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
    title: "Leads get followed up whether or not I'm on a job site",
    body: "Web forms, missed calls and Google messages land in one place and get a response automatically, instead of sitting in somebody's phone until the evening. The lead that goes cold is the most expensive thing a service business owns.",
  },
  {
    stat: null,
    title: "Quotes get built from a price book, not from scratch at 9pm",
    body: "Measurements in, priced estimate out, same format every time. Quoting used to be the task that decided how long my day was.",
  },
  {
    stat: "$14.15",
    title: "The whole back office runs on one assistant, for pocket change",
    body: "I pulled nine apps — messages, notes, tasks, files — behind a single front door, ran it as its only user for 55 days, and spent $14.15 in model costs doing it. Then I published everything that broke.",
  },
];

/** Verified figures from the assistant build, measured over the 55-day run.
 *  These are the same numbers published in the case study on the homepage. */
const NUMBERS = [
  { n: "9", l: "apps unified" },
  { n: "55", l: "days run live" },
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
  { label: "me@jadenraats.com", href: "mailto:me@jadenraats.com", meta: "email" },
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
      <div className="border-t-2 border-line pt-10">
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
          className="mt-7 max-w-3xl text-sm leading-relaxed text-soft sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          Owner of Award Coatings. Builder of the AI systems that run it. I
          share what survives a real Monday, in plain English.
        </motion.p>

        <motion.p
          className="mt-10 max-w-2xl text-sm leading-relaxed text-soft sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        >
          I own a floor coating company in Phoenix and I build the AI systems that
          run it — lead follow-up, quoting, scheduling, the back office. Award
          Coatings isn&apos;t a case study I read about. It&apos;s the business
          that has to still work on Monday if I get the automation wrong.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        >
          <a href="mailto:me@jadenraats.com" className="btn btn-primary">
            Get in touch <span className="btn-arrow">→</span>
          </a>
          <Link href="/#hermes" className="btn btn-secondary">
            Read the case study
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Systems() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>how ai runs the business</SectionLabel>

      <motion.h2
        {...fadeUp}
        className="display mt-6 max-w-3xl text-5xl sm:text-6xl"
      >
        Operator first, <span className="font-serif italic normal-case">builder</span> second.
      </motion.h2>

      <motion.p {...fadeUp} className="mt-8 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
        Most AI advice comes from people who have never had to make payroll. Mine
        comes out of a coating business with crews, callbacks and a phone that
        rings during a pour. Three things AI actually does here:
      </motion.p>

      <div className="mt-14 border-t-2 border-line">
        {SYSTEMS.map((s, i) => (
          <motion.article
            key={s.title}
            className="border-b-2 border-line py-9 sm:py-11"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-soft">{s.body}</p>
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
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>measured, not estimated</SectionLabel>

      <motion.p {...fadeUp} className="mb-10 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
        The assistant that runs the back office, as actually metered over its
        first 55 days. The full teardown — including the two weeks it silently
        broke — is on the{" "}
        <Link href="/#hermes" className="link-underline text-ink">
          home page
        </Link>
        .
      </motion.p>

      <motion.div {...fadeUp} className="border-2 border-line">
        <div className="border-grid-overlap grid grid-cols-2 sm:grid-cols-4">
          {NUMBERS.map((s) => (
            <div key={s.l} className="border-2 border-line px-5 py-7 text-center">
              <div className="display text-4xl tracking-wide sm:text-5xl">
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
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>background</SectionLabel>

      <div className="grid gap-8 text-sm leading-relaxed text-soft sm:grid-cols-2 sm:gap-14 sm:text-base">
        <motion.p {...fadeUp}>
          I came up in sales, not engineering. I taught myself to build because
          the software I needed for a floor coating company either didn&apos;t
          exist or cost more per month than it saved. So I started writing my
          own, badly at first, and kept the parts that survived contact with real
          jobs.
        </motion.p>
        <motion.p {...fadeUp}>
          That&apos;s still the filter. If a system holds up through a full week
          at Award Coatings, I&apos;ll show other owners exactly how it works, in
          plain English, including what it cost and what broke. If it
          doesn&apos;t hold up, you&apos;ll never hear about it.
        </motion.p>
      </div>
    </section>
  );
}

function Elsewhere() {
  return (
    <section className="border-t-2 border-line bg-ink px-6 py-24 text-cream sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>elsewhere</SectionLabel>

        <motion.h2
          {...fadeUp}
          className="display mt-6 max-w-2xl text-5xl sm:text-6xl"
        >
          Same person, <span className="font-serif italic normal-case">every list</span>.
        </motion.h2>

        <div className="mt-12 border-t border-cream/10">
          {ELSEWHERE.map((e, i) => (
            <motion.a
              key={e.href}
              href={e.href}
              {...(e.href.startsWith("http")
                ? { target: "_blank", rel: "me noreferrer" }
                : {})}
              className="group flex items-baseline justify-between gap-6 border-b border-cream/10 py-6 transition-colors duration-500 hover:text-accent"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
            >
              <span className="display text-2xl transition-colors duration-500 group-hover:text-accent sm:text-3xl">
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
    <footer className="bg-ink px-6 pb-8 pt-10 text-cream sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8 font-mono text-xs text-cream/60">
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
