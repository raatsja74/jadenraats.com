import type { Metadata } from "next";
import SystemsPage from "./SystemsPage";
import { SHARE_IMAGES } from "@/lib/share-image";

const TITLE = "How I use AI at work | Jaden Raats";
const DESCRIPTION =
  "See how I use AI for customer follow-up, quotes, and tasks at Award Coatings. Browse the guides, skills, and prompts I use.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/systems" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://jadenraats.com/systems",
    siteName: "jadenraats.com",
    locale: "en_US",
    type: "website",
    images: SHARE_IMAGES,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: SHARE_IMAGES },
};

export default function Page() {
  return <SystemsPage />;
}
