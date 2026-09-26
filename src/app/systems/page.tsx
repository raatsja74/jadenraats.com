import type { Metadata } from "next";
import SystemsPage from "./SystemsPage";

const TITLE = "Systems for Thinking, Working & Shipping | Jaden Raats";
const DESCRIPTION =
  "Working guides and practical AI workflows, built from systems I use.";

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
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function Page() {
  return <SystemsPage />;
}
