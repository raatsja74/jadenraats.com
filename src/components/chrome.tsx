"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import Nav from "@/components/Nav";
import { Starred } from "@/components/brand";
import { Typewriter } from "@/components/Reveal";
import { enter } from "@/lib/motion";

/**
 * Page chrome shared by every route: the reduced-motion provider, the nav, and
 * the main element. Each page previously repeated this wrapper.
 */
export function PageShell({
  children,
  mainClassName,
  footer,
}: {
  children: ReactNode;
  mainClassName?: string;
  footer?: ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main className={mainClassName}>{children}</main>
      {footer}
    </MotionConfig>
  );
}

/** Standard footer. Home passes its typewriter line as `right`. */
export function SiteFooter({ right, className = "pb-8 pt-10" }: { right?: ReactNode; className?: string }) {
  return (
    <footer className={`bg-ink px-6 text-cream sm:px-10 ${className}`}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8 font-mono text-xs text-cream/40">
        <span>© 2026 Jaden Raats</span>
        {right ?? (
          <Link href="/" className="link-underline">
            back home
          </Link>
        )}
      </div>
    </footer>
  );
}

/**
 * The kicker + display title + lede block at the top of every interior page.
 * Pass extra paragraphs or actions as children.
 */
export function PageHeader({
  kicker,
  title,
  titleClassName = "display mt-6 max-w-4xl text-6xl sm:text-7xl",
  lede,
  children,
}: {
  kicker: ReactNode;
  title: ReactNode;
  titleClassName?: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-t-2 border-line pt-10">
      <motion.p {...enter(0.15)} className="kicker kicker-accent">
        <Starred>{kicker}</Starred>
      </motion.p>

      <motion.h1 {...enter(0.25)} className={titleClassName}>
        {title}
      </motion.h1>

      {lede ? (
        <motion.p {...enter(0.4)} className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base">
          {lede}
        </motion.p>
      ) : null}

      {children}
    </section>
  );
}

/** Typewriter line for the home footer. */
export function FooterTypewriter({ text }: { text: string }) {
  return <Typewriter text={text} />;
}
