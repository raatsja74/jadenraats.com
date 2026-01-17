import { Sparkles, Book } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-card border-4 border-border p-12 shadow-[12px_12px_0_0_rgba(0,0,0,0.3)] text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-accent border-4 border-border flex items-center justify-center shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]">
              <Sparkles className="w-10 h-10 text-accent-foreground" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-foreground uppercase mb-6" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '24px', lineHeight: '1.6' }}>
            Ready to Start
            <br />
            Your Quest?
          </h2>

          {/* Subheading */}
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', lineHeight: '1.7' }}>
            Let's discuss how AI automation can transform your business. Book a free consultation and discover what's possible when you combine cutting-edge technology with strategic thinking.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-primary text-primary-foreground px-8 py-4 uppercase shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
              Book Free Consultation
            </button>
            
            <button className="bg-muted text-foreground px-8 py-4 uppercase shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center gap-3" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
              <Book className="w-5 h-5" />
              Free Resources
            </button>
          </div>

          {/* Decorative Pixels */}
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-4 h-4 ${i === 2 ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
