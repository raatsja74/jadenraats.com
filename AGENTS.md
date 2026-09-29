# jadenraats.com — Codex Agent Instructions

## Role
Creative and strategic thinking partner for Jaden's personal site. This site is a personal brand platform — not a portfolio, not a LinkedIn profile. The vibe is "Watch This Work": real demos, real tools, real results. Read `WHO.md` before making any content or copy decisions.

## The Brand: "Watch This Work"
- **Not:** AI consultant, thought leader, course seller, LinkedIn guru
- **Yes:** Real builder. Ships ugly things that work. Montana-approved (if it'd make Montana friends cringe, it's wrong).
- **Voice:** Direct, a little dry, no fluff. Demos over descriptions.
- **Aesthetic:** Terminal / experimental. Cyber-Night dark mode + Utility-Light. Not SaaS-generic.

## Who Jaden Is
- Runs Award Coatings (floor coating business, Phoenix/Scottsdale)
- Builds FloorQuote (SaaS estimating tool for contractors)
- Builds AI automations that actually work (not demos)
- Sales background. Self-taught builder. Split time Phoenix + Montana.

## Current State
- Theme switching live (Cyber-Night + Utility-Light via next-themes)
- "The Lab" (`/lab`) live — embedded AI tools with terminal aesthetic
- Hero and demo grid being rebuilt
- Stack: Next.js 14, Framer Motion, Tailwind

## Key Reference Files
- `WHO.md` — Who Jaden is, brand voice, what not to do (mandatory read)
- `REBUILD-SPEC.md` — Current rebuild spec
- `DEMO-PLAN.md` — Demo section plan
- `JadenRaats.com Notes.md` — Current state and next actions

## Key Components
- `src/components/GadgetWrapper.tsx` — Lab gadget embedding
- `src/app/lab/page.tsx` — The Lab page
- `src/app/page.tsx` — Homepage
- `src/components/Header.tsx` — Navigation

## How to Work With Jaden
- Content decisions: ask "would a Montana rancher think this is bullshit?" If yes, cut it.
- Design: lean into the terminal/industrial aesthetic. Avoid rounded, pastel, generic SaaS.
- Copy: short sentences. Real outcomes. No "leverage synergies" or "thought leader" language.
- The site should make someone say "this guy actually builds stuff" not "this guy talks about AI".

## Task Coordination
On session start, check for open issues in this repository:
1. **Find work:** Look for issues labeled with your agent identifier (`claude-code`, `codex`, `clanker`, etc.)
2. **Prioritize:** 
   - Issues with assigned milestones first
   - Then issues labeled `urgent`
   - Then oldest issue first
3. **Self-assign:** Assign yourself to the issue and move to "In Progress" (if using Projects)
4. **Work & update:** Comment at meaningful checkpoints (not every small step)
5. **Close cleanly:** When complete, add a closing comment with:
   - What was accomplished
   - Any relevant file paths or outputs
   - Link to this session if applicable
If no labeled issues exist, proceed with the user's direct request.
