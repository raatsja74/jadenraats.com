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
          <span>FIELD NOTES / 001</span>
          <span>PHOENIX, AZ · BUILT IN THE OPEN</span>
        </div>

        <div className="home-cover-grid">
          <div className="home-cover-copy">
            <motion.p {...enter(0.05)} className="home-overline">
              OWNER / BUILDER / THE PERSON WHO HAS TO USE IT
            </motion.p>

            <h1 id="home-title" className="home-cover-title">
              <motion.span {...enter(0.12)} className="home-cover-title-line">
                JADEN
              </motion.span>
              <motion.span {...enter(0.22)} className="home-cover-title-line home-cover-title-last">
                <em>RAATS</em><span aria-hidden="true" className="home-title-mark">✱</span>
              </motion.span>
            </h1>

            <motion.p {...enter(0.38)} className="home-cover-description">
              I run a floor coating company in Phoenix. I build the AI systems
              we use there. Start with the systems, guides, or skills below.
            </motion.p>

            <motion.div {...enter(0.5)} className="home-cover-actions">
              <Link href="/systems" className="btn btn-primary">
                See the systems <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="#guides" className="btn btn-secondary">
                Read a guide <span className="btn-arrow" aria-hidden="true">↘</span>
              </Link>
            </motion.div>

            <motion.p {...enter(0.62)} className="home-cover-footnote">
              <span className="home-footnote-rule" aria-hidden="true" />
              REAL OPERATIONS. PLAIN ENGLISH. NO MAGIC TRICKS.
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
              <span>01 / THE OPERATOR</span>
              <span>TESTED ON A REAL MONDAY</span>
            </figcaption>
            <span className="home-art-stamp" aria-hidden="true">BUILT<br />USED<br />FIXED</span>
          </motion.figure>
        </div>

        <div className="home-cover-index" aria-label="Explore the site">
          <Link href="/systems"><span>01</span> SYSTEMS <span aria-hidden="true">↗</span></Link>
          <Link href="#guides"><span>02</span> GUIDES <span aria-hidden="true">↗</span></Link>
          <Link href="#lab"><span>03</span> SKILLS <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}

function SignalStrip() {
  const phrases = ["BUILD IT", "USE IT", "BREAK IT", "FIX IT", "SHOW THE WORK"];
  return (
    <div className="home-signal">
      <span className="sr-only">Build it, use it, break it, fix it, show the work.</span>
      {[0, 1].map((copy) => (
        <div className="home-signal-track" key={copy} aria-hidden="true">
          {phrases.map((phrase) => (
            <span key={phrase}>{phrase}<b>✱</b></span>
          ))}
        </div>
      ))}
    </div>
  );
}

function SystemsFeature() {
  return (
    <section id="systems" className="home-systems" aria-labelledby="systems-title">
      <div className="home-section-wrap">
        <Reveal className="home-section-topline">
          <span>FIELD NOTE / 01</span><span>OPERATIONS → AUTOMATION</span>
        </Reveal>
        <div className="home-systems-grid">
          <Reveal className="home-systems-heading">
            <p className="home-overline">THIS IS THE POINT</p>
            <h2 id="systems-title" className="home-section-title">
              WATCH THIS <em>WORK.</em>
            </h2>
          </Reveal>
          <Reveal className="home-systems-intro" delay={0.1}>
            <p>These systems handle leads, quotes, crews, and follow-up at my
              floor coating company. If one breaks, I have to fix it.</p>
            <Link href="/systems" className="home-text-link">
              OPEN THE SYSTEMS <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Link href="/systems" className="home-system-card">
            <span className="home-system-card-index">01 / SYSTEMS</span>
            <strong>WORK THAT HAS TO RUN</strong>
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
          <span>FIELD NOTE / 02</span><span>READ IT → TRY IT</span>
        </Reveal>
        <Reveal className="home-guides-head">
          <div>
            <p className="home-overline">NO COURSE. JUST THE STEPS.</p>
            <h2 id="guides-title" className="home-section-title">FREE GUIDES<br /><em>TO LEARN AI.</em></h2>
            <p className="home-guides-summary">Short, practical steps from the tools I use at work.</p>
          </div>
          <Link href="/guides" className="home-text-link">
            ALL GUIDES <span aria-hidden="true">↗</span>
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
                    <span className="home-card-meta">GUIDE / {guide.readMinutes} MIN READ</span>
                    <h3>{guide.title}</h3>
                    <span className="home-card-action">READ THE GUIDE <span aria-hidden="true">↗</span></span>
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
          <span className="home-skills-topline">FIELD NOTE / 03</span>
          <span className="home-skills-asterisk" aria-hidden="true">✱</span>
          <h2 id="skills-title">SKILLS<br /><em>LIBRARY.</em></h2>
          <p>Prompts and workflows you can copy, change, and put to work.</p>
          <Link href="/prompt-lab" className="btn btn-secondary">
            BROWSE ALL {SKILLS.length} <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <div className="home-skills-list">
          <div className="home-skills-list-head"><span>POPULAR SKILLS</span><span>OPEN / COPY / USE</span></div>
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
          <Link href="/prompt-lab" className="home-skills-all">OPEN THE FULL LIBRARY <span aria-hidden="true">→</span></Link>
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
          <span className="home-footer-kicker">END OF FIELD NOTES / START OF CONVERSATION</span>
          <p>IF IT&apos;S REAL WORK,<br /><em>I&apos;M INTERESTED.</em></p>
        </div>
        <div className="home-footer-actions">
          <a href="mailto:ai@jadenraats.com" className="btn btn-primary">SAY HELLO <span className="btn-arrow" aria-hidden="true">↗</span></a>
          <Link href="/about" className="home-footer-about">MORE ABOUT ME <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="home-footer-bottom">
          <span>JADEN✱ / PHOENIX, AZ</span>
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
            <figcaption>EASTON</figcaption>
          </figure>
          <span>BUILT BY ME. USED BY ME.</span>
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
        <SignalStrip />
        <SystemsFeature />
        <GuidesSection />
        <SkillsSection />
      </main>
      <Footer />
    </MotionConfig>
  );
}
