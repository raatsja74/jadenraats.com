"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Beaker, ArrowRight, Zap, Sparkles, Shield, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const labs = [
    {
        id: "competitor-analysis",
        title: "Competitor Analysis Wizard",
        description: "Deep-scanning AI that audits competitor pricing, service gaps, and market positioning.",
        status: "active",
        protocol: "01-A",
        icon: Zap,
        href: "/tools/competitor-analysis",
        color: "text-primary"
    },
    {
        id: "prompt-genie",
        title: "AI Prompt Genie",
        description: "Advanced prompt engineering utility for high-precision model steering and task automation.",
        status: "active",
        protocol: "02-B",
        icon: Sparkles,
        href: "/tools/prompt-genie",
        color: "text-primary text-glow-orange"
    },
    {
        id: "generator-app",
        title: "Refinement Engine",
        description: "Autonomous content generation and iteration system for complex service business docs.",
        status: "offline",
        protocol: "03-C",
        icon: Cpu,
        href: "#",
        color: "text-dim"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function LabPage() {
    return (
        <div className="grain min-h-screen font-mono selection:bg-primary/30 selection:text-primary">
            <Header />

            <main className="pt-40 pb-32">
                {/* Lab Hero */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mb-32"
                >
                    <div className="max-w-4xl mx-auto text-center font-mono">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-10"
                        >
                            <Beaker size={12} />
                            <span>TERMINAL CHANNEL // PROXY ACTIVE</span>
                        </motion.div>

                        <h1 className="text-main mb-8 tracking-tighter font-display text-5xl md:text-7xl">The <span className="text-primary text-glow-orange">Lab_</span></h1>
                        <p className="text-xl md:text-2xl text-dim leading-relaxed mb-16 max-w-2xl mx-auto font-sans">
                            Experimental modules and production gadgets I use to test the limits of what automated systems can achieve in the real world.
                        </p>

                        <div className="flex items-center justify-center gap-10">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col items-center">
                                <Shield size={24} className="text-primary mb-3 opacity-80" />
                                <span className="text-[10px] font-black text-dim uppercase tracking-widest text-primary/70">Isolated Sandbox</span>
                            </motion.div>
                            <div className="w-px h-10 bg-primary/20" />
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col items-center">
                                <Cpu size={24} className="text-primary mb-3 opacity-80" />
                                <span className="text-[10px] font-black text-dim uppercase tracking-widest text-primary/70">Native Integration</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Lab Grid */}
                <section className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {labs.map((lab) => {
                            const Icon = lab.icon;
                            const isLive = lab.status === 'active';

                            return (
                                <motion.div
                                    key={lab.id}
                                    variants={itemVariants}
                                    whileHover={isLive ? {
                                        y: -10,
                                        transition: { type: "spring", stiffness: 400, damping: 10 }
                                    } : {}}
                                >
                                    <Link
                                        href={lab.href}
                                        className={`group h-full block glass-card p-10 border transition-all duration-300 ${isLive
                                            ? "border-primary/20 hover:border-primary shadow-lg hover:shadow-primary/10"
                                            : "opacity-40 cursor-not-allowed border-border-subtle"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-12">
                                            <div className={`p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border-subtle group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors ${lab.color}`}>
                                                <Icon size={32} />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-black text-dim uppercase tracking-widest mb-1 opacity-50">Protocol</span>
                                                <span className={`text-xs font-mono font-bold ${isLive ? 'text-primary' : 'text-dim'}`}>
                                                    {lab.protocol}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className={`text-2xl font-black mb-4 transition-colors font-display ${isLive ? 'text-main group-hover:text-primary' : 'text-dim'}`}>
                                            {lab.title}
                                        </h3>
                                        <p className="text-dim text-sm leading-relaxed mb-12 flex-1 font-sans opacity-80">
                                            {lab.description}
                                        </p>

                                        <div className={`flex items-center gap-2 text-[10px] font-black font-mono uppercase tracking-widest ${isLive ? 'text-main group-hover:text-primary' : 'text-muted'
                                            }`}>
                                            <span>{isLive ? 'INITIALIZE MODULE' : lab.status.toUpperCase()}</span>
                                            {isLive && <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />}
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* System Warning / Info */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container mt-32"
                >
                    <div className="max-w-4xl mx-auto glass-card border-primary/20 p-12 bg-primary/5 text-center font-mono">
                        <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">User Notice // System Overrides</h3>
                        <p className="text-dim text-[10px] leading-relaxed mb-0 opacity-70">
                            Lab modules are experimental and may have high latency during initial boot. All tools are provided for educational review and run inside isolated cloud sandboxes managed by Google AI Studio. Proxy headers are active.
                        </p>
                    </div>
                </motion.section>
            </main>

            <Footer />
        </div>
    );
}
