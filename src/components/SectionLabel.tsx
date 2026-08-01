"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/** Lowercase mono section marker: `about *`. Asterisk turns a quarter-turn on hover. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p {...fadeUp} className="mb-8 font-mono text-sm text-accent">
      <span className="ast-host inline-flex items-center gap-1.5">
        {children}
        <span className="ast">*</span>
      </span>
    </motion.p>
  );
}
