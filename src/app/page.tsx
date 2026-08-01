"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Nav from "@/components/Nav";
import { EASE, fadeUp } from "@/lib/motion";
import { Wordmark } from "@/components/Wordmark";
import { StatusPill } from "@/components/StatusPill";
import { SectionLabel } from "@/components/SectionLabel";
import { Marquee } from "@/components/Marquee";
import { Section } from "@/components/Section";
import { WorkRow } from "@/components/WorkRow";
import { TextLink } from "@/components/TextLink";

/** Link that drifts toward the cursor as it gets close. Fine pointers only. */
function MagneticLink({
  href,
  className = "",
  children,
  radius = 110,
  pull = 0.22,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  radius?: number;
  pull?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 240, damping: 22, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const reach = radius + Math.max(r.width, r.height) / 2;
        const near = Math.hypot(dx, dy) < reach;
        x.set(near ? dx * pull : 0);
        y.set(near ? dy * pull : 0);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, radius, pull, x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.a>
  );
}

/** Types its text out once it scrolls into view. Reserves its final width. */
function Typewriter({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(text.length);
      return;
    }
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

// ── Data ──────────────────────────────────────────────────────────────────────

const WORK = [
  {
    name: "Award Coatings",
    tag: "the proving ground",
    desc: "My floor coating company in Phoenix. Every system I talk about — lead follow-up, quoting, scheduling — runs this business first. If it can't survive a real Monday here, it doesn't get shared.",
    href: "https://awardcoatings.com",
    label: "awardcoatings.com",
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

function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-14 pt-36 sm:px-10 lg:px-16">
      <div className="wash" aria-hidden="true" />

      <motion.div
        className="relative mb-10 inline-flex self-start"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
      >
        <StatusPill>open to real work</StatusPill>
      </motion.div>

      <h1 className="relative font-sans text-[17vw] font-medium leading-[0.9] tracking-[-0.04em] sm:text-[13vw] lg:text-[11vw]">
        <Wordmark first="jaden" second="raats" />
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
          <MagneticLink
            href="#work"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream"
          >
            See the work <span className="btn-arrow">→</span>
          </MagneticLink>
          <MagneticLink
            href="mailto:me@jadenraats.com"
            className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium"
          >
            Say hello
          </MagneticLink>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <SectionLabel>about</SectionLabel>
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
    </Section>
  );
}

function Work() {
  return (
    <Section id="work" paddingClassName="pb-28 sm:pb-36">
      <SectionLabel>work</SectionLabel>
      <div className="border-t border-ink/10">
        {WORK.map((w, i) => (
          <WorkRow key={w.name} {...w} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" tone="ink" paddingClassName="py-28 sm:py-40" className="relative overflow-hidden">
      <SectionLabel>contact</SectionLabel>
      <motion.h2
        {...fadeUp}
        className="text-6xl font-medium tracking-tight sm:text-8xl"
      >
        <a
          href="mailto:me@jadenraats.com"
          className="ast-host transition-colors duration-500 hover:text-accent"
        >
          <Wordmark first="say" second="hello" stacked={false} />
        </a>
      </motion.h2>
      <motion.p {...fadeUp} className="mt-8 max-w-md text-lg leading-relaxed text-cream/60">
        Running a business and wondering what AI can actually do for you?
        Ask. Open to consulting and select contract work — if it&apos;s real
        work, I&apos;m interested.
      </motion.p>
      <motion.div {...fadeUp} className="mt-10 flex flex-wrap gap-8 font-mono text-sm">
        <TextLink href="mailto:me@jadenraats.com" tone="invert">
          me@jadenraats.com
        </TextLink>
        <TextLink href="https://github.com/raatsja74" tone="invert" external>
          github
        </TextLink>
      </motion.div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-6 pb-8 text-cream sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8 font-mono text-xs text-cream/40">
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
        <Marquee items={MARQUEE} />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
