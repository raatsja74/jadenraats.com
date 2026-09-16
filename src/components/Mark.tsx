/**
 * The brand mark — a constructed six-arm asterisk: three strokes crossing at
 * (24,24), 60° apart, square caps, in a 48×48 box.
 *
 * Inline rather than an <img> on purpose: the mark inherits currentColor (so
 * one file serves paper, ink and orange surfaces) and its box is em-based, so
 * it scales with the h1 it sits in instead of being pinned to pixels.
 * The same geometry ships as a standalone file at /images/mark.svg.
 */
export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
      className={`mark ${className}`.trim()}
    >
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="square">
        <line x1="24" y1="4" x2="24" y2="44" />
        <line x1="41.32" y1="14" x2="6.68" y2="34" />
        <line x1="6.68" y1="14" x2="41.32" y2="34" />
      </g>
    </svg>
  );
}
