import type { Metadata } from "next";
import CollageHome from "./CollageHome";
import "./collage.css";

export const metadata: Metadata = {
  title: "JD Raats",
  description: "JD Raats, from Bigfork to Phoenix. Guides, systems and small experiments, figured out in real life.",
  openGraph: {
    title: "JD Raats",
    description: "JD Raats, from Bigfork to Phoenix. Guides, systems and small experiments, figured out in real life.",
  },
  twitter: {
    title: "JD Raats",
    description: "JD Raats, from Bigfork to Phoenix. Guides, systems and small experiments, figured out in real life.",
  },
};

export default function HomePage() {
  return <CollageHome />;
}
