export interface VaultCatalogOptions {
  /** A local build-time source. It is never included in public catalog records. */
  vaultPath?: string;
}

export interface PublicBacklink {
  sourceKey: string;
  slug: string;
  title: string;
  url: string;
}

export interface PublicVaultNote {
  title: string;
  slug: string;
  section: string;
  description?: string;
  body: string;
  sourceKey: string;
  url: string;
  updatedAt: string;
  backlinks: PublicBacklink[];
}

/** Reserved for native Canvas records, which are added by the Canvas publisher. */
export interface PublicVaultCanvas {
  title: string;
  slug: string;
  description?: string;
  url: string;
  updatedAt: string;
}

export interface VaultCatalog {
  notes: PublicVaultNote[];
  canvases: PublicVaultCanvas[];
}

export interface ResolvedVaultReference {
  href: string;
  label: string;
  title: string;
}
