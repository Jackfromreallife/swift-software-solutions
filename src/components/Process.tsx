import { useRef } from "react";
import { MessageSquare, Search, Rocket, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stepIcons = [MessageSquare, Search, Rocket, CheckCircle2];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { dict } = useLang();
  const steps = dict.process.steps;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Heading reveal
      gsap.fromTo(".process-head", { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".process-head", start: "top 80%", once: true }
      });
      // Steps stagger in
      gsap.fromTo(".process-step", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }
      });
      // Connection line draws itself
      gsap.fromTo(".process-line", { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power2.inOut",
        scrollTrigger: { trigger: ".process-line", start: "top 75%", once: true }
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="process" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="process-head text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            {dict.process.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {dict.process.titleBefore} <span className="gradient-text">{dict.process.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {dict.process.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="process-line hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 origin-left" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <div key={index} className="process-step relative group">
                  <div className="glass-card p-8 rounded-xl h-full hover:border-primary/30 transition-all duration-500 hover:-translate-y-2">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Highlight Badge */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {step.highlight}
                    </span>
                  </div>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-primary/30 -translate-y-1/2 z-10">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
