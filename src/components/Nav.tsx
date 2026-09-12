import Link from "next/link";

const LINKS = [
  ["about", "/about"],
  ["guides", "/guides"],
  ["lab", "/prompt-lab"],
  ["portfolio", "/portfolio"],
  ["contact", "/#contact"],
] as const;

/** Brutalist editorial nav. Left wordmark, plain text links, one orange
 *  block anchoring the right edge. Square, bordered, 44px targets. */
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-line bg-cream">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl flex-wrap items-stretch justify-between gap-x-2 px-4 sm:px-6"
      >
        <Link
          href="/"
          aria-label="Jaden Raats — home"
          className="ast-host flex min-h-[44px] items-center font-display text-xl uppercase tracking-wide"
        >
          jaden<span className="ast text-accent">*</span>
        </Link>
        <div className="flex flex-wrap items-stretch">
          {LINKS.map(([label, href]) => (
            <Link
              key={href + label}
              href={href}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center border-l-2 border-transparent px-2 font-mono text-xs uppercase tracking-[0.08em] text-soft transition-colors duration-200 hover:bg-ink hover:text-cream sm:px-3"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#contact"
            aria-label="Say hello"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center bg-accent px-3 font-display text-lg text-ink"
          >
            <span aria-hidden="true">✱</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}