"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import { GUIDES } from "@/data/guides";

export default function GuidesIndex() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream text-ink">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-40">
          <div className="border-t border-line pt-10">
            <p className="kicker kicker-accent">Guides</p>
            <h1 className="display mt-6 max-w-4xl text-5xl sm:text-6xl">
              Free guides to learn AI
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10 sm:pb-36">
          <ol className="grid gap-4 md:grid-cols-2">
            {GUIDES.map((g, i) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex h-full flex-col card border-line bg-surface p-6 transition-colors duration-200 hover:border-accent sm:p-8"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-xs text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="kicker kicker-faint">
                      {g.readMinutes} min
                    </span>
                  </div>
                  <h2 className="display-sentence mt-8 text-2xl leading-tight sm:text-3xl">
                    {g.title}
                  </h2>
                  <span className="kicker kicker-accent mt-8">
                    Read <span className="btn-arrow">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <aside
            className="mt-10 card border-line bg-surface p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8"
            aria-label="More resources"
          >
            <div>
              <p className="kicker kicker-accent">Also</p>
              <h2 className="display mt-3 text-3xl sm:text-4xl">Resources</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-soft">
                Skills library, daily note, CaptureVault map, and the rest of the public
                pages.
              </p>
            </div>
            <Link
              href="/resources"
              className="btn btn-primary mt-6 shrink-0 sm:mt-0"
            >
              Browse resources <span className="btn-arrow">→</span>
            </Link>
          </aside>
        </section>
      </main>
    </>
  );
}
