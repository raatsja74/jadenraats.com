import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WebsiteHealthChecker } from "@/components/tools/WebsiteHealthChecker";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Website Health Checker - Free Site Audit",
  description:
    "Scan any website for common issues: SSL, mobile responsiveness, performance, contact info, and CTAs.",
};

export default function WebsiteHealthPage() {
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
            <h1 className="text-main mb-8 animate-slide-up tracking-tighter">Website Health Checker</h1>
            <p className="text-xl md:text-2xl text-dim leading-relaxed mb-12 animate-slide-up [animation-delay:100ms]">
              Scan any URL and get a quick assessment of critical issues that
              hurt conversions: SSL configuration, mobile responsiveness, page
              speed, contact information, clear CTAs, and SEO metadata.
            </p>
          </div>
        </section>

        {/* Tool */}
        <section className="container py-24 pb-40 border-t border-border-subtle">
          <WebsiteHealthChecker />
        </section>

        {/* Help Section */}
        <section className="container py-40 bg-surface/30 border-t border-border-subtle">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-display text-4xl font-black mb-16 tracking-tight text-main text-center">
              What's being checked?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg">SSL Certificate</h4>
                <p className="text-dim text-lg leading-relaxed">
                  HTTPS is now required by browsers. Any site without SSL will
                  show warnings to visitors.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg">Mobile Responsive</h4>
                <p className="text-dim text-lg leading-relaxed">
                  Over 60% of traffic is mobile. Your site must display properly
                  on phones and tablets.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg">Page Speed</h4>
                <p className="text-dim text-lg leading-relaxed">
                  Every 1 second delay reduces conversions by 7%. Slow sites
                  lose customers.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg">Contact Information</h4>
                <p className="text-dim text-lg leading-relaxed">
                  Visitors won't buy if they can't easily find how to reach you.
                  Phone, email, or form required.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg">Clear CTA</h4>
                <p className="text-dim text-lg leading-relaxed">
                  Visitors need to know what to do next. Use action-oriented
                  buttons and text.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-main text-lg">Meta Tags</h4>
                <p className="text-dim text-lg leading-relaxed">
                  Proper meta tags help with SEO, social sharing, and search
                  rankings.
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
