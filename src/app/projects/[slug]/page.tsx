import type { Metadata } from "next";
import { notFound } from "next/navigation";

import VaultArticle from "@/components/vault/VaultArticle";
import { getVaultAssetSources, getVaultCatalog, getPublicNote } from "@/lib/vault/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getVaultCatalog().notes
    .filter((note) => note.section === "projects")
    .map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublicNote("projects", slug);
  if (!note) return {};
  return {
    title: `${note.title} — Projects`,
    description: note.description,
    alternates: { canonical: note.url },
    openGraph: { title: note.title, description: note.description, url: note.url, type: "article" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const catalog = getVaultCatalog();
  const note = catalog.notes.find((candidate) => candidate.section === "projects" && candidate.slug === slug);
  if (!note) notFound();

  const assets = getVaultAssetSources().map(({ outputRelativePath, publicUrl }) => ({ outputRelativePath, publicUrl }));
  return <VaultArticle assets={assets} catalog={catalog} note={note} />;
}
