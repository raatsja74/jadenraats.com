import type { Metadata } from "next";
import { Suspense } from "react";
import PromptLab from "./PromptLab";

const TITLE = "AI Skills Library | Jaden Raats";
const DESCRIPTION =
  "Copy prompts and skills to personalize your AI agent. Plain list, no sales copy.";

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
  return (
    <Suspense>
      <PromptLab />
    </Suspense>
  );
}
