import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  getVaultAssetSources,
  getVaultCatalog,
  redactLocalPaths,
  resolveVaultReference,
} from "@/lib/vault/catalog";
import { assertNoVaultGuideSlugCollisions } from "@/lib/vault/guides";
import { rewriteObsidianMarkdown } from "@/lib/vault/markdown";
import type { PublicVaultNote } from "@/lib/vault/types";

const fixtureVault = fileURLToPath(new URL("./fixtures/vault", import.meta.url));
const duplicateVault = fileURLToPath(
  new URL("./fixtures/duplicate-vault", import.meta.url),
);
const generatedVaultAssets = resolve(process.cwd(), "public/assets/vault");

test("returns only safe images referenced by public notes", () => {
  const assets = getVaultAssetSources({ vaultPath: fixtureVault });

  assert.deepEqual(
    assets.map((asset) => asset.publicUrl),
    [
      "/assets/vault/assets/diagram%3F.svg",
      "/assets/vault/assets/diagram.svg",
      "/assets/vault/Attachments/foo.png",
    ],
  );
});

test("sync clears stale generated vault assets before copying approved files", () => {
  rmSync(generatedVaultAssets, { force: true, recursive: true });

  try {
    mkdirSync(generatedVaultAssets, { recursive: true });
    writeFileSync(resolve(generatedVaultAssets, "stale.svg"), "stale");
    runVaultSync(fixtureVault);

    const outputPath = resolve(generatedVaultAssets, "assets/diagram.svg");
    assert.equal(existsSync(outputPath), true);
    assert.equal(
      existsSync(resolve(generatedVaultAssets, "assets/diagram?.svg")),
      true,
    );
    assert.equal(
      existsSync(resolve(generatedVaultAssets, "Attachments/foo.png")),
      true,
    );
    assert.equal(existsSync(resolve(generatedVaultAssets, "stale.svg")), false);
    assert.equal(
      readFileSync(outputPath, "utf8"),
      readFileSync(resolve(fixtureVault, "assets/diagram.svg"), "utf8"),
    );
  } finally {
    rmSync(generatedVaultAssets, { force: true, recursive: true });
  }
});

test("invalid configured vault source stops the build and leaves generated assets untouched", () => {
  rmSync(generatedVaultAssets, { force: true, recursive: true });

  try {
    mkdirSync(generatedVaultAssets, { recursive: true });
    const stalePath = resolve(generatedVaultAssets, "stale.svg");
    writeFileSync(stalePath, "stale");
    assert.throws(() => runVaultSync(resolve(fixtureVault, "assets/diagram.svg")));

    assert.equal(readFileSync(stalePath, "utf8"), "stale");
    assert.throws(() => runVaultSync(resolve(fixtureVault, "does-not-exist")));
    assert.equal(readFileSync(stalePath, "utf8"), "stale");
  } finally {
    rmSync(generatedVaultAssets, { force: true, recursive: true });
  }
});

test("disabled vault publishing clears previously generated assets", () => {
  mkdirSync(generatedVaultAssets, { recursive: true });
  writeFileSync(resolve(generatedVaultAssets, "stale.svg"), "stale");
  try {
    runVaultSync("");
    assert.equal(existsSync(generatedVaultAssets), false);
  } finally {
    rmSync(generatedVaultAssets, { force: true, recursive: true });
  }
});

function runVaultSync(vaultPath: string): void {
  execFileSync("npm", ["run", "vault:sync"], {
    cwd: process.cwd(),
    env: { ...process.env, OBSIDIAN_VAULT_PATH: vaultPath },
    stdio: "pipe",
  });
}

test("publishes only frontmatter or folder-approved notes", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });

  assert.deepEqual(
    catalog.notes.map((note) => note.slug),
    [
      "elsewhere-target",
      "folder-note",
      "inherited-guide",
      "links-source",
      "links-target",
      "published-note",
      "unsupported-section",
    ],
  );
  assert.equal(
    catalog.notes.find((note) => note.slug === "private-note"),
    undefined,
  );
  assert.equal(
    catalog.notes.find((note) => note.slug === "unpublished-note"),
    undefined,
  );
  assert.equal(
    catalog.notes.find((note) => note.slug === "archived-note"),
    undefined,
  );
  assert.equal(
    catalog.notes.find((note) => note.slug === "inbox-note"),
    undefined,
  );
  assert.equal(
    catalog.notes.find((note) => note.slug === "private-flag"),
    undefined,
  );
  assert.equal(
    catalog.notes.find((note) => note.slug === "explicitly-private"),
    undefined,
  );
  assert.equal(
    catalog.notes.find((note) => note.slug === "private-string"),
    undefined,
  );
});

test("falls unsupported public sections back to the Notes route", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });
  const note = catalog.notes.find((candidate) => candidate.slug === "unsupported-section");

  assert.equal(note?.section, "notes");
  assert.equal(note?.url, "/notes/unsupported-section");
});

test("inherits folder publication and section fields independently", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });
  const guide = catalog.notes.find((note) => note.slug === "inherited-guide");

  assert.equal(guide?.section, "guides");
  assert.equal(guide?.url, "/guides/inherited-guide");
});

test("keeps private wiki-link targets out of public URLs", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });

  assert.equal(
    resolveVaultReference(catalog, "Published Note.md", "Private Note"),
    null,
  );
});

test("rewrites public wiki links and public image embeds into public URLs", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });
  const assets = getVaultAssetSources({ vaultPath: fixtureVault }).map(
    ({ outputRelativePath, publicUrl }) => ({ outputRelativePath, publicUrl }),
  );

  assert.equal(
    rewriteObsidianMarkdown(
      "[[Folder Note|Read it]] and [[Folder Note#Next steps]]\n\n![[assets/diagram.svg]]",
      catalog,
      "Published Note.md",
      assets,
    ),
    "[Read it](/notes/folder-note) and [Folder Note](/notes/folder-note#next-steps)\n\n![diagram](/assets/vault/assets/diagram.svg)",
  );
});

test("uses a generic fallback for private wiki links and unavailable embeds", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });

  assert.equal(
    rewriteObsidianMarkdown(
      "[[Private Note]] and ![[private/private.png]]",
      catalog,
      "Published Note.md",
    ),
    "unpublished reference and attachment unavailable",
  );
});

test("does not rewrite Obsidian syntax inside inline or fenced code", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });
  const markdown = "Prose: [[Folder Note]]\n\nInline: `[[Private Note]]`\n\n```md\n[[Private Note]]\n![[private/private.png]]\n```";

  assert.equal(
    rewriteObsidianMarkdown(markdown, catalog, "Published Note.md"),
    "Prose: [Folder Note](/notes/folder-note)\n\nInline: `[[Private Note]]`\n\n```md\n[[Private Note]]\n![[private/private.png]]\n```",
  );
});

test("does not rewrite Obsidian syntax inside indented code blocks", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });
  const markdown = "Prose: [[Folder Note]]\n\n    [[Private Note]]\n\t![[private/private.png]]";

  assert.equal(
    rewriteObsidianMarkdown(markdown, catalog, "Published Note.md"),
    "Prose: [Folder Note](/notes/folder-note)\n\n    [[Private Note]]\n\t![[private/private.png]]",
  );
});

test("preserves literal placeholder-like author text while restoring protected code", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });
  const markdown = "Literal @@VAULT_CODE_0@@, code `[[Private Note]]`, prose [[Folder Note]].";

  assert.equal(
    rewriteObsidianMarkdown(markdown, catalog, "Published Note.md"),
    "Literal @@VAULT_CODE_0@@, code `[[Private Note]]`, prose [Folder Note](/notes/folder-note).",
  );
});

test("redacts file URI local paths, including literal code content", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });
  const published = catalog.notes.find((note) => note.slug === "published-note");

  assert.equal(redactLocalPaths("file:///Users/fixture-user/Private/a.md"), "[local path removed]");
  assert.equal(redactLocalPaths("file:/Users/fixture-user/Private/a.md"), "[local path removed]");
  assert.equal(redactLocalPaths("file://localhost/Users/fixture-user/Private/a.md"), "[local path removed]");
  assert.equal(redactLocalPaths("FILE:///uSeRs/fixture-user/Private/a.md"), "[local path removed]");
  assert.equal(redactLocalPaths("file://LOCALHOST/UsErS/fixture-user/Private/a.md"), "[local path removed]");
  assert.equal(redactLocalPaths("/uSeRs/fixture-user/Private/a.md"), "[local path removed]");
  assert.equal(redactLocalPaths("/etc/hosts"), "[local path removed]");
  assert.equal(redactLocalPaths("/LiBrArY/Preferences/example.plist"), "[local path removed]");
  assert.equal(redactLocalPaths("/SYSTEM/Library/example"), "[local path removed]");
  assert.equal(redactLocalPaths("/usr/local/bin/example"), "[local path removed]");
  assert.equal(redactLocalPaths("file://build-mac/System/Library/example"), "[local path removed]");
  assert.equal(redactLocalPaths("C:/Users/fixture-user/Private/a.md"), "[local path removed]");
  assert.equal(redactLocalPaths("\\\\server\\share\\secret.txt"), "[local path removed]");
  assert.equal(redactLocalPaths("\\uSeRs\\jadenraats\\Private\\a.md"), "[local path removed]");
  assert.equal(redactLocalPaths("https://jadenraats.com/notes/agent-architecture"), "https://jadenraats.com/notes/agent-architecture");
  assert.equal(redactLocalPaths("https://jadenraats.com/Users/showcase"), "https://jadenraats.com/Users/showcase");
  assert.equal(redactLocalPaths("https://example.com/etc/hosts"), "https://example.com/etc/hosts");
  assert.doesNotMatch(published?.body ?? "", /file:\/{1,3}Users\/jadenraats\//);
  assert.match(published?.body ?? "", /`\[local path removed\]`/);
  assert.match(published?.body ?? "", /```text\n\[local path removed\]\n```/);
});

test("fails clearly when a vault guide would collide with a handwritten guide", () => {
  const collidingGuide = {
    title: "Collision",
    slug: "one-front-door",
    section: "guides",
    body: "",
    sourceKey: "Collision.md",
    url: "/guides/one-front-door",
    updatedAt: "2026-09-12T00:00:00.000Z",
    backlinks: [],
  } satisfies PublicVaultNote;

  assert.throws(
    () => assertNoVaultGuideSlugCollisions([collidingGuide]),
    new Error("Vault guide slug collides with handwritten guide: /guides/one-front-door"),
  );
});

test("resolves an ambiguous filename relative to the public source note", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });

  assert.deepEqual(
    resolveVaultReference(catalog, "Links/Source.md", "Target"),
    {
      href: "/notes/links-target",
      label: "Target",
      title: "Target",
    },
  );
  assert.equal(resolveVaultReference(catalog, "Published Note.md", "Target"), null);
});

test("uses source-relative resolution for public backlinks and ignores code samples", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });
  const siblingTarget = catalog.notes.find((note) => note.slug === "links-target");
  const elsewhereTarget = catalog.notes.find((note) => note.slug === "elsewhere-target");

  assert.deepEqual(siblingTarget?.backlinks, [
    {
      sourceKey: "Links/Source.md",
      slug: "links-source",
      title: "Source",
      url: "/notes/links-source",
    },
  ]);
  assert.deepEqual(elsewhereTarget?.backlinks, []);
});

test("rejects duplicate public URLs without revealing source paths", () => {
  assert.throws(
    () => getVaultCatalog({ vaultPath: duplicateVault }),
    new Error("Duplicate published vault URL: /notes/duplicate"),
  );
});

test("resolves public wiki-link targets and records only public backlinks", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });
  const folderNote = catalog.notes.find((note) => note.slug === "folder-note");

  assert.deepEqual(
    resolveVaultReference(
      catalog,
      "Published Note.md",
      "Folder Note|/Users/fixture-user/Private/link-label.md",
    ),
    {
      href: "/notes/folder-note",
      label: "[local path removed]",
      title: "Folder Note",
    },
  );
  assert.deepEqual(folderNote?.backlinks, [
    {
      sourceKey: "Published Note.md",
      slug: "published-note",
      title: "Published Note",
      url: "/notes/published-note",
    },
  ]);
});

test("serializes public notes without local filesystem paths", () => {
  const catalog = getVaultCatalog({ vaultPath: fixtureVault });

  assert.doesNotMatch(JSON.stringify(catalog), /\/Users\/jadenraats\//);
  assert.doesNotMatch(catalog.notes[1]?.body ?? "", /\/Users\/jadenraats\//);
});
