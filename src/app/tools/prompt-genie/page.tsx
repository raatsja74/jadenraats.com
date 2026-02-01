import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GadgetWrapper } from "@/components/GadgetWrapper";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata = {
    title: "AI Prompt Genie | Jaden Raats Lab",
    description: "Advanced prompt engineering utility for high-precision model steering and task automation.",
};

export default function PromptGeniePage() {
    return (
        <div className="grain min-h-screen font-mono">
            <Header />

            <main className="flex-1">
                {/* Navigation / Metadata */}
                <div className="container pt-32 pb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <Link
                        href="/lab"
                        className="group inline-flex items-center gap-2 text-dim hover:text-primary transition-colors text-xs font-black uppercase tracking-widest"
                    >
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                        Return to Lab
                    </Link>

                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-dim">
                        <Sparkles size={14} className="text-primary" />
                        <span>Experimental Module 02-B</span>
                    </div>
                </div>

                {/* Hero Area */}
                <section className="container mb-16">
                    <div className="max-w-4xl">
                        <h1 className="text-main mb-6 tracking-tighter font-display">AI Prompt <span className="text-primary text-glow-orange">Genie_</span></h1>
                        <p className="text-xl text-dim leading-relaxed max-w-2xl font-sans">
                            High-fidelity prompt engineering workbench. Bridge the gap between vague intent and machine-perfect execution with zero-latency refinement.
                        </p>
                    </div>
                </section>

                {/* Gadget Integration */}
                <section className="container pb-32">
                    <GadgetWrapper
                        title="AI Prompt Genie"
                        description="Honing prompt logic through recursive evaluation and pattern matching."
                        sourceUrl="https://aistudio.google.com/apps/drive/1A_w-9Q_b9_X_8uG7iQ3Y9s9vF-w8h8h?showAssistant=true&showCode=true"
                        protocolType="Prompt Engineering"
                    />

                    {/* Usage Protocol */}
                    <div className="max-w-3xl glass-card border-primary/20 p-10 bg-primary/5">
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">Interaction Protocol // 02-B</h3>
                        <div className="grid sm:grid-cols-2 gap-8 text-[11px] text-dim leading-relaxed font-mono">
                            <div className="space-y-4">
                                <p>
                                    <strong className="text-main">01 DEFINE SCOPE:</strong> Provide the base objective and constraints in the primary input field.
                                </p>
                                <p>
                                    <strong className="text-main">02 EXECUTE GENIE:</strong> Run the generator to produce a structured prompt template.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p>
                                    <strong className="text-main">03 ITERATE LINGUA:</strong> Refine the output through recursive feedback loops.
                                </p>
                                <p>
                                    <span className="text-primary italic">// STATUS: SANDBOX ACTIVE</span>
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
