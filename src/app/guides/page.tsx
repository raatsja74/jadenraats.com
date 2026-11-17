import type { Metadata } from "next";
import GuidesIndex from "./GuidesIndex";
import { SHARE_IMAGES } from "@/lib/share-image";
import { getPublishedVaultGuides } from "@/lib/vault/guides";

const TITLE = "Free guides to learn AI | Jaden Raats";
const DESCRIPTION = "Step-by-step AI guides you can follow. No sales copy.";

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
  return <GuidesIndex vaultGuides={getPublishedVaultGuides().map(({ url, title, description }) => ({ url, title, description }))} />;
}
