import type { Metadata } from "next";

import VaultIndex from "@/components/vault/VaultIndex";
import { getPublicNotes } from "@/lib/vault/catalog";

export const metadata: Metadata = {
  title: "Projects — Jaden Raats",
  description: "Projects and build notes published from Jaden Raats's vault.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <VaultIndex
      eyebrow="projects / field reports"
      title="Things that have to work."
      description="Build notes and project records. Not a trophy case — receipts from the work."
      notes={getPublicNotes("projects")}
    />
  );
}
