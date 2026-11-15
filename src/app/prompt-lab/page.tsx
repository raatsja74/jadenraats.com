import type { Metadata } from "next";
import { Suspense } from "react";
import PromptLab from "./PromptLab";
import { SHARE_IMAGES } from "@/lib/share-image";

const TITLE = "AI skills library | Jaden Raats";
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
    images: SHARE_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: SHARE_IMAGES,
  },
};

export default function PromptLabPage() {
  return (
    <Suspense>
      <PromptLab />
    </Suspense>
  );
}
