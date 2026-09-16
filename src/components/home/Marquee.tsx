import { MARQUEE } from "@/data/site";

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];

  return (
    <div className="marquee border-y-2 border-line bg-cream py-4" aria-hidden="true">
      {[0, 1].map((track) => (
        <div key={track} className="marquee-track">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.08em] text-faint">
              {item} <span className="text-accent">✳</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
