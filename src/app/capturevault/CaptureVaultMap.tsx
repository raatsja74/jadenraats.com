"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Nav from "@/components/Nav";
import { MODULES, moduleById, STAGE_COLUMNS } from "./modules";
import {
  EASE,
  FLOW_STAGES,
  HubNode,
  ModuleCard,
  ModuleDrawer,
  stageMatches,
  type FlowStage,
} from "./ModuleChrome";

const NAV_SCROLL_PAD = "4.5rem";

export default function CaptureVaultMap() {
  const baseId = useId();
  const drawerId = `${baseId}-drawer`;
  const [stage, setStage] = useState<FlowStage | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const closePanel = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollPaddingTop;
    html.style.scrollPaddingTop = NAV_SCROLL_PAD;
    return () => {
      html.style.scrollPaddingTop = prev;
    };
  }, []);

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

  useEffect(() => {
    if (!openId) return;
    document.getElementById(drawerId)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [openId, drawerId]);

  const toggleModule = useCallback(
    (id: string) => {
      const mod = moduleById(id);
      if (stage && mod && !stageMatches(mod, stage)) return;
      setOpenId((prev) => (prev === id ? null : id));
    },
    [stage],
  );

  const toggleStage = useCallback((s: FlowStage) => {
    setStage((prev) => (prev === s ? null : s));
    setOpenId(null);
  }, []);

  const clearStage = useCallback(() => {
    setStage(null);
    setOpenId(null);
  }, []);

  const openMod = openId ? moduleById(openId) ?? null : null;

  const columns = useMemo(
    () =>
      STAGE_COLUMNS.map((col) => ({
        ...col,
        mods: col.moduleIds
          .map((id) => moduleById(id))
          .filter((m): m is NonNullable<typeof m> => !!m),
      })),
    [],
  );

  function cardProps(mod: (typeof MODULES)[number]) {
    const match = stageMatches(mod, stage);
    const dimmed = !!stage && !match;
    return {
      mod,
      active: openId === mod.id || (!!stage && match),
      dimmed,
      expanded: openId === mod.id,
      onToggle: () => toggleModule(mod.id),
      panelId: drawerId,
      disabled: dimmed,
    };
  }

  const statusLine = stage
    ? openMod
      ? `Highlighting ${stage} · viewing ${openMod.num} ${openMod.title} · Escape closes panel`
      : `Highlighting modules in ${stage} · Escape clears filter`
    : openMod
      ? `Viewing ${openMod.num} ${openMod.title} · Escape closes panel`
      : "All modules visible · pick a stage to focus · Escape closes panel";

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main className="min-h-screen scroll-pt-20 bg-cream text-ink">
        <section className="mx-auto max-w-6xl px-6 pb-8 pt-32 sm:px-10 sm:pt-40">
          <div className="border-t-2 border-line pt-10">
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

            <motion.div
              className="sticky top-[3.25rem] z-40 -mx-6 mt-10 border-y-2 border-line bg-cream px-6 py-4 sm:-mx-10 sm:px-10"
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
                {statusLine}
              </p>
            </motion.div>
          </div>
        </section>

        <section
          className="mx-auto max-w-6xl px-6 pb-10 sm:px-10"
          aria-label="CaptureVault mind map"
        >
          <div className="grid gap-6 lg:hidden">
            <HubNode filtered={!!stage} onClear={clearStage} />
            {columns.map((col) => (
              <div key={col.id} className="space-y-3">
                <div className="flex items-baseline justify-between gap-3 border-b-2 border-line pb-2">
                  <p className="kicker kicker-accent">{col.label}</p>
                  <p className="font-mono text-[0.65rem] text-faint">{col.kicker}</p>
                </div>
                <div className="grid gap-3">
                  {col.mods.map((mod) => (
                    <ModuleCard key={mod.id} {...cardProps(mod)} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="kicker kicker-faint">flow</span>
              {STAGE_COLUMNS.map((col, i) => (
                <span key={col.id} className="flex items-center gap-3">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-soft">
                    {col.label}
                  </span>
                  {i < STAGE_COLUMNS.length - 1 && (
                    <span className="text-accent" aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {columns.map((col) => (
                <div key={col.id} className="flex flex-col gap-3">
                  <div className="border-2 border-ink bg-surface/50 px-3 py-2">
                    <p className="kicker kicker-accent">{col.label}</p>
                    <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-faint">
                      {col.kicker}
                    </p>
                  </div>
                  {col.mods.map((mod) => (
                    <ModuleCard key={mod.id} {...cardProps(mod)} />
                  ))}
                </div>
              ))}
            </div>

            <div className="relative mt-5">
              <div
                className="pointer-events-none mb-3 flex justify-center gap-8"
                aria-hidden="true"
              >
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-6 w-px bg-accent" style={{ opacity: 0.55 }} />
                ))}
              </div>
              <div className="mx-auto max-w-xl">
                <HubNode filtered={!!stage} onClear={clearStage} />
                <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] text-faint">
                  Click a module · Escape to close · Flow strip filters
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {openMod && (
                <ModuleDrawer
                  key={openMod.id}
                  mod={openMod}
                  panelId={drawerId}
                  onClose={closePanel}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="mt-10 grid gap-4 border-2 border-ink bg-cream p-5 sm:grid-cols-2 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink">
              Folder Note = where I resume
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink sm:text-right">
              Canonical home = authoritative truth
            </p>
          </div>
        </section>

        <section
          className="mx-auto max-w-6xl px-6 pb-16 sm:px-10 sm:pb-24"
          aria-label="Brand strip"
        >
          <aside className="grid grid-cols-2 gap-x-6 gap-y-1 border-2 border-ink p-4 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-soft sm:grid-cols-3 sm:p-6">
            <div className="space-y-1">
              <p>Systems</p>
              <p>Notes</p>
              <p>Knowledge</p>
              <p>Progress</p>
              <p className="text-ink">A calmer you</p>
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
              <p className="text-ink">A clearer mind.</p>
            </div>
          </aside>
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
