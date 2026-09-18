"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import { GUIDES } from "@/data/guides";
import { SKILL_CATEGORIES, SKILLS } from "./prompt-lab/skills";

// ── Motion presets ────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

/** First-paint guard for above-the-fold motion: the server and the initial
 *  client mount render the final state (no blank flash while JS loads);
 *  client-side navigations keep the designed entrance animation. */
let heroHasMounted = false;

function useHeroInitial<T extends object>(hidden: T): false | T {
  const [isFirstPaint] = useState(() => {
    if (typeof window === "undefined") return true;
    return !heroHasMounted;
  });
  useEffect(() => {
    heroHasMounted = true;
  }, []);
  return isFirstPaint ? false : hidden;
}

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: EASE },
};

/** Masked line reveal — text slides up from behind an invisible edge. */
function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const initial = useHeroInitial({ y: "115%" });
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={initial}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Types its text out once it scrolls into view. Reserves its final width. */
function Typewriter({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(() => (reduce ? text.length : 0));

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => {
      setCount((c) => (c >= text.length ? c : c + 1));
    }, 34);
    return () => clearInterval(id);
  }, [inView, reduce, text]);

  return (
    <span ref={ref} className="relative inline-block">
      {/* holds the line's full width so the footer never reflows mid-type */}
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute left-0 top-0 whitespace-pre">
        {text.slice(0, count)}
        {count < text.length && <span className="caret" />}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/** iMessage / message-bubble brand mark. Fills with the current color; the
 *  dots punch through to the paper so it reads on any surface. */
function MessageBubbleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 3h18v13H11.5l-4.5 4.5V16H3V3z" />
      <rect x="6.5" y="7.5" width="2" height="2" style={{ fill: "rgb(var(--bg))" }} />
      <rect x="11" y="7.5" width="2" height="2" style={{ fill: "rgb(var(--bg))" }} />
      <rect x="15.5" y="7.5" width="2" height="2" style={{ fill: "rgb(var(--bg))" }} />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const MARQUEE = [
  "real systems. real results.",
  "build. operate. automate. share.",
  "practical guides for real-world use",
  "phoenix, az",
  "tested in a real business",
  "plain english",
];

// ── Sections ──────────────────────────────────────────────────────────────────

function Hero() {
  const fade = useHeroInitial({ opacity: 0, y: 20 });
  const fadeSmall = useHeroInitial({ opacity: 0, y: 12 });
  const fadePortrait = useHeroInitial({ opacity: 0, y: 28 });
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-14 pt-32 sm:px-10 lg:px-16">
      <motion.div
        className="hero-portrait"
        initial={fadePortrait}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.45 }}
      >
        <Image
          src="/images/jaden-fishing.webp"
          alt="Illustration of Jaden Raats holding a bass"
          width={960}
          height={1100}
          priority
          className="h-full w-auto"
        />
      </motion.div>

      <div className="relative z-10">
        <motion.p
          className="kicker kicker-accent"
          initial={fadeSmall}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          operator · builder · phoenix, az
        </motion.p>

        <h1 className="display mt-5 text-[19vw] leading-[0.9] sm:text-[15vw] lg:text-[12vw]">
          <RevealLine delay={0.35}>jaden</RevealLine>
          <RevealLine delay={0.5}>
            <span className="ast-host">
              raats<span className="ast text-accent">*</span>
            </span>
          </RevealLine>
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            className="max-w-md text-sm leading-relaxed text-soft"
            initial={fade}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          >
            I run a floor coating company in Phoenix and use AI to run it
            better. This is where I show other business owners how to do the
            same — real systems, tested in real operations, explained in plain
            English.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={fade}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          >
            <Link href="/#guides" className="btn btn-primary">
              See the guides <span className="btn-arrow">→</span>
            </Link>
            <a href="mailto:me@jadenraats.com" className="btn btn-secondary">
              <MessageBubbleIcon className="h-4 w-4" /> Say hello
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee border-y-2 border-line bg-cream py-4" aria-hidden="true">
      {[0, 1].map((track) => (
        <div key={track} className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.08em] text-faint">
              {item} <span className="text-accent">✳</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p {...fadeUp} className="kicker kicker-accent">
      <span className="ast-host inline-flex items-center gap-1.5">
        {children}
        <span className="ast">*</span>
      </span>
    </motion.p>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>about</SectionLabel>
      <motion.h2
        {...fadeUp}
        className="display mt-6 max-w-3xl text-5xl sm:text-6xl"
      >
        Operator first, <span className="font-serif italic normal-case">builder</span> second.
      </motion.h2>
      <div className="mt-10 grid gap-8 text-base leading-relaxed text-soft sm:grid-cols-2 sm:gap-12">
        <motion.p {...fadeUp}>
          Most AI advice comes from people who&apos;ve never run a business. I
          run Award Coatings — leads, quotes, crews, callbacks. Every system I
          share exists because something in that business was eating my week.
        </motion.p>
        <motion.p {...fadeUp}>
          If a tool survives a real Monday, I&apos;ll show you exactly how it
          works. If it doesn&apos;t, you&apos;ll never hear about it.
          That&apos;s the whole filter.
        </motion.p>
      </div>
    </section>
  );
}

function Guides() {
  return (
    <section id="guides" className="mx-auto max-w-6xl scroll-mt-24 border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>guides</SectionLabel>
          <motion.h2
            {...fadeUp}
            className="display mt-6 max-w-2xl text-5xl sm:text-6xl"
          >
            Practical guides for real-world use
          </motion.h2>
        </div>
        <motion.a {...fadeUp} href="/guides" className="btn btn-secondary">
          Browse all guides <span className="btn-arrow">→</span>
        </motion.a>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {GUIDES.map((g, i) => (
          <motion.article
            key={g.slug}
            {...fadeUp}
            transition={{ duration: 0.75, ease: EASE, delay: i * 0.08 }}
          >
            <Link
              href={`/guides/${g.slug}`}
              className="group flex h-full flex-col border-2 border-line bg-cream transition-colors duration-200 hover:border-accent"
            >
              <span className="relative block aspect-[16/9] overflow-hidden border-b-2 border-line">
                <Image
                  src={g.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-1 flex-col p-6">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="kicker kicker-faint mt-6">{g.tag} · {g.readMinutes} min</span>
                <h3 className="display-sentence mt-3 text-2xl leading-tight transition-colors duration-200 group-hover:text-accent">
                  {g.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-soft">
                  {g.summary}
                </p>
                <span className="kicker kicker-accent mt-6">
                  Read guide <span className="btn-arrow">→</span>
                </span>
              </span>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/** Featured skills for the Lab teaser — top 6 by real usage. Curated only;
 *  the full library lives at /prompt-lab. */
const FEATURED_SKILLS = [...SKILLS]
  .sort((a, b) => b.uses - a.uses)
  .slice(0, 6);

function LabTeaser() {
  return (
    <section id="lab" className="mx-auto max-w-6xl scroll-mt-24 border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>the lab</SectionLabel>
      <motion.h2
        {...fadeUp}
        className="display mt-6 max-w-3xl text-5xl sm:text-6xl"
      >
        Skills &amp; prompt library
      </motion.h2>
      <motion.p {...fadeUp} className="mt-8 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
        A public database of the AI skills, prompts, workflows, and agent
        instructions that run a real business. Copy any prompt, or hit USE
        SKILL and I&apos;ll set it up with you.
      </motion.p>

      <motion.div {...fadeUp} className="mt-8 flex flex-wrap gap-2">
        {SKILL_CATEGORIES.map((cat) => (
          <Link key={cat} href={`/prompt-lab?cat=${encodeURIComponent(cat)}`} className="chip chip-idle">
            {cat}
          </Link>
        ))}
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {FEATURED_SKILLS.map((s, i) => (
          <motion.article
            key={s.id}
            {...fadeUp}
            transition={{ duration: 0.7, ease: EASE, delay: Math.min(i * 0.06, 0.3) }}
          >
            <Link
              href={`/prompt-lab?q=${encodeURIComponent(s.name)}`}
              className="group flex h-full flex-col border-2 border-line bg-cream p-6 transition-colors duration-200 hover:border-accent"
            >
              <span className="flex flex-wrap items-center gap-3">
                <h3 className="display-sentence text-xl leading-tight transition-colors duration-200 group-hover:text-accent">
                  {s.name}
                </h3>
                <span className="status-tag status-live">{s.category}</span>
              </span>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-soft">{s.desc}</p>
              <span className="kicker kicker-accent mt-6">
                Open in the lab <span className="btn-arrow">→</span>
              </span>
            </Link>
          </motion.article>
        ))}
      </div>

      <motion.div {...fadeUp} className="mt-10">
        <Link href="/prompt-lab" className="btn btn-primary">
          Enter the lab <span className="btn-arrow">→</span>
        </Link>
      </motion.div>
    </section>
  );
}

function CaseStudyTeaser() {
  return (
    <section id="case-study" className="mx-auto max-w-6xl scroll-mt-24 border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>case study</SectionLabel>
      <motion.h2
        {...fadeUp}
        className="display mt-6 max-w-4xl text-5xl sm:text-6xl"
      >
        I built an AI assistant, then wrote down{" "}
        <span className="font-serif italic normal-case">everything that broke</span>.
      </motion.h2>
      <motion.p {...fadeUp} className="mt-8 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
        Nine apps behind one front door, 2,142 messages, $14.15 in model costs —
        and a two-week silent outage nobody noticed. The fix wasn&apos;t code.
        It was writing the filing rules down on a single page.
      </motion.p>
      <motion.div {...fadeUp} className="mt-10">
        <Link href="/case-study" className="btn btn-secondary">
          Read the full case study <span className="btn-arrow">→</span>
        </Link>
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t-2 border-line bg-ink px-6 py-20 text-cream sm:px-10 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="kicker kicker-paper">let&apos;s talk</p>
        <motion.h2
          {...fadeUp}
          className="display mt-6 text-5xl sm:text-7xl"
        >
          <a
            href="mailto:me@jadenraats.com"
            className="ast-host inline-flex items-center gap-4 transition-colors duration-500 hover:text-accent sm:gap-6"
          >
            say hello <span className="ast text-accent">*</span>
          </a>
        </motion.h2>
        <motion.p {...fadeUp} className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
          Running a business and wondering what AI can actually do for you? Ask.
        </motion.p>
        <motion.div {...fadeUp} className="mt-8 flex flex-wrap gap-8 font-mono text-sm">
          <a href="mailto:me@jadenraats.com" className="link-underline text-cream/80">
            me@jadenraats.com
          </a>
          <a
            href="https://github.com/raatsja74"
            target="_blank"
            rel="noreferrer"
            className="link-underline text-cream/80"
          >
            github ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-6 pb-8 text-cream sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8 font-mono text-xs text-cream/40">
        <span>© 2026 Jaden Raats</span>
        <Typewriter text="phoenix, az — made by me (and the machines)" />
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Guides />
        <LabTeaser />
        <CaseStudyTeaser />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}