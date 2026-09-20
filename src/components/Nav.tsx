"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  ["about", "/about"],
  ["skills", "/#skills"],
  ["guides", "/guides"],
  ["lab", "/prompt-lab"],
  ["contact", "/#contact"],
] as const;

const linkCls =
  "flex min-h-[44px] min-w-[44px] items-center justify-center px-2 font-mono text-xs uppercase tracking-[0.08em] text-soft transition-colors duration-200 hover:bg-ink hover:text-cream sm:px-3";

/** Brutalist editorial nav. Left wordmark, plain text links on desktop,
 *  hamburger sheet under 900px, one labeled orange CTA anchoring the right
 *  edge. Square, bordered, 44px targets. */
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
          className="ast-host flex min-h-[44px] items-center font-display text-xl uppercase tracking-wide"
        >
          jaden<span className="ast text-accent">*</span>
        </Link>

        {/* Desktop links — 900px and up */}
        <div className="hidden min-[900px]:flex min-[900px]:items-stretch">
          {LINKS.map(([label, href]) => (
            <Link key={href + label} href={href} className={linkCls}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-stretch gap-2">
          {/* Labeled orange CTA — never icon-only */}
          <Link
            href="/#contact"
            className="flex min-h-[44px] items-center gap-2 self-center bg-accent px-4 font-display text-base uppercase tracking-wide text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
          >
            <span aria-hidden="true">✱</span> Say hello
          </Link>

          {/* Hamburger — under 900px */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center border-l-2 border-line px-3 font-display text-xl text-ink min-[900px]:hidden"
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet — under 900px */}
      {open && (
        <div
          id="mobile-nav-sheet"
          className="border-t-2 border-line bg-cream min-[900px]:hidden"
        >
          {LINKS.map(([label, href]) => (
            <Link
              key={href + label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex min-h-[56px] items-center justify-between border-b border-line px-6 font-mono text-sm uppercase tracking-[0.08em] text-ink transition-colors duration-200 last:border-b-0 hover:bg-ink hover:text-cream"
            >
              {label}
              <span aria-hidden="true" className="text-accent">→</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
