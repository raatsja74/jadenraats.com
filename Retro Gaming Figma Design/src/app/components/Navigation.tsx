import { Gamepad2 } from "lucide-react";

export function Navigation() {
  return (
    <nav className="border-b-4 border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
              <Gamepad2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-foreground uppercase tracking-wider" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
              Quest Master
            </span>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
              Services
            </a>
            <a href="#portfolio" className="text-foreground hover:text-primary transition-colors uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
              Portfolio
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <button className="bg-accent text-accent-foreground px-6 py-3 uppercase shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
            Start Quest
          </button>
        </div>
      </div>
    </nav>
  );
}
