"use client";

import { PageHeader, PageShell } from "@/components/chrome";
import { Library } from "@/components/lab/Library";

export default function PromptLab() {
  return (
    <PageShell mainClassName="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
      <PageHeader
        kicker="the lab"
        title="Skills &amp; prompt library"
        lede="A public database of the AI skills, prompts, workflows, and agent instructions that run a real business. Copy any prompt, or hit USE SKILL and I'll set it up with you."
      />
      <Library />
    </PageShell>
  );
}
