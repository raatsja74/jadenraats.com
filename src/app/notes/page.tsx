import type { Metadata } from "next";

import VaultIndex from "@/components/vault/VaultIndex";
import { getPublicNotes } from "@/lib/vault/catalog";

export const metadata: Metadata = {
  title: "Notes — Jaden Raats",
  description: "Public working notes, published directly from Jaden Raats's vault.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <VaultIndex
      eyebrow="notes / public working pages"
      title="Notes from the workbench."
      description="Working notes, systems, and useful receipts. Published from the vault when they are ready to be public."
      notes={getPublicNotes("notes")}
    />
  );
}
