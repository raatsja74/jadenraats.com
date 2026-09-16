"use client";

import { FooterTypewriter, PageShell, SiteFooter } from "@/components/chrome";
import { AboutSection } from "@/components/home/AboutSection";
import { CaseStudy } from "@/components/home/CaseStudy";
import { ContactSection } from "@/components/home/ContactSection";
import { GuidesSection } from "@/components/home/GuidesSection";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FOOTER_TYPEWRITER } from "@/data/site";

export default function HomePage() {
  return (
    <PageShell footer={<SiteFooter className="pb-8" right={<FooterTypewriter text={FOOTER_TYPEWRITER} />} />}>
      <Hero />
      <Marquee />
      <AboutSection />
      <GuidesSection />
      <CaseStudy />
      <ContactSection />
    </PageShell>
  );
}
