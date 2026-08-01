import { useRef } from "react";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { dict } = useLang();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".contact-head", { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-head", start: "top 80%", once: true }
      });
      gsap.fromTo(".contact-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true }
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="contact-head text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            {dict.contact.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {dict.contact.titleBefore} <span className="gradient-text">{dict.contact.titleHighlight}</span>
            {dict.contact.titleAfter}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <a
            href="mailto:jack_li@reallife.sg"
            className="contact-card glass-card p-8 rounded-xl text-center hover:border-primary/30 transition-all duration-500 group hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{dict.contact.email}</h3>
            <p className="text-muted-foreground">jack_li@reallife.sg</p>
          </a>

          <a
            href="#consultation"
            className="contact-card glass-card p-8 rounded-xl text-center hover:border-primary/30 transition-all duration-500 group hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{dict.contact.consultation}</h3>
            <p className="text-muted-foreground">{dict.contact.bookCall}</p>
          </a>

          <div className="contact-card glass-card p-8 rounded-xl text-center hover:border-primary/30 transition-all duration-500 group hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{dict.contact.location}</h3>
            <p className="text-muted-foreground">{dict.contact.remote}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
