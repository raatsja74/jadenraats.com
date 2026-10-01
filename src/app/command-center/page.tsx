import type { Metadata } from "next";
import CommandCenter from "./CommandCenter";

export const metadata: Metadata = {
  title: "Agent Command Center | Jaden Raats",
  description: "Open Jaden’s private workspace for agent tasks, runs, questions, and schedules.",
  alternates: { canonical: "/command-center" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Agent Command Center | Jaden Raats",
    description: "A private workspace for agent tasks, runs, questions, and schedules.",
    url: "https://jadenraats.com/command-center",
  },
};

export default function Page() {
  return <CommandCenter />;
}
