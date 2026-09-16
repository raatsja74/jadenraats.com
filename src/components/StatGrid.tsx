"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export type Stat = { n: string; l: string };

/**
 * The framed four-up stat band used by the homepage case study and the About
 * page numbers section. The two copies were byte-identical.
 */
export function StatGrid({ stats }: { stats: readonly Stat[] }) {
  return (
    <motion.div {...fadeUp} className="border-2 border-line">
      <div className="-m-[2px] grid grid-cols-2 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.l} className="border-2 border-line px-5 py-7 text-center">
            <div className="display text-4xl tracking-wide sm:text-5xl">{stat.n}</div>
            <div className="kicker kicker-faint mt-2">{stat.l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
