"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import { GUIDES } from "@/data/guides";
import { SKILLS } from "./prompt-lab/skills";

const FEATURED_SKILLS = [...SKILLS].sort((a, b) => b.uses - a.uses).slice(0, 4);

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { y: 28 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="top" className="home-start" aria-labelledby="home-title">
      <div className="home-section-wrap home-start-layout">
        <div className="home-start-copy">
          <p className="home-start-eyebrow"><span aria-hidden="true">✱</span> A useful place to start</p>
          <h1 id="home-title" className="home-start-title">
            Give your tasks and ideas <span>one place to go.</span>
          </h1>
          <p className="home-start-description">
            Notes in one app. Tasks in another. This guide shows how to choose
            where new things go, so you can find them again.
          </p>
          <p className="home-start-byline">
            I&apos;m Jaden. I share what I&apos;ve learned building useful systems
            for my own business.
          </p>
        </div>

        <div className="home-start-feature">
          <p className="home-start-feature-label">Start here <span>·</span> 5 min read</p>
          <h2>One front door: stop making AI guess your intent</h2>
          <p>Choose two places to capture ideas and one home for what you save.</p>
          <Link href="/guides/one-front-door" className="btn btn-primary home-start-cta">
            Read guide <span aria-hidden="true">→</span>
          </Link>
          <span className="home-start-feature-note">Free guide. No special tools needed to read it.</span>
        </div>
      </div>
    </section>
  );
}

const BROWSING_PATHS = [
  {
    title: "Start here",
    description: "Simplify how you save tasks and ideas.",
    href: "/guides/one-front-door",
    action: "Read the starter guide",
  },
  {
    title: "Use it at work",
    description: "Set a follow-up process that survives a busy day.",
    href: "/guides/follow-up-that-survives-monday",
    action: "Read the work guide",
  },
  {
    title: "Build your own",
    description: "Write simple rules before adding automation.",
    href: "/guides/write-the-rules-down",
    action: "Read the systems guide",
  },
] as const;

function BrowsePaths() {
  return (
    <section className="home-paths" aria-labelledby="paths-title">
      <div className="home-section-wrap">
        <div className="home-paths-heading">
          <div>
            <p className="home-overline">Choose your next step</p>
            <h2 id="paths-title">Three ways in. One site.</h2>
          </div>
          <Link href="/guides" className="home-text-link">See all guides <span aria-hidden="true">→</span></Link>
        </div>
        <div className="home-paths-grid">
          {BROWSING_PATHS.map((path, index) => (
            <Link href={path.href} className="home-path-card" key={path.title}>
              <span className="home-path-number">0{index + 1}</span>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <span className="home-path-action">{path.action} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemsFeature() {
  return (
    <section id="systems" className="home-systems" aria-labelledby="systems-title">
      <div className="home-section-wrap">
        <Reveal className="home-section-topline">
          <span>Field note / 01</span><span>Operations → automation</span>
        </Reveal>
        <div className="home-systems-grid">
          <Reveal className="home-systems-heading">
            <p className="home-overline">This is the point</p>
            <h2 id="systems-title" className="home-section-title">
              Watch this <em>work.</em>
            </h2>
          </Reveal>
          <Reveal className="home-systems-intro" delay={0.1}>
            <p>These systems handle leads, quotes, crews, and follow-up at my
              floor coating company. If one breaks, I have to fix it.</p>
            <Link href="/systems" className="home-text-link">
              Open the systems <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Link href="/systems" className="home-system-card">
            <span className="home-system-card-index">01 / Systems</span>
            <strong>Work that has to run</strong>
            <span className="home-system-card-arrow" aria-hidden="true">↗</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function GuidesSection() {
  return (
    <section id="guides" className="home-guides" aria-labelledby="guides-title">
      <div className="home-section-wrap">
        <Reveal className="home-section-topline">
          <span>Field note / 02</span><span>Read it → try it</span>
        </Reveal>
        <Reveal className="home-guides-head">
          <div>
            <p className="home-overline">No course. Just the steps.</p>
            <h2 id="guides-title" className="home-section-title">More guides<br /><em>for what comes next.</em></h2>
            <p className="home-guides-summary">Two next steps: make clear filing rules or improve customer follow-up.</p>
          </div>
          <Link href="/guides" className="home-text-link">
            All guides <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>

        <ol className="home-guides-grid">
          {GUIDES.filter((guide) =>
            guide.slug === "write-the-rules-down" ||
            guide.slug === "follow-up-that-survives-monday"
          ).map((guide, index) => (
            <li key={guide.slug}>
              <Reveal delay={index * 0.08} className="home-guide-reveal">
                <Link href={`/guides/${guide.slug}`} className="home-guide-card">
                  <div className="home-guide-image">
                    <Image src={guide.image} alt="" fill sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw" />
                    <span className="home-guide-number">0{index + 1}</span>
                  </div>
                  <div className="home-guide-content">
                    <span className="home-card-meta">GUIDE / {guide.readMinutes} MIN READ</span>
                    <h3>{guide.title}</h3>
                    <p className="home-guide-outcome">
                      {guide.slug === "write-the-rules-down"
                        ? "Make a one-page rule for where notes, tasks and files belong."
                        : "Plan how to reply to a new lead on a busy workday."}
                    </p>
                    <span className="home-card-action">Read guide <span aria-hidden="true">↗</span></span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="lab" className="home-skills" aria-labelledby="skills-title">
      <div className="home-section-wrap home-skills-grid">
        <Reveal className="home-skills-intro">
          <span className="home-skills-topline">Field note / 03</span>
          <span className="home-skills-asterisk" aria-hidden="true">✱</span>
          <h2 id="skills-title">Skills<br /><em>library.</em></h2>
          <p>Prompts and workflows you can copy, change, and put to work.</p>
          <Link href="/prompt-lab" className="btn btn-secondary">
            BROWSE ALL {SKILLS.length} <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <div className="home-skills-list">
          <div className="home-skills-list-head"><span>Popular skills</span><span>Open / copy / use</span></div>
          <ol>
            {FEATURED_SKILLS.map((skill, index) => (
              <li key={skill.id}>
                <Reveal delay={index * 0.06}>
                  <Link href={`/prompt-lab?q=${encodeURIComponent(skill.name)}`} className="home-skill-row">
                    <span className="home-skill-index">0{index + 1}</span>
                    <span className="home-skill-name">{skill.name}<small>{skill.category}</small></span>
                    <span className="home-skill-arrow" aria-hidden="true">↗</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
          <Link href="/prompt-lab" className="home-skills-all">Open the full library <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="home-footer">
      <div className="home-section-wrap home-footer-grid">
        <div>
          <span className="home-footer-kicker">End of field notes / start of conversation</span>
          <p>If it&apos;s real work,<br /><em>I&apos;m interested.</em></p>
        </div>
        <div className="home-footer-actions">
          <a href="mailto:ai@jadenraats.com" className="btn btn-primary">Say hello <span className="btn-arrow" aria-hidden="true">↗</span></a>
          <Link href="/about" className="home-footer-about">More about me <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="home-footer-bottom">
          <span>Jaden✱ / Phoenix, AZ</span>
          <figure className="home-dog-signature">
            <span className="home-dog-frame">
              <Image
                src="/images/easton-signature.webp"
                alt="Illustrated portrait of Easton the dog"
                width={1938}
                height={1932}
                unoptimized
                className="home-dog-image"
              />
            </span>
            <figcaption>Easton</figcaption>
          </figure>
          <span>Built by me. Used by me.</span>
        </div>
      </div>
    </footer>
  );
}

export default function HomeExperience() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <BrowsePaths />
        <GuidesSection />
        <SystemsFeature />
        <SkillsSection />
      </main>
      <Footer />
    </MotionConfig>
  );
}
