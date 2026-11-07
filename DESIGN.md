# Site design law (Nov 2026)

Modern, rounded, Apple-style. Neutral canvas (light and dark), white or graphite cards, Jaden orange as the only accent, the asterisk as the mark. Raw colors live only in `src/tokens/modern.css`; everything else uses `--site-*`, `--uds-*` and `--modern-*` tokens.

- Type: the platform system face (SF Pro on Apple devices) via `--font-sans` / `--font-display`; `--font-code` for code only. Bold tight headlines, sentence case copy.
- Shape: cards `--modern-radius-card` (22px), nested items `--modern-radius-inner` (14px), small marks `--modern-radius-small`, buttons, chips and tags `--modern-radius-pill`. Hairline 1px borders.
- Depth: `--modern-shadow-card` at rest, `--modern-shadow-hover` on hover with a 2px lift. Shadows are off in dark mode.
- Header: translucent bar with a saturate + blur backdrop, the one sanctioned blur.
- Banned (pre-commit hook): Tailwind radius/shadow scale classes, backdrop-blur utility, glow blurs, purple palettes, Inter/Poppins, inline hex outside src/tokens/.

# Agent Command Center page

## NOOP article addition

The NOOP guide reuses the existing Guides article, index, homepage cards, typography and spacing unchanged. Its optional official-source links reuse the existing `btn btn-secondary` controls and their focus, border and touch-target tokens. The new card illustration is original static SVG artwork, not a WHOOP or NOOP logo/screenshot. Its fixed 1600 × 1000 illustration canvas uses the pinned Jaden UDS paper `#F2EFE6`, ink `#0A0A09` and signal orange `#F4511E`; these are illustration colors, not new UI tokens. Keep the supplied article text, tools tag, five-minute label and disclaimer intact. Include the public article in the sitemap, but keep the private command-center exclusion unchanged.

The `/command-center` page is an unlisted, noindex entrance to Jaden's existing private Hermes control plane. It adds no public agent API, task store, or session export. The native dashboard handles sign-in, tasks, run details, questions, and schedules on the MBP behind Tailscale.

Use the site's installed Jaden UDS theme and self-hosted Anton / IBM Plex Mono fonts. All colors use `--site-*` aliases and `--uds-color-action-primary` / `--uds-color-action-primaryText`; all borders use the existing UDS border widths. Corners and depth follow the site design law above. Native Hermes UI inside the optional frame keeps its own design.

Page tokens, documented layout exceptions: maximum width 76rem; outer padding clamp(1rem,4vw,3rem); top spacing 6rem; heading clamp(2.5rem,8vw,6rem); body 1rem with 1.7 line-height; metadata .75rem; gaps .5rem, 1rem, 1.5rem, 2rem; controls at least 44px; heading width 14ch; intro width 60ch; iframe minimum height 40rem / viewport height 75vh; tablet breakpoint 700px. Border and focus widths 2px (matching existing site controls).

Default action opens the private dashboard in a full browser context, where login cookies and Tailscale work reliably. Optional inline display is initiated by a user click, with a loading message, 15-second connection guidance, refresh, close, and an always-visible full-window link. Never infer authentication or health from a cross-origin iframe load event. Browsers may block private-network or third-party frame access; the top-level link remains the primary supported path.

One H1, page description, canonical URL, noindex/nofollow, inherited favicon, skip link, keyboard focus, reduced motion, light/dark support, and no horizontal overflow at 320,375,390,430,768,1440px. Do not put this private entrance in the public sitemap or global navigation.

Verify the site shell locally and after deployment, then verify native login and the existing Kanban / cron flows separately. Publish only the page and accompanying design/runbook changes from an isolated branch based on verified live production cd9bf2b, preserving unrelated worktrees.
