"use client";

import { motion } from "framer-motion";
import { Asterisk, MessageBubbleIcon } from "@/components/brand";
import { CONTACT_EMAIL, GITHUB_URL } from "@/data/site";
import { fadeUp } from "@/lib/motion";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 border-t-2 border-line bg-ink px-6 py-28 text-cream sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="kicker kicker-paper">contact</p>

        <motion.h2 {...fadeUp} className="display mt-6 text-6xl sm:text-8xl">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="ast-host inline-flex items-center gap-4 transition-colors duration-500 hover:text-accent sm:gap-6"
          >
            say hello <MessageBubbleIcon className="h-8 w-8 text-accent sm:h-10 sm:w-10" />
            <Asterisk accent />
          </a>
        </motion.h2>

        <motion.p {...fadeUp} className="mt-8 max-w-md font-mono text-sm leading-relaxed text-cream/60">
          Running a business and wondering what AI can actually do for you? Ask. If it&apos;s real work,
          I&apos;m interested.
        </motion.p>

        <motion.div {...fadeUp} className="mt-10 flex flex-wrap gap-8 font-mono text-sm">
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline text-cream/80">
            {CONTACT_EMAIL}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="link-underline text-cream/80">
            github ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
