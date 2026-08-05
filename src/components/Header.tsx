import { Button } from "@/components/ui/button";
import { Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, dict } = useLang();

  const navLinks = [
    { href: "#services", label: dict.header.nav.services },
    { href: "#products", label: dict.header.nav.products },
    { href: "#process", label: dict.header.nav.process },
    { href: "#consultation", label: dict.header.nav.consultation },
    { href: "#contact", label: dict.header.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold">AgentApp<span className="gradient-text">Dev</span></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-border/40 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors duration-300"
              aria-label="Switch language"
            >
              <Languages size={16} />
              {lang === "en" ? "中文" : "EN"}
            </button>
            <Button variant="hero" size="lg" asChild>
              <a href="#consultation">{dict.header.getStarted}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={dict.header.toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-6 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3">
                <Button variant="hero" size="lg" className="mt-4 flex-1" asChild>
                  <a href="#consultation" onClick={() => setIsMenuOpen(false)}>
                    {dict.header.getStarted}
                  </a>
                </Button>
                <button
                  onClick={() => {
                    setLang(lang === "en" ? "zh" : "en");
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border/40 text-sm font-semibold text-muted-foreground"
                >
                  <Languages size={16} />
                  {lang === "en" ? "中文" : "EN"}
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
