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

  const title = `${guide.title} | Jaden Raats`;
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
      modifiedTime: guide.updated ?? guide.published,
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
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    url: `https://jadenraats.com/guides/${guide.slug}`,
    mainEntityOfPage: `https://jadenraats.com/guides/${guide.slug}`,
    image: `https://jadenraats.com${guide.image}`,
    datePublished: guide.published,
    dateModified: guide.updated ?? guide.published,
    author: {
      "@type": "Person",
      "@id": "https://jadenraats.com/about#jaden-raats",
      name: "Jaden Raats",
      url: "https://jadenraats.com/about",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <GuideArticle guide={guide} />
    </>
  );
}
