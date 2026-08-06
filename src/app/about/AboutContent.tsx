"use client";

import { motion, MotionConfig } from "framer-motion";
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
    <motion.p {...fadeUp} className="mb-8 font-mono text-sm text-accent">
      <span className="ast-host inline-flex items-center gap-1.5">
        {children}
        <span className="ast">*</span>
      </span>
    </motion.p>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-40 sm:px-10 sm:pb-24 sm:pt-44 lg:px-16">
      <div className="wash" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl">
        <motion.p
          className="mb-8 font-mono text-sm text-accent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          <span className="ast-host inline-flex items-center gap-1.5">
            about
            <span className="ast">*</span>
          </span>
        </motion.p>

        <motion.h1
          className="max-w-4xl text-5xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
        >
          Jaden{" "}
          <span className="ast-host font-serif italic tracking-[-0.02em]">
            Raats<span className="ast not-italic text-accent">*</span>
          </span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-3xl text-xl leading-snug text-soft sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          AI Automation Entrepreneur &amp; Owner, Award Coatings
        </motion.p>

        <motion.p
          className="mt-10 max-w-2xl text-lg leading-relaxed text-soft"
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
          <a
            href="mailto:me@jadenraats.com"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-transform duration-300 hover:scale-[1.03]"
          >
            Get in touch <span className="btn-arrow">→</span>
          </a>
          <a
            href="/#hermes"
            className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium transition-transform duration-300 hover:scale-[1.03]"
          >
            Read the case study
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Systems() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
      <SectionLabel>how ai runs the business</SectionLabel>

      <motion.h2
        {...fadeUp}
        className="max-w-3xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl"
      >
        Operator first, <span className="font-serif italic text-accent">builder</span> second.
      </motion.h2>

      <motion.p {...fadeUp} className="mt-8 max-w-2xl text-lg leading-relaxed text-soft">
        Most AI advice comes from people who have never had to make payroll. Mine
        comes out of a coating business with crews, callbacks and a phone that
        rings during a pour. Three things AI actually does here:
      </motion.p>

      <div className="mt-14 border-t border-ink/10">
        {SYSTEMS.map((s, i) => (
          <motion.article
            key={s.title}
            className="border-b border-ink/10 py-9 sm:py-11"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.1 }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
              {s.stat && (
                <span className="font-mono text-3xl font-medium tracking-tight text-accent sm:w-40 sm:shrink-0">
                  {s.stat}
                </span>
              )}
              <div className={s.stat ? "" : "sm:pl-0"}>
                <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-soft">{s.body}</p>
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
    <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-10 sm:pb-32">
      <SectionLabel>measured, not estimated</SectionLabel>

      <motion.p {...fadeUp} className="mb-10 max-w-2xl text-lg leading-relaxed text-soft">
        The assistant that runs the back office, as actually metered over its
        first 55 days. The full teardown — including the two weeks it silently
        broke — is on the{" "}
        <a href="/#hermes" className="link-underline text-accent">
          home page
        </a>
        .
      </motion.p>

      <motion.div
        {...fadeUp}
        className="grid grid-cols-2 gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-4"
      >
        {NUMBERS.map((s) => (
          <div key={s.l} className="bg-cream px-5 py-7 text-center">
            <div className="font-mono text-3xl font-medium tracking-tight sm:text-4xl">
              {s.n}
            </div>
            <div className="mt-2 font-mono text-xs text-faint">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function Background() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-10 sm:pb-32">
      <SectionLabel>background</SectionLabel>

      <div className="grid gap-8 text-lg leading-relaxed text-soft sm:grid-cols-2 sm:gap-14">
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
    <section className="relative overflow-hidden bg-ink px-6 py-24 text-cream sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>elsewhere</SectionLabel>

        <motion.h2
          {...fadeUp}
          className="max-w-2xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl"
        >
          Same person,{" "}
          <span className="font-serif italic text-accent">every list</span>.
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
              <span className="text-xl font-medium tracking-tight transition-transform duration-500 ease-soft group-hover:translate-x-2 sm:text-2xl">
                {e.label}
              </span>
              <span className="font-mono text-sm text-cream/40">{e.meta} ↗</span>
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
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8 font-mono text-xs text-cream/40">
        <span>© 2026 Jaden Raats</span>
        <a href="/" className="link-underline">
          back home
        </a>
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
