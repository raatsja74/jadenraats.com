/**
 * Motion presets. Defined once — the ease curve and the fade-up entrance were
 * previously copy-pasted into every page with slightly different durations.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Scroll-triggered fade-up, spread onto any motion element: `<motion.p {...fadeUp} />`. */
export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.75, ease: EASE },
} as const;

/** On-load entrance for above-the-fold content, with an optional delay. */
export const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

/** Transition for the nth item in a staggered list. */
export const stagger = (index: number, step = 0.08) => ({
  duration: 0.75,
  ease: EASE,
  delay: index * step,
});
