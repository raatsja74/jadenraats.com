"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProfileMark from "@/components/ProfileMark";

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
    <>
      <ProfileMark />
      <motion.header
        className="fixed inset-x-0 top-16 z-50 flex justify-center px-4 sm:top-5"
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      >
        <nav
          aria-label="Main"
          className="flex items-center gap-0 rounded-full bg-ink px-1 py-1 text-cream shadow-lg shadow-ink/10 sm:gap-1 sm:px-2 sm:py-2"
        >
          <Link
            href="/"
            className="ast-host rounded-full px-3 py-1 font-serif text-base italic tracking-tight sm:px-4 sm:py-1.5 sm:text-lg"
          >
            jaden<span className="ast not-italic text-accent">*</span>
          </Link>
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-2 py-1 text-xs text-cream/70 transition-colors duration-300 hover:bg-cream/10 hover:text-cream sm:px-4 sm:py-1.5 sm:text-sm"
            >
              {label}
            </a>
          ))}
        </nav>
      </motion.header>
    </>
  );
}
