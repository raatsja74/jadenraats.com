"use client";

import { useSyncExternalStore } from "react";

type SiteTheme = "light" | "dark";
const THEME_EVENT = "jaden-theme-change";

function getTheme(): SiteTheme {
  return document.documentElement.dataset.siteTheme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  const followSystem = (event: MediaQueryListEvent) => {
    try {
      if (window.localStorage.getItem("jaden-theme")) return;
    } catch {
      return;
    }
    document.documentElement.dataset.siteTheme = event.matches ? "dark" : "light";
    onChange();
  };
  preference.addEventListener("change", followSystem);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    preference.removeEventListener("change", followSystem);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  function toggle() {
    const next = document.documentElement.dataset.siteTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.siteTheme = next;
    try {
      window.localStorage.setItem("jaden-theme", next);
    } catch {
      // The toggle still works when storage is unavailable.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark mode"
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex min-h-[var(--uds-layout-touch-target-min)] min-w-[var(--uds-layout-touch-target-min)] items-center justify-center gap-1 border-l-2 border-line px-2 font-mono text-sm uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-cream sm:px-3"
    >
      <span className="text-lg" aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      <span className="hidden min-[360px]:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
