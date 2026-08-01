/** Hairline-bounded infinite mono marquee, asterisk between items. */
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee border-y border-ink/10 py-4" aria-hidden="true">
      {[0, 1].map((track) => (
        <div key={track} className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-sm text-faint">
              {item} <span className="text-accent">✳</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
