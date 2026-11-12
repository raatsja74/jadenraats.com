# jadenraats.com

Jaden's personal site. Guides lead the homepage, for people starting with AI,
small-business owners, and people building their own systems. Public pages in the
sitemap: Home, Guides, Writing, Systems, Skills Library, Daily Note, Resources,
About, Case Study, Desk, CaptureVault and Photos. `/skills` redirects to the Skills
Library at `/prompt-lab`. `/command-center` is unlisted and noindex.

## Stack and design

- Next.js 16 (App Router), React 19, Tailwind CSS 3, and Framer Motion.
- Semantic tokens come from the pinned `@jadenraats/universal-design-system`
  package. Site-specific layout and component rules live in `src/app/globals.css`.
- Fonts are loaded in `src/app/layout.tsx`.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run check:design
npm run build
```

The production domain is `https://jadenraats.com`, connected to the Vercel
project `jadenraats.com`. The contact address used on the site is
`ai@jadenraats.com`.
