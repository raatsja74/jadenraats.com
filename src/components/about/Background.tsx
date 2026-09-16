"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/brand";
import { fadeUp } from "@/lib/motion";

export function Background() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>background</SectionLabel>

      <div className="mt-6 grid gap-8 font-mono text-sm leading-relaxed text-soft sm:grid-cols-2 sm:gap-14 sm:text-base">
        <motion.p {...fadeUp}>
          I came up in sales, not engineering. I taught myself to build because the software I needed for a
          floor coating company either didn&apos;t exist or cost more per month than it saved. So I started
          writing my own, badly at first, and kept the parts that survived contact with real jobs.
        </motion.p>
        <motion.p {...fadeUp}>
          That&apos;s still the filter. If a system holds up through a full week at Award Coatings, I&apos;ll
          show other owners exactly how it works, in plain English, including what it cost and what broke.
          If it doesn&apos;t hold up, you&apos;ll never hear about it.
        </motion.p>
      </div>
    </section>
  );
}
