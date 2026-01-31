import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const benefits = [
  "Free feasibility analysis—no obligations",
  "No database credentials required initially",
  "Understand migration complexity upfront",
  "Get a realistic timeline and cost estimate",
  "See examples of similar transformations",
];

const Consultation = () => {
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
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Thank you! I'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      company: "",
      currentSystem: "",
      requirements: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section id="consultation" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Benefits */}
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
              Free Consultation
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let's Analyze Your{" "}
              <span className="gradient-text">Legacy System</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Even if you don't have access to database credentials, I can still analyze 
              your system's feasibility for modernization. Get honest insights before 
              committing to anything.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="glass-card p-8 md:p-10 rounded-2xl glow-effect">
            <h3 className="text-2xl font-bold mb-6">Request Free Analysis</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
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
                    Company Name
                  </label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label htmlFor="currentSystem" className="block text-sm font-medium mb-2">
                    Current System Type
                  </label>
                  <Input
                    id="currentSystem"
                    placeholder="e.g., Access, Excel, Old ERP"
                    value={formData.currentSystem}
                    onChange={(e) => setFormData({ ...formData, currentSystem: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                    maxLength={100}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                  Tell Me About Your Needs <span className="text-accent">*</span>
                </label>
                <Textarea
                  id="requirements"
                  placeholder="Describe your current system, what problems you're facing, and what you'd like to achieve..."
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
                  "Submitting..."
                ) : (
                  <>
                    Get Free Analysis
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                No spam. No obligations. Just honest analysis.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
