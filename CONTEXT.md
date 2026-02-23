# JadenRaats.com - Project Context

> **Start here:** Read `WHO.md` first for personal/professional context about Jaden.
> This file covers the technical project state.

---

## Vision

**Brand:** "Watch This Work"

A personal site that shows cool shit working. Not a portfolio. Not a funnel. Not too techy. Just a real person showing demos of interesting things.

**Positioning:** "I build things and show how they work."

**Vibe:** Personal YouTube channel, not LinkedIn thought leader. Montana-approved (if it's too techy/cringe, it's wrong).

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

## Site Structure (Target)

```
Homepage (/)
├── Hero: Real photo (trailer/outdoors, casual) + "I build things and show how they work."
├── Demo Grid (Looms/videos)
│   ├── "AI answers my business calls" (5 min)
│   ├── "How I automated lead follow-up" (3 min)
│   ├── "Built this estimator in a weekend" (4 min)
│   └── More demos as built
└── That's it. No about page, no blog, no services.
```

**Current state:** Has tools (Health Checker, ROI Calculator) — may keep or replace with demo-first approach.

## Core Values

- **Show don't tell**: Demos > descriptions. Looms > blog posts.
- **Dual audience**: Must impress both contractors AND tech people
- **No friction**: No signup, no popups, no newsletter
- **Montana test**: If it's too techy/cringe, tone it down
- **Real person energy**: Casual, authentic, not corporate

## Key Copy

**Hero:** "I build things and show how they work."

**Tone:** Direct, casual, no-nonsense. Personal YouTube channel vibe. Zero startup buzzwords or AI hype.

## Technical Details

### Design System
- **Colors:** Primary Orange (#F97316), Secondary Sky (#0EA5E9), Neutral grays
- **Typography:** Poppins (display), Inter (body), System mono
- **Spacing:** 8pt grid (8/16/24/32/48/64)

### What NOT to Add
❌ Email capture / lead magnet
❌ Signup / authentication  
❌ Payment / premium tier
❌ Blog / content calendar
❌ Complex animations
❌ Corporate headshots / "about me" essays
❌ Anything that fails the Montana test

## Active Files
- `src/app/` — App router pages (needs rebuild)
- `src/components/` — UI components (needs simplification)
- `WHO.md` — **READ FIRST** — personal/brand context
- `DEMO-PLAN.md` — Content pipeline for demos
- `REBUILD-SPEC.md` — Implementation guide for redesign
- `BUILD_SUMMARY.md` — build details
- `DEPLOYMENT.md` — deploy config

## Next Actions

### Immediate (Brand Pivot)
- [ ] Get hero photo (trailer, outdoors, casual)
- [ ] Record first demo: "AI answers my business calls" (5 min Loom)
- [ ] Record second demo: pick from DEMO-PLAN.md
- [ ] Rebuild homepage per REBUILD-SPEC.md

### After Content Ready
- [ ] Strip current page.tsx (remove cyber/glass aesthetic)
- [ ] Implement simple Hero + DemoGrid layout
- [ ] Test on mobile
- [ ] Ship it

## LLM Notes
- OpenClaw: high-level planning, brand direction
- Gemini/Claude: implementation per REBUILD-SPEC.md
- **Key docs:** WHO.md (brand), DEMO-PLAN.md (content), REBUILD-SPEC.md (implementation)

---
*Last updated: 2026-02-21 — "Watch This Work" pivot*
