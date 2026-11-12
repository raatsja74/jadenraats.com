# Beginner-first homepage review

Owner: Codex. Checkpoint: 2026-11-11, America/Phoenix.
Status: implementation drafted; preview deployed; visual review and JD approval pending.
Base: `review/modern-visual-2026-11-11` (latest pushed commit: see `git log`). Updated 2026-11-11 with JD's decisions below.

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

## Decisions from JD (2026-11-11)

- **No slogan** on the homepage. Voice: humble, personable, plain English.
- **Provisional lead guide:** "Turn a messy note into one clear next step" (`/guides/turn-a-messy-note-into-a-next-step`). It is a new guide, not one of the existing four, so it counts as a content gap filled provisionally, not a settled choice.
- **Outcome and timing are pending a cold end-to-end test.** The guide's data says 3 minutes to read and its summary says "about ten minutes to try it". Neither is verified. Do not publish the homepage ten-minute claim until someone follows the guide from scratch with a real messy note and times it. If it fails, soften the wording or fix the guide.
- **Placement**
  - Start here: the new starter guide.
  - Use it at work: "Follow-up that survives a Monday on a job site".
  - Build your own: "One front door" (the easier first read) and "Write the rules down".
  - NOOP: see below.
- **Skills** stay only if the simplified homepage gives them a clear job. Default: replace the four-card block with a one-line link to the Skills page. Keep the cards only if the mobile review shows they help a visitor choose a next step.

### NOOP placement review

Reviewed against the full article, not the summary. It is a how-to for owners of a compatible WHOOP strap: Bluetooth pairing, an unofficial GitHub project, WHOOP 4.0 supported and 5.0/MG limited, numbers that are estimates, noncommercial terms. The article itself says "You don't need AI to use a WHOOP for free"; the AI Coach is optional and needs the reader's own API key.

- It is not a beginner AI task (Start here) or a business workflow (Use it at work).
- It is not about building your own system, so it is a poor fit for Build your own, though a technical reader could stretch it there.
- Recommendation: keep it in the full Guides index with its `tools` tag, and do not place it in any of the three homepage paths or feature it. JD to confirm. If it stays public, it is worth a second look at whether an unofficial-hardware how-to belongs on a beginner-first site.

## Verification still needed

Existing: lint, tsc, `check:design`, build, NOOP guide tests. Not yet done: any browser check. Needs 390px and 1440px screenshots, light and dark, of Home, Guides, the starter article, `/desk`, `/systems`, `/prompt-lab` and `/about`; primary CTA navigation; keyboard focus; image loading; horizontal overflow at 320 to 1440.

## Deployment and merge status (corrects the earlier note)

- Preview deploys are **on** for this branch as of 2026-11-11. `vercel.json` matches `main` (only `desk-data` is disabled). Production deploys stay main only.
- Do not merge this branch to main before JD's visual approval.
- UDS merges first (Hark is doing the field border at 3:1, border and glass checks in `check:contrast`, and shadow fallbacks on the UDS review branch). After JD approves the visuals, pin this site to the **UDS merge commit on main**. Do not pin to the review-branch commit c486502 for the final merge.
- The design bundle is rebuilt from main after the merges, without the personal capture note. Leave it alone until then.
