import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GadgetWrapper } from "@/components/GadgetWrapper";
import Link from "next/link";
import { ArrowLeft, Beaker } from "lucide-react";

export const metadata = {
    title: "Competitor Analysis Wizard | Jaden Raats Lab",
    description: "High-performance AI gadget for rapid competitor auditing and strategic positioning.",
};

export default function CompetitorAnalysisPage() {
    return (
        <div className="grain min-h-screen">
            <Header />

            <main className="flex-1">
                {/* Navigation / Metadata */}
                <div className="container pt-32 pb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-dim hover:text-primary transition-colors text-xs font-black uppercase tracking-widest"
                    >
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                        Return to Core
                    </Link>

                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-dim">
                        <Beaker size={14} className="text-secondary" />
                        <span>Experimental Module 01-A</span>
                    </div>
                </div>

                {/* Hero Area */}
                <section className="container mb-16">
                    <div className="max-w-4xl">
                        <h1 className="text-main mb-6 tracking-tighter">Competitor Analysis <span className="text-secondary text-glow-cyan">Wizard.</span></h1>
                        <p className="text-xl text-dim leading-relaxed max-w-2xl">
                            Extract strategic insights at machine speed. This gadget automates the auditing of competitive landscapes, highlighting weaknesses and opportunities for local service businesses.
                        </p>
                    </div>
                </section>

                {/* Gadget Integration */}
                <section className="container pb-32">
                    <GadgetWrapper
                        title="Competitor Analysis Wizard"
                        description="Deep competitive audit using Gemini's latest reasoning models."
                        sourceUrl="https://aistudio.google.com/apps/drive/1uC1WW4BuS1Si9VmPRL84hWNPaJFrHExg?showAssistant=true&showCode=true"
                        protocolType="Strategic Auditing"
                    />

                    {/* Usage Protocol */}
                    <div className="max-w-3xl glass-card border-border-subtle p-10 bg-surface/30">
                        <h3 className="text-sm font-black text-main uppercase tracking-widest mb-6">Interaction Protocol</h3>
                        <div className="grid sm:grid-cols-2 gap-8 text-sm text-dim leading-relaxed">
                            <div className="space-y-4">
                                <p>
                                    <strong className="text-main">01 Load Landscape:</strong> Input competitor URLs or business profiles into the wizard interface.
                                </p>
                                <p>
                                    <strong className="text-main">02 Run Analysis:</strong> Initialize the strategic scan to identify pricing tiers and service gaps.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p>
                                    <strong className="text-main">03 Export Intel:</strong> Copy the strategic readout to your project dashboard or CRM.
                                </p>
                                <p>
                                    <strong className="text-main text-secondary-500 italic">Notice:</strong> This gadget runs in a secure sandbox. No data is stored on this domain.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
