# Beginner-first homepage review

Owner: Codex. Checkpoint: 2026-11-11, America/Phoenix.
Status: release authorized by JD on 2026-11-11 (America/Tijuana); final checks and deployment in progress. Earlier checkpoints below are historical.
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

### Imagery

The starter guide reuses the "One front door" image, so two cards share a picture. Replace it with a real documentary photo from JD (no stock or AI-gradient art) before the homepage ships. A before and after SVG inside the article is optional, built after the real note exists.

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


## Audit

At 4a4f53e, order was hero, slogan marquee, all guides including NOOP, systems, four Skills cards, slogan footer. Paths targeted #guides, /systems, #lab instead of the named articles. The competing homepage-guides-first-mobile branch selected One front door as lead; this draft follows the latest supplied handoff instead. WHO.md is absent and AGENTS.md has stale framework/routes and Work-first guidance. No legacy mark is imported. Latest remote 4e55830 adds an image note; preserved.

## Mobile revision checkpoint (2026-11-11)

Local draft, not approved or published. The source starts at 4a4f53e on the requested modern-visual branch. Changes: replaced the large name hero with a task-specific invitation and one dominant starter action; removed the slogan marquee and slogan footer; condensed five guide cards into one starter reference; mapped the three paths to the exact guide destinations in the handoff; replaced four Skills cards with a one-line Skills link; moved work proof below the paths; made the header Guides link neutral. The portrait is placed after the action on mobile so it cannot push that action down. The uploaded square composition should be shown intact, including its orange asterisk.

Skills recommendation: use the one-line link. The three paths already help a visitor choose, and four more cards repeat that choice. Pending JD visual review.

Cold test: NOT RUN. Reviewing the prompt in code is not a cold test in a stock AI chat with a beginner's real note. No actual completion time is claimed. Removed the unverified ten-minute summary sentence; the prompt's request for a small action remains an instruction, not a measured completion guarantee. The guide's existing three-minute reading estimate is also unverified. Confirm the lead guide after a genuine timed test.

Image blocker: the uploaded `620D010F-447C-4AE4-A81F-FF3090C0DD44.jpeg` was visually inspected successfully, but subsequent filesystem reads returned ENOENT. The intended `public/images/jaden-portrait-mono-orange.jpg` has not been created. Do not push the code or claim image checks pass until the exact supplied asset is available. Do not substitute generated artwork or a different portrait.

Mobile first-screen/full-page light/dark comparisons are still missing. Do not proceed to the wider desktop/documentation or site-wide image pass before the mobile draft is reviewed. Do not merge, change vercel.json, change the UDS pin, or rebuild the final bundle. UDS remains Hark's scope; final site pin must reference its approved merge commit on main.

Code-only checks passed in the original checkout: lint (two existing photo warnings), TypeScript, design check, production build. Those checks do not validate the missing image or visual layout. Work is saved in an isolated local checkout because the active workspace reverted to the older beginner-priority checkout during this turn. Nothing from this revision has been pushed.


## Authorized release (2026-11-11, America/Tijuana)

JD explicitly requested “Go ahead and push it live” and reattached the portrait. This supersedes the earlier hold on publication. The exact supplied JPEG is now at `public/images/jaden-portrait-mono-orange.jpg`; its square composition and orange asterisk are preserved. The simplified homepage keeps the starter action, three guide paths, one-line Skills link, and work proof. NOOP remains only in the full index.

UDS PR #3 is merged at `808b457c106cc196e241a6f167646496d83f1961`. The site dependency and lockfile now pin that main-branch merge, not c486502. Token validation and 20 contrast checks pass. No bundle rebuild is included.

A genuine beginner cold test remains unperformed. No ten-minute completion promise is published. The starter article retains the existing shared placeholder illustration; a dedicated documentary image and the wider site image pass remain follow-up work. Local Chromium was retried and still fails with `socket() failed: Operation not permitted`. Mobile/full-page screenshots and a full light/dark visual audit remain incomplete; release authorization does not make those checks passed.

Final release checks: ESLint passed (two existing gallery image warnings), design check passed, production webpack build passed, and TypeScript passed. Exact portrait file is present and included in the release.
