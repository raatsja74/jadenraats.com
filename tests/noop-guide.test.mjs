import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import { GUIDES, getGuide, getGuideSlugs } from "../src/data/guides.ts";

const slug = "noop-whoop-without-subscription";

function normalize(text) {
  return text.trim().replace(/\*\*/g, "").replace(/^\*|\*$/g, "").replace(/\s+/g, " ").trim();
}

test("NOOP article has approved metadata and a unique slug", () => {
  const guide = getGuide(slug);
  assert.ok(guide, "approved NOOP guide must exist");
  assert.equal(guide.title, "NOOP: Use Your WHOOP Without the Subscription");
  assert.equal(guide.tag, "tools");
  assert.equal(guide.readMinutes, 5);
  assert.match(guide.published, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(getGuideSlugs().filter((s) => s === slug).length, 1);
  assert.equal(new Set(GUIDES.map((g) => g.slug)).size, GUIDES.length);
});

test("NOOP article preserves every supplied paragraph, heading, list item and disclaimer", () => {
  const guide = getGuide(slug);
  assert.ok(guide, "approved NOOP guide must exist");
  const original = readFileSync(new URL("./fixtures/noop-source.md", import.meta.url), "utf8");
  const expected = original.split(/\n\s*\n/).slice(1).flatMap((block) =>
    block.startsWith("- ") ? block.split("\n").map((line) => normalize(line.slice(2))) : [normalize(block.replace(/^## /, ""))]
  );
  const actual = guide.sections.flatMap((section) => section.type === "ul" ? section.items.map(normalize) : [normalize(section.text)]);
  assert.deepEqual(actual, expected);
});

test("NOOP card image exists and source links are secure official references", () => {
  const guide = getGuide(slug);
  assert.ok(guide, "approved NOOP guide must exist");
  assert.ok(existsSync(new URL(`../public${guide.image}`, import.meta.url)));
  assert.deepEqual(guide.sources, [
    { label: "NOOP on GitHub", href: "https://github.com/ryanbr/noop" },
    { label: "NOOP terms", href: "https://github.com/ryanbr/noop/blob/main/TERMS.md" },
  ]);
});

test("NOOP article is in the public sitemap", () => {
  const source = readFileSync(new URL("../src/app/sitemap.ts", import.meta.url), "utf8");
  assert.ok(source.includes(`https://jadenraats.com/guides/${slug}`));
  assert.ok(!source.includes("https://jadenraats.com/command-center"));
});
