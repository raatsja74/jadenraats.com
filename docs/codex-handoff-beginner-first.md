# Codex handoff: finish the beginner-first homepage

Branch: `review/modern-visual-2026-11-11` (site repo `raatsja74/jadenraats.com`). Do not touch `main`.
Read first: `DESIGN.md` (section "Audience and homepage priority"), `docs/beginner-first-review.md`, and the PRD JD attached on 2026-11-11 if you have it.

## Prompt to paste

You are finishing the beginner-first homepage work on `review/modern-visual-2026-11-11` in jadenraats.com. Work only on that branch. Do not merge to main, do not push to main, and do not open a merge into main. Do not rebuild or touch the UDS design bundle. Do not edit the UDS repo; Hark owns that side.

**Step 0. Review before editing.** Read `DESIGN.md`, `docs/beginner-first-review.md`, `src/app/HomeExperience.tsx`, `src/app/guides/*`, `src/data/guides.ts` and `src/components/Nav.tsx`. Then write a short audit in `docs/beginner-first-review.md` under a new "Audit" heading: current homepage sections in order, where each path link goes, anything that contradicts the decisions below, and anything you disagree with and why. Stop and report to JD if you find a conflict with the decisions; do not silently resolve it.

**Decisions already made by JD (do not reopen):**
- No slogan anywhere on the homepage. Voice is humble, personable, plain English, low hype. Specific CTAs ("Read guide", "Get in touch", "Explore the lab"), never "Learn more".
- Provisional lead guide: "Turn a messy note into one clear next step" (`/guides/turn-a-messy-note-into-a-next-step`). Its outcome and the "about ten minutes" timing are unverified. Do not present ten minutes as a promise on the homepage until step 2 passes.
- Use it at work: "Follow-up that survives a Monday on a job site".
- Build your own: "One front door" and "Write the rules down".
- NOOP stays in the full Guides index with its `tools` tag and is not placed in a homepage path. Leave its content alone. JD still has to confirm this.
- Skills stay only if the simplified homepage gives them a clear purpose. Default: a one-line link to the Skills page instead of the four-card block.
- Asterisk is the only mark. No kayak mark, no JR monogram. Jaden's brand stays separate from Award Coatings, LeadBolt, AI Ledger, Agent Icon and Hermes.

**Step 1. Mobile first screen and path links.** One visually dominant action that leads to the lead guide, with plain-language copy about the result. Brief Jaden intro, portrait allowed but it must not push the action down. Make the three paths real: each has a distinct description and links to existing content, and none promises content that does not exist. Today the links go to `#guides`, `/systems` and `#lab`; check that each makes sense, and map Use it at work and Build your own to the guides above. Reduce repeated cards so they do not dominate the mobile scroll.

**Step 2. Cold test of the lead guide.** Follow the starter guide exactly as a beginner would, with a real messy note and a stock AI chat. Record the actual time, whether the prompt works, and whether the outcome matches the page. Put the result in `docs/beginner-first-review.md`. If it fails or takes much longer than ten minutes, fix the guide or soften the wording, and tell JD. If you cannot run it, say so; do not mark it passed.

**Step 3. Skills.** After the page is simplified, decide whether the Skills block earns its place. If not, replace it with the one-line link and keep the Skills page itself. Say which you chose and why.

**Step 4. Stop for review.** Per the PRD, pause after the mobile draft. Do not do the wider desktop and documentation pass until JD has seen the mobile screenshots.

**Step 5. Screenshots.** Capture 390px and 1440px, light and dark, for Home, Guides, the starter article, `/desk`, `/systems`, `/prompt-lab` and `/about`. Your local Chromium previously failed with a socket permission error, and the sandbox browser could not reach localhost. Use the branch preview deployment instead (Vercel builds this branch; check the commit status for the URL). If you still cannot capture them, say that plainly and list exactly what was not checked.

**Hard constraints (from the site brief):**
- Hex colors only in `src/tokens/`. No Tailwind radius or shadow scale classes, no `backdrop-blur` utility, no purple palettes, no Inter or Poppins. `npm run check:design` must pass.
- Do not touch `vercel.json`, the `desk-data` branch, or the desk data URL in `desk/constants.ts`.
- No em dashes. Do not rewrite copy beyond what these steps need. Sentence case.
- 44px touch targets. No horizontal overflow from 320 to 1440. Visible focus. Respect reduced motion. Check contrast in both themes.
- Use existing `jadenraats-modern` tokens and components only. Do not invent new ones. Keep the glass rules in the UDS brand doc (header only, one layer, with fallbacks).
- UDS pin: leave `package.json` as it is. Pin changes happen later, to the UDS merge commit on main, after JD approves the visuals. Never pin the final merge to c486502.

**Report back with:**
1. The audit and every conflict or disagreement.
2. The cold-test result and the guide's real timing.
3. What changed, per file, and which sections were removed, moved or condensed and why.
4. Automated checks run (lint, tsc, `check:design`, build, tests), reported separately from manual checks (contrast, focus, touch, responsive, overflow), and anything not tested.
5. Screenshots, or a plain statement that you could not take them.
6. Open decisions for JD: confirm NOOP placement, confirm Skills outcome, confirm lead guide after the cold test.

Commit to this branch with a clear message and push it. Do not claim approval, and do not claim anything was tested that was not.
