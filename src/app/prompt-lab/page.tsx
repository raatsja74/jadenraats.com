import type { Metadata } from "next";
import { Suspense } from "react";
import PromptLab from "./PromptLab";

const TITLE = "The Lab — Skills & Prompt Library | Jaden Raats";
const DESCRIPTION =
  "A public database of the AI skills, prompts, workflows, and agent instructions Jaden actually uses to run a business. Copy any prompt or request a skill.";

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