# Homepage guides-first: mobile draft review

Status: **review only**. Do not merge or publish before Jaden reviews the mobile layout and full-page evidence.

## Current source of truth
- User-approved PRD in the task conversation: Guides first; start here, use it at work, build your own; `jadenraats-modern`; asterisk mark; separate brands.
- Site: `DESIGN.md`, `src/tokens/modern.css`, imported UDS modern stylesheet.
- UDS: `themes/jadenraats-modern.json`, `docs/jadenraats-modern-brand-system.md`.
- Historical brand and selected designs are references only. No retired kayak/JR monogram.

## Review draft
- Hero now starts with one existing guide: `/guides/one-front-door`.
- Verified guide outcome from `src/data/guides.ts`: pick two capture surfaces and one filing home. **Five-minute reading time, not ten-minute completion.**
- Three paths link to existing guides. No new placeholder content.
- Secondary guide preview has two guides, not every guide.
- Guide section precedes work. Skills remains below work pending review.
- Top navigation foregrounds Guides and removes the competing orange Skills CTA.
- Orange hero button uses dark ink for WCAG normal-text contrast: approximately 4.84:1 against `#F4511E`. The canonical UDS token still specifies white at approximately 3.48:1 and needs a separate governance decision.

## Open conflicts and decisions
1. The current UDS README still cites Notion in its source-of-truth order; the PRD explicitly excludes archived Notion material. Reconcile after mobile approval.
2. Site `AGENTS.md` references older routes, an older Next.js version and nonexistent files such as `WHO.md`. It also describes a Work-first narrative. Treat as stale where it conflicts with the approved PRD; update in the documentation phase.
3. Site `README.md` says the Guides page has three articles; the data currently holds four. Fix in documentation phase.
4. Existing draft PR #32 (`modern-rounded`) has unmerged cosmetic/guide changes and diverges from main. Reconcile without overwriting the branch.
5. Canonical UDS `color.action.primaryText` has insufficient contrast for normal-size white text on orange. Propose a token-level change after design review; do not silently rewrite other brands.
6. No homepage slogan is chosen. None was added.
7. Skills section is still present below work. Decide whether to shorten/remove it after reviewing the first draft.
8. The existing guides do not establish an entire useful AI task completed in approximately ten minutes. The target needs a content improvement or a new guide; do not claim that outcome.

## Review gate
- [ ] Browser screenshot: mobile first screen before/after.
- [ ] Browser screenshot: mobile full page before/after.
- [ ] Desktop light/dark screenshot pair.
- [ ] Run lint, TypeScript, check:design and production build.
- [ ] Verify keyboard focus, 44px targets, reduced motion and 320/375/390/430/768/1440px overflow.
- [ ] Confirm guide destinations and guide content.
- [ ] Review conflicts and answer first guide/slogan/Skills questions.
- [ ] Only then make broader documentation and responsive cleanup edits.

No merge or production deployment is authorized by this draft.
