import { Trophy, Users, Clock } from "lucide-react";

export function HeroSection() {
  const stats = [
    { icon: Trophy, label: "Quests Completed", value: "50+" },
    { icon: Clock, label: "Hours Saved", value: "10,000+" },
    { icon: Users, label: "Clients Helped", value: "30+" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative pixels background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 h-full w-full">
          {[...Array(400)].map((_, i) => (
            <div key={i} className={`border border-primary ${i % 7 === 0 ? 'bg-primary' : ''}`} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-6 py-3 bg-accent shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]">
            <h1 className="text-foreground uppercase tracking-wider" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '36px', lineHeight: '1.4' }}>
              Completed
              <br />
              Quests
            </h1>
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', lineHeight: '1.7' }}>
            Level up your business with AI automation. Each project below represents a real-world challenge conquered through intelligent automation and cutting-edge AI solutions.
          </p>
        </div>

        {/* Stats HUD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-card border-4 border-border p-6 shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-accent uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '24px' }}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground uppercase" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px', lineHeight: '1.6' }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
