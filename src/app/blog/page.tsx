import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const posts = [
    {
        title: "Autonomous lead generation engine with Claude",
        description: "Building an autonomous system for lead generation using Claude's capabilities to identify opportunities and automate outreach workflows.",
        tag: "AI Automation",
        date: "Nov 2025",
        readTime: "4 min read",
        href: "/blog/autonomous-lead-generation-claude",
        status: "New" as const,
    },
    {
        title: "AI content strategy for entrepreneurs",
        description: "Your competitors aren't beating you with better AI—they're just better at ignoring the hype. A practical content strategy that focuses on what actually works.",
        tag: "Content Strategy",
        date: "Nov 2025",
        readTime: "5 min read",
        href: "/blog/ai-content-strategy-entrepreneurs",
        status: "New" as const,
    },
    {
        title: "Second Mind Map: A smart triage system",
        description: "Capture → Review → Decide → Export. Building a knowledge management system that acts as your second brain for organizing digital life.",
        tag: "Knowledge Management",
        date: "Nov 2025",
        readTime: "6 min read",
        href: "/blog/second-mind-map-system",
        status: "New" as const,
    },
    {
        title: "Personal Operating System with Obsidian",
        description: "A comprehensive knowledge management system with interconnected nodes and documents for managing your life and work.",
        tag: "Productivity",
        date: "Nov 2025",
        readTime: "5 min read",
        href: "/blog/personal-operating-system",
        status: "New" as const,
    },
    {
        title: "LinkedIn post generator for B2B AI services",
        description: "The AI gold rush is hiding in plain sight. Smart operators are stacking lifetime deals and building sustainable AI workflows while others chase the next breakthrough.",
        tag: "Marketing",
        date: "Nov 2025",
        readTime: "4 min read",
        href: "/blog/linkedin-post-generator-b2b",
    },
    {
        title: "Adaptive AI agent catalog for workflow amplification",
        description: "Next-generation workflow amplification with meta-learning agents that adapt to your work patterns and automate complex tasks.",
        tag: "AI Workflows",
        date: "Nov 2025",
        readTime: "11 min read",
        href: "/blog/adaptive-ai-agent-catalog",
    },
    {
        title: "RAG Database: Improving Obsibrain",
        description: "Making the Obsibrain system simpler, more automated, and better aligned with modern AI workflows for knowledge retrieval.",
        tag: "AI Systems",
        date: "Nov 2025",
        readTime: "7 min read",
        href: "/blog/rag-database-obsibrain",
    },
    {
        title: "AI assistants evolving into autonomous operating systems",
        description: "The AI Wars of 2025: How Grok, Claude, and ChatGPT evolved from simple assistants into autonomous operating systems.",
        tag: "AI Evolution",
        date: "Oct 2025",
        readTime: "6 min read",
        href: "/blog/ai-assistants-autonomous-os",
    },
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="font-display text-[10px] uppercase tracking-[0.2em] text-secondary">Journal</p>
                        <h1 className="font-display mt-3 text-[28px] uppercase text-foreground sm:text-[36px]">Latest insights</h1>
                        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                            Working logs on AI systems, workflow design, and building knowledge tools that scale.
                        </p>
                    </div>
                    <Link
                        href="/#quests"
                        className="font-display inline-flex items-center gap-2 bg-accent px-4 py-3 text-[10px] uppercase text-accent-foreground shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] transition-all hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        View the quests
                    </Link>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    {posts.map((post) => (
                        <BlogCard key={post.title} {...post} />
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-start justify-between gap-4 border-4 border-border bg-card p-6 shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] sm:flex-row sm:items-center">
                    <div>
                        <p className="font-display text-[10px] uppercase text-foreground">Explore more quests</p>
                        <p className="text-sm text-muted-foreground">Discover tools, workflows, and systems for building with AI.</p>
                    </div>
                    <Link
                        href="/resources"
                        className="font-display inline-flex items-center gap-2 text-[10px] uppercase text-secondary transition-colors hover:text-primary"
                    >
                        Browse resources <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    );
}
