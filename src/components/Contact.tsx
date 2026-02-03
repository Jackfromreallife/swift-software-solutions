import { Mail, MessageCircle, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Modernize</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have questions? Want to discuss your project? I'm here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <a
            href="mailto:jack_li@reallife.sg"
            className="glass-card p-8 rounded-xl text-center hover:border-primary/30 transition-all duration-500 group hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-muted-foreground">jack_li@reallife.sg</p>
          </a>

          <a
            href="#consultation"
            className="glass-card p-8 rounded-xl text-center hover:border-primary/30 transition-all duration-500 group hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Consultation</h3>
            <p className="text-muted-foreground">Book a free call</p>
          </a>

          <div className="glass-card p-8 rounded-xl text-center hover:border-primary/30 transition-all duration-500 group hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-muted-foreground">Remote / Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
