"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/brand";
import { StatGrid } from "@/components/StatGrid";
import { ABOUT_STATS } from "@/data/site";
import { fadeUp } from "@/lib/motion";

export function Numbers() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>measured, not estimated</SectionLabel>

      <motion.p {...fadeUp} className="mb-10 mt-6 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">
        The assistant that runs the back office, as actually metered over its first 55 days. The full
        teardown — including the two weeks it silently broke — is on the{" "}
        <Link href="/#hermes" className="link-underline text-accent">
          home page
        </Link>
        .
      </motion.p>

      <StatGrid stats={ABOUT_STATS} />
    </section>
  );
}
