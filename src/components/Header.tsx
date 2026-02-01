"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "pt-2" : "pt-8"
        }`}
    >
      <div
        className={`container transition-all duration-500 ${scrolled
          ? "glass rounded-full px-8 py-3 shadow-xl mt-4"
          : "bg-transparent py-6"
          }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-cyber-gradient p-[1px] shadow-lg transition-transform group-hover:scale-110">
              <div className="w-full h-full rounded-[11px] bg-background flex items-center justify-center">
                <span className="font-display font-black text-sm text-primary">JD</span>
              </div>
            </div>
            <span className="font-display text-lg font-bold tracking-tighter group-hover:text-primary transition-colors">
              JadenRaats<span className="text-primary">.com</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/guide">Guide</NavLink>
            <NavLink href="/lab">The Lab</NavLink>
            <NavLink href="#tools">Tools</NavLink>
            <div className="w-px h-5 bg-border-subtle mx-3" />
            <ThemeToggle />
            <div className="w-px h-5 bg-border-subtle mx-3" />
            <Link
              href="mailto:jaden@raatsja.com"
              className="btn-cyber-primary !py-2.5 !px-7 text-sm"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-3 text-dim hover:text-main transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`absolute top-full left-4 right-4 mt-2 transition-all duration-300 origin-top overflow-hidden ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="glass rounded-2xl p-6 shadow-2xl space-y-4">
            <Link
              href="/guide"
              className="block text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Guide
            </Link>
            <Link
              href="/lab"
              className="block text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              The Lab
            </Link>
            <Link
              href="#tools"
              className="block text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Tools
            </Link>
            <div className="h-px bg-white/10 w-full" />
            <Link
              href="mailto:jaden@raatsja.com"
              className="btn-cyber-primary w-full"
              onClick={() => setIsOpen(false)}
            >
              Email Me <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-6 py-2.5 text-sm font-semibold text-dim hover:text-main hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all"
    >
      {children}
    </Link>
  );
}
