import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="font-display font-semibold text-lg text-foreground">Jaden Raats</span>
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        © {new Date().getFullYear()} Jaden Raats. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="https://twitter.com/jadenraats" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter size={20} />
                    </a>
                    <a href="https://linkedin.com/in/jadenraats" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://github.com/jadenraats" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="mailto:contact@jadenraats.com" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Mail size={20} />
                    </a>
                </div>

            </div>
        </footer>
    );
}
