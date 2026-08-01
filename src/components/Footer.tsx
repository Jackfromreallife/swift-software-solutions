import { useLang } from "@/lib/i18n";

const Footer = () => {
  const { dict } = useLang();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold">AgentApp<span className="gradient-text">Dev</span></span>
          </div>

          <nav className="flex items-center gap-8">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {dict.footer.services}
            </a>
            <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {dict.footer.process}
            </a>
            <a href="#consultation" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {dict.footer.consultation}
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {dict.footer.contact}
            </a>
          </nav>

          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AgentAppDev. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
