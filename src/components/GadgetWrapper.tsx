"use client";

import { useState } from "react";
import { Maximize2, Minimize2, ExternalLink, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GadgetWrapperProps {
    title: string;
    description: string;
    sourceUrl: string;
    modelVersion?: string;
    protocolType?: string;
}

export function GadgetWrapper({
    title,
    description,
    sourceUrl,
    modelVersion = "Gemini 2.0 Pro",
    protocolType = "Analytical Intelligence"
}: GadgetWrapperProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <AnimatePresence>
            <motion.div
                layout
                initial={false}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8
                }}
                className={`transition-all duration-500 rounded-2xl overflow-hidden border border-border-subtle bg-surface mb-12 shadow-2xl ${isExpanded ? "fixed inset-4 z-[100] m-0" : "relative w-full h-[700px]"
                    }`}
            >
                {/* Gadget Header / Readout */}
                <motion.div
                    layout="position"
                    className="bg-surface-muted/50 border-b border-border-subtle px-6 py-4 flex items-center justify-between"
                >
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-dim uppercase tracking-widest mb-1">Gadget Identification</span>
                            <h2 className="text-sm font-bold text-main">{title}</h2>
                        </div>
                        <div className="hidden sm:flex w-px h-8 bg-border-subtle" />
                        <div className="hidden sm:flex flex-col">
                            <span className="text-[10px] font-black text-dim uppercase tracking-widest mb-1">Model Version</span>
                            <span className="text-xs font-mono text-primary font-bold">{modelVersion}</span>
                        </div>
                        <div className="hidden md:flex w-px h-8 bg-border-subtle" />
                        <div className="hidden md:flex flex-col">
                            <span className="text-[10px] font-black text-dim uppercase tracking-widest mb-1">Protocol Type</span>
                            <span className="text-xs font-bold text-secondary uppercase tracking-tighter">{protocolType}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2.5 rounded-lg glass border-border-subtle text-dim hover:text-primary transition-all active:scale-95"
                            title={isExpanded ? "Collapse View" : "Focus Mode"}
                        >
                            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </motion.button>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg glass border-border-subtle text-dim hover:text-primary transition-all active:scale-95"
                            title="Open Original"
                        >
                            <ExternalLink size={18} />
                        </motion.a>
                    </div>
                </motion.div>

                {/* Security Banner (Managed State) */}
                <motion.div
                    layout="position"
                    className="bg-primary/5 px-6 py-2 border-b border-primary/10 flex items-center gap-2"
                >
                    <ShieldCheck size={12} className="text-primary" />
                    <span className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">
                        Secure Sandbox Channel — Powered by Google AI Studio
                    </span>
                </motion.div>

                {/* Gadget Canvas (Iframe) */}
                <div className="w-full h-full bg-black relative">
                    <iframe
                        src={sourceUrl}
                        className="absolute inset-0 w-full h-full border-0"
                        title={title}
                        aria-label={description}
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
                    />

                    {/* Loading Overlay Hint */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="pointer-events-none absolute bottom-6 right-6 px-4 py-2 rounded-lg glass border-border-subtle text-[10px] font-black text-dim uppercase tracking-widest animate-pulse"
                    >
                        Initializing Native Logic...
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
