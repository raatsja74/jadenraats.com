import type { Metadata } from "next";
import GuidesIndex from "./GuidesIndex";

const TITLE = "Free Guides to Learn AI | Jaden Raats";
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
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function GuidesPage() {
  return <GuidesIndex />;
}
