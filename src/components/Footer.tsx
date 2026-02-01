import Link from "next/link";
import { Github, Mail, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-background pt-32 pb-20 overflow-hidden border-t border-border-subtle">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[160px] rounded-[100%] -z-10" />

      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-2xl font-black tracking-tighter mb-8 block text-main">
              JadenRaats<span className="text-primary">.com</span>
            </Link>
            <p className="text-dim text-base leading-relaxed max-w-xs font-medium">
              Building open-source tools and sharing processes to help service business owners capture time back.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-8">
              Tools
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/tools/website-health">Health Checker</FooterLink>
              <FooterLink href="/tools/roi-calculator">ROI Calculator</FooterLink>
              <FooterLink href="/tools/floorquote">FloorQuote</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-8">
              Resources
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/guide">Operations Guide</FooterLink>
              <FooterLink href="https://github.com/raatsja74" external>Open Source</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-8">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              <SocialIcon href="https://github.com/raatsja74" icon={Github} label="GitHub" />
              <SocialIcon href="https://linkedin.com/in/jadenraats" icon={Linkedin} label="LinkedIn" />
              <SocialIcon href="https://twitter.com/jadenraats" icon={Twitter} label="X" />
              <SocialIcon href="mailto:jaden@raatsja.com" icon={Mail} label="Email" />
            </div>
          </div>
        </div>

        <div className="h-px bg-border-subtle w-full mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-dim">
          <p>© {new Date().getFullYear()} Jaden Raats. All rights reserved.</p>
          <div className="flex gap-10">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const content = (
    <span className="text-base font-bold text-dim hover:text-primary transition-colors cursor-pointer block">
      {children}
    </span>
  );

  if (external) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href}>{content}</Link>
    </li>
  );
}

function SocialIcon({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-12 h-12 rounded-full glass border-border-subtle flex items-center justify-center text-dim hover:text-primary hover:border-primary/50 hover:shadow-lg transition-all active:scale-95"
    >
      <Icon size={20} />
    </a>
  );
}
