import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface PortfolioCardProps {
    title: string;
    subtitle: string;
    category: string;
    topics: string[];
    href: string;
    icon?: LucideIcon; // Optional now
}

export default function PortfolioCard({
    title,
    subtitle,
    category,
    topics,
    href,
}: PortfolioCardProps) {
    return (
        <Link
            href={href}
            className="group block bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/20 transition-colors"
        >
            <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-xs font-medium uppercase tracking-wider text-primary/80">
                        {category}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-muted-foreground mb-6 line-clamp-2">
                    {subtitle}
                </p>

                <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                        <span
                            key={topic}
                            className="bg-secondary/50 text-secondary-foreground px-2.5 py-1 rounded-md text-xs font-medium"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
