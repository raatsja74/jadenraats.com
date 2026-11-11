import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
 title: "Writing | Jaden Raats",
 description: "Ideas and predictions about technology, work, intelligence, and what comes next.",
 alternates: { canonical: "/writing" },
};

export default function WritingPage() {
 return <>
  <Nav />
  <main className="min-h-screen bg-cream text-ink">
   <div className="mx-auto max-w-3xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
    <header className="border-t-2 border-line pt-10">
     <p className="kicker kicker-accent">field notes / writing</p>
     <h1 className="display mt-6 text-5xl sm:text-6xl">Writing</h1>
     <p className="mt-6 text-base leading-relaxed text-soft">Ideas, predictions, and things I think are worth writing down.</p>
    </header>
    <ol className="mt-12">
     <li><Link href="/writing/the-singularity-already-started" className="group block border-2 border-line bg-cream p-6 transition-colors duration-200 hover:border-accent sm:p-8">
      <p className="kicker kicker-faint">October 26, 2026 / essay / 10 min</p>
      <h2 className="display-sentence mt-6 text-3xl leading-tight sm:text-4xl">The Singularity Already Started</h2>
      <p className="mt-5 text-base leading-relaxed text-soft">Predictions about software, work, general intelligence, space-based compute, mortality, and life alongside AI.</p>
      <span className="kicker kicker-accent mt-8 block">Read the essay →</span>
     </Link></li>
    </ol>
   </div>
  </main>
 </>;
}
