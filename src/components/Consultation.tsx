import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { sendConsultationEmail } from "@/lib/emailService";

import { useLang } from "@/lib/i18n";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Consultation = () => {
  const { dict } = useLang();
  const benefits = dict.consultation.benefits;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    currentSystem: "",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.requirements.trim()) {
      toast.error(dict.consultation.errorRequired);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(dict.consultation.errorEmail);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      await sendConsultationEmail(formData);
      
      toast.success(dict.consultation.toastSuccess);
      setFormData({
        name: "",
        email: "",
        company: "",
        currentSystem: "",
        requirements: "",
      });
    } catch (error) {
      console.error("Failed to send consultation request:", error);
      toast.error(dict.consultation.toastError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Left side content reveals
      gsap.fromTo(".consult-left", { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".consult-left", start: "top 75%", once: true }
      });
      // Benefit items stagger
      gsap.fromTo(".consult-benefit", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".consult-left", start: "top 70%", once: true }
      });
      // Form card slides in from the right
      gsap.fromTo(".consult-form", { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".consult-form", start: "top 75%", once: true }
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="consultation" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Benefits */}
          <div className="consult-left">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              {dict.consultation.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {dict.consultation.titleBefore}{" "}
              <span className="gradient-text">{dict.consultation.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {dict.consultation.subtitle}
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="consult-benefit flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="consult-form glass-card p-8 md:p-10 rounded-2xl glow-effect">
            <h3 className="text-2xl font-bold mb-6">{dict.consultation.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {dict.consultation.name} <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder={dict.consultation.placeholders.name}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {dict.consultation.email} <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={dict.consultation.placeholders.email}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                    maxLength={255}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    {dict.consultation.company}
                  </label>
                  <Input
                    id="company"
                    placeholder={dict.consultation.placeholders.company}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label htmlFor="currentSystem" className="block text-sm font-medium mb-2">
                    {dict.consultation.currentSystem}
                  </label>
                  <Input
                    id="currentSystem"
                    placeholder={dict.consultation.placeholders.currentSystem}
                    value={formData.currentSystem}
                    onChange={(e) => setFormData({ ...formData, currentSystem: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                    maxLength={100}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                  {dict.consultation.requirements} <span className="text-accent">*</span>
                </label>
                <Textarea
                  id="requirements"
                  placeholder={dict.consultation.placeholders.requirements}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="bg-secondary/50 border-border/50 focus:border-primary min-h-[120px]"
                  maxLength={2000}
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  dict.consultation.submitting
                ) : (
                  <>
                    {dict.consultation.submit}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                {dict.consultation.finePrint}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
