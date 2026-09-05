import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideArticle from "./GuideArticle";
import { getGuide, getGuideSlugs } from "@/data/guides";

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
