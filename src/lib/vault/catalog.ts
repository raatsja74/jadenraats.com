import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
  statSync,
} from "node:fs";
import { basename, dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";

import matter from "gray-matter";

import { maskMarkdownCode } from "./markdown-code";
import type {
  PublicVaultNote,
  ResolvedVaultReference,
  VaultCatalog,
  VaultCatalogOptions,
} from "./types";

export type {
  PublicBacklink,
  PublicVaultCanvas,
  PublicVaultNote,
  ResolvedVaultReference,
  VaultCatalog,
  VaultCatalogOptions,
} from "./types";

interface FolderRule {
  publish?: boolean;
  section?: string;
}

interface VaultPublishConfig {
  excludedFolders: Set<string>;
  folderRules: Map<string, FolderRule>;
}

interface ReferenceTarget {
  heading?: string;
  label?: string;
  target: string;
}

/** Server-only source data for copying a safe public vault attachment at build time. */
export interface VaultAssetSource {
  outputRelativePath: string;
  publicUrl: string;
  sourcePath: string;
}

const CONFIG_FILENAME = "vault.publish.json";
const SAFE_IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);
const DEFAULT_EXCLUDED_FOLDERS = new Set([
  ".git",
  ".obsidian",
  ".trash",
  "00inbox",
  "agent-state",
  "archive",
  "attachments",
  "automation",
  "automations",
  "cache",
  "caches",
  "credentials",
  "daily",
  "databases",
  "private",
  "secrets",
  "system",
  "temp",
  "templates",
  "tmp",
]);
const SUPPORTED_SECTIONS = new Set(["notes", "guides", "projects"]);
const EXTERNAL_URL_PATTERN = /https?:\/\/[^\s<>{}"'`)\]]+/gi;
const LOCAL_PATH_PATTERN = /file:\/+(?:[^/\s]+\/)?(?:Applications|Library|System|Users|bin|dev|etc|home|media|mnt|opt|private|proc|run|sbin|tmp|usr|var|Volumes)\/[^\s\])}>"'`]+|(?<![:/])\/(?:Applications|Library|System|Users|bin|dev|etc|home|media|mnt|opt|private|proc|run|sbin|tmp|usr|var|Volumes)\/[^\s\])}>"'`]+|\\\\[^\s\\/\])}>"'`]+\\[^\s\\/\])}>"'`]+(?:\\[^\s\])}>"'`]+)*|\\(?:Applications|Library|System|Users|bin|dev|etc|home|media|mnt|opt|private|proc|run|sbin|tmp|usr|var|Volumes)(?:\\[^\s\])}>"'`]+)*|(?<![A-Za-z])[A-Za-z]:\\[^\s\])}>"'`]+|(?<![A-Za-z])[A-Za-z]:\/(?!\/)[^\s\])}>"'`]+/gi;

/**
 * Remove machine-local paths before Markdown becomes part of a public record.
 * The source vault itself is never serialized, and this also protects pasted paths.
 */
export function redactLocalPaths(value: string): string {
  const protectedUrls = protectExternalUrls(value);
  return restoreExternalUrls(
    protectedUrls.value.replace(LOCAL_PATH_PATTERN, "[local path removed]"),
    protectedUrls,
  );
}

function protectExternalUrls(value: string): {
  prefix: string;
  urls: string[];
  value: string;
} {
  const urls: string[] = [];
  let prefix = "\u0000vault-external-url:";
  while (value.includes(prefix)) prefix = `\u0000${prefix}`;
  return {
    prefix,
    urls,
    value: value.replace(EXTERNAL_URL_PATTERN, (url) => `${prefix}${urls.push(url) - 1}\u0000`),
  };
}

function restoreExternalUrls(
  value: string,
  protectedUrls: { prefix: string; urls: readonly string[] },
): string {
  return protectedUrls.urls.reduce(
    (result, url, index) => result.split(`${protectedUrls.prefix}${index}\u0000`).join(url),
    value,
  );
}

export function getVaultCatalog(options?: VaultCatalogOptions): VaultCatalog {
  const source = getVaultSource(options);
  if (!source) return { notes: [], canvases: [] };

  const config = readVaultPublishConfig(source);
  const files = walkSafeVaultFiles(source, config.excludedFolders);
  return buildCatalog(source, config, files);
}

export function getPublicNotes(
  section?: string,
  options?: VaultCatalogOptions,
): PublicVaultNote[] {
  const notes = getVaultCatalog(options).notes;
  return section === undefined
    ? notes
    : notes.filter((note) => note.section === normalizeSlug(section));
}

export function getPublicNote(
  section: string | undefined,
  slug: string,
  options?: VaultCatalogOptions,
): PublicVaultNote | undefined {
  return getPublicNotes(section, options).find(
    (note) => note.slug === normalizeSlug(slug),
  );
}

/**
 * Returns only safe image files embedded by public Markdown notes.
 * Source paths are build-time only; callers must expose `publicUrl`, never `sourcePath`.
 */
export function getVaultAssetSources(
  options?: VaultCatalogOptions,
): VaultAssetSource[] {
  const source = getVaultSource(options);
  if (!source) return [];

  const config = readVaultPublishConfig(source);
  const assets = new Map<string, VaultAssetSource>();
  for (const note of getVaultCatalog({ vaultPath: source }).notes) {
    for (const reference of findWikiImageEmbeds(note.body)) {
      const asset = resolveVaultAssetSource(
        source,
        config.excludedFolders,
        note.sourceKey,
        reference,
      );
      if (asset) assets.set(asset.outputRelativePath, asset);
    }
  }

  return [...assets.values()].sort((left, right) =>
    left.outputRelativePath.localeCompare(right.outputRelativePath),
  );
}

/**
 * Resolves only public notes. A private or ambiguous target is deliberately null.
 */
export function resolveVaultReference(
  catalog: VaultCatalog,
  source: string,
  reference: string,
): ResolvedVaultReference | null {
  return resolveReferenceWithIndex(
    buildReferenceIndex(catalog.notes),
    reference,
    source,
  );
}

function getVaultSource(options?: VaultCatalogOptions): string | null {
  const configuredPath = options?.vaultPath ?? process.env.OBSIDIAN_VAULT_PATH;
  if (!configuredPath) return null;

  const source = resolve(configuredPath);
  try {
    return statSync(source).isDirectory() ? source : null;
  } catch {
    return null;
  }
}

function readVaultPublishConfig(source: string): VaultPublishConfig {
  const config: VaultPublishConfig = {
    excludedFolders: new Set(DEFAULT_EXCLUDED_FOLDERS),
    folderRules: new Map(),
  };
  const configPath = resolve(source, CONFIG_FILENAME);
  if (!isContained(source, configPath) || !existsSync(configPath)) return config;

  try {
    const parsed: unknown = JSON.parse(readFileSync(configPath, "utf8"));
    if (!isRecord(parsed)) return config;

    if (Array.isArray(parsed.excludedFolders)) {
      for (const folder of parsed.excludedFolders) {
        if (typeof folder !== "string") continue;
        const key = normalizeRelativeKey(folder);
        if (key) config.excludedFolders.add(key.toLowerCase());
      }
    }

    if (isRecord(parsed.folders)) {
      for (const [folder, value] of Object.entries(parsed.folders)) {
        const key = normalizeRelativeKey(folder);
        if (!key || !isRecord(value)) continue;

        const rule: FolderRule = {};
        if (typeof value.publish === "boolean") rule.publish = value.publish;
        if (typeof value.section === "string") {
          const section = normalizeSlug(value.section);
          if (section) rule.section = section;
        }
        if (rule.publish !== undefined || rule.section !== undefined) {
          config.folderRules.set(key.toLowerCase(), rule);
        }
      }
    }
  } catch {
    // An invalid optional config must not turn a private vault public.
  }

  return config;
}

function walkSafeVaultFiles(source: string, excludedFolders: Set<string>): string[] {
  const files: string[] = [];

  const visit = (directory: string, parentKey: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;

      const key = parentKey ? `${parentKey}/${entry.name}` : entry.name;
      const candidate = resolve(directory, entry.name);
      if (!isContained(source, candidate)) continue;

      if (entry.isDirectory()) {
        if (isExcludedFolder(key, entry.name, excludedFolders)) continue;
        visit(candidate, key);
      } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".md") {
        files.push(key);
      }
    }
  };

  visit(source, "");
  return files.sort((left, right) => left.localeCompare(right));
}

function buildCatalog(
  source: string,
  config: VaultPublishConfig,
  files: string[],
): VaultCatalog {
  const notes: PublicVaultNote[] = [];

  for (const sourceKey of files) {
    const sourcePath = resolve(source, sourceKey);
    if (!isContained(source, sourcePath)) continue;

    const parsed = matter(readFileSync(sourcePath, "utf8"));
    const data = isRecord(parsed.data) ? parsed.data : {};
    const folderRule = getInheritedFolderRule(sourceKey, config.folderRules);
    if (isPrivateNote(data.private)) continue;
    const publish = typeof data.publish === "boolean" ? data.publish : folderRule?.publish;
    if (publish !== true) continue;

    const defaultTitle = basename(sourceKey, extname(sourceKey));
    const title = redactLocalPaths(
      typeof data.title === "string" && data.title.trim()
        ? data.title.trim()
        : defaultTitle,
    );
    const slug = normalizeSlug(
      typeof data.slug === "string" && data.slug.trim() ? data.slug : defaultTitle,
    );
    if (!slug) continue;

    const requestedSection = normalizeSlug(
      typeof data.section === "string" && data.section.trim()
        ? data.section
        : folderRule?.section ?? "notes",
    );
    const section = SUPPORTED_SECTIONS.has(requestedSection)
      ? requestedSection
      : "notes";
    const description =
      typeof data.description === "string" && data.description.trim()
        ? redactLocalPaths(data.description.trim())
        : undefined;
    const updatedAt = statSync(sourcePath).mtime.toISOString();

    notes.push({
      title,
      slug,
      section,
      description,
      body: redactLocalPaths(parsed.content),
      sourceKey,
      url: publicUrl(section, slug),
      updatedAt,
      backlinks: [],
    });
  }

  notes.sort((left, right) => left.slug.localeCompare(right.slug));
  assertUniquePublicUrls(notes);
  const index = buildReferenceIndex(notes);

  for (const note of notes) {
    for (const reference of findWikiReferences(note.body)) {
      const resolved = resolveReferenceWithIndex(index, reference, note.sourceKey);
      if (!resolved) continue;
      const target = notes.find((candidate) => candidate.url === stripFragment(resolved.href));
      if (!target || target.sourceKey === note.sourceKey) continue;

      target.backlinks.push({
        sourceKey: note.sourceKey,
        slug: note.slug,
        title: note.title,
        url: note.url,
      });
    }
  }

  for (const note of notes) {
    note.backlinks.sort((left, right) => left.url.localeCompare(right.url));
  }

  return { notes, canvases: [] };
}

function buildReferenceIndex(notes: PublicVaultNote[]): Map<string, PublicVaultNote[]> {
  const index = new Map<string, PublicVaultNote[]>();
  for (const note of notes) {
    const sourceWithoutExtension = note.sourceKey.replace(/\.md$/i, "");
    const filename = basename(note.sourceKey);
    const filenameWithoutExtension = basename(sourceWithoutExtension);
    for (const value of [
      note.sourceKey,
      sourceWithoutExtension,
      filename,
      filenameWithoutExtension,
      note.slug,
      note.title,
    ]) {
      const key = referenceKey(value);
      if (!key) continue;
      const matches = index.get(key) ?? [];
      if (!matches.some((candidate) => candidate.sourceKey === note.sourceKey)) {
        matches.push(note);
      }
      index.set(key, matches);
    }
  }
  return index;
}

function resolveReferenceWithIndex(
  index: Map<string, PublicVaultNote[]>,
  reference: string,
  source?: string,
): ResolvedVaultReference | null {
  const parsed = parseReference(reference);
  if (!parsed) return null;
  const sourceRelativeMatches = source
    ? getSourceRelativeMatches(index, source, parsed.target)
    : undefined;
  const matches = sourceRelativeMatches ?? index.get(referenceKey(parsed.target));
  if (!matches || matches.length !== 1) return null;

  const note = matches[0];
  return resolvedNoteReference(note, parsed);
}

function getSourceRelativeMatches(
  index: Map<string, PublicVaultNote[]>,
  source: string,
  target: string,
): PublicVaultNote[] | undefined {
  if (target.includes("/")) return undefined;
  const sourceKey = normalizeRelativeKey(source);
  if (!sourceKey) return undefined;

  const folder = dirname(sourceKey).replace(new RegExp(escapeRegExp(sep), "g"), "/");
  if (!folder || folder === ".") return undefined;
  return index.get(referenceKey(`${folder}/${target}`));
}

function resolvedNoteReference(
  note: PublicVaultNote,
  parsed: ReferenceTarget,
): ResolvedVaultReference {
  return {
    href: `${note.url}${parsed.heading ? `#${normalizeSlug(parsed.heading)}` : ""}`,
    label: redactLocalPaths(parsed.label ?? note.title),
    title: note.title,
  };
}

function parseReference(reference: string): ReferenceTarget | null {
  const unwrapped = reference.trim().replace(/^!?(?:\[\[)?/, "").replace(/(?:\]\])?$/, "");
  if (!unwrapped) return null;

  const [targetAndHeading, ...labelParts] = unwrapped.split("|");
  const [target, ...headingParts] = targetAndHeading.split("#");
  const normalizedTarget = target.trim();
  if (!normalizedTarget) return null;

  const label = labelParts.join("|").trim();
  const heading = headingParts.join("#").trim();
  return {
    target: normalizedTarget,
    ...(label ? { label } : {}),
    ...(heading ? { heading } : {}),
  };
}

function findWikiReferences(body: string): string[] {
  return [...maskMarkdownCode(body).matchAll(/(?<!!)\[\[([^\]]+)\]\]/g)].map(
    (match) => match[1],
  );
}

function findWikiImageEmbeds(body: string): string[] {
  return [...body.matchAll(/!\[\[([^\]]+)\]\]/g)].map((match) => match[1]);
}

function resolveVaultAssetSource(
  source: string,
  excludedFolders: Set<string>,
  noteSourceKey: string,
  reference: string,
): VaultAssetSource | null {
  const parsed = parseReference(reference);
  if (!parsed) return null;

  const targetKey = normalizeRelativeKey(parsed.target);
  if (
    !targetKey ||
    !SAFE_IMAGE_EXTENSIONS.has(extname(targetKey).toLowerCase()) ||
    !isAllowedAssetKey(targetKey, excludedFolders)
  ) {
    return null;
  }

  const sourceRealPath = safeRealPath(source);
  if (!sourceRealPath) return null;

  for (const outputRelativePath of getAssetCandidateKeys(noteSourceKey, targetKey)) {
    const sourcePath = resolve(source, outputRelativePath);
    if (!isContained(source, sourcePath)) continue;

    const resolvedSourcePath = safeRealPath(sourcePath);
    if (
      !resolvedSourcePath ||
      !isContained(sourceRealPath, resolvedSourcePath) ||
      !isRegularFile(resolvedSourcePath)
    ) {
      continue;
    }

    return {
      outputRelativePath,
      publicUrl: publicAssetUrl(outputRelativePath),
      sourcePath: resolvedSourcePath,
    };
  }

  return null;
}

function isAllowedAssetKey(key: string, excludedFolders: Set<string>): boolean {
  const components = key.split("/");
  for (let index = 0; index < components.length; index += 1) {
    const component = components[index];
    const normalizedComponent = component.toLowerCase();
    const normalizedPath = components.slice(0, index + 1).join("/").toLowerCase();

    if (component.startsWith(".")) return false;
    // Attachments remain default-deny for discovery, but a public note may approve
    // one specific attachment by embedding it directly.
    if (normalizedComponent === "attachments") continue;
    if (
      excludedFolders.has(normalizedComponent) ||
      excludedFolders.has(normalizedPath)
    ) {
      return false;
    }
  }
  return true;
}

function publicAssetUrl(outputRelativePath: string): string {
  return `/assets/vault/${outputRelativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function getAssetCandidateKeys(noteSourceKey: string, targetKey: string): string[] {
  const candidates = [targetKey];
  const folder = dirname(noteSourceKey).replace(new RegExp(escapeRegExp(sep), "g"), "/");
  if (folder && folder !== ".") {
    const relativeKey = normalizeRelativeKey(`${folder}/${targetKey}`);
    if (relativeKey && relativeKey !== targetKey) candidates.unshift(relativeKey);
  }
  return candidates;
}

function safeRealPath(value: string): string | null {
  try {
    return realpathSync(value);
  } catch {
    return null;
  }
}

function isRegularFile(value: string): boolean {
  try {
    return statSync(value).isFile();
  } catch {
    return false;
  }
}

function getInheritedFolderRule(
  sourceKey: string,
  rules: Map<string, FolderRule>,
): FolderRule | undefined {
  const inherited: FolderRule = {};
  let folder = dirname(sourceKey).replace(new RegExp(escapeRegExp(sep), "g"), "/");
  while (folder && folder !== ".") {
    const rule = rules.get(folder.toLowerCase());
    if (rule) {
      if (inherited.publish === undefined && rule.publish !== undefined) {
        inherited.publish = rule.publish;
      }
      if (inherited.section === undefined && rule.section !== undefined) {
        inherited.section = rule.section;
      }
    }
    folder = dirname(folder).replace(new RegExp(escapeRegExp(sep), "g"), "/");
  }
  return inherited.publish === undefined && inherited.section === undefined
    ? undefined
    : inherited;
}

function isExcludedFolder(
  key: string,
  name: string,
  excludedFolders: Set<string>,
): boolean {
  return (
    excludedFolders.has(name.toLowerCase()) ||
    excludedFolders.has(key.toLowerCase())
  );
}

function isContained(source: string, candidate: string): boolean {
  const rel = relative(source, candidate);
  return (
    rel === "" ||
    (!rel.startsWith(`..${sep}`) && rel !== ".." && !isAbsolute(rel))
  );
}

function normalizeRelativeKey(value: string): string | null {
  const key = value.trim().replace(/\\/g, "/").replace(/^\.\//, "");
  if (!key || key.startsWith("/") || key.split("/").some((part: string) => !part || part === "." || part === "..")) {
    return null;
  }
  return key;
}

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isPrivateNote(value: unknown): boolean {
  return value === true || (typeof value === "string" && value.trim().toLowerCase() === "true");
}

function referenceKey(value: string): string {
  return value.trim().replace(/\\/g, "/").toLowerCase();
}

function publicUrl(section: string, slug: string): string {
  return `/${section}/${slug}`;
}

function assertUniquePublicUrls(notes: PublicVaultNote[]): void {
  const urls = new Set<string>();
  for (const note of notes) {
    if (urls.has(note.url)) {
      throw new Error(`Duplicate published vault URL: ${note.url}`);
    }
    urls.add(note.url);
  }
}

function stripFragment(url: string): string {
  return url.split("#", 1)[0];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
