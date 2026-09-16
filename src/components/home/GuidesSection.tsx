"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/brand";
import { GuideCard } from "@/components/GuideCard";
import { GUIDES } from "@/data/guides";
import { fadeUp } from "@/lib/motion";

export function GuidesSection() {
  return (
    <section id="guides" className="mx-auto max-w-6xl scroll-mt-24 border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>guides</SectionLabel>
          <motion.h2 {...fadeUp} className="display mt-6 max-w-2xl text-5xl sm:text-6xl">
            Practical guides for real-world use
          </motion.h2>
        </div>
        <motion.a {...fadeUp} href="/guides" className="btn btn-secondary">
          Browse all guides <span className="btn-arrow">→</span>
        </motion.a>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {GUIDES.map((guide, index) => (
          <GuideCard key={guide.slug} guide={guide} index={index} />
        ))}
      </div>
    </section>
  );
}
