"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/brand";
import { ELSEWHERE } from "@/data/site";
import { fadeUp, stagger } from "@/lib/motion";

export function Elsewhere() {
  return (
    <section className="border-t-2 border-line bg-ink px-6 py-24 text-cream sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>elsewhere</SectionLabel>

        <motion.h2 {...fadeUp} className="display mt-6 max-w-2xl text-5xl sm:text-6xl">
          Same person, <span className="font-serif italic normal-case">every list</span>.
        </motion.h2>

        <div className="mt-12 border-t border-cream/10">
          {ELSEWHERE.map((entry, index) => (
            <motion.a
              key={entry.href}
              href={entry.href}
              {...(entry.href.startsWith("http") ? { target: "_blank", rel: "me noreferrer" } : {})}
              {...fadeUp}
              viewport={{ once: true, margin: "-50px" }}
              transition={stagger(index, 0.07)}
              className="group flex items-baseline justify-between gap-6 border-b border-cream/10 py-6 transition-colors duration-500 hover:text-accent"
            >
              <span className="display text-2xl transition-colors duration-500 group-hover:text-accent sm:text-3xl">
                {entry.label}
              </span>
              <span className="kicker kicker-paper">{entry.meta} ↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
