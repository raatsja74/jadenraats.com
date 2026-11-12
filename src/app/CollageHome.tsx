"use client";

// Created by Hark | 2026-11-12. Updated by Hark | 2026-11-12
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { GUIDES } from "@/data/guides";

type Offset = { x: number; y: number };

// Fine, irregular torn edge. Deterministic so server and client match.
// Amplitude is in px so the tear reads the same on any element size.
function torn(seed: number, amp = 3, steps = 72, notch = 0.08) {
  let s = seed * 7919 + 13;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  let walk = amp / 2;
  const d = () => {
    walk += (rnd() - 0.5) * amp * 0.9;
    walk = Math.max(0, Math.min(amp, walk));
    const extra = rnd() < notch ? rnd() * amp * 1.4 : 0;
    return (walk + extra + rnd() * 0.6).toFixed(2);
  };
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) pts.push(`${((i / steps) * 100).toFixed(2)}% ${d()}px`);
  for (let i = 0; i <= steps; i++) pts.push(`calc(100% - ${d()}px) ${((i / steps) * 100).toFixed(2)}%`);
  for (let i = steps; i >= 0; i--) pts.push(`${((i / steps) * 100).toFixed(2)}% calc(100% - ${d()}px)`);
  for (let i = steps; i >= 0; i--) pts.push(`${d()}px ${((i / steps) * 100).toFixed(2)}%`);
  return `polygon(${pts.join(",")})`;
}

const PICKS: { slug: string; art: string; seed: number; rot: number }[] = [
  { slug: "turn-a-messy-note-into-a-next-step", art: "/home/guide-note.webp", seed: 11, rot: -0.8 },
  { slug: "follow-up-that-survives-monday", art: "/home/guide-followup.webp", seed: 23, rot: 0.5 },
  { slug: "write-the-rules-down", art: "/home/guide-rules.webp", seed: 37, rot: -0.4 },
];

const STICKERS = ["bass", "mascot"] as const;
type StickerId = (typeof STICKERS)[number];

export default function CollageHome() {
  const [pos, setPos] = useState<Record<StickerId, Offset>>({ bass: { x: 0, y: 0 }, mascot: { x: 0, y: 0 } });
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
    setPos((p) => ({ ...p, [d.id]: { x: d.ox + e.clientX - d.sx, y: d.oy + e.clientY - d.sy } }));
  }, []);
  const onUp = useCallback(() => {
    drag.current = null;
  }, []);

  const guides = PICKS.map((p) => ({ ...p, g: GUIDES.find((x) => x.slug === p.slug) })).filter((p) => p.g);

  return (
    <div className="cx">
      <header className="cx-top">
        <Link href="/" className="cx-mark" aria-label="JD Raats, home">
          JD<span aria-hidden="true">*</span>
        </Link>
        <nav aria-label="Primary">
          <Link href="/guides">Guides</Link>
          <Link href="/systems">Systems</Link>
          <Link href="/prompt-lab">Lab</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>

      <main>
        <section className="cx-hero" aria-labelledby="cx-name">
          <div className="cx-copy">
            <h1 id="cx-name" className="cx-name" aria-label="JD Raats">
              <span className="cx-first">JD</span>
              <span className="cx-last">
                Raats<span className="cx-ast" aria-hidden="true">*</span>
              </span>
            </h1>
            <p className="cx-line">
              I build AI systems that work in <em>real life.</em>
            </p>
            <Link href="/guides" className="cx-btn" style={{ clipPath: torn(5, 2.4, 40) }}>
              Explore the guides <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="cx-collage" aria-hidden="true">
            <div className="cx-scrap cx-scrap-a" style={{ clipPath: torn(3, 3) }} />
            <div className="cx-scrap cx-scrap-b" style={{ clipPath: torn(9, 3) }} />
            <img className="cx-desert-bg" src="/home/desert.webp" alt="" />

            <div className="cx-pola">
              <div className="cx-pola-settle">
                <div className="cx-pola-fringe" style={{ clipPath: torn(16, 3.5) }} />
                <div className="cx-pola-back" style={{ clipPath: torn(17, 3) }} />
                <figure className="cx-pola-card">
                  <img src="/home/portrait.webp" alt="" draggable={false} />
                  <figcaption>Built. Used. Fixed.</figcaption>
                </figure>
                <span className="cx-tape cx-tape-1" />
                <span className="cx-tape cx-tape-2" />
              </div>
            </div>

            <div className="cx-drag cx-bass" style={{ transform: `translate(${pos.bass.x}px, ${pos.bass.y}px) rotate(-10deg)` }} onPointerDown={onDown("bass")} onPointerMove={onMove} onPointerUp={onUp}>
              <img src="/home/bass.webp" alt="" draggable={false} />
            </div>
            <div className="cx-drag cx-mascot" style={{ transform: `translate(${pos.mascot.x}px, ${pos.mascot.y}px) rotate(6deg)` }} onPointerDown={onDown("mascot")} onPointerMove={onMove} onPointerUp={onUp}>
              <img src="/home/mascot.webp" alt="" draggable={false} />
            </div>
          </div>
        </section>

        <section className="cx-guides" aria-labelledby="cx-guides-title">
          <div className="cx-guides-head">
            <h2 id="cx-guides-title">
              Start with a <em>guide</em>
            </h2>
            <Link href="/guides" className="cx-more">
              All guides <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="cx-cards">
            {guides.map(({ g, art, seed, rot }, i) => (
              <Link key={g!.slug} href={`/guides/${g!.slug}`} className="cx-card" style={{ ["--rot" as string]: `${rot}deg` }}>
                <span className="cx-card-fringe" style={{ clipPath: torn(seed + 1, 3.2) }} aria-hidden="true" />
                <span className="cx-card-paper" style={{ clipPath: torn(seed, 2.6) }}>
                  <span className="cx-card-art">
                    <img src={art} alt="" />
                  </span>
                  <span className="cx-card-meta">
                    <span className="cx-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    {g!.tag} · {g!.readMinutes} min
                  </span>
                  <span className="cx-card-title">{g!.title}</span>
                  <span className="cx-card-text">{g!.summary}</span>
                  <span className="cx-card-go">
                    Read the guide <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="cx-foot">
        <nav aria-label="Footer">
          <Link href="/systems">Systems</Link>
          <Link href="/prompt-lab">Lab</Link>
          <Link href="/about">About me</Link>
          <a href="mailto:ai@jadenraats.com">ai@jadenraats.com</a>
        </nav>
        <span>Built in Phoenix and Bigfork.</span>
      </footer>
    </div>
  );
}
