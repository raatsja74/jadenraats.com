"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/**
 * Brand marks and the section label. These three shapes were inlined across
 * every page; they live here once.
 */

/** The asterisk stamp. Turns a quarter-turn on hover of its `.ast-host` parent. */
export function Asterisk({ accent = false }: { accent?: boolean }) {
  return <span className={`ast${accent ? " text-accent" : ""}`}>*</span>;
}

/** Text followed by the asterisk stamp, with the host wrapper the CSS needs.
 *  `inline-flex` + gap is the label treatment used above section headings. */
export function Starred({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={`ast-host inline-flex items-center gap-1.5${className ? ` ${className}` : ""}`}>
      {children}
      <Asterisk />
    </span>
  );
}

/** Display-name treatment: the name stays ink, only the stamp is accented. */
export function StarredName({ children }: { children: ReactNode }) {
  return (
    <span className="ast-host">
      {children}
      <Asterisk accent />
    </span>
  );
}

/** iMessage-style bubble brand mark. Fills with currentColor; the dots punch
 *  through to the paper so it reads on any surface. */
export function MessageBubbleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 3h18v13H11.5l-4.5 4.5V16H3V3z" />
      <rect x="6.5" y="7.5" width="2" height="2" style={{ fill: "rgb(var(--bg))" }} />
      <rect x="11" y="7.5" width="2" height="2" style={{ fill: "rgb(var(--bg))" }} />
      <rect x="15.5" y="7.5" width="2" height="2" style={{ fill: "rgb(var(--bg))" }} />
    </svg>
  );
}

/** Numbered orange kicker used as the label above every section heading. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.p {...fadeUp} className="kicker kicker-accent">
      <Starred>{children}</Starred>
    </motion.p>
  );
}
