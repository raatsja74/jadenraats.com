# JadenRaats.com - Project Context

## Vision

A free utility website for anyone interested in AI. Not a portfolio. Not a sales funnel. Just useful tools and practical guides.

**Positioning**: "I build things with AI that actually work. Here's how."

## Current State
- **Status:** Production ready, deployed to Vercel
- **Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **Live tools:** Website Health Checker, ROI Calculator
- **Coming soon:** FloorQuote Estimator, AI Tool Finder, Prompt Tester, Quick Prototyper

## Implementation Plan (Feb 2026)

### Recommended Workflow
Based on deep research (see `★ Main Vault/00 Inbox/jadenraats.com web build improvements 5.2 pro.md`):

- **Claude Opus 4.6** → design/strategy, style extraction, long-context synthesis, voice/copy
- **GPT-5.3-Codex** → implementation, refactors, component generation (agentic coding)
- **OpenAI embeddings** → RAG/personalization retrieval (text-embedding-3-large)
- **GPT Image** → hero images, backgrounds, brand visuals

### Key Architecture Decisions
- **Minimal runtime LLM calls** — build-time generation preferred
- **Persona-based personalization** without runtime AI:
  - Routes: `/for/recruiters`, `/for/peers`, `/for/clients`
  - localStorage preference (opt-in)
  - Copy/project ordering variants per persona
- **Embeddings for search** — "find relevant projects" without LLM generation

### 5-Phase Workflow
1. **Phase 0: Prep** (2-4h) — style references, brand tokens, content inventory
2. **Phase 1: Prototype** (6-12h) — design tokens, typography scale, page wireframes, copy variants
3. **Phase 2: Integration** (8-16h) — implement tokens + components via Codex
4. **Phase 3: Personalization** (4-8h) — persona routes, toggle UI, local preference
5. **Phase 4: QA** (6-12h) — a11y (axe), SEO, Lighthouse ≥90, Playwright tests
6. **Phase 5: Launch** (2-4h) — analytics, monitoring, rollback plan

### Deliverables (from plan)
- [ ] `brand.tokens.json` (palette, type scale, spacing, radii, shadows)
- [ ] `voice.md` (tone rules, do/don't)
- [ ] `copy.variants.json` (Recruiter/Peer/Client)
- [ ] Component library (Nav, Button, Card, ProjectCard, Footer)
- [ ] CI gates: lint + typecheck + Playwright + axe + Lighthouse
- [ ] Persona routes + toggle

## Site Structure

```
Homepage (/)
├── Hero: "I build things with AI that actually work"
├── Tool Grid (6 items)
│   ├── Live: Website Health Checker, ROI Calculator
│   └── Coming: FloorQuote Estimator, AI Tool Finder, Prompt Tester, Quick Prototyper
└── CTA: "See What I'm Building"

Projects/Blog (/projects or /writing)
└── Things I've made, experiments, real examples
```

## Core Values

- **Utility first**: Every page provides immediate value
- **No friction**: No signup, no ads, no upsells
- **Honesty**: Direct, practical tone. Builder to builder
- **Open**: Show your work, share real examples

## Key Copy

**Hero:** "I build things with AI that actually work"

**Tone:** Direct, practical, no-nonsense. Avoid startup hype, consultant-speak, AI buzzwords. Short sentences, clear value, honest about limitations.

## Technical Details

### Design System
- **Colors:** Primary Orange (#F97316), Secondary Sky (#0EA5E9), Neutral grays
- **Typography:** Poppins (display), Inter (body), System mono
- **Spacing:** 8pt grid (8/16/24/32/48/64)

### What NOT to Add
❌ Email capture / lead magnet
❌ Signup / authentication  
❌ Payment / premium tier
❌ Blog / content marketing
❌ Complex animations

## Active Files
- `src/app/` — App router pages
- `src/components/` — UI components
- `BUILD_SUMMARY.md` — build details
- `DEPLOYMENT.md` — deploy config
- `PROJECT_MAP.md` — file overview

## LLM Notes
- OpenClaw: high-level planning, project oversight
- Claude Code: has context, use for implementation sessions
- Codex: recommended for component generation per implementation plan
- Reference doc: `jadenraats.com web build improvements 5.2 pro.md` in Main Vault inbox

---
*Last updated: 2026-02-07*
