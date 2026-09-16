"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Starred } from "@/components/brand";
import { PageShell } from "@/components/chrome";
import { GuideBody } from "@/components/GuideCard";
import type { Guide } from "@/data/guides";
import { CONTACT_EMAIL } from "@/data/site";
import { enter, fadeUp } from "@/lib/motion";

export default function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <PageShell mainClassName="min-h-screen bg-cream text-ink">
      <article className="mx-auto max-w-3xl px-6 pb-28 pt-32 sm:px-10 sm:pb-36 sm:pt-40">
        <motion.p {...enter()} className="kicker kicker-accent">
          <Link href="/guides" className="hover:text-ink">
            guides
          </Link>
          <span className="text-faint"> / </span>
          <Starred>{guide.tag}</Starred>
        </motion.p>

        <motion.h1 {...enter(0.1)} className="display mt-8 text-5xl leading-tight sm:text-6xl">
          {guide.title}
        </motion.h1>

        <motion.p {...enter(0.2)} className="kicker kicker-faint mt-6">
          {guide.readMinutes} min read
        </motion.p>

        <motion.p {...enter(0.25)} className="mt-8 font-mono text-sm leading-relaxed text-soft sm:text-base">
          {guide.summary}
        </motion.p>

        <GuideBody sections={guide.sections} />

        <motion.div {...fadeUp} className="mt-16 flex flex-wrap gap-8 border-t-2 border-line pt-10 font-mono text-sm">
          <Link href="/guides" className="link-underline text-accent">
            ← all guides
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline text-soft">
            ask about this →
          </a>
        </motion.div>
      </article>
    </PageShell>
  );
}
