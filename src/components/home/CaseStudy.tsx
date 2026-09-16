"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/brand";
import { StatGrid } from "@/components/StatGrid";
import { HERMES_BROKE, HERMES_COMPARISON, HERMES_FLOW, HOME_STATS } from "@/data/site";
import { fadeUp, stagger } from "@/lib/motion";

export function CaseStudy() {
  return (
    <section id="hermes" className="mx-auto max-w-6xl scroll-mt-24 border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>case study</SectionLabel>

      <motion.h2 {...fadeUp} className="display mt-6 max-w-4xl text-5xl sm:text-6xl">
        I built an AI assistant, then wrote down{" "}
        <span className="font-serif italic normal-case">everything that broke</span>.
      </motion.h2>

      <motion.p {...fadeUp} className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">
        I was capturing work in eight places and finding it in none of them. Links in one app, ideas in
        another, tasks somewhere else — plus five AI agents that couldn&apos;t see each other&apos;s work.
        The problem was never lost data. It was that I couldn&apos;t get anything back out.
      </motion.p>

      <div className="mt-12">
        <StatGrid stats={HOME_STATS} />
      </div>

      <motion.p {...fadeUp} className="mt-14 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">
        So I built one front door. Everything goes to a chat app, and{" "}
        <em className="font-serif italic normal-case text-ink">which chat you send it to</em> decides where
        it ends up. No AI guessing your intent — you already made the decision when you picked the chat. It
        gets filed automatically, and every conversation from every app lands in one searchable place.
      </motion.p>

      <motion.div {...fadeUp} className="mt-10 border-t-2 border-line">
        {HERMES_FLOW.map((step) => (
          <div
            key={step.k}
            className="flex flex-col gap-1 border-b-2 border-line py-4 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <span className="kicker kicker-accent sm:w-28 sm:shrink-0">{step.k}</span>
            <span className="font-mono text-sm text-soft">{step.v}</span>
          </div>
        ))}
      </motion.div>

      <motion.h3 {...fadeUp} className="display mt-20 text-3xl sm:text-4xl">
        The fix wasn&apos;t code.
      </motion.h3>

      <motion.p {...fadeUp} className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">
        Six weeks in, it broke for two weeks and I didn&apos;t notice. When I came back, I didn&apos;t
        rewrite anything — I wrote down the filing rules on a single page that both I and the agents could
        read. Same code, same models, four times the use.
      </motion.p>

      <motion.div {...fadeUp} className="mt-10 max-w-xl border-2 border-line">
        <div className="grid grid-cols-3 border-b-2 border-line font-mono text-xs text-faint">
          <div className="px-4 py-3" />
          <div className="px-4 py-3">before</div>
          <div className="px-4 py-3">after</div>
        </div>
        {HERMES_COMPARISON.map((row, index) => (
          <div
            key={row.label}
            className={`grid grid-cols-3 text-sm${
              index < HERMES_COMPARISON.length - 1 ? " border-b-2 border-line" : ""
            }`}
          >
            <div className="px-4 py-4 text-soft">{row.label}</div>
            <div className="px-4 py-4 font-mono">{row.before}</div>
            <div className="px-4 py-4 font-mono text-accent">{row.after}</div>
          </div>
        ))}
      </motion.div>

      <motion.h3 {...fadeUp} className="display mt-20 text-3xl sm:text-4xl">
        What&apos;s still broken
      </motion.h3>

      <motion.p {...fadeUp} className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-soft">
        This is the part most write-ups leave out. All of it is still true as of today.
      </motion.p>

      <div className="mt-10 border-t-2 border-line">
        {HERMES_BROKE.map((item, index) => (
          <motion.div
            key={item.t}
            {...fadeUp}
            viewport={{ once: true, margin: "-60px" }}
            transition={stagger(index, 0.1)}
            className="border-b-2 border-line py-8"
          >
            <h4 className="display text-2xl">{item.t}</h4>
            <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-soft">{item.d}</p>
          </motion.div>
        ))}
      </div>

      <motion.p {...fadeUp} className="mt-14 max-w-2xl font-mono text-sm leading-relaxed sm:text-base">
        The useful lesson wasn&apos;t technical. The system didn&apos;t fail because it couldn&apos;t do
        enough — it failed because the rules for where things go lived in my head instead of on a page.
        Writing them down cost an afternoon and did more than six weeks of building.
      </motion.p>
    </section>
  );
}
