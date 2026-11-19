import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { SHARE_IMAGES } from "@/lib/share-image";

// Updated by Hark | 2026-11-19: plainer, personable search title; no em dash.
const TITLE = "About Jaden Raats | Award Coatings owner, Bigfork to Phoenix";
const DESCRIPTION =
  "Jaden (JD) Raats owns Award Coatings, a floor coating company in Phoenix. He tests every AI system in his own business first, then writes it up as a plain-English guide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://jadenraats.com/about",
    siteName: "jadenraats.com",
    locale: "en_US",
    type: "profile",
    images: SHARE_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: SHARE_IMAGES,
  },
};

const PROFILE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": "https://jadenraats.com/about#jaden-raats",
    name: "Jaden Raats",
    url: "https://jadenraats.com/about",
    jobTitle: "Owner, Award Coatings",
    description: DESCRIPTION,
    email: "mailto:ai@jadenraats.com",
    knowsAbout: [
      "AI automation for service businesses",
      "AI agents",
      "Small business operations",
      "Floor coatings",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phoenix",
      addressRegion: "AZ",
      addressCountry: "US",
    },
    worksFor: {
      "@type": "Organization",
      name: "Award Coatings",
      url: "https://awardcoatings.com",
      areaServed: "Phoenix–Scottsdale, Arizona",
    },
    sameAs: [
      "https://www.linkedin.com/in/jaden-raats-b6361213a",
      "https://github.com/raatsja74",
      "https://awardcoatings.com",
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFILE_SCHEMA) }}
      />
      <AboutContent />
    </>
  );
}
