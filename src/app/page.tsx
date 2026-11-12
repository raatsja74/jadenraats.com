import type { Metadata } from "next";
import CollageHome from "./CollageHome";
import "../tokens/paper.css";
import "./collage.css";

const title = "Jaden Raats | A few things about me";
const description = "Things I build, things I learn, and useful guides from my life and work.";
export const metadata: Metadata = {
  title, description,
  openGraph: { title, description, url: "https://jadenraats.com", type: "website", images: [{ url: "/home/portrait.webp", width: 800, height: 800, alt: "Jaden Raats" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/home/portrait.webp"] },
};

export default function HomePage() {
  return <CollageHome />;
}
