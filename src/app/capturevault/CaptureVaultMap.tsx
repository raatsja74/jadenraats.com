"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import Nav from "@/components/Nav";
import { MODULES } from "./modules";
import {
  EASE,
  FLOW_STAGES,
  HubNode,
  ModuleCard,
  stageMatches,
  type FlowStage,
} from "./ModuleChrome";

export default function CaptureVaultMap() {
  const baseId = useId();
  const [stage, setStage] = useState<FlowStage | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const closePanel = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (openId) {
          e.preventDefault();
          closePanel();
        } else if (stage) {
          setStage(null);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, stage, closePanel]);

  const toggleModule = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const toggleStage = useCallback((s: FlowStage) => {
    setStage((prev) => (prev === s ? null : s));
  }, []);

  const visible = useMemo(
    () => MODULES.map((m) => ({ mod: m, match: stageMatches(m, stage) })),
    [stage],
  );

  function cardProps(mod: (typeof MODULES)[number]) {
    return {
      mod,
      active: openId === mod.id || (!!stage && stageMatches(mod, stage)),
      dimmed: !!stage && !stageMatches(mod, stage),
      expanded: openId === mod.id,
      onToggle: () => toggleModule(mod.id),
      panelId: `${baseId}-${mod.id}`,
    };
  }

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main className="min-h-screen bg-cream text-ink">
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-32 sm:px-10 sm:pt-40">
          <div className="border-t-2 border-line pt-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <motion.p
                  className="kicker kicker-accent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                >
                  <span className="ast-host inline-flex items-center gap-1.5">
                    systems
                    <span className="ast">*</span>
                  </span>
                </motion.p>
                <motion.h1
                  className="display mt-6 text-5xl sm:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
                >
                  CaptureVault —{" "}
                  <span className="font-serif italic normal-case">Mind Map</span>
                </motion.h1>
                <motion.p
                  className="mt-6 max-w-xl text-sm leading-relaxed text-soft"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
                >
                  Interactive map of how capture becomes context, then agent
                  leverage, then real progress. Click a module for detail.
                  Filter by flow stage. Escape closes.
                </motion.p>
              </div>

              <aside
                className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-1 border-2 border-ink p-4 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-soft sm:grid-cols-3"
                aria-label="Brand strip"
              >
                <div className="space-y-1">
                  <p>Systems</p>
                  <p>Notes</p>
                  <p>Knowledge</p>
                  <p>Progress</p>
                  <p className="text-accent">A calmer you</p>
                </div>
                <div className="space-y-2">
                  <p className="display text-2xl text-ink">
                    jaden<span className="text-accent">*</span>
                  </p>
                  <p className="max-w-[12ch] leading-relaxed">
                    Build better. Think clearer.
                  </p>
                </div>
                <div className="col-span-2 space-y-1 sm:col-span-1">
                  <p>Same ideas.</p>
                  <p>Higher leverage.</p>
                  <p className="text-accent">A clearer mind.</p>
                </div>
              </aside>
            </div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
              role="toolbar"
              aria-label="Flow stage filters"
            >
              <p className="kicker kicker-faint mb-3">flow filter</p>
              <div className="flex flex-wrap items-center gap-2">
                {FLOW_STAGES.map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleStage(s)}
                      aria-pressed={stage === s}
                      className={`chip ${stage === s ? "chip-active" : "chip-idle"}`}
                    >
                      {s}
                    </button>
                    {i < FLOW_STAGES.length - 1 && (
                      <span className="hidden text-accent sm:inline" aria-hidden="true">
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <p className="kicker kicker-faint mt-3" aria-live="polite">
                {stage
                  ? `Highlighting modules in ${stage}`
                  : "All modules visible · pick a stage to focus"}
              </p>
            </motion.div>
          </div>
        </section>

        <section
          className="mx-auto max-w-6xl px-6 pb-16 sm:px-10 sm:pb-24"
          aria-label="CaptureVault mind map"
        >
          <div className="grid gap-4 lg:hidden">
            <HubNode filtered={!!stage} onClear={() => setStage(null)} />
            {visible.map(({ mod }) => (
              <ModuleCard key={mod.id} {...cardProps(mod)} />
            ))}
          </div>

          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:gap-y-5">
            <div className="col-span-3">
              <ModuleCard {...cardProps(MODULES[0])} />
            </div>
            <div className="col-span-3">
              <ModuleCard {...cardProps(MODULES[1])} />
            </div>
            <div className="col-span-3">
              <ModuleCard {...cardProps(MODULES[2])} />
            </div>
            <div className="col-span-3">
              <ModuleCard {...cardProps(MODULES[3])} />
            </div>

            <div className="col-span-3 flex flex-col justify-center">
              <ModuleCard {...cardProps(MODULES[9])} />
            </div>
            <div className="col-span-6 flex flex-col justify-center">
              <HubNode filtered={!!stage} onClear={() => setStage(null)} />
              <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] text-faint">
                Click a module · Escape to close · Flow strip filters
              </p>
            </div>
            <div className="col-span-3 flex flex-col justify-center">
              <ModuleCard {...cardProps(MODULES[4])} />
            </div>

            <div className="col-span-3">
              <ModuleCard {...cardProps(MODULES[5])} />
            </div>
            <div className="col-span-3">
              <ModuleCard {...cardProps(MODULES[6])} />
            </div>
            <div className="col-span-3">
              <ModuleCard {...cardProps(MODULES[7])} />
            </div>
            <div className="col-span-3">
              <ModuleCard {...cardProps(MODULES[8])} />
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-2 border-ink bg-accent p-5 sm:grid-cols-2 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink">
              Folder Note = where I resume
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink sm:text-right">
              Canonical home = authoritative truth
            </p>
          </div>
        </section>

        <footer className="border-t-2 border-line px-6 py-10 sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 font-mono text-xs uppercase tracking-[0.08em] text-faint sm:flex-row sm:items-center sm:justify-between">
            <p>
              jaden<span className="text-accent">*</span> | ideas → systems → a
              clearer tomorrow
            </p>
            <p>capture. process. context. progress. *</p>
            <p className="text-soft">better briefs. better results.</p>
          </div>
          <div className="mx-auto mt-6 flex max-w-6xl justify-between text-xs text-faint">
            <Link href="/guides" className="link-underline">
              ← Guides
            </Link>
            <Link href="/" className="link-underline">
              Home
            </Link>
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}
