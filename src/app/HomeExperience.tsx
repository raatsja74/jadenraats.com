import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { GUIDES } from "@/data/guides";

const display = localFont({
  src: "../assets/fonts/Anton-Regular.ttf",
  variable: "--paper-display",
  display: "swap",
});

const findGuide = (slug: string) => GUIDES.find((guide) => guide.slug === slug)!;
const frontDoor = findGuide("one-front-door");
const jobSite = findGuide("follow-up-that-survives-monday");
const rules = findGuide("write-the-rules-down");
const starter = findGuide("turn-a-messy-note-into-a-next-step");

const paths = [
  { no: "01", title: "SYSTEMS", href: "/systems", label: "See the systems", text: "Practical AI workflows for leads, quotes, crews, and everyday life.", icon: "⚙" },
  { no: "02", title: "GUIDES", href: "/guides", label: "Browse the guides", text: "Step-by-step notes, prompts, and lessons from actual use.", icon: "↗" },
  { no: "03", title: "LAB", href: "/prompt-lab", label: "Visit the lab", text: "Reusable skills, useful experiments, and work in progress.", icon: "✳" },
] as const;

function MountainSketch() {
  return (
    <svg className="pc-mountain-sketch" viewBox="0 0 360 150" fill="none" aria-hidden="true">
      <path d="M7 137 60 85 78 103 143 16 180 67 199 42 251 114 286 78 356 141" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m110 61 33-45 16 44-14-9-12 9-8-12m69 7 6-12 12 30m-156 37 24-24 18 24m185 0 14-31 21 39" stroke="currentColor" strokeWidth="1.4" />
      <path d="m67 131 61-48 16-22 18 43 19-23 54 52m-204 9h303M91 112l29-25m60 20 23-17m55 31 35-29" stroke="currentColor" strokeWidth="1" opacity=".62" />
      <path d="m14 147 15-10 14 9m263 1 12-11 13 10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function HomeExperience() {
  return (
    <div className={`pc-site ${display.variable}`}>
      <a className="pc-skip" href="#main">Skip to content</a>
      <header className="pc-header">
        <Link className="pc-brand" href="/" aria-label="Jaden Raats home">JADEN<span aria-hidden="true">✱</span></Link>
        <nav className="pc-nav" aria-label="Main navigation">
          <Link href="/systems">Systems</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/prompt-lab">Lab</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>

      <main id="main">
        <section className="pc-hero" aria-labelledby="pc-title">
          <div className="pc-hero-copy">
            <p className="pc-index">FIELD NOTES <span aria-hidden="true">/</span> PHOENIX, AZ</p>
            <h1 id="pc-title"><span className="pc-name-first">JADEN</span><span className="pc-name-last">RAATS<span aria-hidden="true" className="pc-asterisk">✱</span></span></h1>
            <p className="pc-statement">I build AI systems<br />that work in <em>real life.</em></p>
            <p className="pc-intro">I run a floor coating company. I share the systems, guides, and experiments I actually use.</p>
            <div className="pc-actions">
              <a className="pc-primary-action" href="#collection">Explore the work <span aria-hidden="true">↗</span></a>
              <Link className="pc-secondary-action" href="/about">Meet the builder <span aria-hidden="true">↗</span></Link>
            </div>
            <p className="pc-hero-note">BUILT / USED / FIXED / SHARED</p>
          </div>

          <div className="pc-hero-art">
            <div className="pc-map-print" aria-hidden="true" />
            <div className="pc-orange-backing" aria-hidden="true" />
            <figure className="pc-polaroid">
              <span className="pc-tape" aria-hidden="true" />
              <div className="pc-photo-window">
                <Image src="/images/jaden-portrait-mono-orange.jpg" alt="Black-and-white photograph of Jaden Raats" width={1254} height={1254} priority sizes="(max-width: 720px) 72vw, (max-width: 1080px) 38vw, 435px" />
              </div>
              <figcaption>Same principles.<br />Different water.</figcaption>
            </figure>
            <div className="pc-mountain-print" aria-hidden="true"><MountainSketch /><span>OUTSIDE IDEAS.<br />WORK BETTER.</span></div>
            <div className="pc-stamp" aria-hidden="true">✱<small>JR / 001</small></div>
            <span className="pc-orange-scribble" aria-hidden="true">⌁</span>
          </div>
        </section>

        <section className="pc-collection" id="collection" aria-labelledby="pc-collection-title">
          <div className="pc-rule"><h2 id="pc-collection-title">THE COLLECTION <span aria-hidden="true">↘</span></h2><p>01 — 03 &nbsp; / &nbsp; PICK A DIRECTION</p></div>
          <div className="pc-paths">
            {paths.map((path) => (
              <Link href={path.href} aria-label={path.label} className={`pc-card pc-card-${path.no}`} key={path.no}>
                <div className="pc-card-body">
                  <div className="pc-card-top"><span className="pc-card-grip" aria-hidden="true">⠿</span><span className="pc-number">{path.no}</span></div>
                  <h3>{path.title}</h3>
                  <span className="pc-swipe" aria-hidden="true" />
                  <p>{path.text}</p>
                  <span className="pc-card-icon" aria-hidden="true">{path.icon}</span>
                  <span className="pc-card-arrow" aria-hidden="true">↗</span>
                  {path.no === "01" && <MountainSketch />}
                  {path.no === "02" && <span className="pc-contours" aria-hidden="true" />}
                  {path.no === "03" && <span className="pc-flask" aria-hidden="true">⚗</span>}
                </div>
              </Link>
            ))}
          </div>
          <p className="pc-handnote">TAP / OPEN / EXPLORE <span aria-hidden="true">↗</span></p>
        </section>

        <section className="pc-reading" id="guides" aria-labelledby="pc-reading-title">
          <div className="pc-reading-head"><p className="pc-index">SELECTED FIELD NOTES / GUIDES</p><h2 id="pc-reading-title">Useful things,<br /><em>not just ideas.</em></h2><p>Real problems, the approach I tried, and enough detail to make your own version.</p></div>
          <div className="pc-reading-grid">
            <details className="pc-fold" id="field-note">
              <summary className="pc-fold-front">
                <span className="pc-fold-edge" aria-hidden="true" />
                <span className="pc-fold-top">OPEN FIELD NOTE &nbsp; / &nbsp; 001 <span aria-hidden="true">＋</span></span>
                <span className="pc-fold-title">ONE FRONT<br />DOOR<span aria-hidden="true">✱</span></span>
                <span className="pc-fold-bottom">A simpler way to capture work <span aria-hidden="true">↗</span></span>
              </summary>
              <div className="pc-fold-inside"><p className="pc-fold-label">INSIDE THE NOTE</p><h3>{frontDoor.title}</h3><p>{frontDoor.summary}</p><Link href={`/guides/${frontDoor.slug}`}>Read the full guide <span aria-hidden="true">↗</span></Link></div>
            </details>
            <div className="pc-guide-stack">
              {[starter, jobSite, rules].map((g, i) => (
                <article className="pc-guide" key={g.slug}>
                  <span className="pc-guide-num">{String(i + 2).padStart(3, "0")}</span>
                  <div><p>{g.tag} / {g.readMinutes} min read</p><h3><Link href={`/guides/${g.slug}`}>{g.title} <span aria-hidden="true">↗</span></Link></h3><p className="pc-guide-summary">{g.summary}</p></div>
                </article>
              ))}
              <Link className="pc-all-guides" href="/guides">All guides <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className="pc-outro" id="about" aria-labelledby="pc-outro-title">
          <div><p className="pc-index">NOT A COURSE. JUST THE WORK.</p><h2 id="pc-outro-title">Good ideas.<br /><em>Better execution.</em></h2><p>Owner, builder, and the guy who has to fix it when it breaks. Based in Phoenix, usually making something.</p><Link href="/about">More about me <span aria-hidden="true">↗</span></Link></div>
          <div className="pc-outro-stamp" aria-hidden="true"><span>JR</span><strong>✱</strong><small>BUILT IN THE OPEN</small></div>
        </section>
      </main>
      <footer className="pc-footer"><span>JADEN RAATS <b>✱</b></span><p>Useful systems. Real life.</p><Link href="mailto:ai@jadenraats.com">SAY HELLO ↗</Link></footer>
    </div>
  );
}