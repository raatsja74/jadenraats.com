"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/chrome";
import { StarredName } from "@/components/brand";
import { CONTACT_EMAIL } from "@/data/site";
import { enter } from "@/lib/motion";

export function AboutHero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 sm:px-10 sm:pb-24 sm:pt-44">
      <PageHeader
        kicker="about"
        titleClassName="display mt-6 text-7xl sm:text-8xl lg:text-9xl"
        title={
          <>
            Jaden <StarredName>Raats</StarredName>
          </>
        }
      >
        <motion.p
          {...enter(0.4)}
          className="mt-7 max-w-3xl font-mono text-sm leading-relaxed text-soft sm:text-base"
        >
          Owner of Award Coatings. Builder of the AI systems that run it. I share what survives a real
          Monday, in plain English.
        </motion.p>

        <motion.p
          {...enter(0.5)}
          className="mt-10 max-w-2xl font-mono text-sm leading-relaxed text-soft sm:text-base"
        >
          I own a floor coating company in Phoenix and I build the AI systems that run it — lead follow-up,
          quoting, scheduling, the back office. Award Coatings isn&apos;t a case study I read about.
          It&apos;s the business that has to still work on Monday if I get the automation wrong.
        </motion.p>

        <motion.div {...enter(0.6)} className="mt-10 flex flex-wrap gap-3">
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
            Get in touch <span className="btn-arrow">→</span>
          </a>
          <Link href="/#hermes" className="btn btn-secondary">
            Read the case study
          </Link>
        </motion.div>
      </PageHeader>
    </section>
  );
}
