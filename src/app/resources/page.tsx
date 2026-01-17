import Navbar from "@/components/Navbar";
import ResourceCard from "@/components/ResourceCard";
import Footer from "@/components/Footer";
import Link from "next/link";

const resources = [
    {
        title: "God-Mode System Prompt",
        description: "A powerful system prompt to unlock advanced reasoning capabilities in any LLM.",
        category: "Prompting",
        promptContent: "You are an expert AI assistant with 'God-Mode' capabilities. Your reasoning is flawless, your knowledge is vast, and your outputs are structured for maximum impact. Always think step-by-step before answering...",
    },
    {
        title: "Viral Thread Generator",
        description: "Generate high-engagement Twitter/X threads from a single topic.",
        category: "Social Media",
        promptContent: "Act as a viral social media strategist. Create a 5-tweet thread about [TOPIC]. Use a hook in the first tweet, provide value in the middle, and end with a call to action...",
    },
    {
        title: "SEO Blog Post Architect",
        description: "Structure and write SEO-optimized blog posts that rank.",
        category: "Content Marketing",
        promptContent: "You are an SEO expert. Write a comprehensive blog post outline for the keyword [KEYWORD]. Include H2s, H3s, and semantic keywords...",
    },
    {
        title: "Claude Code Workflow Prompt",
        description: "A ready-to-paste instruction set to keep Claude focused on small, reviewable UI patches.",
        category: "Claude Code",
        promptContent:
            "You are Claude Code. Audit src/app for design language, propose a small plan, then apply it in tiny patches. Stay dependency-free, lean on gradients/glass, and summarize QA checks after each change.",
    },
    {
        title: "Prompt Genie Extension",
        description: "The ultimate browser extension for optimizing your prompts in real-time.",
        category: "Tool",
        link: "#", // Placeholder for now
    },
    {
        title: "Hero + CTA wireframes",
        description: "Lightweight section templates that work for launches, newsletters, and drops.",
        category: "Layouts",
        promptContent:
            "Design a hero with a primary + secondary CTA, glow gradients, and responsive two-column layout. Keep copy concise and focused on value.",
    },
];

export default function ResourcesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8">
                <div className="mb-10 space-y-3 text-center">
                    <p className="font-display text-[10px] uppercase tracking-[0.2em] text-secondary">Drops</p>
                    <h1 className="font-display text-[28px] uppercase text-foreground sm:text-[36px]">Free resources</h1>
                    <p className="mx-auto max-w-3xl text-sm text-muted-foreground sm:text-base">
                        Claude-ready prompts, workflows, and tiny tools that keep your builds looking sharp.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {resources.map((res, idx) => (
                        <ResourceCard key={idx} {...res} />
                    ))}
                </div>

                <div className="mt-12 flex flex-col gap-3 border-4 border-border bg-card p-6 shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="font-display text-[10px] uppercase text-foreground">Need a custom Claude brief?</p>
                        <p className="text-sm text-muted-foreground">Tell me what you are shipping and I will craft the prompt.</p>
                    </div>
                    <Link
                        href="/#quests"
                        className="font-display inline-flex items-center gap-2 bg-accent px-4 py-3 text-[10px] uppercase text-accent-foreground shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] transition-all hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        View quests
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    );
}
