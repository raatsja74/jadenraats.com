import type { Metadata } from "next";
import DeskTracker, { type DeskData } from "./DeskTracker";
import { DESK_DATA_URL } from "./constants";

const TITLE = "Memecoin desk: six AI agents, paper money | Jaden Raats";
const DESCRIPTION =
  "A six-agent Solana memecoin trading desk running on paper money. Live balance, every trade, and every version that failed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/desk" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://jadenraats.com/desk",
    siteName: "jadenraats.com",
    locale: "en_US",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const revalidate = 60;

async function getInitial(): Promise<DeskData | null> {
  try {
    const res = await fetch(DESK_DATA_URL, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as DeskData;
  } catch {
    return null;
  }
}

export default async function DeskRoute() {
  return <DeskTracker initial={await getInitial()} />;
}
