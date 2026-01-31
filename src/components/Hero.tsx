import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Database, RefreshCw } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-pulse-slow" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Development</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-up text-balance" style={{ animationDelay: "0.1s" }}>
            Modernize Your{" "}
            <span className="gradient-text">Legacy Software</span>{" "}
            in Days, Not Months
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up text-balance" style={{ animationDelay: "0.2s" }}>
            Rebuild aging applications with AI-powered tools. Migrate data to modern databases like MongoDB. 
            Get a working prototype in <span className="text-foreground font-semibold">1-3 working days</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#consultation">
                Free Consultation
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#process">See How It Works</a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-1">1-3 Days</h3>
              <p className="text-muted-foreground text-sm">Per Department Module</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-1">100%</h3>
              <p className="text-muted-foreground text-sm">Data Migration Success</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-1">AI-Powered</h3>
              <p className="text-muted-foreground text-sm">Modern Development</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
