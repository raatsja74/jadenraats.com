import type { Metadata } from "next";
import CaptureVaultMap from "./CaptureVaultMap";
import { SHARE_IMAGES } from "@/lib/share-image";

const TITLE = "CaptureVault — Interactive Mind Map | Jaden Raats";
const DESCRIPTION =
  "Interactive map of the CaptureVault system: capture → process → context → handoff → session → update. A clearer mind builds a brighter tomorrow.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/capturevault" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://jadenraats.com/capturevault",
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

export default function CaptureVaultPage() {
  return <CaptureVaultMap />;
}
