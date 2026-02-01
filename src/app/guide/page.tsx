import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, ChevronRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Track where your time goes",
    description:
      "Spend a week logging everything you do. Every task, email, meeting, admin work—everything. You need real data. Use a simple spreadsheet or time-tracking app. At the end of the week, you'll see patterns. Most people are shocked.",
    details: [
      "Log tasks with time spent",
      "Group by category (client work, admin, emails, etc)",
      "Calculate hours per week per task",
      "Look for the 80/20—what 20% of tasks take 80% of time?",
    ],
  },
  {
    number: "02",
    title: "Pick ONE task to automate first",
    description:
      "Don't try to automate everything. Pick the biggest time-waster that's also repetitive. Something that happens at least 2-3 times per week. That's your automation target.",
    details: [
      "Choose repetitive tasks (happens regularly)",
      "Focus on high-volume (daily/weekly)",
      "Avoid one-off projects",
      "Prioritize tasks that are boring but important",
    ],
  },
  {
    number: "03",
    title: "Choose your automation stack",
    description:
      "You don't need to code. There are no-code tools for almost everything: Zapier, Make, Airtable, Google Forms, Webhooks. Pick tools that are cheap, simple, and don't require technical skills. If you can drag-and-drop, you can automate.",
    details: [
      "Zapier (connect apps, simple workflows)",
      "Make (more powerful, visual workflows)",
      "Google Forms + Sheets (data collection)",
      "Airtable (databases with automation)",
      "Custom scripts (if you know how to code)",
    ],
  },
  {
    number: "04",
    title: "Build your first automation",
    description:
      "Start small. Don't build the perfect system. Build the working system. It doesn't need to be elegant. It needs to work. Test it, refine it, scale it. Most automations are 80% effective out of the box. The last 20% takes 80% of the effort.",
    details: [
      "Build the MVP (minimum viable automation)",
      "Test with real data",
      "Fix errors as you find them",
      "Don't over-engineer",
      "Document how it works",
    ],
  },
  {
    number: "05",
    title: "Measure and iterate",
    description:
      "After 2 weeks, check the results. Is it actually saving time? Is it reliable? Did you miss anything? Adjust accordingly. Then automate the next task. Each automation gets easier because you learn the process.",
    details: [
      "Track actual time saved vs estimated",
      "Note any failures or manual workarounds",
      "Identify edge cases",
      "Make small improvements",
      "Move to the next task",
    ],
  },
];

export const metadata = {
  title: "Automation Guide - JadenRaats.com",
  description:
    "A practical, no-nonsense guide to automating your service business. 5 steps from tracking to implementing.",
};

export default function GuidePage() {
  return (
    <div className="grain min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        {/* Back Link */}
        <div className="container py-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-neutral-500 hover:text-primary transition-colors text-xs font-black uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            System Home
          </Link>
        </div>

        {/* Hero */}
        <section className="container mb-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-10 animate-fade-in">
              <Sparkles size={12} />
              <span>Operational Framework v2.0</span>
            </div>

            <h1 className="text-main mb-10 animate-slide-up tracking-tighter shadow-none">
              Mastering the <span className="text-secondary text-glow-cyan">Automation Loop.</span>
            </h1>

            <p className="text-xl md:text-2xl text-dim leading-relaxed mb-16 max-w-3xl mx-auto">
              This is the blueprint I used to save 15+ hours per week. No hype, no expensive enterprise software. Just a practical 5-step loop for service business owners.
            </p>

            <div className="glass-card border-border-subtle inline-flex items-center gap-10 py-6 px-12">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-dim uppercase tracking-widest mb-1">Protocol Type</span>
                <span className="text-sm font-bold text-main">Execution Guide</span>
              </div>
              <div className="w-px h-10 bg-border-subtle" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-dim uppercase tracking-widest mb-1">Read Time</span>
                <span className="text-sm font-bold text-main">08:00 Minutes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="container relative py-32 border-t border-border-subtle">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-border-subtle via-transparent to-transparent -z-10" />

          <div className="space-y-48">
            {steps.map((step, idx) => (
              <div key={idx} className="relative grid md:grid-cols-[1fr_2fr] gap-16 items-start">
                <div className="sticky top-40 flex flex-col md:items-end md:text-right">
                  <span className="font-display text-8xl font-black text-main opacity-[0.03] dark:opacity-[0.05] mb-6">
                    {step.number}
                  </span>
                  <h2 className="text-3xl font-display font-black text-main mb-6 tracking-tight">
                    {step.title}
                  </h2>
                </div>

                <div className="space-y-12">
                  <p className="text-xl text-dim leading-relaxed max-w-3xl">
                    {step.description}
                  </p>

                  <div className="glass-card border-border-subtle p-10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    <ul className="space-y-6">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex gap-4">
                          <Check
                            className="text-primary flex-shrink-0 mt-1"
                            size={20}
                          />
                          <span className="text-main font-semibold text-lg">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdicts */}
        <section className="container py-48 border-t border-border-subtle">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-24 font-display font-black tracking-tighter text-5xl">System <span className="text-primary">Verdicts.</span></h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card border-primary/20 p-12">
                <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-10">Deploy Checklist</h3>
                <ul className="space-y-6">
                  {[
                    "Repetitive weekly/daily tasks",
                    "Data entry & form routing",
                    "Lead triage & notifications",
                    "Standard report generation",
                    "File processing loops",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-main">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-glow-orange" />
                      <span className="font-bold text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card border-border-subtle p-12 grayscale hover:grayscale-0 transition-all duration-500 bg-surface/30">
                <h3 className="text-dim text-[10px] font-black uppercase tracking-[0.2em] mb-10">Human Override</h3>
                <ul className="space-y-6">
                  {[
                    "One-time bespoke projects",
                    "Creative client-facing strategy",
                    "Complex ethical judgment",
                    "Relationship architecture",
                    "High-stakes crisis management",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-dim">
                      <div className="w-2 h-2 rounded-full bg-border-active" />
                      <span className="font-semibold italic text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="container py-48">
          <div className="glass-card p-24 text-center relative overflow-hidden group border-border-subtle">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-primary/5 blur-[120px] -z-10" />
            <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter text-main">Ready to <span className="text-primary">Initialize?</span></h2>
            <p className="text-2xl text-dim mb-16 max-w-2xl mx-auto leading-relaxed">
              The tools are ready. The system is documented. Now it's your turn to execute.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <Link href="/#tools" className="btn-cyber-primary group !px-12 !py-5 text-lg">
                Deploy The Stack
                <ChevronRight size={24} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="https://github.com/raatsja74" className="btn-cyber-secondary !px-12 !py-5 text-lg">
                Review Node Code
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
