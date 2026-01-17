import { Github, Linkedin, Twitter } from "lucide-react";

export default function CTASection() {
    return (
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="mx-auto max-w-3xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
                    About
                </h2>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                        I'm Jaden. I got into AI tools early and never stopped tinkering.
                    </p>
                    <p>
                        Most of what I build is for myself — systems to manage tasks, process notes, automate the boring stuff. Some of it turned out useful enough to share.
                    </p>
                    <p>
                        I don't sell consulting or courses. I just like building things and showing how they work.
                    </p>
                </div>

                <div className="mt-12 flex items-center gap-6 text-muted-foreground">
                    <a href="https://github.com/jadenraats" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
                        <Github size={20} />
                        <span className="text-sm">GitHub</span>
                    </a>
                    <a href="https://twitter.com/jadenraats" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
                        <Twitter size={20} />
                        <span className="text-sm">Twitter</span>
                    </a>
                    <a href="https://linkedin.com/in/jadenraats" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
                        <Linkedin size={20} />
                        <span className="text-sm">LinkedIn</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
