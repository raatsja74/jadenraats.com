"use client";

import { PageShell, SiteFooter } from "@/components/chrome";
import { AboutHero } from "@/components/about/Hero";
import { Background } from "@/components/about/Background";
import { Elsewhere } from "@/components/about/Elsewhere";
import { Numbers } from "@/components/about/Numbers";
import { Systems } from "@/components/about/Systems";

export default function AboutContent() {
  return (
    <PageShell footer={<SiteFooter />}>
      <AboutHero />
      <Systems />
      <Numbers />
      <Background />
      <Elsewhere />
    </PageShell>
  );
}
