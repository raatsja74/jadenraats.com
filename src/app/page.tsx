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
    label: "awardcoatings.com ↗",
  },
  {
    name: "Hermes",
    tag: "multi-agent assistant",
    desc: "I built an AI assistant that pulls nine different apps into one place, ran it as its only user for 55 days, and then wrote down everything that broke. Total cost: $14.15.",
    href: "#hermes",
    label: "read the teardown ↓",
  },
  {
    name: "AI tools & playbooks",
    tag: "for business owners",
    desc: "Practical systems and plain-English guides for owners who want AI doing real work — not another subscription collecting dust. The first ones land here soon.",
    href: null,
    label: null,
  },
];

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

const MARQUEE = ["ai for business owners", "no hype", "phoenix, az", "tested in a real business", "plain english"];

// ── Sections ──────────────────────────────────────────────────────────────────

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
          <span className="ast-host font-serif italic tracking-[-0.02em]">
            raats<span className="ast not-italic text-accent">*</span>
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
      <span className="ast-host inline-flex items-center gap-1.5">
        {children}
        <span className="ast">*</span>
      </span>
    </motion.p>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28 sm:px-10 sm:py-36">
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
      <motion.a
        {...fadeUp}
        href="/about"
        className="link-underline mt-10 inline-block font-mono text-sm text-accent"
      >
        more about me ↗
      </motion.a>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-5xl scroll-mt-24 px-6 pb-28 sm:px-10 sm:pb-36">
      <SectionLabel>work</SectionLabel>
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
                {...(w.href.startsWith("#")
                  ? {}
                  : { target: "_blank", rel: "noreferrer" })}
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

function CaseStudy() {
  return (
    <section id="hermes" className="mx-auto max-w-5xl scroll-mt-24 px-6 pb-28 sm:px-10 sm:pb-36">
      <SectionLabel>case study</SectionLabel>

      <motion.h2
        {...fadeUp}
        className="max-w-3xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl"
      >
        I built an AI assistant, then wrote down{" "}
        <span className="font-serif italic text-accent">everything that broke</span>.
      </motion.h2>

      <motion.p {...fadeUp} className="mt-8 max-w-2xl text-lg leading-relaxed text-soft">
        I was capturing work in eight places and finding it in none of them.
        Links in one app, ideas in another, tasks somewhere else — plus five AI
        agents that couldn&apos;t see each other&apos;s work. The problem was
        never lost data. It was that I couldn&apos;t get anything back out.
      </motion.p>

      <motion.div
        {...fadeUp}
        className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-4"
      >
        {HERMES_STATS.map((s) => (
          <div key={s.l} className="bg-cream px-5 py-7 text-center">
            <div className="font-mono text-3xl font-medium tracking-tight sm:text-4xl">{s.n}</div>
            <div className="mt-2 font-mono text-xs text-faint">{s.l}</div>
          </div>
        ))}
      </motion.div>

      <motion.p {...fadeUp} className="mt-14 max-w-2xl text-lg leading-relaxed text-soft">
        So I built one front door. Everything goes to a chat app, and{" "}
        <em className="font-serif italic text-ink">which chat you send it to</em>{" "}
        decides where it ends up. No AI guessing your intent — you already made
        the decision when you picked the chat. It gets filed automatically, and
        every conversation from every app lands in one searchable place.
      </motion.p>

      <motion.div {...fadeUp} className="mt-10 border-t border-ink/10">
        {HERMES_FLOW.map((f) => (
          <div
            key={f.k}
            className="flex flex-col gap-1 border-b border-ink/10 py-4 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <span className="font-mono text-sm text-accent sm:w-28 sm:shrink-0">{f.k}</span>
            <span className="font-mono text-sm text-soft">{f.v}</span>
          </div>
        ))}
      </motion.div>

      <motion.h3 {...fadeUp} className="mt-20 text-2xl font-medium tracking-tight sm:text-3xl">
        The fix wasn&apos;t code.
      </motion.h3>

      <motion.p {...fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-soft">
        Six weeks in, it broke for two weeks and I didn&apos;t notice. When I
        came back, I didn&apos;t rewrite anything — I wrote down the filing
        rules on a single page that both I and the agents could read. Same code,
        same models, four times the use.
      </motion.p>

      <motion.div {...fadeUp} className="mt-10 max-w-xl overflow-hidden border border-ink/10">
        <div className="grid grid-cols-3 border-b border-ink/10 bg-ink/5 font-mono text-xs text-faint">
          <div className="px-4 py-3" />
          <div className="px-4 py-3">before</div>
          <div className="px-4 py-3">after</div>
        </div>
        <div className="grid grid-cols-3 border-b border-ink/10 text-sm">
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

      <motion.h3 {...fadeUp} className="mt-20 text-2xl font-medium tracking-tight sm:text-3xl">
        What&apos;s still broken
      </motion.h3>

      <motion.p {...fadeUp} className="mt-6 max-w-2xl leading-relaxed text-soft">
        This is the part most write-ups leave out. All of it is still true as of
        today.
      </motion.p>

      <div className="mt-10 border-t border-ink/10">
        {HERMES_BROKE.map((b, i) => (
          <motion.div
            key={b.t}
            className="border-b border-ink/10 py-8"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
          >
            <h4 className="text-xl font-medium tracking-tight">{b.t}</h4>
            <p className="mt-3 max-w-2xl leading-relaxed text-soft">{b.d}</p>
          </motion.div>
        ))}
      </div>

      <motion.p {...fadeUp} className="mt-14 max-w-2xl text-lg leading-relaxed">
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
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-ink px-6 py-28 text-cream sm:px-10 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>contact</SectionLabel>
        <motion.h2
          {...fadeUp}
          className="text-6xl font-medium tracking-tight sm:text-8xl"
        >
          <a
            href="mailto:me@jadenraats.com"
            className="ast-host transition-colors duration-500 hover:text-accent"
          >
            say <span className="font-serif italic">hello</span>
            <span className="ast not-italic text-accent">*</span>
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
        <Work />
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
