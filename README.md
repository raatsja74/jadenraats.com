# jadenraats.com

Personal site. One page, clean and warm, animation-forward. Rebuilt from scratch July 2026.

## Design

- **Vibe**: soft, cinematic, personal — big lowercase wordmark, pill nav, film grain, slow warm light wash (cobi.works-inspired)
- **Palette**: warm cream / warm ink / terracotta accent — tokens live in `src/app/globals.css` as RGB triplets (design law: no raw hex in components)
- **Type**: Instrument Sans (display + body) · Instrument Serif italic (accents) · IBM Plex Mono (labels)
- **Motion**: framer-motion — masked line reveals, scroll-triggered fades, respects reduced-motion

## Stack

- Next.js 16 (App Router) · React 19 · Tailwind CSS 3 · framer-motion
- Deployed on Vercel

## Structure

```
src/app/
  layout.tsx          fonts + metadata
  page.tsx            the whole site (Nav, Hero, Marquee, About, Work, Contact, Footer)
  globals.css         design tokens + keyframe animations
  opengraph-image.tsx social preview card
  sitemap.ts / robots.ts
```

## Commands

```bash
npm run dev     # local dev
npm run build   # production build
```

Contact email on the site: **me@jadenraats.com**. A pre-commit hook (`.husky/pre-commit`) enforces the design law — banned patterns, no inline hex, fonts owned by layout/globals.
