import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { GUIDES } from "@/data/guides";

const lead = GUIDES.find((guide) => guide.slug === "turn-a-messy-note-into-a-next-step")!;
const work = GUIDES.find((guide) => guide.slug === "follow-up-that-survives-monday")!;
const build = GUIDES.filter((guide) => ["one-front-door", "write-the-rules-down"].includes(guide.slug))
  .sort((a, b) => Number(b.slug === "one-front-door") - Number(a.slug === "one-front-door"));

export default function HomeExperience() {
  return (
    <>
      <Nav />
      <main className="home-page">
        <section className="home-intro" aria-labelledby="home-title">
          <div className="home-intro-copy">
            <p className="home-eyebrow">Guides by Jaden Raats</p>
            <h1 id="home-title">Try AI on a note from your day</h1>
            <p>Start with a rough note or a to-do list. This guide gives you a prompt to sort it and choose one next action.</p>
            <Link href={`/guides/${lead.slug}`} className="btn btn-primary">Read the starter guide <span aria-hidden="true">→</span></Link>
            <p className="home-intro-byline">I’m Jaden. I share what I’m trying with AI, at work and in everyday life.</p>
          </div>
          <figure className="home-portrait">
            <Image src="/images/jaden-portrait-mono-orange.jpg" alt="Black-and-white portrait of Jaden Raats with an orange asterisk" width={1254} height={1254} priority sizes="(max-width: 760px) 240px, 40vw" className="brand-accent-image" />
          </figure>
        </section>

        <section id="guides" className="home-guide-section" aria-labelledby="guides-title">
          <div className="home-section-heading"><h2 id="guides-title">Start with this guide</h2><Link href="/guides" className="home-link">All guides <span aria-hidden="true">→</span></Link></div>
          <article className="home-lead-guide">
            <div><h3>{lead.title}</h3><p>{lead.summary}</p></div>
            <Link href={`/guides/${lead.slug}`} className="btn btn-secondary">Read guide <span aria-hidden="true">→</span></Link>
          </article>
        </section>

        <section className="home-paths" aria-labelledby="paths-title">
          <h2 id="paths-title">Choose a path</h2>
          <div className="home-path-grid">
            <article><h3>Start here</h3><p>Try one prompt on a small task from your own day.</p><Link href={`/guides/${lead.slug}`} className="home-link">Sort a messy note <span aria-hidden="true">→</span></Link></article>
            <article><h3>Use it at work</h3><p>Review a follow-up process before adding automation.</p><Link href={`/guides/${work.slug}`} className="home-link">{work.title} <span aria-hidden="true">→</span></Link></article>
            <article><h3>Build your own</h3><p>Choose where information goes, then write the rules for your assistant.</p>{build.map(guide => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="home-link">{guide.slug === "one-front-door" ? "One front door" : "Write the rules down"} <span aria-hidden="true">→</span></Link>)}</article>
          </div>
          <p className="home-skills-link"><Link href="/prompt-lab" className="home-link">Explore the Skills library for reusable prompts and workflows <span aria-hidden="true">→</span></Link></p>
        </section>

        <section id="systems" className="home-proof" aria-labelledby="systems-title">
          <div><p className="home-eyebrow">Work behind the guides</p><h2 id="systems-title">How I use these systems</h2><p>Examples from my floor coating business: leads, quotes, crews, and follow-up.</p></div>
          <Link href="/systems" className="btn btn-secondary">See the work <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <footer className="home-footer">
        <p>Jaden Raats</p>
        <nav aria-label="Footer"><Link href="/about" className="home-link">About me</Link><a href="mailto:ai@jadenraats.com" className="home-link">Get in touch <span aria-hidden="true">→</span></a></nav>
      </footer>
    </>
  );
}
