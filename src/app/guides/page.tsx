import type { Metadata } from "next";
import GuidesIndex from "./GuidesIndex";

const TITLE = "Guides — AI playbooks for business owners";
const DESCRIPTION =
  "Practical AI systems and plain-English playbooks for owners who want real work done — tested in a floor coating company first.";

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
