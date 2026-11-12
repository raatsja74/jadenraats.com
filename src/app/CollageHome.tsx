"use client";

// Created by Hark | 2026-11-12
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

type Offset = { x: number; y: number; r: number };

// Deterministic torn edge so server and client render the same polygon.
function torn(seed: number, depth = 1.6, steps = 26) {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) pts.push(`${(i / steps) * 100}% ${rnd() * depth}%`);
  for (let i = 0; i <= steps; i++) pts.push(`${100 - rnd() * depth * 0.7}% ${(i / steps) * 100}%`);
  for (let i = steps; i >= 0; i--) pts.push(`${(i / steps) * 100}% ${100 - rnd() * depth}%`);
  for (let i = steps; i >= 0; i--) pts.push(`${rnd() * depth * 0.7}% ${(i / steps) * 100}%`);
  return `polygon(${pts.join(",")})`;
}

const STICKERS = ["bass", "mascot", "polaroid"] as const;
type StickerId = (typeof STICKERS)[number];
const BASE: Record<StickerId, Offset> = {
  bass: { x: 0, y: 0, r: -8 },
  mascot: { x: 0, y: 0, r: 6 },
  polaroid: { x: 0, y: 0, r: 3 },
};

const CARDS = [
  {
    n: "01",
    title: "Systems",
    href: "/systems",
    text: "Practical AI systems for businesses, creators and everyday life.",
    icon: "/home/gear.webp",
    seed: 11,
    rot: -1.2,
    backed: true,
  },
  {
    n: "02",
    title: "Guides",
    href: "/guides",
    text: "Step-by-step playbooks, templates and real-world lessons.",
    icon: "/home/compass.webp",
    seed: 23,
    rot: 0.6,
    backed: false,
  },
  {
    n: "03",
    title: "Lab",
    href: "/prompt-lab",
    text: "Experiments, tools and ideas in progress.",
    icon: "/home/flask.webp",
    seed: 37,
    rot: 1.1,
    backed: false,
  },
];

export default function CollageHome() {
  const [pos, setPos] = useState<Record<StickerId, Offset>>(BASE);
  const drag = useRef<{ id: StickerId; sx: number; sy: number; ox: number; oy: number } | null>(null);

  const onDown = useCallback(
    (id: StickerId) => (e: React.PointerEvent<HTMLDivElement>) => {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      drag.current = { id, sx: e.clientX, sy: e.clientY, ox: pos[id].x, oy: pos[id].y };
    },
    [pos]
  );
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    setPos((p) => ({ ...p, [d.id]: { ...p[d.id], x: d.ox + e.clientX - d.sx, y: d.oy + e.clientY - d.sy } }));
  }, []);
  const onUp = useCallback(() => {
    drag.current = null;
  }, []);

  const remix = () => {
    const j = (n: number) => Math.round((Math.random() - 0.5) * n);
    setPos({
      bass: { x: j(60), y: j(50), r: -8 + j(18) },
      mascot: { x: j(50), y: j(40), r: 6 + j(18) },
      polaroid: { x: j(24), y: j(20), r: 3 + j(8) },
    });
  };

  const st = (id: StickerId) => ({
    transform: `translate(${pos[id].x}px, ${pos[id].y}px) rotate(${pos[id].r}deg)`,
  });

  return (
    <div className="cx">
      <header className="cx-top">
        <Link href="/" className="cx-mark" aria-label="Jaden Raats, home">
          JADEN<span aria-hidden="true">*</span>
        </Link>
        <nav aria-label="Primary">
          <Link href="/systems">Systems</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/prompt-lab">Lab</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>

      <main>
        <section className="cx-hero" aria-labelledby="cx-name">
          <div className="cx-copy">
            <h1 id="cx-name" className="cx-name">
              <span className="cx-first">Jaden</span>
              <span className="cx-last">
                Raats<span className="cx-ast" aria-hidden="true">*</span>
              </span>
            </h1>
            <p className="cx-line">
              I build AI systems that work in <em>real life.</em>
            </p>
            <div className="cx-actions">
              <Link href="/systems" className="cx-btn cx-btn-primary" style={{ clipPath: torn(5, 6, 14) }}>
                Explore the work <span aria-hidden="true">↗</span>
              </Link>
              <button type="button" className="cx-btn cx-btn-paper" onClick={remix}>
                Remix this page <span aria-hidden="true">⟳</span>
              </button>
            </div>
          </div>

          <div className="cx-collage" aria-hidden="true">
            <div className="cx-scrap cx-scrap-a" style={{ clipPath: torn(3, 4) }} />
            <div className="cx-scrap cx-scrap-b" style={{ clipPath: torn(9, 5) }} />
            <img className="cx-desert-bg" src="/home/desert.webp" alt="" />

            <div className="cx-drag cx-pola" style={st("polaroid")} onPointerDown={onDown("polaroid")} onPointerMove={onMove} onPointerUp={onUp}>
              <div className="cx-pola-back" style={{ clipPath: torn(17, 3) }} />
              <figure className="cx-pola-card">
                <img src="/home/portrait.webp" alt="" draggable={false} />
                <figcaption>Built. Used. Fixed.</figcaption>
              </figure>
              <span className="cx-tape cx-tape-1" />
              <span className="cx-tape cx-tape-2" />
            </div>

            <div className="cx-drag cx-bass" style={st("bass")} onPointerDown={onDown("bass")} onPointerMove={onMove} onPointerUp={onUp}>
              <img src="/home/bass.webp" alt="" draggable={false} />
            </div>
            <p className="cx-note cx-note-bass">
              Outside
              <br />
              ideas
              <br />
              work
              <br />
              better.
            </p>

            <div className="cx-drag cx-mascot" style={st("mascot")} onPointerDown={onDown("mascot")} onPointerMove={onMove} onPointerUp={onUp}>
              <img src="/home/mascot.webp" alt="" draggable={false} />
            </div>
          </div>
        </section>

        <div className="cx-rule">
          <p className="cx-hint" aria-hidden="true">
            drag / shuffle / explore
            <svg viewBox="0 0 90 40" width="64" height="30">
              <path d="M2 6 C 40 2, 70 10, 80 34" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M70 30 L80 36 L84 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </p>
        </div>

        <section className="cx-cards" aria-label="Start here">
          {CARDS.map((c) => (
            <Link key={c.n} href={c.href} className={`cx-card${c.backed ? " cx-card-backed" : ""}`} style={{ transform: `rotate(${c.rot}deg)` }}>
              {c.backed && <span className="cx-card-back" style={{ clipPath: torn(c.seed + 2, 2.5) }} aria-hidden="true" />}
              <span className="cx-card-paper" style={{ clipPath: torn(c.seed, 2.2) }}>
                <span className="cx-dots" aria-hidden="true" />
                <span className="cx-num" aria-hidden="true">{c.n}</span>
                <span className="cx-card-title">{c.title}</span>
                <span className="cx-card-text">{c.text}</span>
                <img className="cx-card-icon" src={c.icon} alt="" />
                <img className="cx-card-desert" src="/home/desert.webp" alt="" />
              </span>
            </Link>
          ))}
        </section>
      </main>

      <footer className="cx-foot">
        <span>Built in Phoenix and Bigfork.</span>
        <nav aria-label="Footer">
          <Link href="/about">About me</Link>
          <a href="mailto:ai@jadenraats.com">ai@jadenraats.com</a>
        </nav>
      </footer>
    </div>
  );
}
