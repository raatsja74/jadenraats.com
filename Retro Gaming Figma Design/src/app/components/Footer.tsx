import { Gamepad2, Twitter, Linkedin, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-4 border-border bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]">
                <Gamepad2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-foreground uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
                Quest Master
              </span>
            </div>
            <p className="text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: '1.6' }}>
              Leveling up businesses through AI automation and intelligent workflow solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground uppercase mb-4" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-foreground uppercase mb-4" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Github, label: 'GitHub' },
                { icon: Mail, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-12 h-12 bg-muted border-2 border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-all shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-foreground group-hover:text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px' }}>
              © 2024 Quest Master. All achievements unlocked.
            </p>
            
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px' }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
