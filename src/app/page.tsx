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
import Mark from "@/components/Mark";

// ── Motion presets ────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

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
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
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

const HERMES_STATS = [
  { n: "9", l: "apps unified" },
  { n: "2,142", l: "messages" },
  { n: "$14.15", l: "total cost" },
  { n: "55", l: "days live" },
];

const HERMES_FLOW = [
  { k: "capture", v: "telegram · slack · imessage · cli · cron" },
  { k: "gateway", v: "always-on process, routes by destination" },
  { k: "state", v: "one sqlite db · full-text search" },
  { k: "homes", v: "obsidian · todoist · drive" },
];

const HERMES_BROKE = [
  {
    t: "A 14-day outage that never alerted anyone",
    d: "An expired token plus two automations pointing at a folder I'd deleted. Nothing crashed — it just quietly stopped working, and I stopped using it without deciding to. Silent failure is worse than loud failure.",
  },
  {
    t: "The one scheduled job is still broken",
    d: "It refuses to run because a safety check is doing its job, and its error notification can't send. The job meant to keep the system from needing me is the part that needs me. I automated the filing before I automated the monitoring.",
  },
  {
    t: "I measured the wrong things",
    d: "I tracked cost and message counts because they were free to collect. I never tracked whether I could actually find what I'd saved — the only number that would have justified the whole project.",
  },
];

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
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-14 pt-32 sm:px-10 lg:px-16">
      <motion.div
        className="hero-portrait"
        initial={{ opacity: 0, y: 28 }}
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          operator · builder · phoenix, az
        </motion.p>

        <h1 className="display mt-5 text-[19vw] leading-[0.9] sm:text-[15vw] lg:text-[12vw]">
          <RevealLine delay={0.35}>jaden</RevealLine>
          <RevealLine delay={0.5}>
            <span className="ast-host">
              raats<Mark className="ast hero-mark text-accent" />
            </span>
          </RevealLine>
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            className="max-w-md font-mono text-sm leading-relaxed text-soft"
            initial={{ opacity: 0, y: 20 }}
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
            initial={{ opacity: 0, y: 20 }}
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
        <Mark className="ast text-accent" />
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
      <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
        <div className="grid gap-6 font-mono text-base leading-relaxed text-soft">
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
        <motion.div {...fadeUp} className="about-image-slot">
          <div className="flex h-full items-end p-4">
            <span className="kicker kicker-faint">photo — job site, az</span>
          </div>
        </motion.div>
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
              className="group flex h-full flex-col border-2 border-line bg-cream p-6 transition-colors duration-200 hover:border-accent"
            >
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="kicker kicker-faint mt-6">{g.tag}</span>
              <h3 className="display mt-3 text-2xl leading-tight transition-colors duration-200 group-hover:text-accent">
                {g.title}
              </h3>
              <p className="mt-4 flex-1 font-mono text-sm leading-relaxed text-soft">
                {g.summary}
              </p>
              <span className="card-footer">
                <span className="kicker kicker-accent">
                  Read guide <span className="btn-arrow">→</span>
                </span>
                <span className="card-chip">{g.difficulty}</span>
              </span>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section id="hermes" className="mx-auto max-w-6xl scroll-mt-24 border-t-2 border-line px-6 py-24 sm:px-10 sm:py-28">
      <SectionLabel>case study</SectionLabel>

      <motion.h2
        {...fadeUp}
        className="display mt-6 max-w-4xl text-5xl sm:text-6xl"
      >
        I built an AI assistant, then wrote down{" "}
        <span className="font-serif italic normal-case">everything that broke</span>.
      </motion.h2>

      <motion.p {...fadeUp} className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">
        I was capturing work in eight places and finding it in none of them.
        Links in one app, ideas in another, tasks somewhere else — plus five AI
        agents that couldn&apos;t see each other&apos;s work. The problem was
        never lost data. It was that I couldn&apos;t get anything back out.
      </motion.p>

      <motion.div {...fadeUp} className="mt-12 border-2 border-line">
        <div className="-m-[2px] grid grid-cols-2 sm:grid-cols-4">
          {HERMES_STATS.map((s) => (
            <div key={s.l} className="border-2 border-line px-5 py-7 text-center">
              <div className="display text-4xl tracking-wide sm:text-5xl">{s.n}</div>
              <div className="kicker kicker-faint mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p {...fadeUp} className="mt-14 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">
        So I built one front door. Everything goes to a chat app, and{" "}
        <em className="font-serif italic normal-case text-ink">which chat you send it to</em>{" "}
        decides where it ends up. No AI guessing your intent — you already made
        the decision when you picked the chat. It gets filed automatically, and
        every conversation from every app lands in one searchable place.
      </motion.p>

      <motion.div {...fadeUp} className="mt-10 border-t-2 border-line">
        {HERMES_FLOW.map((f) => (
          <div
            key={f.k}
            className="flex flex-col gap-1 border-b-2 border-line py-4 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <span className="kicker kicker-accent sm:w-28 sm:shrink-0">{f.k}</span>
            <span className="font-mono text-sm text-soft">{f.v}</span>
          </div>
        ))}
      </motion.div>

      <motion.h3 {...fadeUp} className="display mt-20 text-3xl sm:text-4xl">
        The fix wasn&apos;t code.
      </motion.h3>

      <motion.p {...fadeUp} className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">
        Six weeks in, it broke for two weeks and I didn&apos;t notice. When I
        came back, I didn&apos;t rewrite anything — I wrote down the filing
        rules on a single page that both I and the agents could read. Same code,
        same models, four times the use.
      </motion.p>

      <motion.div {...fadeUp} className="mt-10 max-w-xl border-2 border-line">
        <div className="grid grid-cols-3 border-b-2 border-line font-mono text-xs text-faint">
          <div className="px-4 py-3" />
          <div className="px-4 py-3">before</div>
          <div className="px-4 py-3">after</div>
        </div>
        <div className="grid grid-cols-3 border-b-2 border-line text-sm">
          <div className="px-4 py-4 text-soft">days used</div>
          <div className="px-4 py-4 font-mono">28%</div>
          <div className="px-4 py-4 font-mono text-accent">53%</div>
        </div>
        <div className="grid grid-cols-3 text-sm">
          <div className="px-4 py-4 text-soft">messages / day</div>
          <div className="px-4 py-4 font-mono">21</div>
          <div className="px-4 py-4 font-mono text-accent">87</div>
        </div>
      </motion.div>

      <motion.h3 {...fadeUp} className="display mt-20 text-3xl sm:text-4xl">
        What&apos;s still broken
      </motion.h3>

      <motion.p {...fadeUp} className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-soft">
        This is the part most write-ups leave out. All of it is still true as of
        today.
      </motion.p>

      <div className="mt-10 border-t-2 border-line">
        {HERMES_BROKE.map((b, i) => (
          <motion.div
            key={b.t}
            className="border-b-2 border-line py-8"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
          >
            <h4 className="display text-2xl">{b.t}</h4>
            <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-soft">{b.d}</p>
          </motion.div>
        ))}
      </div>

      <motion.p {...fadeUp} className="mt-14 max-w-2xl font-mono text-sm leading-relaxed sm:text-base">
        The useful lesson wasn&apos;t technical. The system didn&apos;t fail
        because it couldn&apos;t do enough — it failed because the rules for
        where things go lived in my head instead of on a page. Writing them down
        cost an afternoon and did more than six weeks of building.
      </motion.p>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t-2 border-line bg-ink px-6 py-28 text-cream sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="kicker kicker-paper">contact</p>
        <motion.h2
          {...fadeUp}
          className="display mt-6 text-6xl sm:text-8xl"
        >
          <a
            href="mailto:me@jadenraats.com"
            className="ast-host inline-flex items-center gap-4 transition-colors duration-500 hover:text-accent sm:gap-6"
          >
            say hello <MessageBubbleIcon className="h-8 w-8 text-accent sm:h-10 sm:w-10" />
            <Mark className="ast h-8 w-8 text-accent sm:h-10 sm:w-10" />
          </a>
        </motion.h2>
        <motion.p {...fadeUp} className="mt-8 max-w-md font-mono text-sm leading-relaxed text-cream/60">
          Running a business and wondering what AI can actually do for you?
          Ask. If it&apos;s real work, I&apos;m interested.
        </motion.p>
        <motion.div {...fadeUp} className="mt-10 flex flex-wrap gap-8 font-mono text-sm">
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
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}