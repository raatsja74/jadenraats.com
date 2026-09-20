"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: EASE },
};

const HERMES_STATS = [
  { n: "9", l: "apps unified" },
  { n: "2,142", l: "messages" },
  { n: "$14.15", l: "total cost" },
  { n: "55", l: "days live" },
];

const HERMES_FLOW = [
  { k: "capture", v: "telegram · slack · imessage · cli · cron" },
  { k: "gateway", v: "always-on process, routes by destination" },
  { k: "state", v: "one sqlite db · full-text search" },
  { k: "homes", v: "obsidian · todoist · drive" },
];

const HERMES_BROKE = [
  {
    t: "A 14-day outage that never alerted anyone",
    d: "An expired token plus two automations pointing at a folder I'd deleted. Nothing crashed — it just quietly stopped working, and I stopped using it without deciding to. Silent failure is worse than loud failure.",
  },
  {
    t: "The one scheduled job is still broken",
    d: "It refuses to run because a safety check is doing its job, and its error notification can't send. The job meant to keep the system from needing me is the part that needs me. I automated the filing before I automated the monitoring.",
  },
  {
    t: "I measured the wrong things",
    d: "I tracked cost and message counts because they were free to collect. I never tracked whether I could actually find what I'd saved — the only number that would have justified the whole project.",
  },
];

export default function CaseStudyPage() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
        <section className="border-t-2 border-line pt-10">
          <motion.p
            className="kicker kicker-accent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <span className="ast-host inline-flex items-center gap-1.5">
              case study
              <span className="ast">*</span>
            </span>
          </motion.p>

          <motion.h1
            className="display mt-6 max-w-4xl text-5xl sm:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
          >
            I built an AI assistant, then wrote down{" "}
            <span className="font-serif italic normal-case">everything that broke</span>.
          </motion.h1>

          <motion.p {...fadeUp} className="mt-8 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
            I was capturing work in eight places and finding it in none of them.
            Links in one app, ideas in another, tasks somewhere else — plus five AI
            agents that couldn&apos;t see each other&apos;s work. The problem was
            never lost data. It was that I couldn&apos;t get anything back out.
          </motion.p>

          <motion.div {...fadeUp} className="mt-12 border-2 border-line">
            <div className="-m-[2px] grid grid-cols-2 sm:grid-cols-4">
              {HERMES_STATS.map((s) => (
                <div key={s.l} className="border-2 border-line px-5 py-7 text-center">
                  <div className="display text-4xl tracking-wide sm:text-5xl">{s.n}</div>
                  <div className="kicker kicker-faint mt-2">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.p {...fadeUp} className="mt-14 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
            So I built one front door. Everything goes to a chat app, and{" "}
            <em className="font-serif italic normal-case text-ink">which chat you send it to</em>{" "}
            decides where it ends up. No AI guessing your intent — you already made
            the decision when you picked the chat. It gets filed automatically, and
            every conversation from every app lands in one searchable place.
          </motion.p>

          <motion.div {...fadeUp} className="mt-10 border-t-2 border-line">
            {HERMES_FLOW.map((f) => (
              <div
                key={f.k}
                className="flex flex-col gap-1 border-b-2 border-line py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="kicker kicker-accent sm:w-28 sm:shrink-0">{f.k}</span>
                <span className="text-sm text-soft">{f.v}</span>
              </div>
            ))}
          </motion.div>

          <motion.h2 {...fadeUp} className="display mt-20 text-3xl sm:text-4xl">
            The fix wasn&apos;t code.
          </motion.h2>

          <motion.p {...fadeUp} className="mt-6 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
            Six weeks in, it broke for two weeks and I didn&apos;t notice. When I
            came back, I didn&apos;t rewrite anything — I wrote down the filing
            rules on a single page that both I and the agents could read. Same code,
            same models, four times the use.
          </motion.p>

          <motion.div {...fadeUp} className="mt-10 max-w-xl border-2 border-line">
            <div className="grid grid-cols-3 border-b-2 border-line font-mono text-xs text-faint">
              <div className="px-4 py-3" />
              <div className="px-4 py-3">before</div>
              <div className="px-4 py-3">after</div>
            </div>
            <div className="grid grid-cols-3 border-b-2 border-line text-sm">
              <div className="px-4 py-4 text-soft">days used</div>
              <div className="px-4 py-4 font-mono">28%</div>
              <div className="px-4 py-4 font-mono text-accent">53%</div>
            </div>
            <div className="grid grid-cols-3 text-sm">
              <div className="px-4 py-4 text-soft">messages / day</div>
              <div className="px-4 py-4 font-mono">21</div>
              <div className="px-4 py-4 font-mono text-accent">87</div>
            </div>
          </motion.div>

          <motion.h2 {...fadeUp} className="display mt-20 text-3xl sm:text-4xl">
            What&apos;s still broken
          </motion.h2>

          <motion.p {...fadeUp} className="mt-6 max-w-2xl text-sm leading-relaxed text-soft">
            This is the part most write-ups leave out. All of it is still true as of
            today.
          </motion.p>

          <div className="mt-10 border-t-2 border-line">
            {HERMES_BROKE.map((b, i) => (
              <motion.div
                key={b.t}
                className="border-b-2 border-line py-8"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              >
                <h3 className="display-sentence text-2xl">{b.t}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-soft">{b.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp} className="mt-14 max-w-2xl text-sm leading-relaxed sm:text-base">
            The useful lesson wasn&apos;t technical. The system didn&apos;t fail
            because it couldn&apos;t do enough — it failed because the rules for
            where things go lived in my head instead of on a page. Writing them down
            cost an afternoon and did more than six weeks of building.
          </motion.p>

          <motion.div {...fadeUp} className="mt-16">
            <Link href="/prompt-lab" className="btn btn-primary">
              Steal the prompts <span className="btn-arrow">→</span>
            </Link>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}
