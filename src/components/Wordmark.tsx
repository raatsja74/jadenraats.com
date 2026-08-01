import { RevealLine } from "./RevealLine";

/**
 * The brand lockup: sans first word, serif-italic second word, terracotta asterisk.
 * Stacked (hero scale, "jaden" / "raats*") reveals each word on its own masked line.
 * Inline (e.g. "say hello*") renders both words on one line with no reveal.
 */
export function Wordmark({
  first,
  second,
  stacked = true,
  reveal = stacked,
  firstDelay = 0.35,
  secondDelay = 0.5,
  className = "",
}: {
  first: string;
  second: string;
  stacked?: boolean;
  reveal?: boolean;
  firstDelay?: number;
  secondDelay?: number;
  className?: string;
}) {
  const secondEl = (
    <span className="ast-host font-serif italic tracking-[-0.02em]">
      {second}
      <span className="ast not-italic text-accent">*</span>
    </span>
  );

  if (!stacked) {
    return (
      <span className={className}>
        {first} {secondEl}
      </span>
    );
  }

  return (
    <>
      {reveal ? (
        <RevealLine delay={firstDelay}>{first}</RevealLine>
      ) : (
        <span className="block">{first}</span>
      )}
      {reveal ? <RevealLine delay={secondDelay}>{secondEl}</RevealLine> : secondEl}
    </>
  );
}
