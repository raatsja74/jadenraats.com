# Beginner-first homepage review

Owner: Codex. Checkpoint: 2026-11-11, America/Phoenix.
Status: implementation drafted; visual review blocked and approval pending.
Base: `f3c187fe831611aa2068e18a0093fc2522a1d5ca` on `review/modern-visual-2026-11-11`.

## Decision and implementation

JD wants all three audiences served, with beginners leading the homepage. The first-visit goal is to complete one useful AI task in about ten minutes. Paths: Start here, Use it at work, Build your own.

- Homepage leads to a new starter guide and puts Guides before Systems.
- Homepage and guide-index cards show their summaries.
- Starter article: `/guides/turn-a-messy-note-into-a-next-step`, with a usable prompt, a labelled example, output checks, and a small real action.
- The article uses the existing template and an existing image. Its date is draft metadata until approved for publication.
- The new route is explicitly included in the sitemap.
- `DESIGN.md` records the audience decision. Existing modern tokens and components remain in use.

## Verification

- ESLint passed with two existing image warnings in the photo gallery.
- TypeScript and design checks passed.
- Production webpack build passed, including generation of the new guide.
- Existing NOOP guide tests: 4 passed.
- Built HTML checked for the primary guide link, section anchors/order, guide listing, and article prompt. Sitemap checked after adding the missing entry.

These are code/build checks, not completed browser interaction or visual checks. Local Chromium launch failed with a socket permission error. The cloud browser and a separate HTTP client could not reach the local server (connection refused). No after-change desktop/mobile screenshots were obtained. Earlier live-site observations do not validate this draft. Dependencies and existing binary assets were reused locally; this was not a clean-install verification.

## Next action

Render this exact candidate in a working preview environment and capture Home, Guides and the starter article at 390px and 1440px in both themes. Check primary CTA navigation, guide browsing, keyboard focus, image loading and horizontal overflow. Continue the existing all-page UDS review, then ask JD for visual approval with the screenshots.

Do not merge, deploy, enable review-branch deployment or rebuild the final UDS ZIP before JD's visual approval. `vercel.json` keeps deployment disabled for this branch. Desk trading data is outside this change. No agent email was sent and no handoff acknowledgment is claimed.
