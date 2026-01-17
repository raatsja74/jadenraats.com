"use client";

import { motion } from "framer-motion";
import { Check, Clipboard, Clock, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";

const steps = [
    {
        title: "Audit + capture context",
        description:
            "Scan layout.tsx, globals.css, and key routes. Note the current palette, spacing, and component patterns Claude should respect or retire.",
        output: "Quick inventory + design direction",
    },
    {
        title: "Co-design with Claude Code",
        description:
            "Pair with Claude to shape hero, cards, typography, and gradients. Ask for options, then lock a direction before coding.",
        output: "Approved UI direction + tokens",
    },
    {
        title: "Implement in small patches",
        description:
            "Ship in scoped edits (one file per patch when possible). Keep actions reversible, add concise comments only where the intent is non-obvious.",
        output: "Clean diffs ready to review",
    },
    {
        title: "QA and ship",
        description:
            "Smoke-test responsive states, hover/active styles, and color contrast. Have Claude list verifications and open issues.",
        output: "Publishable build + QA notes",
    },
];

const workflowPrompt = `You are Claude Code. Goal: modernize my Next.js blog (src/app) with a refined, minimal-futuristic aesthetic.

Operating rules:
- Use Tailwind classes already available; do not add dependencies.
- Respect font loading in layout.tsx and tokens in globals.css; propose better use of them.
- Work in small patches with clear rationale. Avoid noisy comments.
- Prefer gradients, soft glass, and considered whitespace over generic cards.
- Keep Navbar, Hero, Blog, and Resources coherent; add a workflow section that explains how to work with you.
- After each patch, summarize changes and list checks to run (lint, responsive, links).

First, audit globals, layout.tsx, and the home/blog/resources pages. Propose a quick visual direction and a stepwise edit plan before changing code.`;

const promptPreview =
    "You are Claude Code. Goal: modernize my Next.js blog with a refined, minimal-futuristic aesthetic.";

export default function ClaudeWorkflow() {
    const [copied, setCopied] = useState(false);

    const copyPrompt = async () => {
        await navigator.clipboard.writeText(workflowPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    return (
        <section id="workflow" className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-cyan-50 to-blue-100">
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/0" />
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-600/80 mb-4">
                    <Sparkles size={16} />
                    Claude Code Workflow
                </div>
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/60 shadow-xl p-6 sm:p-8"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Workflow system</h2>
                                <p className="text-sm text-gray-600">
                                    A repeatable loop to keep your blog polished with Claude Code.
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-white/50 px-4 py-2 text-xs text-gray-700">
                                <Clock size={14} />
                                ~35 mins end-to-end
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {steps.map((step, idx) => (
                                <div
                                    key={step.title}
                                    className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/50 via-white/30 to-cyan-50/40 backdrop-blur-md p-5 shadow-lg"
                                >
                                    <div className="absolute inset-0 opacity-30 mix-blend-overlay blur-3xl" aria-hidden>
                                        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-cyan-300/40" />
                                        <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-orange-300/30" />
                                    </div>
                                    <div className="relative flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-sm font-semibold text-cyan-700 border border-white/80 shadow-sm">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                                                <span className="rounded-full border border-cyan-200/60 bg-white/50 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-cyan-700/80">
                                                    {step.output}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3 text-xs text-gray-700">
                            <span className="rounded-full border border-cyan-200/60 bg-white/50 px-3 py-1">Design ops</span>
                            <span className="rounded-full border border-cyan-200/60 bg-white/50 px-3 py-1">Tiny patches</span>
                            <span className="rounded-full border border-cyan-200/60 bg-white/50 px-3 py-1">Visual QA</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 }}
                        className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/60 shadow-xl p-6 sm:p-7"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-300 via-cyan-300 to-blue-400 text-white shadow-lg">
                                <Wand2 size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Claude-ready prompt</h3>
                                <p className="text-xs text-gray-600">Drop this into Claude Code to drive the refresh.</p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-white/60 bg-white/50 p-4 text-sm text-gray-700 shadow-sm">
                            <p className="leading-relaxed">{promptPreview}</p>
                            <div className="mt-3 rounded-xl border border-cyan-200/60 bg-white/60 p-3 text-xs text-gray-600">
                                <p className="font-semibold text-gray-800">Operating rules</p>
                                <ul className="mt-2 space-y-1 list-disc list-inside">
                                    <li>Use Tailwind + existing tokens; stay dependency-free.</li>
                                    <li>Keep edits scoped and reversible.</li>
                                    <li>Summarize changes + checks after every patch.</li>
                                </ul>
                            </div>
                        </div>

                        <button
                            onClick={copyPrompt}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                        >
                            {copied ? (
                                <>
                                    <Check size={16} />
                                    Copied to Claude
                                </>
                            ) : (
                                <>
                                    <Clipboard size={16} />
                                    Copy workflow prompt
                                </>
                            )}
                        </button>

                        <div className="mt-4 rounded-2xl border border-white/60 bg-white/50 p-4 text-xs text-gray-700 space-y-2 shadow-sm">
                            <div className="flex items-center gap-2 text-gray-800 font-medium">
                                <Sparkles size={14} />
                                Claude will deliver
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="rounded-xl border border-cyan-200/60 bg-white/60 px-3 py-2">
                                    <p className="text-[11px] uppercase tracking-[0.15em] text-cyan-600/80">Visual system</p>
                                    <p className="text-sm text-gray-800">Gradients, glass, rhythm</p>
                                </div>
                                <div className="rounded-xl border border-cyan-200/60 bg-white/60 px-3 py-2">
                                    <p className="text-[11px] uppercase tracking-[0.15em] text-cyan-600/80">Ship checklist</p>
                                    <p className="text-sm text-gray-800">Lint, links, breakpoints</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
