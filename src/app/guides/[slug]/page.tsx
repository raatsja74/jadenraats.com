import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideArticle from "./GuideArticle";
import { getGuide, getGuideSlugs } from "@/data/guides";
import { SHARE_IMAGES } from "@/lib/share-image";
import VaultArticle from "@/components/vault/VaultArticle";
import { getVaultAssetSources, getVaultCatalog, getPublicNote } from "@/lib/vault/catalog";
import { assertNoVaultGuideSlugCollisions, getPublishedVaultGuides } from "@/lib/vault/guides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...new Set([
    ...getGuideSlugs(),
    ...getPublishedVaultGuides().map((note) => note.slug),
  ])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  const vaultGuide = getPublicNote("guides", slug);
  if (!guide && !vaultGuide) return {};

  if (vaultGuide && !guide) {
    return {
      title: `${vaultGuide.title} — Guides`,
      description: vaultGuide.description,
      alternates: { canonical: vaultGuide.url },
      openGraph: {
        title: vaultGuide.title,
        description: vaultGuide.description,
        url: vaultGuide.url,
        siteName: "jadenraats.com",
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: vaultGuide.title,
        description: vaultGuide.description,
      },
    };
  }

  if (!guide) return {};
  const title = `${guide.title} — Guides`;
  const description = guide.summary;
  const url = `https://jadenraats.com/guides/${guide.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title,
      description,
      url,
      siteName: "jadenraats.com",
      locale: "en_US",
      type: "article",
      publishedTime: guide.published,
      images: SHARE_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: SHARE_IMAGES,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const catalog = getVaultCatalog();
  assertNoVaultGuideSlugCollisions(catalog.notes);
  const guide = getGuide(slug);
  if (guide) return <GuideArticle guide={guide} />;

  const vaultGuide = catalog.notes.find(
    (note) => note.section === "guides" && note.slug === slug,
  );
  if (!vaultGuide) notFound();
  const assets = getVaultAssetSources().map(({ outputRelativePath, publicUrl }) => ({ outputRelativePath, publicUrl }));
  return <VaultArticle assets={assets} catalog={catalog} note={vaultGuide} />;
}
