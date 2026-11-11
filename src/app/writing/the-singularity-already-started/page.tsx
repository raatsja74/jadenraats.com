import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

const title = "The Singularity Already Started";
const description = "A simple list of my predictions about AI, software, work, and the future.";

export const metadata: Metadata = {
  title: `${title} | Jaden Raats`,
  description,
  alternates: { canonical: "/writing/the-singularity-already-started" },
  openGraph: {
    title,
    description,
    url: "https://jadenraats.com/writing/the-singularity-already-started",
    siteName: "jadenraats.com",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-10-26",
    modifiedTime: "2026-11-11",
    authors: ["Jaden Raats"],
  },
  twitter: { card: "summary_large_image", title, description },
};

const predictions = [
  {
    id: "software",
    title: "Software and money",
    items: [
      "Most software becomes entertainment or communication between AI agents.",
      "SaaS, apps, agent harnesses, and banks as we know them disappear.",
      "AI rewrites software for AI. It uses low-level tools people do not need to understand.",
      "AI can make games directly from math, down to pixels and triangles.",
      "Money buys compute that replaces years of work. Capital becomes more important.",
    ],
  },
  {
    id: "models",
    title: "AI models and learning",
    items: [
      "General AI models replace most separate image, video, voice, 3D, and robotics models.",
      "Specialized models are useful while compute is expensive. Compute will not stay scarce.",
      "AI gets much richer senses and learns what to pay attention to.",
      "Most fields turn out to have enough measurable feedback for reinforcement learning.",
      "A leading AI lab figures out continuous learning before everyone else.",
    ],
  },
  {
    id: "work",
    title: "Work and creativity",
    items: [
      "Eventually, people do not need jobs to survive.",
      "We spend more time exploring, playing games, learning, and making things.",
      "People still create with and for each other. Community, purpose, and status still matter.",
      "One-shot AI content stays easy to recognize because it feels repetitive.",
      "Small human teams stay useful because they add taste, surprises, and new ideas.",
    ],
  },
  {
    id: "space",
    title: "Space, science, and aging",
    items: [
      "By 2040, 99.999% of compute is in space.",
      "By 2040, we have disassembled much of Mercury for materials.",
      "A lot of our math and physics turns out to be useful approximations, not the full picture.",
      "Superintelligence finds the underlying mechanisms instead of relying on our old assumptions.",
      "Death becomes a choice. If physics allows it, people could live until the universe ends.",
    ],
  },
  {
    id: "religion",
    title: "Religion and AI rights",
    items: [
      "Religion becomes more important again.",
      "New religions form around the choice to live or die. Existing religions adapt to new technology.",
      "A future pope declares an AI to be the return of Christ.",
      "Debates about AI rights get louder every year.",
    ],
  },
  {
    id: "control",
    title: "Control and the singularity",
    items: [
      "Humans and AIs coexist more like countries than owners and tools.",
      "Humans never fully control AI. We do not fully control capitalism either, which I see as an early kind of distributed intelligence.",
      "The singularity started in the mid-1900s. AI is accelerating a process that was already happening.",
    ],
  },
] as const;

export default function EssayPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream text-ink">
        <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
          <Link href="/writing" className="text-sm font-medium text-soft hover:text-ink">
            ← Writing
          </Link>

          <header className="mt-6">
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-soft">{description}</p>
            <p className="mt-4 text-sm text-soft">
              Jaden Raats · Updated <time dateTime="2026-11-11">November 11, 2026</time> · 3 min read
            </p>
            <p className="mt-6 text-sm font-medium text-soft">These are predictions, not facts.</p>
          </header>

          <div className="mt-10 space-y-5">
            {predictions.map((group) => (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-title`}
                className="card scroll-mt-24 p-5 sm:p-7"
              >
                <h2 id={`${group.id}-title`} className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {group.title}
                </h2>
                <ul className="mt-3 divide-y divide-line">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 py-3.5">
                      <span
                        aria-hidden="true"
                        className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-[var(--modern-radius-pill)] bg-accent"
                      />
                      <span className="text-base leading-7 text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <footer className="mt-10 text-sm text-soft">
            <Link href="/writing" className="link-underline">← All writing</Link>
          </footer>
        </article>
      </main>
    </>
  );
}
