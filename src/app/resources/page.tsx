import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { GUIDES } from "@/data/guides";

const TITLE = "Resources | Jaden Raats";
const DESCRIPTION = "Guides, skills library, daily note, and other public pages.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/resources" },
};

const LINKS = [
  {
    href: "/guides",
    label: "Free Guides to Learn AI",
    note: "Plain how-tos you can follow step by step",
  },
  {
    href: "/prompt-lab",
    label: "AI Skills Library",
    note: "Copy prompts to personalize your AI agent",
  },
  {
    href: "/daily-note",
    label: "Daily Note",
    note: "One note per day, yesterday rolled forward",
  },
  {
    href: "/capturevault",
    label: "CaptureVault map",
    note: "How capture becomes context",
  },
  {
    href: "/case-study",
    label: "Case study",
    note: "What broke building an AI assistant",
  },
  {
    href: "/about",
    label: "About",
    note: "Background if you want it",
  },
] as const;

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
        <section className="border-t-2 border-line pt-10">
          <p className="kicker kicker-accent">resources</p>
          <h1 className="display mt-6 text-5xl sm:text-6xl">Resources</h1>
        </section>

        <section className="mt-12">
          <h2 className="kicker kicker-faint">Pages</h2>
          <ul className="mt-4 border-2 border-line">
            {LINKS.map((item, i) => (
              <li
                key={item.href}
                className="border-b-2 border-line last:border-b-0"
              >
                <Link
                  href={item.href}
                  className="group flex flex-col gap-1 px-5 py-4 transition-colors duration-200 hover:bg-ink hover:text-cream sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-6"
                >
                  <span className="flex gap-4">
                    <span className="font-mono text-xs text-ink group-hover:text-cream">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-sentence text-lg">{item.label}</span>
                  </span>
                  <span className="pl-10 text-sm text-faint group-hover:text-cream sm:pl-0 sm:text-right">
                    {item.note}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="kicker kicker-faint">Guides</h2>
          <ul className="mt-4 border-2 border-line">
            {GUIDES.map((g, i) => (
              <li
                key={g.slug}
                className="border-b-2 border-line last:border-b-0"
              >
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex gap-4 px-5 py-4 transition-colors duration-200 hover:bg-ink hover:text-cream sm:px-6"
                >
                  <span className="font-mono text-xs text-ink group-hover:text-cream">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-snug">{g.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
