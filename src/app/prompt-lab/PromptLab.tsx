"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import Nav from "@/components/Nav";
import { BANK, CATEGORIES } from "./prompts";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const PLACEHOLDER = "Press draw to pull a prompt.";

export default function PromptLab() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Timers are cleared on unmount so a pending swap can't fire into a dead tree.
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (swapTimer.current) clearTimeout(swapTimer.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const list = BANK[category];
  const prompt = index >= 0 ? list[index] : PLACEHOLDER;

  /** Pull a random prompt, never repeating the one already on screen. */
  const draw = useCallback(
    (from = category, avoid = index) => {
      const pool = BANK[from];
      let next = Math.floor(Math.random() * pool.length);
      if (pool.length > 1 && next === avoid) next = (next + 1) % pool.length;

      setVisible(false);
      if (swapTimer.current) clearTimeout(swapTimer.current);
      swapTimer.current = setTimeout(() => {
        setIndex(next);
        setVisible(true);
      }, 180);
    },
    [category, index],
  );

  function pickCategory(cat: string) {
    if (cat === category) return;
    setCategory(cat);
    setIndex(-1);
    draw(cat, -1);
  }

  async function copy() {
    if (index < 0) return;
    try {
      await navigator.clipboard.writeText(list[index]);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard is blocked without a secure context or permission — the
      // prompt is selectable on screen, so fail quietly rather than alerting.
    }
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <MotionConfig reducedMotion="user">
      <Nav />

      {/* .wash is absolutely positioned, so it needs a viewport-sized parent —
          inside <main> it would only glow behind the centred column. */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="wash" />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="relative mb-7 inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 font-mono text-xs text-soft"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          ideation tool · testing generative range
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="ast-host relative font-serif text-5xl italic tracking-tight sm:text-6xl"
        >
          prompt lab<span className="ast not-italic text-accent">*</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="relative mt-4 max-w-xl text-lg leading-relaxed text-soft"
        >
          A small instrument for stress-testing how far a language model will
          commit to a strange idea. Eight categories, forty prompts — pull one
          and see what happens.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          className="relative mt-12"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-faint">
            category
          </p>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => pickCategory(cat)}
                  aria-pressed={active}
                  className={
                    "rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-200 " +
                    (active
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/10 bg-surface text-soft hover:border-ink/25 hover:text-ink")
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative mt-7 flex min-h-[220px] items-center justify-center rounded-3xl border border-ink/[0.08] bg-surface px-6 py-12 text-center sm:px-10">
            <span
              aria-hidden="true"
              className="absolute left-6 top-4 font-serif text-5xl italic leading-none text-accent/40"
            >
              &ldquo;
            </span>
            <p
              aria-live="polite"
              className={
                "max-w-xl font-serif text-2xl italic leading-snug transition-[opacity,transform] duration-300 sm:text-[1.65rem] " +
                (index < 0 || visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1.5 opacity-0")
              }
            >
              {prompt}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs text-faint">
              {index < 0
                ? `${pad(list.length)} prompts in category`
                : `${pad(index + 1)} / ${pad(list.length)} in category`}
            </span>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={copy}
                disabled={index < 0}
                className="rounded-full border border-ink/15 px-5 py-3 text-sm text-soft transition-colors duration-200 hover:border-ink/30 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink/15 disabled:hover:text-soft"
              >
                {copied ? "copied" : "copy"}
              </button>
              <button
                type="button"
                onClick={() => draw()}
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-colors duration-200 hover:bg-accent"
              >
                draw prompt <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className="relative mt-14 border-t border-ink/10 pt-6 text-sm leading-relaxed text-soft"
        >
          Use these to test <b className="font-medium text-accent">commitment
          and range</b>, not just fluency — a strong answer should surprise you,
          stay internally consistent, and follow its own premise instead of
          hedging. Try the same prompt across a few models to compare how far
          each is willing to go.
        </motion.p>
      </main>
    </MotionConfig>
  );
}
