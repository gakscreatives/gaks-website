import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Instagram, Twitter, Linkedin, Mail } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/gaks_creatives" },
  

  { name: "Email", icon: Mail, url: "mailto:hello@gakscreatives.co.ke" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll(".animate-item");
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-secondary/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <span className="animate-item text-primary text-sm uppercase tracking-[0.3em] block mb-4">
            Get in Touch
          </span>

          <h2 className="animate-item font-display text-[12vw] md:text-[8vw] leading-none text-foreground mb-8">
            LET&apos;S CREATE
            <br />
            <span className="text-primary">TOGETHER</span>
          </h2>

          <p className="animate-item text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Have a vision waiting to be realized? I am always open to discussing
            new projects, creative ideas, or opportunities to be part of your
            vision.
          </p>

          {/* CTA Button */}
          <div className="animate-item mb-20">
            <a
              href="https://wa.me/254790206442"
              className="magnetic-btn inline-flex items-center gap-4 px-10 py-5 rounded-full border border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all duration-500 group"
            >
              <span className="font-display text-xl tracking-wider">
                START A PROJECT
              </span>
              <ArrowUpRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Divider */}
          <div className="animate-item line-decoration mb-12" />

          {/* Social Links */}
          <div className="animate-item flex flex-wrap justify-center gap-8 md:gap-12">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  className="social-link group"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/30 to-transparent" />
      <div className="absolute top-1/4 right-12 w-40 h-40 rounded-full border border-primary/10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-12 w-24 h-24 rounded-full border border-accent/10 animate-float" />
    </section>
  );
};

export default ContactSection;
