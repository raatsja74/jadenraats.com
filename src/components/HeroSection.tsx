"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";


export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
            {/* Background Decor - Subtle Gradient Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-secondary/30 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.15]">
                            I build things with AI that actually work.
                        </h1>

                        <p className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-xl">
                            Not demos. Not proofs of concept. Real tools I use every day — and sometimes share with others.
                        </p>

                        <p className="text-lg text-muted-foreground/80 mb-10 leading-relaxed max-w-xl">
                            Based in Phoenix. Also run a flooring business, which is where I test half this stuff.
                        </p>



                        <div className="flex items-center gap-6 text-muted-foreground">
                            <a href="https://github.com/jadenraats" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                                <Github size={22} />
                            </a>
                            <a href="https://twitter.com/jadenraats" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                                <Twitter size={22} />
                            </a>
                            <a href="https://linkedin.com/in/jadenraats" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                                <Linkedin size={22} />
                            </a>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative aspect-square w-full max-w-[500px] mx-auto lg:ml-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-muted/40 rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-500" />
                        <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                            <Image
                                src="/hero-visual.png"
                                alt="Abstract AI Architecture"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
