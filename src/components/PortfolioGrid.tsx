import PortfolioCard from "./PortfolioCard";

const projects = [
    {
        title: "Autonomous Lead Gen Engine",
        subtitle: "A scalable outreach system powered by Claude and n8n, automating client acquisition workflows.",
        category: "AI Automation",
        topics: ["Claude", "n8n", "System Design"],
        href: "/blog/autonomous-lead-generation-claude",
    },
    {
        title: "AI Content Strategy Playbook",
        subtitle: "Framework for founders to scale authentic thought leadership using large language models.",
        category: "Content Strategy",
        topics: ["LLMs", "Strategy", "Writing"],
        href: "/blog/ai-content-strategy-entrepreneurs",
    },
    {
        title: "Second Mind Operating System",
        subtitle: "A comprehensive knowledge management system built in Obsidian for high-output individuals.",
        category: "Knowledge Systems",
        topics: ["Obsidian", "PKM", "Workflow"],
        href: "/blog/second-mind-map-system",
    },
];

export default function PortfolioGrid() {
    return (
        <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 md:flex md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Things I've made</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Real tools and systems I actually use. Some turned out useful enough to share.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <PortfolioCard key={project.title} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
