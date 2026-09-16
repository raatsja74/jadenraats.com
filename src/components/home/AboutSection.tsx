"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/brand";
import { fadeUp } from "@/lib/motion";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>about</SectionLabel>

      <motion.h2 {...fadeUp} className="display mt-6 max-w-3xl text-5xl sm:text-6xl">
        Operator first, <span className="font-serif italic normal-case">builder</span> second.
      </motion.h2>

      <div className="mt-10 grid gap-8 font-mono text-base leading-relaxed text-soft sm:grid-cols-2 sm:gap-12">
        <motion.p {...fadeUp}>
          Most AI advice comes from people who&apos;ve never run a business. I run Award Coatings — leads,
          quotes, crews, callbacks. Every system I share exists because something in that business was
          eating my week.
        </motion.p>
        <motion.p {...fadeUp}>
          If a tool survives a real Monday, I&apos;ll show you exactly how it works. If it doesn&apos;t,
          you&apos;ll never hear about it. That&apos;s the whole filter.
        </motion.p>
      </div>
    </section>
  );
}
