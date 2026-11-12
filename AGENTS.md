# jadenraats.com — Codex Agent Instructions

## Role
Creative and strategic thinking partner for Jaden's personal site. This site is a personal brand platform — not a portfolio, not a LinkedIn profile. The homepage helps newcomers complete a useful AI task. Guides lead, with real work as supporting evidence. Read `DESIGN.md` and `docs/beginner-first-review.md` before making content, copy or layout decisions.

## Brand and voice
- **Not:** AI consultant, thought leader, course seller, LinkedIn guru
- **Yes:** Real builder. Ships ugly things that work. Montana-approved (if it'd make Montana friends cringe, it's wrong).
- **Voice:** Direct, a little dry, no fluff. Demos over descriptions.
- **Aesthetic:** Modern and rounded, Apple-style. Light and dark modes. See the design law in DESIGN.md.

## Who Jaden Is
- Runs Award Coatings (floor coating business, Phoenix/Scottsdale)
- Builds FloorQuote (SaaS estimating tool for contractors)
- Builds AI automations that actually work (not demos)
- Sales background. Self-taught builder. Split time Phoenix + Montana.

## Current State
- Homepage leads with the beginner starter guide, then three paths: Start here, Use it at work, Build your own. Skills is a one-line link to `/prompt-lab`. No slogan. See `DESIGN.md` and `docs/beginner-first-review.md`.
- Theme: `jadenraats-modern` from the pinned Universal Design System, light and dark. The legacy `jadenraats` theme is not the default.
- Stack: Next.js 16 (App Router), React 19, Tailwind CSS 3, Framer Motion.
- Guides data: `src/data/guides.ts`. Public routes are listed in `src/app/sitemap.ts`.

## Key Reference Files
- `DESIGN.md`: design law and the confirmed audience and homepage decisions.
- `docs/beginner-first-review.md`: decisions, open items and verification status for the homepage.
- `docs/codex-handoff-beginner-first.md`: constraints and steps for homepage work.
- `docs/COMMAND-CENTER.md`: the private command-center entrance.

## Key Components
- `src/app/HomeExperience.tsx` and `src/app/home.css`: homepage.
- `src/app/guides/`: guides index and article template.
- `src/components/Nav.tsx`: navigation, asterisk wordmark.
- `src/components/ThemeToggle.tsx`: light and dark switch.
- `src/app/globals.css`, `src/tokens/`: site styles and UDS token aliases (hex only in `src/tokens/`).

## How to Work With Jaden
- Content decisions: ask "would a Montana rancher think this is bullshit?" If yes, cut it.
- Design: follow DESIGN.md (rounded cards, pill controls, system type, orange accent). Avoid pastel, purple gradients, generic SaaS templates.
- Copy: short sentences. Real outcomes. No "leverage synergies" or "thought leader" language.
- The site should make someone say "this guy actually builds stuff" not "this guy talks about AI".
