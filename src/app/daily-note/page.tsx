import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { getSkill } from "@/app/prompt-lab/skills";

const TITLE = "Daily Note | Jaden Raats";
const DESCRIPTION =
  "How to start each day from one note that already knows yesterday.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/daily-note" },
};

const STEPS = [
  "Open today's daily note (create it if it doesn't exist).",
  "Copy forward unfinished next actions from yesterday.",
  "Copy forward open questions that still need an answer.",
  "Add today's scheduled events — keep the whole note under one screen.",
  "Work from the list. When something is done, mark it. Don't start a second list.",
];

export default function DailyNotePage() {
  const skill = getSkill("daily-note-roll");

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
        <section className="border-t-2 border-line pt-10">
          <p className="kicker kicker-accent">daily note</p>
          <h1 className="display mt-6 text-5xl sm:text-6xl">Daily Note</h1>
          <p className="mt-6 text-sm leading-relaxed text-soft">
            One note per day. Yesterday rolls forward. Nothing else.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="kicker kicker-faint">How to do it</h2>
          <ol className="mt-4 border-2 border-line">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 border-b-2 border-line px-5 py-4 last:border-b-0 sm:px-6"
              >
                <span className="font-mono text-xs text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {skill && (
          <section className="mt-12 border-2 border-line p-6 sm:p-8">
            <p className="kicker kicker-accent">Prompt</p>
            <h2 className="display-sentence mt-3 text-2xl">{skill.name}</h2>
            <p className="mt-3 text-sm text-soft">{skill.desc}</p>
            <pre className="mt-6 whitespace-pre-wrap border-2 border-line bg-surface p-4 font-mono text-xs leading-relaxed text-ink">
              {skill.prompt}
            </pre>
            <Link
              href={`/prompt-lab?q=${encodeURIComponent(skill.name)}`}
              className="btn btn-primary mt-6"
            >
              Open in the lab <span className="btn-arrow">→</span>
            </Link>
          </section>
        )}

        <p className="mt-10">
          <Link href="/resources" className="kicker kicker-accent">
            More resources <span className="btn-arrow">→</span>
          </Link>
        </p>
      </main>
    </>
  );
}
