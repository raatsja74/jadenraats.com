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
