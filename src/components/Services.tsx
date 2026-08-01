import { useRef } from "react";
import { Bot, Database, Code2, RefreshCw, Shield, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const serviceIcons = [Bot, Database, Code2, RefreshCw, Shield, Layers];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { dict } = useLang();
  const services = dict.services.items;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Section heading reveal
      gsap.fromTo(".services-head", { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".services-head", start: "top 80%", once: true }
      });
      // Cards stagger in on scroll
      gsap.fromTo(".service-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="services-head text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            {dict.services.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {dict.services.titleBefore} <span className="gradient-text">{dict.services.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <div
                key={index}
                className="service-card glass-card p-8 rounded-xl hover:border-primary/30 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
