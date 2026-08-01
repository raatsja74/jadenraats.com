/** Hairline pill with a pinging terracotta dot — availability / status marker. */
export function StatusPill({
  children = "open to real work",
  pulse = true,
  className = "",
}: {
  children?: React.ReactNode;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 font-mono text-xs text-soft ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}
