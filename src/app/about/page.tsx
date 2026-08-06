import type { Metadata } from "next";
import AboutContent from "./AboutContent";

const TITLE = "Jaden Raats — AI Automation Entrepreneur & Owner, Award Coatings";
const DESCRIPTION =
  "Jaden Raats builds AI automation for service businesses. He owns Award Coatings, a floor coating company in Phoenix, and runs every system there before sharing it.";

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
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/** Canonical identity graph. Every off-site profile points here; this points back
 *  at every off-site profile. Keep `sameAs` in sync with the Elsewhere list. */
const PROFILE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": "https://jadenraats.com/about#jaden-raats",
    name: "Jaden Raats",
    url: "https://jadenraats.com/about",
    jobTitle: "AI Automation Entrepreneur & Owner, Award Coatings",
    description: DESCRIPTION,
    email: "mailto:me@jadenraats.com",
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
