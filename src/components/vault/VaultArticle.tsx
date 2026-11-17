import Link from "next/link";

import Nav from "@/components/Nav";
import type { PublicVaultAsset } from "@/lib/vault/markdown";
import type { PublicVaultNote, VaultCatalog } from "@/lib/vault/types";
import VaultMarkdown from "./VaultMarkdown";

type Props = {
  assets: readonly PublicVaultAsset[];
  catalog: VaultCatalog;
  note: PublicVaultNote;
};

export default function VaultArticle({ assets, catalog, note }: Props) {
  const indexUrl = `/${note.section}`;
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream text-ink">
        <article className="mx-auto max-w-3xl px-6 pb-28 pt-32 sm:px-10 sm:pb-36 sm:pt-40">
          <p className="kicker kicker-accent">
            <Link href={indexUrl} className="hover:text-ink">{note.section}</Link>
            <span className="text-faint"> / </span>
            published vault
          </p>
          <h1 className="display mt-8 text-5xl sm:text-6xl">{note.title}</h1>
          {note.description ? <p className="mt-7 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">{note.description}</p> : null}
          <p className="kicker kicker-faint mt-7">Updated {formatDate(note.updatedAt)}</p>

          <div className="mt-12 border-t-2 border-line pt-1">
            <VaultMarkdown assets={assets} body={note.body} catalog={catalog} sourceKey={note.sourceKey} />
          </div>

          {note.backlinks.length ? (
            <section className="mt-16 border-t-2 border-line pt-8" aria-labelledby="linked-from">
              <h2 id="linked-from" className="display text-3xl">Linked from</h2>
              <ul className="mt-5 border-t-2 border-line">
                {note.backlinks.map((backlink) => (
                  <li key={backlink.url} className="border-b-2 border-line">
                    <Link href={backlink.url} className="flex min-h-[44px] items-center justify-between gap-4 px-3 py-3 font-mono text-sm hover:bg-surface">
                      <span>{backlink.title}</span><span aria-hidden="true" className="text-accent">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </main>
    </>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "recently"
    : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}
