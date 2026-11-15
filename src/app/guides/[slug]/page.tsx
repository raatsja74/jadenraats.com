import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideArticle from "./GuideArticle";
import { getGuide, getGuideSlugs } from "@/data/guides";
import { SHARE_IMAGES } from "@/lib/share-image";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
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
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
