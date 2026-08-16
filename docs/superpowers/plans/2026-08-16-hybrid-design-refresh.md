# Hybrid Design Refresh Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

Goal: Build a local-only Phase 1 refresh with a small real portrait mark, calmer homepage editorial rhythm, and a restrained cream-to-ink About transition while deferring the illustrated hero.

Architecture: Preserve the existing Next.js App Router structure, centered floating navigation, Framer Motion layer, Tailwind token system, routes, copy, work index, Hermes case study, contact section, and prompt lab. Add a focused ProfileMark component, extend the shared Nav, and make the homepage About section own its in-view color state. Do not add a new dependency or deploy.

Tech Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 3, Framer Motion 12, next/image, existing next/font typography.

## Global Constraints

- Use only the supplied real portrait; if it is missing, stop before UI work and ask Jaden for it.
- Preserve the warm cream, ink, terracotta, mono-label, grain, and asterisk identity.
- Keep the current hero, marquee, work index, Hermes case study, contact section, footer, routes, and prompt lab.
- Do not implement the large illustrated/cartoon hero in Phase 1.
- Do not add WebGL, shaders, particles, Lottie, video, cursor effects, gradients, glassmorphism, or new dependencies.
- Use existing tokens from src/app/globals.css and keep essential content independent of hover or animation.
- Keep the portrait mark keyboard-accessible, responsive, stable in layout, and meaningful to screen readers.
- Validate at 375px, 768px, and desktop widths before considering the prototype complete.
- Do not modify metadata, sitemap, OG image, or unrelated pages unless a concrete regression is found.
- Do not deploy to production during this plan.

## File Structure

- public/images/jaden-portrait.jpg: square-cropped, supplied web asset only.
- src/components/ProfileMark.tsx: one-purpose accessible link containing the portrait.
- src/components/Nav.tsx: shared placement of ProfileMark beside the existing centered nav.
- src/app/page.tsx: homepage About bridge and narrowly scoped spacing/hierarchy adjustments.
- src/app/globals.css: only shared portrait or transition styles that cannot use existing utilities.
- docs/superpowers/plans/2026-08-16-hybrid-design-refresh.md: this execution plan.

### Task 1: Confirm the real portrait dependency

Files:
- Create: public/images/jaden-portrait.jpg only after Jaden supplies the source image.

Interfaces:
- Produces: a local square portrait asset at /images/jaden-portrait.jpg.
- Consumers: ProfileMark in Task 2.

- [ ] Step 1: Check whether the supplied asset already exists.

Run:

    test -f public/images/jaden-portrait.jpg && file public/images/jaden-portrait.jpg

Expected: The file exists and reports a raster image. If it does not exist, stop the implementation and ask Jaden to upload or identify the real portrait.

- [ ] Step 2: Prepare the supplied image without inventing a replacement.

Crop the supplied source to a square with enough margin for a circular crop. Keep the original source outside the repository. Export a high-quality JPG or WebP with no unnecessary metadata, then place the final asset at public/images/jaden-portrait.jpg.

- [ ] Step 3: Verify the asset dimensions.

Run:

    sips -g pixelWidth -g pixelHeight public/images/jaden-portrait.jpg

Expected: pixelWidth and pixelHeight are equal, and the image is large enough for the 40px desktop mark.

### Task 2: Add the accessible ProfileMark component

Files:
- Create: src/components/ProfileMark.tsx

Interfaces:
- Consumes: /images/jaden-portrait.jpg.
- Produces: a default-exported ProfileMark component that renders an anchor to / with an accessible name of Jaden Raats - home.

- [ ] Step 1: Create the component with explicit image dimensions.

Use the existing Next.js patterns and implement this exact shape:

~~~tsx
import Image from "next/image";

export default function ProfileMark() {
  return (
    <a
      href="/"
      aria-label="Jaden Raats - home"
      className="profile-mark fixed left-3 top-3 z-50 h-8 w-8 overflow-hidden rounded-full border border-ink/20 sm:left-5 sm:top-5 sm:h-10 sm:w-10"
    >
      <Image
        src="/images/jaden-portrait.jpg"
        alt=""
        width={40}
        height={40}
        sizes="(max-width: 639px) 32px, 40px"
        className="h-full w-full object-cover"
      />
    </a>
  );
}
~~~

The empty image alt is intentional because the link carries the accessible name; the portrait is identity decoration for the home link rather than separate page content.

- [ ] Step 2: Add the existing visible focus treatment.

Use the global focus-visible rule already present in src/app/globals.css. If the circular mark needs a local rule, add only a token-based focus or hover refinement; do not add a new animation system.

- [ ] Step 3: Run the type and lint checks for the new component.

Run:

    npm run lint

Expected: PASS with no JSX, TypeScript, or accessibility errors.

### Task 3: Mount ProfileMark without changing the centered navigation

Files:
- Modify: src/components/Nav.tsx

Interfaces:
- Consumes: ProfileMark from Task 2.
- Produces: the same Nav API and existing navigation links, plus a fixed top-left ProfileMark on every route that renders Nav.

- [ ] Step 1: Import ProfileMark.

Add the local component import beside the existing Framer Motion import.

- [ ] Step 2: Render ProfileMark alongside the existing header.

Return a fragment containing ProfileMark and the existing motion.header. Do not move or rewrite the centered pill navigation.

- [ ] Step 3: Check all shared routes.

Start the local server and verify /, /about, and /prompt-lab return 200 responses and include the profile mark without changing their existing route structure.

Run:

    npm run dev
    curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/ http://localhost:3000/about http://localhost:3000/prompt-lab

Expected: Each route responds with 200. Stop the dev server after verification if no later browser review needs it.

### Task 4: Convert the homepage About block into the cream-to-ink bridge

Files:
- Modify: src/app/page.tsx in the About function.

Interfaces:
- Consumes: existing About copy, SectionLabel, fadeUp, and Framer Motion.
- Produces: an About section whose background and readable text state change while it is in the relevant viewport band.

- [ ] Step 1: Add an About section ref and in-view state.

Use the existing useRef and useInView imports. Within About, define:

~~~tsx
const sectionRef = useRef<HTMLElement>(null);
const isDark = useInView(sectionRef, {
  amount: 0.25,
  margin: "-15% 0px -25% 0px",
});
~~~

The margin must create a stable transition band rather than toggling at a single viewport edge.

- [ ] Step 2: Move the max-width container inside a full-bleed section.

Keep the existing scroll anchor and vertical spacing on the outer section. Attach ref={sectionRef} to the section, give it token-based cream and ink states, and move mx-auto max-w-5xl onto an inner wrapper.

- [ ] Step 3: Define both contrast states explicitly.

Use the existing token classes:

~~~tsx
const sectionTone = isDark
  ? "bg-ink text-cream"
  : "bg-cream text-ink";
const bodyTone = isDark ? "text-cream/70" : "text-soft";
~~~

Apply sectionTone to the outer section, bodyTone to both body paragraphs, and ensure the heading inherits the section text color. Keep SectionLabel and the more about me link in the existing terracotta accent.

- [ ] Step 4: Add the restrained transition and reduced-motion fallback.

Use transition-colors duration-700 on the outer section and motion-reduce:duration-0. Do not add a scroll listener or continuously recompute scroll position.

- [ ] Step 5: Preserve copy and link behavior.

Keep the heading “Operator first, builder second.”, the two existing paragraphs, and the /about link. Do not change homepage metadata or other sections in this task.

### Task 5: Apply only the needed editorial spacing polish

Files:
- Modify: src/app/page.tsx only if the new full-bleed About section creates a spacing or hierarchy defect.
- Modify: src/app/globals.css only if an existing utility cannot express the profile mark or transition behavior.

Interfaces:
- Consumes: the completed ProfileMark and About bridge.
- Produces: a calmer first scroll without changing the site’s content architecture.

- [ ] Step 1: Compare the hero-to-About rhythm at desktop and mobile widths.

Review the space between Hero, Marquee, and About at 375px, 768px, and desktop width. Change only the minimum padding or label spacing required to avoid crowding or awkward dead space.

- [ ] Step 2: Keep the work and case study surfaces unchanged.

Do not add image cards, new sections, new copy, or Maxime-specific effects. Preserve Award Coatings, Hermes, FloorQuote, and the current case study structure.

- [ ] Step 3: Run the design guard.

Run:

    npm run check:design

Expected: PASS with no banned visual patterns in src/.

### Task 6: Validate the local prototype

Files:
- Modify only files from Tasks 1–5 if validation finds a concrete defect.

- [ ] Step 1: Run static checks.

Run:

    npm run lint
    npm run check:design
    npm run build

Expected: all three commands pass.

- [ ] Step 2: Review the profile mark at required widths.

At 375px, 768px, and desktop width, confirm the portrait mark does not cover the centered navigation, first content line, browser safe area, or focus ring. Confirm it has no layout shift.

- [ ] Step 3: Review the About bridge.

Scroll slowly into and out of the About section. Confirm one calm cream-to-ink transition, no threshold flicker, readable label/heading/body/link states, and no horizontal overflow.

- [ ] Step 4: Review keyboard and reduced motion.

Tab through the profile mark, nav, About link, work links, and contact links. Enable reduced motion and confirm the content remains present while the color transition becomes immediate.

- [ ] Step 5: Review the final diff.

Run:

    git diff --check
    git status --short

Expected: changes are limited to the supplied portrait asset, ProfileMark, shared Nav, homepage About/spacing, supporting styles, and this plan. Do not stage or modify the existing unrelated worktree changes.

- [ ] Step 6: Commit the prototype only after review.

Run:

    git add public/images/jaden-portrait.jpg src/components/ProfileMark.tsx src/components/Nav.tsx src/app/page.tsx src/app/globals.css
    git commit -m "feat: add hybrid editorial homepage refresh"

Do not deploy. Phase 2 cartoon-hero work requires a new design review and its own plan.
