"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";
import "./command-center.css";

const DASHBOARD = "https://jadens-macbook-pro.tail6a4c43.ts.net:8443";
const PANELS = [
  ["Task board", "/kanban", "Assign work, follow runs, and review outputs."],
  ["Agents", "/profiles", "Manage profiles and their configuration."],
  ["Sessions", "/sessions", "Return to conversations and completed work."],
  ["Schedules", "/cron", "Review and manage recurring jobs."],
] as const;

export default function CommandCenter() {
  const [embedded, setEmbedded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [waiting, setWaiting] = useState(true);
  const [guidance, setGuidance] = useState(false);
  const embedButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    if (!embedded && restoreFocus.current) {
      restoreFocus.current = false;
      embedButton.current?.focus();
    }
  }, [embedded]);

  useEffect(() => {
    if (!embedded) return;
    const timer = setTimeout(() => setGuidance(true), 15000);
    return () => clearTimeout(timer);
  }, [embedded, attempt]);

  function refresh() {
    setWaiting(true);
    setGuidance(false);
    setAttempt((value) => value + 1);
  }

  function close() {
    restoreFocus.current = true;
    setEmbedded(false);
  }

  return (
    <>
      <a href="#command-center" className="cc-skip">Skip to command center</a>
      <header className="cc-header">
        <Link href="/" aria-label="Jaden Raats — home" className="display">jaden<span>*</span></Link>
        <ThemeToggle />
      </header>
      <main id="command-center" className="cc-main" tabIndex={-1}>
        <p className="cc-eyebrow">Private workspace / Agent Command Center</p>
        <h1 className="display">One place to <br />put agents to work.</h1>
        <p className="cc-intro">Assign tasks, follow runs, review questions, and manage schedules in your private Hermes workspace.</p>
        <div className="cc-actions">
          <a className="cc-primary" href={`${DASHBOARD}/kanban`} target="_blank" rel="noopener noreferrer">Open private dashboard <span aria-hidden="true">↗</span><span className="sr-only"> (new tab)</span></a>
          <button ref={embedButton} className="cc-secondary" type="button" aria-expanded={embedded} aria-controls="dashboard-frame" disabled={embedded} onClick={() => { refresh(); setEmbedded(true); }}>Show dashboard here</button>
        </div>
        <p className="cc-access">Connect this device to Tailscale, then sign in with your Hermes dashboard account. Your tasks and conversations stay private.</p>
        <section className="cc-panels" aria-label="Workspace shortcuts">
          {PANELS.map(([label, path, description], index) => (
            <a key={path} href={`${DASHBOARD}${path}`} target="_blank" rel="noopener noreferrer" className="cc-panel">
              <span className="cc-number">0{index + 1}</span>
              <h2 className="display">{label} <span aria-hidden="true">↗</span></h2>
              <p>{description}</p>
              <span className="sr-only">Opens in a new tab</span>
            </a>
          ))}
        </section>
        {embedded && (
          <section id="dashboard-frame" className="cc-workspace" aria-label="Embedded private dashboard" onKeyDown={(event) => { if (event.key === "Escape") close(); }}>
            <div className="cc-frame-tools">
              <h2 className="display">Private dashboard</h2>
              <div className="cc-actions">
                <button className="cc-secondary" type="button" onClick={refresh}>Reload</button>
                <button className="cc-secondary" type="button" onClick={close}>Close</button>
              </div>
            </div>
            <p role="status" className="cc-frame-status">{waiting ? "Opening the private dashboard…" : "Sign in in the panel below. If the panel is blank or login does not stay signed in, open the dashboard in a new tab."}</p>
            {guidance && <p className="cc-frame-status">Can’t connect? Check that Tailscale is connected and the MacBook Pro is online. Your browser may require the <a href={`${DASHBOARD}/kanban`} target="_blank" rel="noopener noreferrer">full dashboard in a new tab</a>.</p>}
            <iframe key={attempt} title="Private Hermes Agent Command Center" src={`${DASHBOARD}/kanban`} onLoad={() => setWaiting(false)} referrerPolicy="no-referrer" />
          </section>
        )}
        <footer className="cc-footer"><Link href="/">← Back to jadenraats.com</Link><span>Private controls. Existing workspace.</span></footer>
      </main>
    </>
  );
}
