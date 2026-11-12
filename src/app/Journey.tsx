"use client";

// Created by Hark | 2026-11-12
// Homepage journey: meet JD, try something small, see it work, go deeper, keep exploring.
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

function ShowMeHow({ href }: { href: string }) {
  return (
    <Link href={href} className="jx-how">
      Show me how <span aria-hidden="true">→</span>
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
          Try something <em>small.</em>
        </h2>
        <p>
          Most of my AI use starts with a messy note. One prompt sorts it and picks a single thing I can do in ten minutes.
          Here&apos;s one to try.
        </p>
        <div className="jx-actions">
          <button type="button" className="jx-btn" aria-expanded={open} aria-controls="jx-answer" onClick={() => setOpen((o) => !o)}>
            {open ? "Fold it back" : "Sort this note"}
          </button>
          <button type="button" className="jx-link" onClick={copy}>
            {copied ? "Prompt copied" : "Copy the prompt"}
          </button>
        </div>
        <span className="jx-sr" aria-live="polite">
          {copied ? "Prompt copied to clipboard" : ""}
        </span>
        <ShowMeHow href="/guides/turn-a-messy-note-into-a-next-step" />
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
              <dd>Which shop, and when it&apos;s open.</dd>
            </div>
            <div className="jx-next">
              <dt>Next step, 10 min</dt>
              <dd>Find the opening hours for one nearby bike shop and save its number.</dd>
            </div>
          </dl>
          <p className="jx-check">It shouldn&apos;t claim the shop is open unless it checked a current source.</p>
        </div>
      </div>
    </section>
  );
}

function RealLife() {
  return (
    <section className="jx-step jx-real" aria-labelledby="jx-real-title">
      <div className="jx-art">
        <img src="/home/g-followup.webp" alt="Work gloves, a phone and a job sheet" loading="lazy" />
      </div>
      <div className="jx-text">
        <h2 id="jx-real-title">
          See it work in <em>real life.</em>
        </h2>
        <p className="jx-lede">
          I run Award Coatings, a floor coating company in Phoenix. Leads, quotes, crews, callbacks. If a tool can&apos;t survive a Monday there, I don&apos;t keep it.
        </p>
        <ol className="jx-story">
          <li>
            <strong>What went wrong.</strong> Leads landed in four inboxes I checked after dinner, and vague automation is the fastest way to look bad in front of a customer.
          </li>
          <li>
            <strong>What I changed.</strong> Every form, missed call and message goes to one place. Three reply templates: new lead, missing info, still interested?
          </li>
          <li>
            <strong>What helped.</strong> AI drafts the reply and nudges me when a lead goes quiet. Prices and schedules never send without me.
          </li>
        </ol>
        <blockquote>If you wouldn&apos;t send the draft while standing next to the customer, don&apos;t automate the send.</blockquote>
        <ShowMeHow href="/guides/follow-up-that-survives-monday" />
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
          Go a little <em>deeper.</em>
        </h2>
        <p>
          I was capturing work in eight places and finding it in none of them. The fix was one front door: everything goes to a chat, and which chat I pick decides where it lands. Nothing has to guess.
        </p>
        <ShowMeHow href="/guides/one-front-door" />
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
        Keep <em>exploring.</em>
      </h2>
      <div className="jx-more-grid">
        <Link href="/guides" className="jx-more-row">
          <span className="jx-more-name">All guides →</span>
          <span className="jx-more-line">Short, plain-English how-tos</span>
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
          <span className="jx-more-line">The rest of real life</span>
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
          Hey, I&apos;m JD. I run a floor coating business and split my time between Phoenix and Bigfork, Montana. This is a little of what I&apos;m
          building, learning, and enjoying. Stick around a few minutes.
        </p>
      </section>
      <TrySmall />
      <RealLife />
      <FrontDoor />
      <KeepExploring />
    </div>
  );
}
