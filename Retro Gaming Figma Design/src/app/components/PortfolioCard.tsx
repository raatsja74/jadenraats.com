import { ArrowRight, LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  color: string;
}

interface PortfolioCardProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  subtitle: string;
  client: string;
  stats: Stat[];
  techStack: string[];
  isHovered?: boolean;
}

export function PortfolioCard({
  icon: Icon,
  badge,
  title,
  subtitle,
  client,
  stats,
  techStack,
  isHovered = false,
}: PortfolioCardProps) {
  return (
    <div
      className={`bg-card border-4 border-border p-6 flex flex-col h-full transition-all duration-300 ${
        isHovered
          ? 'shadow-[12px_12px_0_0_rgba(255,107,157,0.4)] translate-x-[-4px] translate-y-[-4px] scale-[1.02]'
          : 'shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0_0_rgba(255,107,157,0.4)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:scale-[1.02]'
      }`}
    >
      {/* Header with Icon and Badge */}
      <div className="flex items-start justify-between mb-6">
        <div className="w-16 h-16 bg-muted border-2 border-border flex items-center justify-center">
          <Icon className="w-9 h-9 text-primary" strokeWidth={2.5} />
        </div>
        <div className="bg-accent px-3 py-2 shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]">
          <span className="text-accent-foreground uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>
            {badge}
          </span>
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-4">
        <h3 className="text-foreground mb-3 uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '16px', lineHeight: '1.6' }}>
          {title}
        </h3>
        <p className="text-muted-foreground mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
          {subtitle}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary" />
          <span className="text-secondary uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>
            {client}
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex-grow mb-6">
        <div className="bg-muted/50 border-2 border-border p-4 space-y-3">
          <div className="text-muted-foreground uppercase mb-3" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>
            Results
          </div>
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-foreground" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px' }}>
                  {stat.label}
                </span>
                <span className={`uppercase ${stat.color}`} style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
                  {stat.value}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="h-3 bg-background border-2 border-border relative overflow-hidden">
                <div 
                  className={`h-full ${stat.color.replace('text-', 'bg-')} transition-all duration-1000`}
                  style={{ width: `${parseInt(stat.value)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-6">
        <div className="text-muted-foreground uppercase mb-3" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>
          Tech Stack
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <div 
              key={index}
              className="bg-muted border-2 border-border px-3 py-1 text-foreground shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px' }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-primary text-primary-foreground py-3 px-4 uppercase shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
        View Quest
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
