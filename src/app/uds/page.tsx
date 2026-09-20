import type { Metadata } from "next";
import UdsContent from "./UdsContent";

const TITLE = "Universal Design System — Jaden Raats";
const DESCRIPTION =
  "Canonical Jaden-facing home for the Universal Design System: semantic tokens, editorial-operational brutalism, and the rules that keep every surface on one visual language.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/uds" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://jadenraats.com/uds",
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

export default function UdsPage() {
  return <UdsContent />;
}
