"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
    title: string;
    description: string;
    tag: string;
    date: string;
    readTime: string;
    href?: string;
    status?: "New" | "In progress" | "Coming soon";
}

export default function BlogCard({
    title,
    description,
    tag,
    date,
    readTime,
    href = "#",
    status = "Coming soon",
}: BlogCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-card border-4 border-border p-5 shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] transition-all hover:shadow-[10px_10px_0_0_rgba(255,107,157,0.35)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
            <Link href={href} className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                    <span className="font-display bg-accent px-3 py-1 text-[8px] uppercase tracking-[0.2em] text-accent-foreground shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]">
                        {tag}
                    </span>
                    <span className="text-xs text-muted-foreground">{date}</span>
                </div>
                <h3 className="font-display mt-4 text-[14px] uppercase text-foreground" style={{ lineHeight: "1.6" }}>
                    {title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Clock size={14} />
                        {readTime}
                    </div>
                    {status && (
                        <span className="font-display border-2 border-border bg-muted px-3 py-1 text-[8px] uppercase text-foreground">
                            {status}
                        </span>
                    )}
                    <ArrowRight className="h-4 w-4 text-primary" />
                </div>
            </Link>
        </motion.div>
    );
}
