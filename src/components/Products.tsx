import { useRef } from "react";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Products = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { dict } = useLang();
  const items = dict.products.items;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".products-head", { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".products-head", start: "top 80%", once: true }
      });
      gsap.fromTo(".product-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  const badgeColor = (badge: string) =>
    badge === "Free" || badge === "免费"
      ? "bg-primary/15 text-primary border-primary/25"
      : badge === "Custom" || badge === "定制"
        ? "bg-amber-500/10 text-amber-500 border-amber-500/25"
        : "bg-violet-500/10 text-violet-400 border-violet-500/25";

  return (
    <section ref={sectionRef} id="products" className="py-24 relative bg-secondary/30">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="products-head text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            {dict.products.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {dict.products.titleBefore} <span className="gradient-text">{dict.products.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {dict.products.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.url}
              className={`product-card glass-card p-8 rounded-xl flex flex-col hover:border-primary/30 transition-all duration-500 group hover:-translate-y-2 ${
                item.url === "/wallet/" ? "border-primary/30" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeColor(item.badge)}`}>
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.tag}</p>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-primary font-semibold text-sm">
                {item.cta}
                {item.url === "/wallet/" ? (
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
