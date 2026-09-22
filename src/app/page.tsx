"use client";

import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import { GUIDES } from "@/data/guides";
import { SKILLS } from "./prompt-lab/skills";

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[70svh] flex-col justify-end overflow-x-hidden px-6 pb-10 pt-28 sm:overflow-hidden sm:px-10 sm:pb-14 sm:pt-32 lg:px-16"
    >
      <div className="relative z-10 w-full sm:max-w-[50%] lg:max-w-[48%]">
        <h1 className="display text-[19vw] leading-[0.9] sm:text-[15vw] lg:text-[12vw]">
          <span className="block">jaden</span>
          <span className="ast-host block">
            raats<span className="ast text-accent">*</span>
          </span>
        </h1>
        <p className="kicker kicker-faint mt-6">guides · lab</p>
      </div>

      <div className="hero-portrait">
        <Image
          src="/images/jaden-fishing.webp"
          alt="Jaden Raats holding a bass"
          width={960}
          height={1100}
          priority
        />
      </div>
    </section>
  );
}

function GuidesSection() {
  return (
    <section
      id="guides"
      className="scroll-mt-24 border-t-2 border-line px-6 py-20 sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-2xl text-4xl sm:text-5xl">
            Free Guides to Learn AI
          </h2>
          <Link href="/guides" className="kicker kicker-accent">
            All guides <span className="btn-arrow">→</span>
          </Link>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {GUIDES.map((g, i) => (
            <li key={g.slug}>
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
                  <span className="font-mono text-xs text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-sentence mt-3 text-xl leading-tight sm:text-2xl">
                    {g.title}
                  </h3>
                  <span className="kicker kicker-faint mt-4">
                    {g.readMinutes} min
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function LabSection() {
  const list = [...SKILLS].sort((a, b) => b.uses - a.uses);

  return (
    <section
      id="lab"
      className="scroll-mt-24 border-t-2 border-line px-6 py-20 sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-3xl text-4xl sm:text-5xl">
            AI Skills Lab to Personalize Your AI Agent
          </h2>
          <Link href="/prompt-lab" className="kicker kicker-accent">
            Open the lab <span className="btn-arrow">→</span>
          </Link>
        </div>

        <ul className="mt-12 border-2 border-line">
          {list.map((s, i) => (
            <li
              key={s.id}
              className="border-b-2 border-line last:border-b-0"
            >
              <Link
                href={`/prompt-lab?q=${encodeURIComponent(s.name)}`}
                className="group flex flex-wrap items-baseline justify-between gap-3 px-5 py-4 transition-colors duration-200 hover:bg-ink hover:text-cream sm:px-6"
              >
                <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-xs text-ink group-hover:text-cream">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-sentence text-lg sm:text-xl">
                    {s.name}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.06em] text-faint group-hover:text-cream">
                    {s.category}
                  </span>
                </span>
                <span className="text-accent" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-line bg-ink px-6 py-10 text-cream sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 font-mono text-xs text-cream/60">
        <Link href="/" className="ast-host font-display text-lg uppercase text-cream">
          jaden<span className="ast text-accent">*</span>
        </Link>
        <span>Phoenix, AZ</span>
        <div className="flex flex-wrap gap-6">
          <a href="mailto:me@jadenraats.com" className="link-underline">
            me@jadenraats.com
          </a>
          <a
            href="https://github.com/raatsja74"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GuidesSection />
        <LabSection />
      </main>
      <Footer />
    </>
  );
}
