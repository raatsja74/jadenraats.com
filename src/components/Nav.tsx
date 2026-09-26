"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  ["systems", "/systems"],
  ["guides", "/guides"],
  ["skills library", "/prompt-lab"],
  ["daily note", "/daily-note"],
  ["resources", "/resources"],
] as const;

const linkCls =
  "flex min-h-[var(--uds-layout-touch-target-min)] min-w-[var(--uds-layout-touch-target-min)] items-center justify-center px-2 font-mono text-sm uppercase tracking-[0.04em] text-ink transition-colors duration-200 hover:bg-ink hover:text-cream sm:px-3";

/** Wordmark + plain links. No sales CTA in the header. */
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-line bg-cream">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-stretch justify-between gap-x-2 px-4 sm:px-6"
      >
        <Link
          href="/"
          aria-label="Jaden Raats — home"
          className="ast-host flex min-h-[var(--uds-layout-touch-target-min)] items-center font-display text-xl uppercase tracking-wide"
        >
          jaden<span className="ast text-accent">*</span>
        </Link>

        <div className="hidden min-[1060px]:flex min-[1060px]:items-stretch">
          {LINKS.filter(([, href]) => href !== "/prompt-lab").map(([label, href]) => (
            <Link key={href + label} href={href} className={linkCls}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-stretch gap-1">
          <Link
            href="/prompt-lab"
            className="flex min-h-[var(--uds-layout-touch-target-min)] items-center gap-2 self-center bg-accent px-3 font-display text-base uppercase tracking-wide text-action transition-colors duration-200 hover:bg-ink hover:text-cream sm:px-4"
          >
            <span aria-hidden="true">✱</span><span className="hidden min-[375px]:inline">Skills Library</span><span className="min-[375px]:hidden">Skills</span>
          </Link>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex min-h-[var(--uds-layout-touch-target-min)] min-w-[var(--uds-layout-touch-target-min)] items-center justify-center border-l-2 border-line px-3 font-display text-xl text-ink min-[1060px]:hidden"
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav-sheet"
          className="border-t-2 border-line bg-cream min-[1060px]:hidden"
        >
          {LINKS.map(([label, href]) => (
            <Link
              key={href + label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex min-h-[56px] items-center justify-between border-b border-line px-6 font-mono text-sm uppercase tracking-[0.08em] text-ink transition-colors duration-200 last:border-b-0 hover:bg-ink hover:text-cream"
            >
              {label}
              <span aria-hidden="true" className="text-accent">
                →
              </span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
