import type { Metadata } from "next";
import PromptLab from "./PromptLab";

const TITLE = "Prompt Lab — Jaden Raats";
const DESCRIPTION =
  "Forty prompts across eight categories for stress-testing how far a language model will commit to a strange idea, instead of hedging.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/prompt-lab" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://jadenraats.com/prompt-lab",
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

export default function PromptLabPage() {
  return <PromptLab />;
}
