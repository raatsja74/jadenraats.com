import type { Metadata } from "next";
import GuidesIndex from "./GuidesIndex";
import { SHARE_IMAGES } from "@/lib/share-image";

// Updated by Hark | 2026-11-19: title matches the page heading.
const TITLE = "Practical AI guides in plain English | Jaden Raats";
const DESCRIPTION =
  "Free step-by-step AI guides you can follow today. Pick one and finish one useful task, from a messy note to a follow-up that gets sent. No sales copy.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://jadenraats.com/guides",
    siteName: "jadenraats.com",
    locale: "en_US",
    type: "website",
    images: SHARE_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: SHARE_IMAGES,
  },
};

export default function GuidesPage() {
  return <GuidesIndex />;
}
