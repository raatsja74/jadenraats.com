import type { Metadata } from "next";
import CollageHome from "./CollageHome";
import "./collage.css";

export const metadata: Metadata = {
  title: "Jaden Raats | I build AI systems that work in real life",
  description: "Practical AI systems, step-by-step guides and experiments from Jaden Raats, tested in a real business.",
};

export default function HomePage() {
  return <CollageHome />;
}
