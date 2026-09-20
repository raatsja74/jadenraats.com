import type { Metadata } from "next";
import CaseStudyPage from "./CaseStudyPage";

const TITLE = "Case study: the AI assistant that broke quietly | Jaden Raats";
const DESCRIPTION =
  "I built a multi-agent AI assistant for my business, watched it fail silently for two weeks, and fixed it by writing the filing rules down. Full write-up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/case-study" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://jadenraats.com/case-study",
    siteName: "jadenraats.com",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function CaseStudyRoute() {
  return <CaseStudyPage />;
}
