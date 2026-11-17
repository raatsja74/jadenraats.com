import { getGuide } from "@/data/guides";

import { getPublicNotes } from "./catalog";
import type { PublicVaultNote, VaultCatalogOptions } from "./types";

/**
 * Handwritten guides keep ownership of their URL. Refuse an opt-in vault guide
 * collision instead of silently publishing a note that cannot be reached.
 */
export function assertNoVaultGuideSlugCollisions(
  notes: readonly PublicVaultNote[],
): void {
  const collision = notes.find(
    (note) => note.section === "guides" && Boolean(getGuide(note.slug)),
  );
  if (collision) {
    throw new Error(
      `Vault guide slug collides with handwritten guide: /guides/${collision.slug}`,
    );
  }
}

export function getPublishedVaultGuides(
  options?: VaultCatalogOptions,
): PublicVaultNote[] {
  const guides = getPublicNotes("guides", options);
  assertNoVaultGuideSlugCollisions(guides);
  return guides;
}
