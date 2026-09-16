"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageBubbleIcon, StarredName } from "@/components/brand";
import { RevealLine } from "@/components/Reveal";
import { CONTACT_EMAIL } from "@/data/site";
import { enter } from "@/lib/motion";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-14 pt-32 sm:px-10 lg:px-16">
      <motion.div
        className="hero-portrait"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
      >
        <Image
          src="/images/jaden-fishing.webp"
          alt="Illustration of Jaden Raats holding a bass"
          width={960}
          height={1100}
          priority
          className="h-full w-auto"
        />
      </motion.div>

      <div className="relative z-10">
        <motion.p {...enter(0.2)} className="kicker kicker-accent">
          operator · builder · phoenix, az
        </motion.p>

        <h1 className="display mt-5 text-[19vw] leading-[0.9] sm:text-[15vw] lg:text-[12vw]">
          <RevealLine delay={0.35}>jaden</RevealLine>
          <RevealLine delay={0.5}>
            <StarredName>raats</StarredName>
          </RevealLine>
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p {...enter(0.75)} className="max-w-md font-mono text-sm leading-relaxed text-soft">
            I run a floor coating company in Phoenix and use AI to run it
            better. This is where I show other business owners how to do the
            same — real systems, tested in real operations, explained in plain
            English.
          </motion.p>

          <motion.div {...enter(0.9)} className="flex flex-wrap gap-3">
            <Link href="/#guides" className="btn btn-primary">
              See the guides <span className="btn-arrow">→</span>
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-secondary">
              <MessageBubbleIcon className="h-4 w-4" /> Say hello
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
