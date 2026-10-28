import type { Metadata } from "next";
import Nav from "@/components/Nav";

const TITLE = "Jaden Raats — Retail Sales Résumé";
const DESCRIPTION =
  "Customer-first salesperson in Scottsdale, AZ. Business owner, door-to-door sales background, available days, nights, weekends and holidays.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/resume" },
  // Unlisted: shared directly with employers, kept out of search and the sitemap.
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://jadenraats.com/resume",
    siteName: "jadenraats.com",
    locale: "en_US",
    type: "profile",
  },
};

const EMAIL = "jadenraats@gmail.com";

const WHY = [
  {
    title: "Runs his own business",
    body: "Owner of Award Coatings since 2022, handling every customer touchpoint himself.",
  },
  {
    title: "Trained in face-to-face sales",
    body: "Engaged and closed customers door to door for Vivint Smart Home.",
  },
  {
    title: "Calm in a rush",
    body: "Worked peak season on a high-volume restaurant line.",
  },
];

const EXPERIENCE = [
  {
    role: "Owner",
    org: "Award Coatings",
    when: "2022 – Present",
    where: "Phoenix / Scottsdale, AZ",
    points: [
      "Handle every customer touchpoint for a local business: first conversation, quotes, scheduling, and follow-up.",
      "Earn repeat business and referrals through dependable follow-through and clear communication.",
      "Resolve questions and concerns calmly while juggling multiple jobs and priorities.",
    ],
  },
  {
    role: "Line Cook",
    org: "Oro y Plata",
    when: "Apr 2020 – Jul 2020",
    where: "Bigfork, MT",
    points: [
      "Worked as a reliable team member in a fast-paced, high-volume restaurant during peak season.",
      "Coordinated with teammates to keep service accurate and on time.",
    ],
  },
  {
    role: "Door-to-Door Sales Representative",
    org: "Vivint Smart Home",
    when: "May 2019 – Sep 2019",
    where: "Tempe, AZ & San Antonio, TX",
    points: [
      "Approached and engaged customers face to face every day with a confident, friendly demeanor.",
      "Asked questions and listened closely to understand each customer's needs, then guided them from first hello to close.",
      "Stayed motivated and persistent in a high-energy, goal-driven sales environment.",
    ],
  },
];

const SKILLS = [
  {
    group: "Sales",
    items: ["Customer engagement", "Needs discovery", "Product recommendations", "Closing", "Building rapport"],
  },
  {
    group: "Store operations",
    items: ["Point of Sale (POS)", "Cash handling", "Multitasking during rush periods", "Teamwork"],
  },
  {
    group: "Work style",
    items: ["Reliable", "Punctual", "Quick learner", "Composed under pressure"],
  },
  {
    group: "Education",
    items: ["Undergraduate Coursework, General Studies"],
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="kicker kicker-accent">
      <span className="ast-host inline-flex items-center gap-1.5">
        {children}
        <span className="ast">*</span>
      </span>
    </p>
  );
}

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-10 sm:pt-44">
        <section className="border-t-2 border-line pt-10">
          <Label>résumé</Label>
          <h1 className="display mt-6 text-6xl sm:text-8xl">
            Jaden{" "}
            <span className="ast-host">
              Raats<span className="ast text-accent">*</span>
            </span>
          </h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.08em] text-soft">
            Retail Sales Associate · Scottsdale, AZ
          </p>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-soft">
            Energetic, customer-first salesperson with face-to-face sales experience and years of
            running client relationships for my own local business. I approach every customer with
            genuine interest, learn what they need, and help them find the right fit. Seeking a retail
            sales role where great service, teamwork, and hitting goals matter.
          </p>
          <p className="mt-6 font-mono text-sm uppercase tracking-[0.04em]">
            Available days, nights, weekends &amp; holidays · Can start immediately
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${EMAIL}`} className="btn btn-primary">
              Email Jaden <span className="btn-arrow">→</span>
            </a>
          </div>
        </section>

        <section className="mt-24 border-t-2 border-line pt-10">
          <Label>why hire jaden</Label>
          <div className="mt-8 grid gap-0 sm:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.title} className="border-2 border-line p-6 sm:-ml-[2px] sm:first:ml-0">
                <h2 className="display text-2xl">{w.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-soft">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t-2 border-line pt-10">
          <Label>experience</Label>
          <ol className="mt-8">
            {EXPERIENCE.map((e) => (
              <li key={e.org} className="border-b-2 border-line py-8 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="display text-3xl">
                    {e.role}, <span className="text-accent">{e.org}</span>
                  </h2>
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-soft">
                    {e.when} · {e.where}
                  </p>
                </div>
                <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-soft">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-24 border-t-2 border-line pt-10">
          <Label>skills</Label>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <h2 className="font-mono text-sm uppercase tracking-[0.08em]">{s.group}</h2>
                <ul className="mt-3 space-y-1 text-base text-soft">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t-2 border-line pt-10">
          <Label>contact</Label>
          <p className="display mt-6 text-4xl sm:text-5xl">Ready for the floor, the register and the rush.</p>
          <p className="mt-6 font-mono text-sm">
            <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a> · Scottsdale, AZ
          </p>
        </section>
      </main>
    </>
  );
}
