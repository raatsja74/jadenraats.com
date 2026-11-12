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
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay: reduceMotion ? 0 : delay, ease: "easeOut" as const },
  });

  return (
    <section id="top" className="home-cover" aria-labelledby="home-title">
      <div className="home-cover-frame">
        <div className="home-cover-meta">
          <span>Field notes / 001</span>
          <span>Phoenix, AZ · Built in the open</span>
        </div>

        <div className="home-cover-grid">
          <div className="home-cover-copy">
            <motion.p {...enter(0.05)} className="home-overline">
              Practical AI guides by Jaden Raats
            </motion.p>

            <h1 id="home-title" className="home-cover-title">
              <motion.span {...enter(0.12)} className="home-cover-title-line">
                Turn a messy note
              </motion.span>
              <motion.span {...enter(0.22)} className="home-cover-title-line home-cover-title-last">
                into a clear next step.
              </motion.span>
            </h1>

            <motion.p {...enter(0.38)} className="home-cover-description">
              New to AI? Bring a note from your day. Follow the guide to turn it
              into one small action you can take.
            </motion.p>

            <motion.div {...enter(0.5)} className="home-cover-actions">
              <Link href="/guides/turn-a-messy-note-into-a-next-step" className="btn btn-primary">
                Try your first guide <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="#guides" className="btn btn-secondary">
                Browse all guides <span className="btn-arrow" aria-hidden="true">↘</span>
              </Link>
            </motion.div>

            <motion.p {...enter(0.62)} className="home-cover-footnote">
              <span className="home-footnote-rule" aria-hidden="true" />
              A simple prompt, a worked example, and a check before you act.
            </motion.p>
          </div>

          <motion.figure
            className="home-cover-art"
            initial={reduceMotion ? false : { opacity: 0, rotate: 3 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          >
            <div className="home-art-orange" aria-hidden="true" />
            <span className="home-art-scribble" aria-hidden="true">↘</span>
            <Image
              src="/images/jaden-fishing.webp"
              alt="Illustration of Jaden Raats holding a bass"
              width={960}
              height={1100}
              priority
              className="home-art-portrait"
            />
            <figcaption className="home-art-label">
              <span>01 / The operator</span>
              <span>Tested on a real Monday</span>
            </figcaption>
            <span className="home-art-stamp" aria-hidden="true">Built<br />Used<br />Fixed</span>
          </motion.figure>
        </div>

      </div>
    </section>
  );
}

function BrowsingPaths() {
  return (
    <nav className="home-paths home-section-wrap" aria-labelledby="home-paths-title">
      <h2 id="home-paths-title">Choose what to try next</h2>
      <div className="home-cover-index">
        <Link href="/guides"><span>01</span> Start here <span aria-hidden="true">↗</span></Link>
        <Link href="/systems"><span>02</span> Use it at work <span aria-hidden="true">↗</span></Link>
        <Link href="#lab"><span>03</span> Build your own <span aria-hidden="true">↗</span></Link>
      </div>
    </nav>
  );
}

function SystemsFeature() {
  return (
    <section id="systems" className="home-systems" aria-labelledby="systems-title">
      <div className="home-section-wrap">
        <Reveal className="home-section-topline">
          <span>Field note / 02</span><span>Operations → automation</span>
        </Reveal>
        <div className="home-systems-grid">
          <Reveal className="home-systems-heading">
            <p className="home-overline">Use it at work</p>
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
            <span className="home-system-card-index">02 / Systems</span>
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
          <span>Field note / 01</span><span>Read it → try it</span>
        </Reveal>
        <Reveal className="home-guides-head">
          <div>
            <p className="home-overline">Start here</p>
            <h2 id="guides-title" className="home-section-title">One useful task.<br /><em>Then the next.</em></h2>
            <p className="home-guides-summary">Begin with a simple task you can try in about ten minutes. Keep going with guides for work, tools, and your own systems.</p>
          </div>
          <Link href="/guides" className="home-text-link">
            All guides <span aria-hidden="true">↗</span>
          </Link>
        </Reveal>

        <ol className="home-guides-grid">
          {GUIDES.map((guide, index) => (
            <li key={guide.slug}>
              <Reveal delay={index * 0.08} className="home-guide-reveal">
                <Link href={`/guides/${guide.slug}`} className="home-guide-card">
                  <div className="home-guide-image">
                    <Image src={guide.image} alt="" fill sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw" />
                    <span className="home-guide-number">0{index + 1}</span>
                  </div>
                  <div className="home-guide-content">
                    <span className="home-card-meta">Guide / {guide.readMinutes} min read</span>
                    <h3>{guide.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-soft">{guide.summary}</p>
                    <span className="home-card-action">Read the guide <span aria-hidden="true">↗</span></span>
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
          <h2 id="skills-title">Build<br /><em>your own.</em></h2>
          <p>Prompts and workflows you can copy, change, and put to work.</p>
          <Link href="/prompt-lab" className="btn btn-secondary">
            Browse all {SKILLS.length} <span className="btn-arrow" aria-hidden="true">→</span>
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
        <GuidesSection />
        <BrowsingPaths />
        <SystemsFeature />
        <SkillsSection />
      </main>
      <Footer />
    </MotionConfig>
  );
}
