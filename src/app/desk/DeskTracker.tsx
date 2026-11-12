"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Nav from "@/components/Nav";

import { DESK_DATA_URL } from "./constants";

type Closed = {
  symbol: string;
  opened: string;
  closed: string;
  score: number;
  sizeUsd: number;
  pnlUsd: number;
  pnlPct: number;
  exit: string;
  peakPct: number | null;
};
type Open = { symbol: string; opened: string; score: number; sizeUsd: number; peakPct: number | null };
type Past = { version: string; date: string; endBalance: number; pnlPct: number; record: string; note: string };

export type DeskData = {
  updatedAt: string;
  mode: string;
  version: string;
  startedAt: string | null;
  lastTickAt: string | null;
  startBalance: number;
  equity: number;
  cash: number;
  pnlPct: number;
  maxDrawdownPct: number;
  wins: number;
  losses: number;
  open: Open[];
  closed: Closed[];
  series: [string, number][];
  funnel: { checked: number; passed: number; traded: number };
  rules: { stopPct: number; trailAfterPct: number; trailGivebackPct: number; maxPositionPct: number; minScore: number };
  history: Past[];
};

const AGENTS = [
  ["scout", "Pulls new Solana pairs under 24h old from Pump.fun, PumpSwap and Raydium."],
  ["filter", "Kills anything with live mint or freeze authority, unlocked LP, top-10 holders over 20%, thin volume or liquidity, or a dev tied to past rugs."],
  ["analyst", "Scores what survives from 0 to 1. Under 0.6, no trade."],
  ["executor", "Buys up to 8% of the balance, 1% fee each side, one shot per token."],
  ["risk", "Hard stop at -6%. Trailing stop only after +12%, 6% under the peak."],
  ["logger", "Writes every decision and its reason to SQLite."],
] as const;

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const signed = (n: number, d = 1) => `${n > 0 ? "+" : ""}${n.toFixed(d)}%`;
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    timeZone: "America/Phoenix",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

function ago(iso: string | null, now: number) {
  if (!iso) return "never";
  const m = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60000));
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return h < 48 ? `${h}h ago` : `${Math.round(h / 24)}d ago`;
}

function EquityChart({ series, start }: { series: [string, number][]; start: number }) {
  // Draw in real pixels so axis labels stay 12px on phones instead of scaling down with the viewBox.
  const box = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(1000);
  const H = W < 560 ? 240 : 320;
  const P = { l: 60, r: 12, t: 16, b: W < 400 ? 48 : 32 };
  const pts = useMemo(() => series.map(([t, v]) => [new Date(t).getTime(), v] as const), [series]);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(1, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [pts.length]);
  if (pts.length < 2) return <p className="font-mono text-sm text-soft">Waiting for the first session.</p>;

  const t0 = pts[0][0];
  const t1 = pts[pts.length - 1][0];
  const vals = pts.map((p) => p[1]).concat(start);
  const pad = Math.max(5, (Math.max(...vals) - Math.min(...vals)) * 0.15);
  const lo = Math.min(...vals) - pad;
  const hi = Math.max(...vals) + pad;
  const x = (t: number) => P.l + ((t - t0) / Math.max(1, t1 - t0)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - (v - lo) / (hi - lo)) * (H - P.t - P.b);
  const d = pts.map(([t, v], i) => `${i ? "L" : "M"}${x(t).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const r = hi - lo;
  const ticks = [lo + r * 0.1, start, hi - r * 0.1].filter((v) => v === start || Math.abs(v - start) > r * 0.12);
  const last = pts[pts.length - 1];

  return (
    <div ref={box} className="w-full">
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block h-auto w-full text-ink" role="img" aria-label="Paper equity over time">
      {ticks.map((v) => (
        <g key={v}>
          <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke="currentColor" strokeOpacity={v === start ? 0.45 : 0.1} strokeDasharray={v === start ? "6 6" : undefined} strokeWidth={1} />
          <text x={P.l - 10} y={y(v) + 4} textAnchor="end" className="fill-current font-mono" fontSize={12} fillOpacity={0.6}>
            ${Math.round(v).toLocaleString("en-US")}
          </text>
        </g>
      ))}
      <text x={P.l} y={H - (W < 400 ? 26 : 8)} className="fill-current font-mono" fontSize={12} fillOpacity={0.6}>{fmtTime(series[0][0])}</text>
      <text x={W - P.r} y={H - 8} textAnchor="end" className="fill-current font-mono" fontSize={12} fillOpacity={0.6}>{fmtTime(series[series.length - 1][0])}</text>
      <path d={d} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(last[0])} cy={y(last[1])} r={5} className="fill-accent" />
    </svg>
    </div>
  );
}

export default function DeskTracker({ initial }: { initial: DeskData | null }) {
  const [data, setData] = useState<DeskData | null>(initial);
  // Hydrate against the same snapshot clock; the first pull advances to live time.
  const [now, setNow] = useState(initial ? new Date(initial.updatedAt).getTime() : 0);

  useEffect(() => {
    let alive = true;
    const pull = async () => {
      try {
        const res = await fetch(`${DESK_DATA_URL}?t=${Math.floor(Date.now() / 60000)}`, { cache: "no-store" });
        if (res.ok && alive) setData(await res.json());
      } catch {
        /* keep the last good snapshot */
      }
      if (alive) setNow(Date.now());
    };
    pull();
    const id = setInterval(pull, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const running = !!data?.lastTickAt && now - new Date(data.lastTickAt).getTime() < 30 * 60_000;
  const trades = data ? data.wins + data.losses : 0;

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
        <section className="border-t border-line pt-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="kicker kicker-accent">memecoin desk</p>
            <span className={`status-tag ${running ? "status-live" : ""}`}>{running ? "● running" : "○ idle"}</span>
            <span className="status-tag">paper money only</span>
          </div>

          <h1 className="display mt-6 max-w-4xl text-5xl sm:text-6xl">
            Six AI agents trading Solana memecoins.{" "}
            <span className="font-serif italic normal-case">With fake money.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-soft">
            My agent built a desk that finds brand new tokens, screens out rugs, scores what&apos;s left and trades
            it with hard stops. It runs on a $1,000 paper balance. No wallet, no real money. This page updates as it
            trades.
          </p>

          {!data ? (
            <p className="mt-12 font-mono text-sm text-soft">Couldn&apos;t load the desk right now. Try again in a minute.</p>
          ) : (
            <>
              <div className="mt-12">
                <div className="border-grid-overlap grid grid-cols-2 sm:grid-cols-4">
                  {[
                    { n: usd(data.equity), l: `balance, from ${usd(data.startBalance)}` },
                    { n: signed(data.pnlPct, 2), l: "return" },
                    { n: `${data.wins}W / ${data.losses}L`, l: `${trades} closed trades` },
                    { n: signed(data.maxDrawdownPct, 2), l: "max drawdown" },
                  ].map((s) => (
                    <div key={s.l} className="card-outline border-line px-5 py-7 text-center">
                      <div className="display text-3xl sm:text-4xl">{s.n}</div>
                      <div className="kicker kicker-faint mt-2">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 font-mono text-xs text-faint">
                {data.version} · started {data.startedAt ? fmtTime(data.startedAt) : "n/a"} · last tick{" "}
                {ago(data.lastTickAt, now)} · times in Phoenix
              </p>

              <div className="mt-12 card-outline border-line p-4 sm:p-6">
                <p className="kicker kicker-faint mb-4">equity</p>
                <EquityChart series={data.series} start={data.startBalance} />
              </div>

              <h2 className="display mt-20 text-3xl sm:text-4xl">Open positions</h2>
              {data.open.length === 0 ? (
                <p className="mt-6 font-mono text-sm text-soft">Flat. Nothing open right now.</p>
              ) : (
                <div className="mt-6 border-t border-line">
                  {data.open.map((p) => (
                    <div key={p.symbol + p.opened} className="grid grid-cols-2 gap-2 border-b border-line py-4 font-mono text-sm sm:grid-cols-4">
                      <span className="text-ink">{p.symbol}</span>
                      <span className="text-soft">{usd(p.sizeUsd)} in</span>
                      <span className="text-soft">score {p.score.toFixed(2)}</span>
                      <span className="text-soft">opened {fmtTime(p.opened)}</span>
                    </div>
                  ))}
                </div>
              )}

              <h2 className="display mt-20 text-3xl sm:text-4xl">Every closed trade</h2>
              {data.closed.length === 0 ? (
                <p className="mt-6 font-mono text-sm text-soft">No closed trades yet this run.</p>
              ) : (
                <div className="mt-6 overflow-hidden rounded-[var(--modern-radius-card)] card border-line bg-surface">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-line text-left text-xs text-faint">
                        <th className="px-4 py-3 font-normal">token</th>
                        <th className="hidden px-4 py-3 font-normal sm:table-cell">score</th>
                        <th className="px-4 py-3 text-right font-normal">p&amp;l</th>
                        <th className="px-4 py-3 text-right font-normal">%</th>
                        <th className="hidden px-4 py-3 font-normal sm:table-cell">exit</th>
                        <th className="hidden px-4 py-3 font-normal sm:table-cell">closed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.closed.map((t) => (
                        <tr key={t.symbol + t.closed} className="border-b border-line last:border-b-0">
                          <td className="px-4 py-3 text-ink">
                            {t.symbol}
                            <span className="mt-0.5 block text-xs text-soft sm:hidden">
                              Score {t.score.toFixed(2)} · {t.exit}
                              {t.exit === "trail" && t.peakPct !== null ? `, peak ${signed(t.peakPct)}` : ""} · {fmtTime(t.closed)}
                            </span>
                          </td>
                          <td className="hidden px-4 py-3 text-soft sm:table-cell">{t.score.toFixed(2)}</td>
                          <td className={`px-4 py-3 text-right ${t.pnlUsd < 0 ? "text-accent" : "text-ink"}`}>
                            {t.pnlUsd > 0 ? "+" : ""}
                            {usd(t.pnlUsd)}
                          </td>
                          <td className={`px-4 py-3 text-right ${t.pnlUsd < 0 ? "text-accent" : "text-ink"}`}>{signed(t.pnlPct)}</td>
                          <td className="hidden px-4 py-3 text-soft sm:table-cell">
                            {t.exit}
                            {t.exit === "trail" && t.peakPct !== null ? `, peak ${signed(t.peakPct)}` : ""}
                          </td>
                          <td className="hidden px-4 py-3 text-soft sm:table-cell">{fmtTime(t.closed)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <h2 className="display mt-20 text-3xl sm:text-4xl">The funnel</h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-soft">
                Almost everything new on Solana gets killed before it&apos;s ever scored. That&apos;s the point.
              </p>
              <div className="mt-8 max-w-xl border-t border-line">
                {[
                  ["checked", data.funnel.checked],
                  ["survived the filter", data.funnel.passed],
                  ["traded", data.funnel.traded],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between border-b border-line py-4">
                    <span className="kicker kicker-faint">{k}</span>
                    <span className="display text-2xl">{Number(v).toLocaleString("en-US")}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <h2 className="display mt-20 text-3xl sm:text-4xl">The six agents</h2>
          <div className="mt-6 border-t border-line">
            {AGENTS.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="kicker kicker-accent sm:w-28 sm:shrink-0">{k}</span>
                <span className="text-base text-soft">{v}</span>
              </div>
            ))}
          </div>

          {data && (
            <>
              <h2 className="display mt-20 text-3xl sm:text-4xl">Earlier runs</h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-soft">
                Each version changed one thing. Memecoins gap right through stop losses, so a -6% stop kept filling at
                -8% to -21%.
              </p>
              <div className="mt-8 border-t border-line">
                {data.history.map((h) => (
                  <div key={h.version} className="grid grid-cols-2 gap-2 border-b border-line py-4 font-mono text-sm sm:grid-cols-5">
                    <span className="text-ink">{h.version}</span>
                    <span className="text-soft">{h.date}</span>
                    <span className={h.pnlPct < 0 ? "text-accent" : "text-ink"}>{signed(h.pnlPct)}</span>
                    <span className="text-soft">{h.record}</span>
                    <span className="text-soft">{h.note}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="mt-20 max-w-2xl font-mono text-xs leading-relaxed text-faint">
            Paper trading only. Not financial advice. A handful of trades proves nothing, and past results don&apos;t
            predict anything. Fills are simulated with fees, so real trades would likely do worse.
          </p>
        </section>
      </main>
    </>
  );
}
