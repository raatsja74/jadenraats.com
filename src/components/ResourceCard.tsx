"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ResourceCardProps {
    title: string;
    description: string;
    category: string;
    link?: string;
    promptContent?: string;
}

export default function ResourceCard({ title, description, category, link, promptContent }: ResourceCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (promptContent) {
            await navigator.clipboard.writeText(promptContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-card border-4 border-border p-6 transition-all shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] hover:shadow-[10px_10px_0_0_rgba(255,107,157,0.35)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
            <div className="mb-4 flex items-start justify-between">
                <span className="font-display inline-block bg-accent px-3 py-1 text-[8px] uppercase tracking-[0.2em] text-accent-foreground shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]">
                    {category}
                </span>
                {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <ArrowUpRight size={20} />
                    </a>
                )}
            </div>

            <h3 className="font-display mb-3 text-[14px] uppercase text-foreground" style={{ lineHeight: "1.6" }}>
                {title}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">{description}</p>

            {promptContent && (
                <div className="mt-4 border-2 border-border bg-muted p-4 text-sm text-muted-foreground">
                    <p className="font-display mb-2 text-[8px] uppercase tracking-[0.2em] text-foreground">Prompt Preview</p>
                    <p className="text-sm text-muted-foreground">{promptContent}</p>

                    <button
                        onClick={handleCopy}
                        className="font-display mt-4 flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-[10px] uppercase text-primary-foreground shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] transition-all hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                        {copied ? "Copied" : "Copy Prompt"}
                    </button>
                </div>
            )}
        </motion.div>
    );
}
