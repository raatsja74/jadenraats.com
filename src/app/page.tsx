import type { Metadata } from "next";
import CollageHome from "./CollageHome";
import "./collage.css";
import { SHARE_IMAGES } from "@/lib/share-image";

// Updated by Hark | 2026-11-19: search title and description name the guides.
const HOME_TITLE = "JD Raats | Practical AI guides in plain English";
const HOME_DESCRIPTION =
  "Plain-English AI guides from JD Raats, Bigfork to Phoenix. Pick one, follow the steps, and finish one useful task, like turning a messy note into a clear next step.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    url: "https://jadenraats.com",
    description: HOME_DESCRIPTION,
    images: SHARE_IMAGES,
  },
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: SHARE_IMAGES,
  },
};

export default function HomePage() {
  return <CollageHome />;
}
