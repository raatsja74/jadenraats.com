import { Bot, Zap, Settings } from "lucide-react";
import { PortfolioCard } from "./PortfolioCard";

export function PortfolioGrid() {
  const projects = [
    {
      icon: Bot,
      badge: "Level Complete",
      title: "Contractor Outreach Automation",
      subtitle: "AI-powered lead response system",
      client: "Construction Coating Co.",
      stats: [
        { label: "Response Time", value: "85", color: "text-secondary" },
        { label: "Qualified Leads", value: "75", color: "text-accent" },
        { label: "Time Saved", value: "90", color: "text-primary" },
      ],
      techStack: ["ChatGPT", "n8n", "Airtable", "Perplexity"],
    },
    {
      icon: Zap,
      badge: "Level Complete",
      title: "LinkedIn Lead Generation Platform",
      subtitle: "Automated outreach with AI personalization",
      client: "LeadBolt SaaS",
      stats: [
        { label: "Outreach Speed", value: "95", color: "text-secondary" },
        { label: "Personalization", value: "100", color: "text-accent" },
        { label: "Conversion Rate", value: "70", color: "text-primary" },
      ],
      techStack: ["Claude AI", "LinkedIn API", "RAG", "n8n"],
      isHovered: true, // This card will be shown in hover state
    },
    {
      icon: Settings,
      badge: "Level Complete",
      title: "Personal Productivity OS",
      subtitle: "Morning briefing & task sync automation",
      client: "Personal Workflow",
      stats: [
        { label: "Tasks Automated", value: "80", color: "text-secondary" },
        { label: "Time Saved", value: "85", color: "text-accent" },
        { label: "Daily Consistency", value: "100", color: "text-primary" },
      ],
      techStack: ["Python", "Todoist", "Obsidian", "iOS Shortcuts"],
    },
  ];

  return (
    <section id="portfolio" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <PortfolioCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
