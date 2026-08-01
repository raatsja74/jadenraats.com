/** Page section with the standard measure, gutters and vertical rhythm. */
export function Section({
  id,
  tone = "cream",
  paddingClassName = "py-28 sm:py-36",
  className = "",
  children,
}: {
  id?: string;
  tone?: "cream" | "ink";
  paddingClassName?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-6 sm:px-10 ${paddingClassName} ${tone === "ink" ? "bg-ink text-cream" : ""} ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}
