"use client";

// Created by Hark | 2026-11-12. Updated by Hark | 2026-11-15
// Homepage journey: meet JD, try something small, see it work, go deeper, keep exploring.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PROMPT =
  "Help me turn this note into one useful next step. Briefly separate facts, tasks, and open questions. Keep my meaning and do not invent dates, commitments, or missing details. Pick one action I can finish in ten minutes or less. If you need information to choose it, ask me one question. Keep the answer short. Here is my note: [paste your note]";

function useSeen<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function GuideLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="jx-how">
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}

function TrySmall() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };
  return (
    <section className="jx-step jx-try" aria-labelledby="jx-try-title">
      <div className="jx-text">
        <h2 id="jx-try-title">
          Sort a <em>messy note</em>
        </h2>
        <p>
          This prompt asks AI to pull out what you know, what you need to check, and one thing you can do in ten minutes.
        </p>
        <div className="jx-actions">
          <button type="button" className="jx-btn" aria-expanded={open} aria-controls="jx-answer" onClick={() => setOpen((o) => !o)}>
            {open ? "Hide example" : "Sort this note"}
          </button>
          <button type="button" className="jx-link" onClick={copy}>
            {copied ? "Prompt copied" : "Copy the prompt"}
          </button>
        </div>
        <span className="jx-sr" aria-live="polite">
          {copied ? "Prompt copied to clipboard" : ""}
        </span>
        <GuideLink href="/guides/turn-a-messy-note-into-a-next-step">Read the starter guide</GuideLink>
      </div>

      <div className="jx-note-wrap">
        <div className="jx-note">
          <span className="jx-note-label">The note</span>
          <p className="jx-hand">Need to get the bike fixed. Not sure which shop. Keep forgetting to check when they open.</p>
        </div>
        <div id="jx-answer" className={`jx-fold ${open ? "is-open" : ""}`} hidden={!open}>
          <dl>
            <div>
              <dt>Fact</dt>
              <dd>The bike needs fixing.</dd>
            </div>
            <div>
              <dt>Open question</dt>
              <dd>Which bike shop should I call, and when does it open?</dd>
            </div>
            <div className="jx-next">
              <dt>Next step</dt>
              <dd>Find the opening hours for one nearby bike shop and save its number.</dd>
            </div>
          </dl>
          <p className="jx-check">Check the shop&apos;s hours on its website before you go.</p>
        </div>
      </div>
    </section>
  );
}

function RealLife() {
  return (
    <section className="jx-step jx-real" aria-labelledby="jx-real-title">
      <div className="jx-art">
        <Image src="/home/g-followup.webp" alt="Work gloves, a phone and a job sheet" width={800} height={600} sizes="(max-width: 768px) 85vw, 480px" />
      </div>
      <div className="jx-text">
        <h2 id="jx-real-title">
          Follow up with <em>new leads</em>
        </h2>
        <p className="jx-lede">
          I used to check four inboxes for new leads after dinner. Here&apos;s how I handle follow-up at Award Coatings now.
        </p>
        <ol className="jx-story">
          <li>
            Forms, missed calls, and messages go to one inbox.
          </li>
          <li>
            I use reply templates for new leads, missing details, and leads who haven&apos;t replied.
          </li>
          <li>
            AI drafts replies and reminds me when a lead goes quiet. I approve prices and scheduling before they go out.
          </li>
        </ol>
        <blockquote>Read each reply template before you let the system send it.</blockquote>
        <GuideLink href="/guides/follow-up-that-survives-monday">Read the follow-up guide</GuideLink>
      </div>
    </section>
  );
}

const SCRAPS = [
  { what: "a link", lane: "Inbox" },
  { what: "call the supplier", lane: "Tasks" },
  { what: "warranty PDF", lane: "Reference" },
  { what: "what did I decide?", lane: "Talk to me" },
];

function FrontDoor() {
  const { ref, seen } = useSeen<HTMLDivElement>();
  return (
    <section className="jx-step jx-door" aria-labelledby="jx-door-title">
      <div className="jx-text">
        <h2 id="jx-door-title">
          Save notes <em>to one app</em>
        </h2>
        <p>
          I used to save things in eight places and forget where I put them. Now I send everything through one app. The chat I choose decides whether I&apos;m saving a link, adding a task, filing a document, or asking a question.
        </p>
        <GuideLink href="/guides/one-front-door">Read the chat setup guide</GuideLink>
      </div>
      <div ref={ref} className={`jx-scraps ${seen ? "is-settled" : ""}`} aria-label="Four notes sorted into four chats">
        {SCRAPS.map((s, i) => (
          <div key={s.lane} className="jx-scrap" style={{ ["--i" as string]: i }}>
            <span className="jx-scrap-what">{s.what}</span>
            <span className="jx-scrap-lane">{s.lane}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function KeepExploring() {
  return (
    <section className="jx-step jx-more" aria-labelledby="jx-more-title">
      <h2 id="jx-more-title">
        More from <em>the site</em>
      </h2>
      <div className="jx-more-grid">
        <Link href="/guides" className="jx-more-row">
          <span className="jx-more-name">All guides →</span>
          <span className="jx-more-line">Try AI on a note or a task at work</span>
        </Link>
        <Link href="/systems" className="jx-more-row">
          <span className="jx-more-name">Systems →</span>
          <span className="jx-more-line">How I run leads, quotes and follow-up</span>
        </Link>
        <Link href="/prompt-lab" className="jx-more-row">
          <span className="jx-more-name">Lab →</span>
          <span className="jx-more-line">Small tools and experiments</span>
        </Link>
        <Link href="/photos" className="jx-more-row">
          <span className="jx-more-name">Photos →</span>
          <span className="jx-more-line">My photo gallery</span>
        </Link>
      </div>
    </section>
  );
}

export default function Journey() {
  return (
    <div className="jx">
      <section className="jx-intro" aria-label="About JD">
        <p>
          I run Award Coatings, a floor coating company in Phoenix. I split my time between Phoenix and Bigfork, Montana.
        </p>
      </section>
      <TrySmall />
      <RealLife />
      <FrontDoor />
      <KeepExploring />
    </div>
  );
}
