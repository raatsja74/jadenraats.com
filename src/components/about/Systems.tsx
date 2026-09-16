"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/brand";
import { SYSTEMS } from "@/data/site";
import { fadeUp, stagger } from "@/lib/motion";

export function Systems() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>how ai runs the business</SectionLabel>

      <motion.h2 {...fadeUp} className="display mt-6 max-w-3xl text-5xl sm:text-6xl">
        Operator first, <span className="font-serif italic normal-case">builder</span> second.
      </motion.h2>

      <motion.p {...fadeUp} className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">
        Most AI advice comes from people who have never had to make payroll. Mine comes out of a coating
        business with crews, callbacks and a phone that rings during a pour. Three things AI actually does
        here:
      </motion.p>

      <div className="mt-14 border-t-2 border-line">
        {SYSTEMS.map((system, index) => (
          <motion.article
            key={system.title}
            {...fadeUp}
            viewport={{ once: true, margin: "-60px" }}
            transition={stagger(index, 0.1)}
            className="border-b-2 border-line py-9 sm:py-11"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
              {/* Always rendered — an empty column keeps stat-less rows aligned
                  with the ones that do carry a figure. */}
              <span aria-hidden={!system.stat} className="display text-3xl text-accent sm:w-40 sm:shrink-0">
                {system.stat}
              </span>
              <div>
                <h3 className="display text-2xl">{system.title}</h3>
                <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-soft">{system.body}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
