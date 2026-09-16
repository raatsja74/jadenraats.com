"use client";

import { PageHeader, PageShell } from "@/components/chrome";
import { GuideCard } from "@/components/GuideCard";
import { GUIDES } from "@/data/guides";

export default function GuidesIndex() {
  return (
    <PageShell mainClassName="min-h-screen bg-cream text-ink">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-40">
        <PageHeader
          kicker="guides"
          title={
            <>
              Plain-English playbooks that{" "}
              <span className="font-serif italic normal-case">survived a real Monday</span>.
            </>
          }
          lede="AI systems for business owners — tested in Award Coatings first. If it can't survive ops, it doesn't get a page."
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-10 sm:pb-36">
        <div className="grid gap-4 md:grid-cols-2">
          {GUIDES.map((guide, index) => (
            <GuideCard key={guide.slug} guide={guide} index={index} variant="full" />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
