import Link from "next/link";

// Homepage-only collection cards, adapted from the approved paper-collage preview.
// Decorative artwork is inline SVG; the entire card is a normal, accessible link.
const sections = [
  {
    number: "01",
    title: "Systems",
    href: "/systems",
    description: "Practical AI workflows for leads, quotes, crews, and everyday life.",
    kind: "systems",
  },
  {
    number: "02",
    title: "Guides",
    href: "/guides",
    description: "Step-by-step notes, prompts, and lessons from actual use.",
    kind: "guides",
  },
  {
    number: "03",
    title: "Lab",
    href: "/prompt-lab",
    description: "Reusable skills, useful experiments, and work in progress.",
    kind: "lab",
  },
] as const;

function Mountains() {
  return (
    <svg className="cx-collection-mountains" viewBox="0 0 360 150" fill="none" aria-hidden="true" focusable="false">
      <path d="M7 137 60 85 78 103 143 16 180 67 199 42 251 114 286 78 356 141" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m110 61 33-45 16 44-14-9-12 9-8-12m69 7 6-12 12 30m-156 37 24-24 18 24m185 0 14-31 21 39" stroke="currentColor" strokeWidth="1.4" />
      <path d="m67 131 61-48 16-22 18 43 19-23 54 52m-204 9h303M91 112l29-25m60 20 23-17m55 31 35-29" stroke="currentColor" strokeWidth="1" opacity=".62" />
      <path d="m14 147 15-10 14 9m263 1 12-11 13 10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Compass() {
  return (
    <svg className="cx-collection-compass" viewBox="0 0 184 194" fill="none" aria-hidden="true" focusable="false">
      <ellipse cx="92" cy="100" rx="84" ry="98" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="92" cy="100" rx="64" ry="75" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="92" cy="100" rx="43" ry="53" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="92" cy="100" rx="21" ry="27" stroke="currentColor" strokeWidth="2" />
      <path d="m72 128 62-59-22 9-5 20-35 30Z" fill="currentColor" opacity=".76" />
      <path d="m72 128 62-59m-19 4 19-4-4 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LabFlask() {
  return (
    <svg className="cx-collection-flask" viewBox="0 0 144 150" fill="none" aria-hidden="true" focusable="false">
      <path d="M55 12h35M63 12v54l-35 58c-5 9 1 16 12 16h64c11 0 17-7 12-16L81 66V12" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m44 111 17-29 12 7 18-3 23 38c3 6 1 9-7 9H40c-7 0-10-4-6-10l10-12Z" fill="currentColor" opacity=".92" />
      <circle cx="66" cy="108" r="4" fill="rgb(20 18 16)" />
      <circle cx="87" cy="119" r="5" fill="rgb(20 18 16)" />
      <circle cx="80" cy="98" r="3.4" fill="rgb(20 18 16)" />
      <path d="M59 12h27" stroke="rgb(20 18 16)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function CollectionCards() {
  return (
    <section className="cx-collection" id="collection" aria-labelledby="cx-collection-title">
      <div className="cx-collection-rule">
        <h2 id="cx-collection-title">The collection <span aria-hidden="true">↘</span></h2>
        <p>01 — 03 <span aria-hidden="true">/</span> Pick a direction</p>
      </div>
      <div className="cx-collection-grid">
        {sections.map((item) => (
          <Link key={item.number} href={item.href} className={`cx-collection-card cx-collection-card--${item.kind}`}>
            <div className="cx-collection-paper">
              <div className="cx-collection-top">
                <span className="cx-collection-grip" aria-hidden="true" />
                <span className="cx-collection-number">{item.number}</span>
              </div>
              <span className="cx-collection-arrow" aria-hidden="true">↗</span>
              <h3>{item.title}</h3>
              <span className="cx-collection-underline" aria-hidden="true" />
              <p>{item.description}</p>
              {item.kind === "systems" && (
                <>
                  <Mountains />
                  <span className="cx-collection-gear" aria-hidden="true">⚙</span>
                </>
              )}
              {item.kind === "guides" && <Compass />}
              {item.kind === "lab" && <LabFlask />}
            </div>
          </Link>
        ))}
      </div>
      <p className="cx-collection-handnote">Tap / Open / Explore <span aria-hidden="true">↗</span></p>
    </section>
  );
}
