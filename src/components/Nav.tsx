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
  "flex min-h-[var(--uds-layout-touch-target-min)] min-w-[var(--uds-layout-touch-target-min)] items-center justify-center self-center rounded-[var(--modern-radius-pill)] px-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-ink/5";

/** Wordmark + plain links. No sales CTA in the header. */
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-glass fixed inset-x-0 top-0 z-50 border-b border-line">
      <nav
        aria-label="Main"
        className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-x-2 px-4 sm:px-6"
      >
        <Link
          href="/"
          aria-label="Jaden Raats — home"
          className="ast-host flex min-h-[var(--uds-layout-touch-target-min)] items-center text-xl font-bold"
        >
          jaden<span className="ast text-accent">*</span>
        </Link>

        <div className="hidden min-[1060px]:flex min-[1060px]:items-center min-[1060px]:gap-1">
          {LINKS.filter(([, href]) => href !== "/prompt-lab").map(([label, href]) => (
            <Link key={href + label} href={href} className={linkCls}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/prompt-lab"
            className="flex min-h-[var(--uds-layout-touch-target-min)] items-center gap-1.5 self-center rounded-[var(--modern-radius-pill)] bg-accent px-4 text-sm font-semibold text-action transition-[filter] duration-200 hover:brightness-95"
          >
            <span aria-hidden="true">*</span><span className="hidden min-[375px]:inline">Skills Library</span><span className="min-[375px]:hidden">Skills</span>
          </Link>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex min-h-[var(--uds-layout-touch-target-min)] min-w-[var(--uds-layout-touch-target-min)] items-center justify-center rounded-[var(--modern-radius-pill)] text-lg text-ink transition-colors duration-200 hover:bg-ink/5 min-[1060px]:hidden"
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav-sheet"
          className="border-t border-line px-3 py-2 min-[1060px]:hidden"
        >
          {LINKS.map(([label, href]) => (
            <Link
              key={href + label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex min-h-[56px] items-center justify-between rounded-[var(--modern-radius-inner)] px-4 text-base font-medium text-ink transition-colors duration-200 hover:bg-ink/5"
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
