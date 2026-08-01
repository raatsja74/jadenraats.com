"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { TextLink } from "./TextLink";

/** Hairline-divided work entry: title slides right on hover, mono tag on the right. */
export function WorkRow({
  name,
  tag,
  desc,
  href,
  label,
  delay = 0,
}: {
  name: string;
  tag: string;
  desc: string;
  href?: string | null;
  label?: string | null;
  delay?: number;
}) {
  return (
    <motion.article
      className="group border-b border-ink/10 py-10 transition-colors duration-500 sm:py-12"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-3xl font-medium tracking-tight transition-transform duration-500 ease-soft group-hover:translate-x-2 sm:text-4xl">
          {name}
        </h3>
        <span className="font-mono text-sm text-faint">{tag}</span>
      </div>
      <p className="mt-4 max-w-xl leading-relaxed text-soft">{desc}</p>
      {href && (
        <TextLink href={href} external className="mt-5">
          {label || href}
        </TextLink>
      )}
    </motion.article>
  );
}
