"use client";

import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.75, ease: EASE },
};

const PALETTE = [
  { name: "Ink black", hex: "#0A0A09", role: "type, borders, dark sections", swatch: "bg-ink text-cream" },
  { name: "Warm paper", hex: "#F2EFE6", role: "primary canvas and panels", swatch: "bg-cream text-ink border-2 border-line" },
  { name: "Signal orange", hex: "#F4511E", role: "actions, stamps, active states", swatch: "bg-accent text-ink" },
  { name: "Secondary text", hex: "#5D5A53", role: "supporting copy on paper", swatch: "bg-cream text-soft border-2 border-line" },
] as const;

const THEMES = [
  { id: "jadenraats", name: "Jaden Raats", note: "Default for this site — editorial-operational brutalism." },
  { id: "award-coatings", name: "Award Coatings", note: "Brand-owned. Do not import Jaden orange/type here." },
  { id: "leadbolt", name: "LeadBolt", note: "Brand-owned theme mapping." },
  { id: "ai-ledger", name: "AI Ledger", note: "Brand-owned theme mapping." },
] as const;

const RULES = [
  { title: "0px radius", body: "No pills, no soft cards, no glass. Hard corners only." },
  { title: "Hard borders", body: "Structural frames use strong ink borders. Sections touch with clear dividers." },
  { title: "16px grid gap", body: "Modular layout spacing. Dense when useful — labels, counts, filters belong." },
  { title: "One accent", body: "Signal orange is the only strong accent. Everything else is ink, paper, or gray." },
] as const;

const LEGACY = [
  { bad: "#e8552a / #cf5a35", good: "#F4511E" },
  { bad: "#f1ece1 / #faf6ee", good: "#F2EFE6" },
  { bad: "#141210 / #1c1a17", good: "#0A0A09" },
  { bad: "Archivo Black / Inter", good: "Anton / IBM Plex Mono" },
  { bad: "999px pills / soft shadows", good: "0px radius, hard edges" },
] as const;

const FAILURES = [
  {
    title: "Mobile hero overlap",
    body: "Absolute hero photos must sit inside a min-width media query. Under ~700px the photo is position: static, stacked after the text.",
  },
  {
    title: "Mobile dark-mode invert",
    body: "Lock color-scheme: light only in both a meta tag and CSS, or OS dark mode inverts the warm paper palette.",
  },
] as const;
