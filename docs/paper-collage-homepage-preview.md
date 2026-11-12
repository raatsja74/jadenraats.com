# Paper-collage homepage — visual review checkpoint

Status: **visual approval required**. This branch must not merge into main or be promoted to production without a new explicit approval.

## Visual direction
Jaden's November 12 reference supersedes the older rounded, system-font and Liquid Glass direction **for this site's redesign only**. The initial change is homepage-only: warm paper, torn print edges, tape, offset orange sheets, oversized Anton headings, editorial serif, soft shadows, and one native-details paper fold. UDS color and accessibility foundations remain; no UDS theme default, other brand, or guide/article template changes here.

## Content and image
- Navigation: Systems, Guides, Lab, About. Existing routes are reused.
- Featured published guide content comes from `src/data/guides.ts`, not invented claims.
- Photo uses existing `/images/jaden-portrait-mono-orange.jpg`, which matches the newly supplied monochrome portrait. The supplied JPEG has RGB channels, not transparency. Image is not regenerated.
- `/desk`, its data sources, deployment exclusions, and unrelated routes are untouched.

## Checkpoint
- Standalone HTML/CSS prototype visually inspected in Chromium at 1440 and 390px; full-page screenshots and a short fold GIF produced for approval in the user conversation.
- Prototype QA: horizontal overflow absent at 320, 375, 390, 430, 768, 1024 and 1440px. The native fold opens and closes with keyboard Enter. Reduced-motion disables transitions/animation.
- Branch build: Vercel preview deployment reached READY at commit `947b8e8`. This confirms a deployment build, not full production-browser QA. Do not treat prototype screenshots as captured from that deployment.
- Original design PRs #32 and #35 and design-skills PR #3 remain open and were not merged.

## After visual approval
Carry the same scoped paper system through Guides index/article pages, Systems, Lab and About. Then test contrast, keyboard and touch navigation, responsive image loading, reduced motion, real-device performance, deployment parity and `/desk` regression. Request separate publication approval.
