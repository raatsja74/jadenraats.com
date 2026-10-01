# Agent Command Center page

The `/command-center` page is an unlisted, noindex entrance to Jaden's existing private Hermes control plane. It adds no public agent API, task store, or session export. The native dashboard handles sign-in, tasks, run details, questions, and schedules on the MBP behind Tailscale.

Use the site's installed Jaden UDS theme and self-hosted Anton / IBM Plex Mono fonts. All colors use `--site-*` aliases and `--uds-color-action-primary` / `--uds-color-action-primaryText`; all borders use the existing UDS border widths. Square corners, no shadows. Native Hermes UI inside the optional frame keeps its own design.

Page tokens, documented layout exceptions: maximum width 76rem; outer padding clamp(1rem,4vw,3rem); top spacing 6rem; heading clamp(2.5rem,8vw,6rem); body 1rem with 1.7 line-height; metadata .75rem; gaps .5rem, 1rem, 1.5rem, 2rem; controls at least 44px; heading width 14ch; intro width 60ch; iframe minimum height 40rem / viewport height 75vh; tablet breakpoint 700px. Border and focus widths 2px (matching existing site controls).

Default action opens the private dashboard in a full browser context, where login cookies and Tailscale work reliably. Optional inline display is initiated by a user click, with a loading message, 15-second connection guidance, refresh, close, and an always-visible full-window link. Never infer authentication or health from a cross-origin iframe load event. Browsers may block private-network or third-party frame access; the top-level link remains the primary supported path.

One H1, page description, canonical URL, noindex/nofollow, inherited favicon, skip link, keyboard focus, reduced motion, light/dark support, and no horizontal overflow at 320,375,390,430,768,1440px. Do not put this private entrance in the public sitemap or global navigation.

Verify the site shell locally and after deployment, then verify native login and the existing Kanban / cron flows separately. Publish only the page and accompanying design/runbook changes from an isolated branch based on verified live production cd9bf2b, preserving unrelated worktrees.
