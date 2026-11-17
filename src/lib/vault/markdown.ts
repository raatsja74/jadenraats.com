import { basename, dirname, extname } from "node:path";

import { redactLocalPaths, resolveVaultReference } from "./catalog";
import { protectMarkdownCode, restoreMarkdownCode } from "./markdown-code";
import type { VaultCatalog } from "./types";

/**
 * The browser only needs these public fields. `VaultAssetSource.sourcePath` is
 * intentionally excluded so local build paths can never reach a rendered page.
 */
export interface PublicVaultAsset {
  outputRelativePath: string;
  publicUrl: string;
}

const UNPUBLISHED_REFERENCE = "unpublished reference";
const UNAVAILABLE_ATTACHMENT = "attachment unavailable";

/**
 * Converts Obsidian wiki syntax to ordinary, safe Markdown before it reaches
 * ReactMarkdown. Only catalog-approved notes and asset URLs become links.
 */
export function rewriteObsidianMarkdown(
  markdown: string,
  catalog: VaultCatalog,
  sourceKey: string,
  assets: readonly PublicVaultAsset[] = [],
): string {
  const assetUrls = new Map(
    assets.map((asset) => [asset.outputRelativePath.toLowerCase(), asset.publicUrl]),
  );
  const protectedCode = protectMarkdownCode(markdown);

  const withEmbeds = protectedCode.value.replace(/!\[\[([^\]]+)\]\]/g, (_match, reference) => {
    const resolved = resolveEmbeddedAsset(String(reference), sourceKey, assetUrls);
    if (!resolved) return UNAVAILABLE_ATTACHMENT;
    return `![${resolved.alt}](${resolved.href})`;
  });

  const withLinks = withEmbeds.replace(/\[\[([^\]]+)\]\]/g, (_match, reference) => {
    const resolved = resolveVaultReference(catalog, sourceKey, String(reference));
    if (!resolved) return UNPUBLISHED_REFERENCE;
    return `[${escapeMarkdownLabel(resolved.label)}](${resolved.href})`;
  });
  return restoreMarkdownCode(withLinks, protectedCode);
}

function resolveEmbeddedAsset(
  reference: string,
  sourceKey: string,
  assetUrls: ReadonlyMap<string, string>,
): { alt: string; href: string } | null {
  const [targetPart, ...labelParts] = reference.split("|");
  const target = normalizeRelativeKey(targetPart ?? "");
  if (!target) return null;

  const candidates = [target];
  const folder = dirname(sourceKey).replace(/\\/g, "/");
  if (folder && folder !== ".") candidates.unshift(`${folder}/${target}`);

  const href = candidates
    .map((candidate) => assetUrls.get(candidate.toLowerCase()))
    .find((url): url is string => Boolean(url));
  if (!href) return null;

  const label = labelParts.join("|").trim();
  const fallback = basename(target, extname(target));
  return { alt: redactLocalPaths(label || fallback), href };
}

function normalizeRelativeKey(value: string): string | null {
  const key = value.trim().replace(/\\/g, "/").replace(/^\.\//, "");
  if (
    !key ||
    key.startsWith("/") ||
    key.split("/").some((part) => !part || part === "." || part === "..")
  ) {
    return null;
  }
  return key;
}

function escapeMarkdownLabel(value: string): string {
  return redactLocalPaths(value).replace(/[\[\]\\]/g, "\\$&");
}
