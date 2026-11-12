# Beginner-first homepage review

Owner: Codex. Checkpoint: 2026-11-12 UTC.
Status: implementation drafted; visual review blocked and approval pending.
Base: `ba1e54a66016b0cc043e78fdd66372c15a136787`.
Current candidate: `review/beginner-priority-2026-11-12`, branched from the existing review candidate to preserve other agents' work.

## Decision and implementation

JD wants all three audiences served, with beginners leading the homepage. The first-visit goal is to complete one useful AI task in about ten minutes. Paths: Start here, Use it at work, Build your own.

- Homepage leads to a new starter guide and puts Guides before Systems.
- Homepage and guide-index cards show their summaries.
- Starter article: `/guides/turn-a-messy-note-into-a-next-step`, with a usable prompt, a labelled example, output checks, and a small real action.
- The article uses the existing template and an existing image. Its date is draft metadata until approved for publication.
- The new route is explicitly included in the sitemap.
- `DESIGN.md` records the audience decision. Existing modern tokens and components remain in use.
- Latest user clarification: historical “brand and selected designs” is inspiration only. `jadenraats-modern` governs implementation; no retired marks were imported.
- Hero names the first task, with the starter guide as the main action. The mobile hero omits the large portrait. The global header says Start here, and Guides leads its menu.
- Guides are followed by the three browsing paths, then working systems as supporting proof. The decorative marquee no longer interrupts this sequence.

## Verification

- ESLint passed with two existing image warnings in the photo gallery.
- TypeScript and design checks passed.
- Production webpack build passed, including generation of the new guide.
- Existing NOOP guide tests: 4 passed.
- Built HTML checked for the primary guide link, section anchors/order, guide listing, and article prompt. Sitemap checked after adding the missing entry.

These are code/build checks, not completed browser interaction or visual checks. Local Chromium launch failed with a socket permission error. The cloud browser and a separate HTTP client could not reach the local server (connection refused). No after-change desktop/mobile screenshots were obtained. Earlier live-site observations do not validate this draft. Dependencies and existing binary assets were reused locally; this was not a clean-install verification.

## Next action

Render this exact candidate in a working preview environment and capture Home, Guides and the starter article at 390px and 1440px in both themes. Check primary CTA navigation, guide browsing, keyboard focus, image loading and horizontal overflow. Continue the existing all-page UDS review, then ask JD for visual approval with the screenshots.

Do not merge, publish or rebuild the final UDS ZIP before JD's visual approval. Vercel auto-deployment is disabled for this new candidate branch. Desk trading data is outside this change.

## Conflicts and review limits

- The previous checkpoint said the old review branch had deployment disabled. Commit `ba1e54a` re-enabled it; a READY Vercel preview exists for that commit. That preview predates this candidate and cannot serve as its after screenshot. This revision does not change the older branch's configuration.
- `AGENTS.md` requires `WHO.md`, but that file is absent from the repository. It also describes old Next 14/theme/component conventions that disagree with the installed Next 16 project and current `DESIGN.md`. The user's latest direction and current implementation govern this scoped change; the absent document's contents are not inferred.
- Historical brand artwork and current interface tokens differ. The user resolved precedence explicitly in favor of `jadenraats-modern`; older marks and typography must not be restored.
- PR #32 uses `modern-rounded`, a separate older branch. Do not treat its reported screenshots or checks as verification of this candidate.
- Mobile first-screen and full-page before/after screenshots in both themes remain required. No after screenshot is claimed. Existing browser controls do not expose viewport emulation, and local Chromium previously failed on socket permissions.
- Floating-nav glass still needs visual testing over varied content in both themes. Opaque fallbacks and contrast checks are implemented, but those checks alone do not prove the glass looks correct.

Recommendation for visual approval: keep the task-led headline and compact mobile hero. They explain the first useful action before asking a beginner to browse a personal portfolio.
