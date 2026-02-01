import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ROICalculator } from "@/components/tools/ROICalculator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Automation ROI Calculator",
  description:
    "Calculate time savings, break-even point, and ROI for your automation projects.",
};

export default function ROICalculatorPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Back Link */}
        <div className="container pt-32 pb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-dim hover:text-primary transition-colors text-xs font-black uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to System
          </Link>
        </div>

        {/* Hero */}
        <section className="container mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-main mb-8 animate-slide-up tracking-tighter">Automation ROI Calculator</h1>
            <p className="text-xl md:text-2xl text-dim leading-relaxed mb-12 animate-slide-up [animation-delay:100ms]">
              Before you build an automation, know the payoff. Adjust hours
              saved, your rate, setup costs, and maintenance. See break-even
              point and first-year ROI instantly.
            </p>
          </div>
        </section>

        {/* Tool */}
        <section className="container py-24 pb-40 border-t border-border-subtle">
          <ROICalculator />
        </section>

        {/* How to Use */}
        <section className="container py-40 bg-surface/30 border-t border-border-subtle">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-display text-4xl font-black mb-16 tracking-tight text-main text-center">
              How to Use This
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg mb-2">
                  1. Estimate time savings
                </h4>
                <p className="text-dim text-lg leading-relaxed">
                  How many hours per week would this automation save? Be
                  conservative—most people overestimate.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg mb-2">
                  2. Calculate your real hourly rate
                </h4>
                <p className="text-dim text-lg leading-relaxed">
                  Use your salary plus benefits divided by 2000 hours/year. For
                  business owners, use billable rate or draw.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg mb-2">
                  3. Factor in setup time
                </h4>
                <p className="text-dim text-lg leading-relaxed">
                  How much will you or a contractor spend building this? Include
                  research, setup, and testing.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg mb-2">
                  4. Check the break-even
                </h4>
                <p className="text-dim text-lg leading-relaxed">
                  If break-even is more than 3 months away, the ROI probably
                  isn't worth the risk.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
