# JadenRaats.com

Personal site and tool lab for building practical AI and automation utilities for service businesses.

## What is here

Pages and tools currently in the app:

- **Homepage** (`/`) - overview and tool grid
- **Guide** (`/guide`) - operations and automation guidance
- **Lab** (`/lab`) - experimental utilities and prototypes
- **Website Health Checker** (`/tools/website-health`) - quick site audit
- **ROI Calculator** (`/tools/roi-calculator`) - break-even and time-savings math
- **Competitor Analysis Wizard** (`/tools/competitor-analysis`) - positioning and gap analysis
- **Prompt Genie** (`/tools/prompt-genie`) - prompt utilities
- **Dynamic Tool** (`/tools/dynamic-tool`) - placeholder route for new tools

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 3
- **UI**: Framer Motion, Lucide icons
- **Themes**: next-themes
- **Deployment**: Vercel

## Requirements

- Node.js 18+
- npm or pnpm

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── providers.tsx
│   ├── guide/page.tsx
│   ├── lab/page.tsx
│   └── tools/
│       ├── competitor-analysis/page.tsx
│       ├── dynamic-tool/page.tsx
│       ├── prompt-genie/page.tsx
│       ├── roi-calculator/page.tsx
│       └── website-health/page.tsx
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
└── lib/
```

## Deployment

Vercel is the default target. Connect the repo and deploy, or run:

```bash
npm install -g vercel
vercel
```

## Notes

No environment variables are required by default. If you add external APIs, create a `.env.local` file and wire the values in your components.
