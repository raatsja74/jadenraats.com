"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.75, ease: EASE },
};

const PALETTE = [
  { name: "Ink black", hex: "#0A0A09", role: "type, borders, dark sections", swatch: "bg-ink text-cream" },
  { name: "Warm paper", hex: "#F2EFE6", role: "primary canvas and panels", swatch: "bg-cream text-ink border-2 border-line" },
  { name: "Signal orange", hex: "#F4511E", role: "actions, stamps, active states", swatch: "bg-accent text-ink" },
  { name: "Secondary text", hex: "#5D5A53", role: "supporting copy on paper", swatch: "bg-cream text-soft border-2 border-line" },
] as const;

const THEMES = [
  { id: "jadenraats", name: "Jaden Raats", note: "Default for this site — editorial-operational brutalism." },
  { id: "award-coatings", name: "Award Coatings", note: "Brand-owned. Do not import Jaden orange/type here." },
  { id: "leadbolt", name: "LeadBolt", note: "Brand-owned theme mapping." },
  { id: "ai-ledger", name: "AI Ledger", note: "Brand-owned theme mapping." },
] as const;

const RULES = [
  { title: "0px radius", body: "No pills, no soft cards, no glass. Hard corners only." },
  { title: "Hard borders", body: "Structural frames use strong ink borders. Sections touch with clear dividers." },
  { title: "16px grid gap", body: "Modular layout spacing. Dense when useful — labels, counts, filters belong." },
  { title: "One accent", body: "Signal orange is the only strong accent. Everything else is ink, paper, or gray." },
] as const;

const LEGACY = [
  { bad: "#e8552a / #cf5a35", good: "#F4511E" },
  { bad: "#f1ece1 / #faf6ee", good: "#F2EFE6" },
  { bad: "#141210 / #1c1a17", good: "#0A0A09" },
  { bad: "Archivo Black / Inter", good: "Anton / IBM Plex Mono" },
  { bad: "999px pills / soft shadows", good: "0px radius, hard edges" },
] as const;

const FAILURES = [
  {
    title: "Mobile hero overlap",
    body: "Absolute hero photos must sit inside a min-width media query. Under ~700px the photo is position: static, stacked after the text.",
  },
  {
    title: "Mobile dark-mode invert",
    body: "Lock color-scheme: light only in both a meta tag and CSS, or OS dark mode inverts the warm paper palette.",
  },
] as const;

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

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-44">
      <div className="border-t-2 border-line pt-10">
        <SectionLabel>universal design system</SectionLabel>
        <motion.h1
          className="display mt-6 max-w-4xl text-6xl sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
        >
          One contract.{" "}
          <span className="font-serif italic normal-case text-accent">Many brands.</span>
        </motion.h1>
        <motion.p
          className="mt-8 max-w-2xl text-sm leading-relaxed text-soft sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
        >
          UDS is the brand-neutral set of semantic tokens, component contracts, and
          design rules. Themes change values and voice — never what a role means.
          This page is the <strong className="font-medium text-ink">canonical
          Jaden-facing home</strong> for that system.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
        >
          <a
            href="https://github.com/raatsja74/universal-design-system"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Open the repo <span className="btn-arrow">↗</span>
          </a>
          <a
            href="https://raatsja74.github.io/universal-design-system/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            Agent style guide
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-20 sm:px-10 sm:py-24">
      <SectionLabel>visual thesis</SectionLabel>
      <motion.h2 {...fadeUp} className="display mt-6 max-w-3xl text-4xl sm:text-5xl">
        Editorial-operational{" "}
        <span className="font-serif italic normal-case">brutalism</span>.
      </motion.h2>
      <motion.p {...fadeUp} className="mt-8 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
        Independent print magazine, technical field manual, DIY zine, and operator
        dashboard in one coherent system. Useful before polished. Real tools, real
        notes, real images — not generic marketing decoration.
      </motion.p>
      <div className="mt-12 grid gap-px border-2 border-line bg-line sm:grid-cols-2">
        {RULES.map((r, i) => (
          <motion.article
            key={r.title}
            className="bg-cream p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: EASE, delay: i * 0.06 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="display-sentence mt-4 text-xl font-medium tracking-tight">
              {r.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-soft">{r.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Palette() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-20 sm:px-10 sm:py-24">
      <SectionLabel>palette</SectionLabel>
      <motion.h2 {...fadeUp} className="display mt-6 max-w-2xl text-4xl sm:text-5xl">
        Three colors. <span className="font-serif italic normal-case">That&apos;s the filter.</span>
      </motion.h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PALETTE.map((c, i) => (
          <motion.article
            key={c.hex}
            className="border-2 border-line"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: EASE, delay: i * 0.05 }}
          >
            <div className={`flex h-28 items-end p-4 font-mono text-xs uppercase tracking-[0.08em] ${c.swatch}`}>
              {c.hex}
            </div>
            <div className="border-t-2 border-line bg-cream p-4">
              <h3 className="display-sentence text-lg font-medium">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-soft">{c.role}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Type() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-20 sm:px-10 sm:py-24">
      <SectionLabel>typography</SectionLabel>
      <motion.h2 {...fadeUp} className="display mt-6 text-4xl sm:text-5xl">
        Type does the work.
      </motion.h2>
      <div className="mt-12 grid gap-px border-2 border-line bg-line sm:grid-cols-3">
        <motion.div {...fadeUp} className="bg-cream p-6 sm:p-8">
          <p className="kicker kicker-faint">display · Anton</p>
          <p className="display mt-6 text-5xl leading-none">ABCDEF</p>
          <p className="display mt-2 text-5xl leading-none">012345</p>
          <p className="mt-6 text-sm text-soft">Large, tight, uppercase hierarchy.</p>
        </motion.div>
        <motion.div {...fadeUp} className="bg-cream p-6 sm:p-8">
          <p className="kicker kicker-faint">body · IBM Plex Mono</p>
          <p className="mt-6 font-mono text-sm leading-relaxed text-ink">
            Descriptions, metadata, instructions, system UI. Compact and technical.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-faint">
            kicker / label sample
          </p>
        </motion.div>
        <motion.div {...fadeUp} className="bg-cream p-6 sm:p-8">
          <p className="kicker kicker-faint">emphasis · Instrument Serif</p>
          <p className="mt-6 text-3xl leading-tight text-ink">
            Single-phrase <span className="font-serif italic text-accent">emphasis</span> only.
          </p>
          <p className="mt-6 text-sm text-soft">Not a third body face. One italic hit per view.</p>
        </motion.div>
      </div>
    </section>
  );
}

function Components() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-20 sm:px-10 sm:py-24">
      <SectionLabel>components</SectionLabel>
      <motion.h2 {...fadeUp} className="display mt-6 max-w-2xl text-4xl sm:text-5xl">
        Buttons, links, stamps.
      </motion.h2>
      <motion.div {...fadeUp} className="mt-12 border-2 border-line bg-cream p-6 sm:p-10">
        <p className="kicker kicker-faint">actions</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="btn btn-primary">
            Primary action <span className="btn-arrow">→</span>
          </span>
          <span className="btn btn-secondary">Secondary</span>
          <a href="#palette" className="link-underline self-center text-sm text-accent">
            Text link sample
          </a>
        </div>
        <p className="mt-10 kicker kicker-faint">chips / stamps</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="chip chip-idle">idle chip</span>
          <span className="status-tag status-live">live</span>
          <span className="ast-host font-display text-2xl uppercase">
            section<span className="ast text-accent">*</span>
          </span>
        </div>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-soft">
          Primary = signal-orange fill, ink border, uppercase display label.
          Secondary = warm-paper fill, ink border. Asterisk is a stamp — not decoration spam.
        </p>
      </motion.div>
    </section>
  );
}

function Themes() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-20 sm:px-10 sm:py-24">
      <SectionLabel>themes</SectionLabel>
      <motion.h2 {...fadeUp} className="display mt-6 max-w-3xl text-4xl sm:text-5xl">
        Neutral core. <span className="font-serif italic normal-case">Brand-owned skins.</span>
      </motion.h2>
      <motion.p {...fadeUp} className="mt-6 max-w-2xl text-sm leading-relaxed text-soft sm:text-base">
        CaptureVault&apos;s Design System map keeps UDS core neutral. The Jaden theme
        owns this property&apos;s visual direction. Other brands keep their own mappings.
      </motion.p>
      <div className="mt-12 border-t-2 border-line">
        {THEMES.map((t, i) => (
          <motion.article
            key={t.id}
            className="flex flex-col gap-2 border-b-2 border-line py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
          >
            <div>
              <h3 className="display-sentence text-2xl font-medium tracking-tight">
                {t.name}
                {t.id === "jadenraats" && (
                  <span className="ml-3 font-mono text-xs uppercase tracking-[0.08em] text-accent">
                    default here
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm text-soft">{t.note}</p>
            </div>
            <code className="font-mono text-xs text-faint">data-uds-theme=&quot;{t.id}&quot;</code>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Failures() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-20 sm:px-10 sm:py-24">
      <SectionLabel>known failure modes</SectionLabel>
      <motion.h2 {...fadeUp} className="display mt-6 max-w-3xl text-4xl sm:text-5xl">
        Already broken once. <span className="font-serif italic normal-case">Encoded rules now.</span>
      </motion.h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {FAILURES.map((f, i) => (
          <motion.article
            key={f.title}
            className="border-2 border-line bg-cream p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: EASE, delay: i * 0.06 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">
              FM-{String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="display-sentence mt-4 text-xl font-medium">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-soft">{f.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Legacy() {
  return (
    <section className="mx-auto max-w-6xl border-t-2 border-line px-6 py-20 sm:px-10 sm:py-24">
      <SectionLabel>do not reintroduce</SectionLabel>
      <motion.h2 {...fadeUp} className="display mt-6 max-w-2xl text-4xl sm:text-5xl">
        Legacy drift.
      </motion.h2>
      <motion.div {...fadeUp} className="mt-10 overflow-x-auto border-2 border-line">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="border-b-2 border-line bg-ink text-cream">
            <tr>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-[0.08em]">Legacy</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-[0.08em]">Canonical</th>
            </tr>
          </thead>
          <tbody>
            {LEGACY.map((row) => (
              <tr key={row.bad} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3 font-mono text-xs text-soft line-through">{row.bad}</td>
                <td className="px-4 py-3 font-mono text-xs text-ink">{row.good}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}

function Sources() {
  return (
    <section className="border-t-2 border-line bg-ink px-6 py-20 text-cream sm:px-10 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>source of truth</SectionLabel>
        <motion.h2 {...fadeUp} className="display mt-6 max-w-3xl text-4xl sm:text-5xl">
          Where to edit. <span className="font-serif italic normal-case">Where to read.</span>
        </motion.h2>
        <div className="mt-12 border-t border-cream/10">
          {[
            {
              label: "This page — /uds",
              meta: "canonical human home (Jaden)",
              href: "/uds",
              external: false,
            },
            {
              label: "universal-design-system repo",
              meta: "tokens, contracts, CSS",
              href: "https://github.com/raatsja74/universal-design-system",
              external: true,
            },
            {
              label: "GitHub Pages style guide",
              meta: "agent / raw reference",
              href: "https://raatsja74.github.io/universal-design-system/",
              external: true,
            },
            {
              label: "CaptureVault → Design System",
              meta: "vault map + brand snapshots",
              href: "/capturevault",
              external: false,
            },
          ].map((row, i) => (
            <motion.a
              key={row.label}
              href={row.href}
              {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group flex flex-col gap-1 border-b border-cream/10 py-6 transition-colors duration-300 hover:text-accent sm:flex-row sm:items-baseline sm:justify-between"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
            >
              <span className="display text-2xl sm:text-3xl">{row.label}</span>
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-cream/50 group-hover:text-accent">
                {row.meta} {row.external ? "↗" : "→"}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-6 pb-8 pt-10 text-cream sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8 font-mono text-xs text-cream/40">
        <span>© 2026 Jaden Raats</span>
        <Link href="/" className="link-underline">
          back home
        </Link>
      </div>
    </footer>
  );
}

export default function UdsContent() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main id="top">
        <Hero />
        <Thesis />
        <div id="palette">
          <Palette />
        </div>
        <Type />
        <Components />
        <Themes />
        <Failures />
        <Legacy />
        <Sources />
      </main>
      <Footer />
    </MotionConfig>
  );
}
