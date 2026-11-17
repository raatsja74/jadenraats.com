import Link from "next/link";

import Nav from "@/components/Nav";
import type { PublicVaultNote } from "@/lib/vault/types";

type Props = {
  description: string;
  eyebrow: string;
  notes: PublicVaultNote[];
  title: string;
};

export default function VaultIndex({ description, eyebrow, notes, title }: Props) {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream text-ink">
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-32 sm:px-10 sm:pt-40">
          <div className="border-t-2 border-line pt-8">
            <p className="kicker kicker-accent">{eyebrow}</p>
            <h1 className="display mt-6 max-w-4xl text-6xl sm:text-7xl">{title}</h1>
            <p className="mt-7 max-w-2xl font-mono text-sm leading-relaxed text-soft">{description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10 sm:pb-36">
          {notes.length ? (
            <div className="border-t-2 border-line">
              {notes.map((note, index) => (
                <article key={note.url} className="border-b-2 border-line">
                  <Link href={note.url} className="group grid gap-4 px-0 py-7 transition-colors duration-200 hover:bg-surface sm:grid-cols-[4rem_minmax(0,1fr)_minmax(12rem,0.5fr)] sm:items-start sm:px-4">
                    <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="kicker kicker-faint">{note.section}</p>
                      <h2 className="display mt-3 text-3xl text-ink transition-colors duration-200 group-hover:text-accent sm:text-4xl">{note.title}</h2>
                    </div>
                    <p className="font-mono text-sm leading-relaxed text-soft">{note.description ?? "Published from the working vault."}</p>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="border-2 border-line p-6 sm:p-8">
              <p className="display text-3xl">Nothing public here yet.</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-soft">Notes stay private until the vault marks them for publication. That boundary is deliberate.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
