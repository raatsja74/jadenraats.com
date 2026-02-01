"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Zap,
  Calculator,
  Home,
  Package,
  Clock,
  FileText,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Shield,
  Cpu,
  Globe,
} from "lucide-react";

const tools = [
  {
    id: "website-health",
    title: "Health Checker",
    description: "Instant 6-point audit. Performance, SEO, and SSL scan.",
    icon: Home,
    href: "/tools/website-health",
    status: "live",
    protocol: "SYS-01",
    color: "text-primary"
  },
  {
    id: "roi-calculator",
    title: "ROI Calculator",
    description: "Real-time time savings and break-even analysis.",
    icon: Calculator,
    href: "/tools/roi-calculator",
    status: "live",
    protocol: "FIN-02",
    color: "text-primary"
  },
  {
    id: "competitor-analysis",
    title: "Analysis Wizard",
    description: "Rapid competitive auditing and strategic positioning gadget.",
    icon: Zap,
    href: "/tools/competitor-analysis",
    status: "live",
    protocol: "STR-03",
    color: "text-primary"
  },
  {
    id: "floorquote",
    title: "FloorQuote",
    description: "Visual estimator for rapid, accurate floor quoting.",
    icon: Package,
    href: "/tools/floorquote",
    status: "developing",
    protocol: "OS-04",
    color: "text-dim"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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

export default function Home() {
  return (
    <div className="grain min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-48 pb-32 overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
            <div className="absolute top-[-20%] left-[10%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[10%] w-[35%] h-[50%] bg-primary/5 blur-[100px] rounded-full" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                  Engineering Authentic Utility
                </span>
              </motion.div>

              <h1 className="text-main mb-10 tracking-tighter leading-[0.9] font-display">
                I build AI tools that <span className="text-primary text-glow-orange">actually work.</span>
              </h1>

              <p className="text-xl md:text-2xl text-dim leading-relaxed mb-16 max-w-2xl font-medium">
                Not demos. Not marketing fluff. Just pragmatic systems I use every day to solve real operational problems in my flooring business.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-8"
              >
                <Link href="/lab" className="btn-cyber-primary group w-full sm:w-auto">
                  Enter The Lab
                  <ArrowRight
                    size={20}
                    className="ml-3 transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/guide"
                  className="text-main hover:text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-colors group"
                >
                  View Operations Guide
                  <div className="w-8 h-[1px] bg-border-subtle group-hover:bg-primary transition-colors" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof / Metrics */}
        <section className="container pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { label: "Lines of Logic", value: "10k+", sub: "Verified" },
              { label: "Pipeline Audited", value: "$1.2M", sub: "Production" },
              { label: "Deployment Speed", value: "48h", sub: "Avg. Cycle" },
              { label: "Success Rate", value: "99.9%", sub: "Uptime" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">{stat.label}</span>
                <span className="text-4xl font-display font-black text-main tracking-tighter mb-1">{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-dim opacity-50">{stat.sub}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="container py-32 border-t border-border-subtle">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 mx-auto"
          >
            <div className="max-w-2xl">
              <motion.h2 variants={itemVariants} className="text-main mb-6">Things I've made</motion.h2>
              <motion.p variants={itemVariants} className="text-dim text-lg leading-relaxed">
                Production-ready tools focused on operational efficiency. Use them to audit, calculate, and accelerate.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={tool.href}
                    className={`group relative glass-card p-10 border transition-all duration-300 ${tool.status === 'live'
                      ? "border-primary/20 hover:border-primary shadow-lg hover:shadow-primary/10"
                      : "opacity-40 cursor-not-allowed border-border-subtle"
                      }`}
                  >
                    <div className="flex items-start justify-between mb-12">
                      <div className={`p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border-subtle group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors ${tool.color}`}>
                        <IconComponent size={28} />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-dim uppercase tracking-widest mb-1 opacity-50">Protocol</span>
                        <span className={`text-xs font-mono font-bold ${tool.status === 'live' ? 'text-primary' : 'text-dim'}`}>
                          {tool.protocol}
                        </span>
                      </div>
                    </div>

                    <h3 className={`text-2xl font-black mb-4 transition-colors font-display ${tool.status === 'live' ? 'text-main group-hover:text-primary' : 'text-dim'}`}>
                      {tool.title}
                    </h3>
                    <p className="text-dim text-sm leading-relaxed mb-12 flex-1 opacity-80">
                      {tool.description}
                    </p>

                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${tool.status === 'live' ? 'text-main group-hover:text-primary' : 'text-muted'
                      }`}>
                      <span>{tool.status === 'live' ? 'INITIALIZE TOOL' : 'DEVELOPING'}</span>
                      {tool.status === 'live' && <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* About Section */}
        <section className="container py-40 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-20 items-center"
          >
            <div className="flex-1">
              <h2 className="text-main mb-10 tracking-tighter">Grounded in <span className="text-primary">Real Work.</span></h2>
              <div className="space-y-8 text-xl text-dim leading-relaxed font-medium">
                <p>
                  I'm Jaden Raats. I live in Phoenix, Arizona, where I spend my days running a local service business.
                </p>
                <p>
                  I don't build software to sell to investors. I build it to solve the friction in my own day—whether that's automating lead responses, auditing competitors at machine-speed, or refining prompts to save hours of manual logic.
                </p>
                <p className="text-main font-bold">
                  The tools you see here aren't theoretical. They're what I use to keep my operations tight and my time my own.
                </p>
              </div>
            </div>
            <div className="flex-1 w-full lg:w-auto">
              <div className="glass-card p-12 border-primary/20 bg-primary/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Shield size={120} className="text-primary" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8">
                  Commitment to Quality
                </h3>
                <p className="text-base text-main leading-relaxed mb-10 font-bold">
                  Every tool in "Things I've made" or "The Lab" follows a single rule: it must provide immediate, verifiable utility.
                </p>
                <Link href="mailto:jaden@raatsja.com" className="btn-cyber-primary !w-full text-center">
                  Work with me
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
