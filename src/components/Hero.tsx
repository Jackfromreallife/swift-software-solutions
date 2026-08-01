import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Database, RefreshCw } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { dict } = useLang();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Entrance timeline — badge → headline → sub → CTAs → stats
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-badge", { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(".hero-headline", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.4")
        .fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(".hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-stat", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, "-=0.45");

      // Floating background blobs
      gsap.to(".hero-blob-a", { y: -30, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".hero-blob-b", { y: 24, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut" });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="hero-blob-a absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="hero-blob-b absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{dict.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-balance">
            {dict.hero.titleBefore}{" "}
            <span className="gradient-text">{dict.hero.titleHighlight}</span>{" "}
            {dict.hero.titleAfter}
          </h1>

          {/* Subheadline */}
          <p className="hero-sub text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
            {dict.hero.subBefore}{" "}
            <span className="text-foreground font-semibold">{dict.hero.subHighlight}</span>
            {dict.hero.subAfter}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="hero" size="xl" asChild>
              <a href="#consultation">
                {dict.hero.cta1}
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#process">{dict.hero.cta2}</a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.hero.stats.map((stat, i) => (
              <div key={i} className="hero-stat glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  {i === 0 ? (
                    <Zap className="w-6 h-6 text-primary" />
                  ) : i === 1 ? (
                    <Database className="w-6 h-6 text-primary" />
                  ) : (
                    <RefreshCw className="w-6 h-6 text-primary" />
                  )}
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
