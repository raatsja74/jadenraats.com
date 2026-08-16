# jadenraats.com Hybrid Design Refresh

Status: draft for written-spec review  
Date: 2026-08-16  
Scope: Phase 1 only; no production deployment

## Objective

Test a restrained editorial refresh of jadenraats.com without replacing the
current site. The first phase should make the site feel calmer and more
intentional while preserving its warm cream, ink, terracotta, mono-label, and
asterisk identity.

The larger illustrated/cartoon version of Jaden remains a Phase 2 idea. It is
not part of this implementation.

## Design

### Persistent identity mark

Add one real supplied portrait of Jaden as a small circular home link in the
top-left viewport corner on the homepage, /about, and /prompt-lab.

- Desktop size: 40px square.
- Mobile size: 32px square.
- Position: fixed, 20px from the top and left on desktop; 12px on mobile,
  respecting safe-area insets.
- Treatment: circular crop, subtle token-based border, restrained hover/focus
  response, visible keyboard focus ring.
- Accessible name: Jaden Raats - home.
- The image must be supplied by Jaden. Do not use a generated face, placeholder,
  logo, or site icon.
- The centered navigation remains unchanged except for collision-safe spacing.

### Homepage editorial rhythm

Keep the current hero, marquee, work index, Hermes case study, contact section,
footer, and copy. Refine only the spacing and hierarchy needed to make the
homepage feel less crowded and more editorial.

Preserve Award Coatings, Hermes, and FloorQuote as the primary proof surface.
Do not replace the work index with generic image cards or introduce a CMS.

### About bridge

Convert the homepage About block into a full-bleed section that visually
bridges the cream body into the existing dark contact ending.

- Keep the inner reading width at the existing max-w-5xl.
- Preserve the heading “Operator first, builder second.” and the truthful
  operator/builder copy.
- On entry into the viewport, transition the section background from bg to ink
  over approximately 700ms.
- In the dark state, use cream heading/body text and the existing terracotta
  accent.
- Define the section state with Framer Motion useInView, not a continuously
  updating scroll listener.
- Use a generous viewport margin or equivalent threshold so the state does not
  flicker at the boundary.
- The state may reverse when the section leaves the relevant viewport band.
- Keep the “more about me” link visible and readable in both states.
- Preserve the existing dark Contact section; this is a localized bridge, not a
  site-wide theme change.

### Motion and accessibility

Reuse the existing Framer Motion layer and MotionConfig reducedMotion="user".
No new animation library, WebGL, shader, cursor system, or hover-dependent
content is allowed.

With reduced motion enabled, remove the color-transition duration while keeping
all content and navigation fully usable.

## Files and boundaries

Expected implementation files:

- public/images/jaden-portrait.jpg - supplied, square-cropped portrait asset.
- src/components/ProfileMark.tsx - accessible portrait home link.
- src/components/Nav.tsx - shared placement.
- src/app/page.tsx - homepage About bridge and narrowly scoped spacing.
- src/app/globals.css - only styles that cannot be expressed with existing
  tokens/utilities.

Do not modify metadata, sitemap, OG image, routes, About-page content, or
unrelated components unless validation identifies a concrete regression.

## Explicitly out of scope

- The large illustrated/cartoon hero.
- Any hero portrait or right-side image composition.
- 3D, WebGL, shaders, particles, Lottie, video, or new dependencies.
- A new color palette, gradient system, glassmorphism, or blue/black rebrand.
- A full portfolio rewrite, CMS, or new content model.
- Production deployment during this phase.

## Asset dependency

Implementation must stop before UI work if the supplied portrait is missing.
The source image stays outside the repository; only the optimized square web
asset is copied into public/images/. The asset must have an explicit square
aspect ratio and load without layout shift.

## Validation

Run:

    npm run lint
    npm run check:design
    npm run build

Manually review the local prototype at 375px, 768px, and desktop width:

- Portrait mark does not collide with the centered nav or first content line.
- Profile mark links home from all three routes.
- The About bridge changes contrast cleanly and does not flicker.
- All text and links remain readable in both color states.
- Keyboard focus is visible.
- Reduced-motion mode removes nonessential transition movement.
- No horizontal overflow or hover-only content exists.

Do not publish until the local result has been reviewed and approved.

## Phase 2 handoff

After Phase 1 is reviewed, revisit the saved cartoon-hero idea separately.
That phase may use the final layout as its foundation, but it requires a new
design approval, an actual photo reference, and its own production spec.
