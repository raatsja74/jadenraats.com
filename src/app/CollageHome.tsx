"use client";

// Created by Hark | 2026-11-12. Updated by Hark | 2026-11-12
import Link from "next/link";
import Journey from "./Journey";

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

export default function CollageHome() {
  return (
    <div className="cx">
      <header className="cx-top">
        <Link href="/" className="cx-mark" aria-label="JD Raats, home">
          <img src="/home/lab-mark.png" alt="" width="142" height="108" />
          <span className="cx-mark-ast" aria-hidden="true">*</span>
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
              Phoenix to Bigfork. Figuring out what works in <em>real life.</em>
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

          </div>
        </section>

        <Journey />
      </main>

      <footer className="cx-foot">
        <nav aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/writing">Writing</Link>
          <a href="mailto:ai@jadenraats.com">Get in touch</a>
        </nav>
        <span>Built in Phoenix and Bigfork.</span>
      </footer>
    </div>
  );
}
