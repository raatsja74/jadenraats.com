/** Mono inline link with the sweeping 1px underline. Appends "↗" for external links. */
export function TextLink({
  href,
  tone = "accent",
  external = false,
  className = "",
  children,
}: {
  href: string;
  tone?: "accent" | "invert";
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const toneClass = tone === "invert" ? "text-cream/80" : "text-accent";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`link-underline inline-block font-mono text-sm ${toneClass} ${className}`}
    >
      {children}
      {external && " ↗"}
    </a>
  );
}
