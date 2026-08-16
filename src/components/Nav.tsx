"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  ["about", "/about"],
  ["work", "/#work"],
  ["lab", "/prompt-lab"],
  ["portfolio", "/portfolio"],
  ["contact", "/#contact"],
] as const;

/** Shared floating nav. Hrefs are root-relative so they work from any page. */
export default function Nav() {
  return (
    <motion.header
      className="fixed inset-x-0 top-5 z-50 flex justify-center px-4"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
    >
      <nav
        aria-label="Main"
        className="flex items-center gap-1 rounded-full bg-ink px-2 py-2 text-cream shadow-lg shadow-ink/10"
      >
        <a
          href="/"
          className="ast-host rounded-full px-4 py-1.5 font-serif text-lg italic tracking-tight"
        >
          jaden<span className="ast not-italic text-accent">*</span>
        </a>
        {LINKS.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-3 py-1.5 text-sm text-cream/70 transition-colors duration-300 hover:bg-cream/10 hover:text-cream sm:px-4"
          >
            {label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
