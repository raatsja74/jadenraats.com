"use client";

import { motion, MotionConfig } from "framer-motion";

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

// ── Data ──────────────────────────────────────────────────────────────────────

const WORK = [
  {
    name: "Award Coatings",
    tag: "the proving ground",
    desc: "My floor coating company in Phoenix. Every system I talk about — lead follow-up, quoting, scheduling — runs this business first. If it can't survive a real Monday here, it doesn't get shared.",
    href: "https://awardcoatings.com",
    label: "awardcoatings.com ↗",
  },
  {
    name: "AI tools & playbooks",
    tag: "for business owners",
    desc: "Practical systems and plain-English guides for owners who want AI doing real work — not another subscription collecting dust. The first ones land here soon.",
    href: null,
    label: null,
  },
];

const MARQUEE = ["ai for business owners", "no hype", "phoenix, az", "tested in a real business", "plain english"];

// ── Sections ──────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <motion.header
      className="fixed inset-x-0 top-5 z-50 flex justify-center px-4"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
    >
      <nav
        aria-label="Main"
        className="flex items-center gap-1 rounded-full bg-ink px-2 py-2 text-cream shadow-lg shadow-ink/10"
      >
        <a
          href="#top"
          className="rounded-full px-4 py-1.5 font-serif text-lg italic tracking-tight"
        >
          jaden<span className="not-italic text-accent">*</span>
        </a>
        {[
          ["about", "#about"],
          ["work", "#work"],
          ["contact", "#contact"],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full px-4 py-1.5 text-sm text-cream/70 transition-colors duration-300 hover:bg-cream/10 hover:text-cream"
          >
            {label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-14 pt-36 sm:px-10 lg:px-16">
      <div className="wash" aria-hidden="true" />

      <motion.div
        className="relative mb-10 inline-flex items-center gap-2 self-start rounded-full border border-ink/15 px-4 py-1.5 font-mono text-xs text-soft"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        open to real work
      </motion.div>

      <h1 className="relative font-sans text-[17vw] font-medium leading-[0.9] tracking-[-0.04em] sm:text-[13vw] lg:text-[11vw]">
        <RevealLine delay={0.35}>jaden</RevealLine>
        <RevealLine delay={0.5}>
          <span className="font-serif italic tracking-[-0.02em]">
            raats<span className="not-italic text-accent">*</span>
          </span>
        </RevealLine>
      </h1>

      <div className="relative mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <motion.p
          className="max-w-md text-lg leading-relaxed text-soft"
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
          <motion.a
            href="#work"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            See the work <span className="btn-arrow">→</span>
          </motion.a>
          <motion.a
            href="mailto:me@jadenraats.com"
            className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            Say hello
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee border-y border-ink/10 py-4" aria-hidden="true">
      {[0, 1].map((track) => (
        <div key={track} className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-sm text-faint">
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
    <motion.p {...fadeUp} className="mb-8 font-mono text-sm text-accent">
      {children}
    </motion.p>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28 sm:px-10 sm:py-36">
      <SectionLabel>about *</SectionLabel>
      <motion.h2
        {...fadeUp}
        className="max-w-3xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl"
      >
        Operator first, <span className="font-serif italic text-accent">builder</span> second.
      </motion.h2>
      <div className="mt-10 grid gap-6 text-lg leading-relaxed text-soft sm:grid-cols-2 sm:gap-12">
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

function Work() {
  return (
    <section id="work" className="mx-auto max-w-5xl scroll-mt-24 px-6 pb-28 sm:px-10 sm:pb-36">
      <SectionLabel>work *</SectionLabel>
      <div className="border-t border-ink/10">
        {WORK.map((w, i) => (
          <motion.article
            key={w.name}
            className="group border-b border-ink/10 py-10 transition-colors duration-500 sm:py-12"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-3xl font-medium tracking-tight transition-transform duration-500 ease-soft group-hover:translate-x-2 sm:text-4xl">
                {w.name}
              </h3>
              <span className="font-mono text-sm text-faint">{w.tag}</span>
            </div>
            <p className="mt-4 max-w-xl leading-relaxed text-soft">{w.desc}</p>
            {w.href && (
              <a
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline mt-5 inline-block font-mono text-sm text-accent"
              >
                {w.label}
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-ink px-6 py-28 text-cream sm:px-10 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <motion.p {...fadeUp} className="mb-8 font-mono text-sm text-accent">
          contact *
        </motion.p>
        <motion.h2
          {...fadeUp}
          className="text-6xl font-medium tracking-tight sm:text-8xl"
        >
          <a
            href="mailto:me@jadenraats.com"
            className="transition-colors duration-500 hover:text-accent"
          >
            say <span className="font-serif italic">hello</span>
            <span className="not-italic text-accent">*</span>
          </a>
        </motion.h2>
        <motion.p {...fadeUp} className="mt-8 max-w-md text-lg leading-relaxed text-cream/60">
          Running a business and wondering what AI can actually do for you?
          Ask. Open to consulting and select contract work — if it&apos;s real
          work, I&apos;m interested.
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
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8 font-mono text-xs text-cream/40">
        <span>© 2026 Jaden Raats</span>
        <span>phoenix, az — made by me (and the machines)</span>
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
        <Work />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
