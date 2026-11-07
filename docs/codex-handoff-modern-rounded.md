# Codex handoff: modern-rounded (site) and UDS

Branch: `modern-rounded`, draft PR #30 on raatsja74/jadenraats.com. Never merge to main (main deploys to production). Read `DESIGN.md` and `AGENTS.md` first.

## Status in one paragraph

The redesign (brutalist to modern, rounded, Apple-style) is in place. A review pass added the fixes below, but that pass had no `node_modules` and no browser. **None of it has been linted, type-checked, built or looked at.** Your first job is to install, run the four gates, and fix whatever they find, then do the visual pass.

## Step 0: verify before anything else

```
npm ci
npm run lint
npx tsc --noEmit
npm run check:design
npm run build
```

Fix failures before adding work. Likeliest trouble spots in the unverified edits:
- `src/app/desk/DeskTracker.tsx`: `EquityChart` now measures its container with `ResizeObserver` and draws in real pixels (hooks ordering, the `[pts.length]` effect dependency, SVG `width`/`height` plus `w-full`).
- `src/app/prompt-lab/PromptLab.tsx`: new `sentenceCase` helper.
- `.field` class in `globals.css`, used by three inputs.

## Already done in this pass (verify visually)

| Item | Change |
|---|---|
| Skills Library nav pill | `h-9` (36px) became `min-h-[var(--uds-layout-touch-target-min)]` (44px). Fits inside the existing `min-h-14` bar, so the header is not taller. |
| Search inputs | New `.field` class in `globals.css`: 1px hairline border, `--modern-radius-inner`, elevated surface, accent border on focus, 44px min height. Applied to the guide search, skill search and category select on `/systems` and the search on `/prompt-lab`. |
| Literal caps in Skills Library | Chips and status tags now render through `sentenceCase()`: "All · 12", "Workflows · 3". Data keys in `skills.ts` stay upper case on purpose (they are filter keys). |
| `/desk` closed trades | Min-width and sideways scroll removed. Below `sm`, score, exit and closed columns are hidden and exit + time show as a second line under the token. Wrapped in a rounded card. |
| `/desk` equity chart | Draws at the container's real pixel width, 12px axis labels, shorter height on phones, round end marker. |
| Guide number badges (home) | Square corner blocks became small orange pills inset from the corner. |
| Marquee band (home) | Full-bleed black strip became a light band: canvas background, hairline borders, secondary text, smaller type. |

## Remaining work, most important first

### 1. Delete the "Modern layer" in `globals.css` (still the main task)

It starts at `/* ── Modern layer: soften the utility classes pages are written with ── */`. Replace each rule with real class changes, then delete it. Surface to migrate (counts are `.tsx` occurrences):

- `.uppercase` set to none: 18 uses in 5 files. Delete the `uppercase` class.
- `[class*="tracking-"]` override: 18 uses in 7 files. Delete the `tracking-*` classes.
- `.border` / `.border-2` auto-rounding: 29 `border-2` uses in 12 files, plus many `border`. Give each real card a component class (for example `.card`: radius card, hairline border, elevated surface, `--modern-shadow-card`) and use `border-b` or `border-t` for rules and dividers, which should not be rounded.
- `.hover\:bg-ink` softening: 8 uses in 4 files. Use a `hover:bg-ink/5` style tint directly.
- `.bg-ink.text-cream` radius: 6 `bg-ink` files. Use `rounded-[var(--modern-radius-inner)]`.
- `.border:has(> .border-grid-overlap)`: 3 files. Remove the extra frame in markup and delete the `:has()` rule.
- `.font-display` weight and spacing: move into the `.display` class if not already there.

Do it file by file in this order, committing after each: `systems`, `guides`, `prompt-lab`, `resources`, `daily-note`, `resume`, `case-study`, `capturevault`, `about`, `desk`, `command-center`. After each, compare before and after at 390px and 1440px in light and dark. The goal is zero visual change except where the layer was hiding a mistake.

### 2. Check every page not yet looked at

`/guides`, `/guides/[slug]`, `/resources`, `/daily-note`, `/resume`, `/case-study`, `/capturevault`, `/command-center`. Look for leftover square corners, heavy 2px/3px borders, hard shadows, all-caps text, and dark mode contrast problems. `src/app/opengraph-image.tsx` still uses `uppercase`/`tracking`; decide whether the share image should match the new look.

### 3. Remaining copy casing

Sentence case everywhere except acronyms (AI, AZ). Casing only; do not rewrite copy. No em dashes. `capturevault/modules.ts` stage names (CAPTURE, PROCESS...) are data keys: leave them and format at render time as done for skills.

### 4. Screenshots to return

Home, `/desk`, `/systems`, `/prompt-lab`, `/about` at 390px and 1440px, light and dark (20 images). Also check no horizontal overflow at 320, 375, 390, 430, 768 and 1440px.

## Rules that do not change

- Raw hex only in `src/tokens/`. Everything else uses `--site-*`, `--uds-*`, `--modern-*`. The husky pre-commit hook enforces this.
- `font-family` only in `layout.tsx` and `globals.css`.
- No Tailwind radius or shadow scale classes (`rounded-lg`, `shadow-xl`, etc.), no purple, no Inter or Poppins, no `backdrop-blur` utility.
- Light and dark must both work. Dark mode reads `data-site-theme` on `html`.
- Keep focus rings, reduced motion, 44px targets, one H1 per page.
- Copy is Jaden's voice: short, direct, no fluff, no em dashes.
- Do not touch the `desk-data` branch, `vercel.json`, or the data URL in `src/app/desk/constants.ts`.

## UDS work (raatsja74/universal-design-system)

The site installs UDS from a pinned tarball (`package.json`, commit `23d2f3e`). Right now `src/tokens/modern.css` re-declares `--uds-*` color values to override the brutalist `jadenraats` theme, and the radius, shadow and dark-mode tokens exist only on the site. UDS and the site have drifted.

Recommended path (needs Jaden's sign-off, see below):

1. Add the modern values to UDS as a theme, not a patch on the old one. Include semantic roles for dark mode (canvas, elevated, text, secondary, border), plus radius tokens (`card` 22px, `inner` 14px, `small` 10px, `pill`) and shadow tokens (card, hover). Core currently ships `--uds-radius-none: 0px` only.
2. Regenerate `dist/` (`dist/uds.core.css`, `dist/themes/*.css`) from `tokens/*.json` and `themes/*.json`; they are generated files.
3. Bump the pinned commit in the site's `package.json`, then delete the duplicated `--uds-*` overrides from `src/tokens/modern.css` so the site only holds site-specific tokens.
4. Fix `--uds-layout-reading-measure: 45-75ch` in `tokens/core.json`. It is not a valid CSS value. Use two tokens (`min` 45ch, `max` 75ch) or a `clamp()`.
5. Update UDS docs and `style-guide.html` for the new theme, and add a CHANGELOG entry.

The separate "Jaden UDS Field Guide" prototype is still brutalist (square corners, 3px borders, Anton). If the modern direction becomes the UDS Jaden theme, either restyle it or keep the old look as a named legacy theme. A review-fixed copy of it already exists (larger text, contrast, disabled demo, labeled meters).

## Design calls for Jaden to sign off

1. **Marquee band**: made light and quiet instead of black full-bleed. Alternative: remove it.
2. **Guide number badges**: orange pills inset 12px from the corner. Alternative: remove the numbers.
3. **Mobile closed-trades table**: hides score, exit and time columns, moving exit and time under the token. Alternative: card-per-trade list.
4. **Equity chart**: real-pixel drawing and a round last-point marker.
5. **UDS**: new modern theme alongside the old one (recommended) vs. replacing `jadenraats`. Replacing breaks anything else pinned to the current theme.
6. **Share image** (`opengraph-image.tsx`): match the new look, or keep the brutalist version as a recognizable brand card.

## Definition of done

`npm run lint`, `npx tsc --noEmit`, `npm run check:design` and `npm run build` pass. The modern layer is gone. Screenshots delivered. The PR stays draft until Jaden approves.
