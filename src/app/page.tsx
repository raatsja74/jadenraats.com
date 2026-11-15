import type { Metadata } from "next";
import CollageHome from "./CollageHome";
import "./collage.css";
import { SHARE_IMAGES } from "@/lib/share-image";

export const metadata: Metadata = {
  title: "JD Raats",
  description: "JD Raats, from Bigfork to Phoenix. Guides, systems and small experiments, figured out in real life.",
  openGraph: {
    title: "JD Raats",
    url: "https://jadenraats.com",
    description: "JD Raats, from Bigfork to Phoenix. Guides, systems and small experiments, figured out in real life.",
    images: SHARE_IMAGES,
  },
  twitter: {
    title: "JD Raats",
    description: "JD Raats, from Bigfork to Phoenix. Guides, systems and small experiments, figured out in real life.",
    images: SHARE_IMAGES,
  },
};

export default function HomePage() {
  return <CollageHome />;
}
