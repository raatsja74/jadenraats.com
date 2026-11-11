import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Writing | Jaden Raats",
  description: "Ideas and predictions about technology, work, intelligence, and what comes next.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream text-ink">
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
          <header>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">Writing</h1>
            <p className="mt-4 text-lg text-soft">Things I think are worth writing down.</p>
          </header>

          <ul className="mt-10">
            <li>
              <Link
                href="/writing/the-singularity-already-started"
                className="card group block p-5 transition-transform duration-200 hover:-translate-y-0.5 sm:p-7"
              >
                <p className="text-sm text-soft">Predictions · Updated Nov 11, 2026 · 3 min</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  The Singularity Already Started
                </h2>
                <p className="mt-3 text-base leading-7 text-soft">
                  A simple list of my predictions about AI, software, work, and the future.
                </p>
                <p className="mt-5 text-sm font-semibold text-accent">
                  Read predictions →
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
