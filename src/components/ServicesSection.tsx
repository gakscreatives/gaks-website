import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Boxes, Compass, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Camera,
    title: "Photography & Videography",
    description:
      "Editorial, commercial, and conceptual photography that transcends the ordinary. Each shot is meticulously composed to evoke emotion and tell stories.",
    tags: ["Portraits", "Fashion", "Product", "Architecture"],
  },
  {
    icon: Boxes,
    title: "3D Animation",
    description:
      "Bringing impossible visions to life through cutting-edge 3D animation. From abstract art pieces to commercial visualizations.",
    tags: ["Motion Graphics", "CGI", "Visual Effects", "Product Viz"],
  },
  {
    icon: Compass,
    title: "Creative Direction",
    description:
      "Guiding brands and artists through the creative process, from concept development to final execution. Vision meets strategy.",
    tags: ["Brand Identity", "Art Direction", "Campaigns", "Strategy"],
  },
  {
    icon: Sparkles,
    title: "Post-Production",
    description:
      "The alchemy that transforms raw captures into polished masterpieces. Color grading, compositing, and digital enhancement.",
    tags: ["Color Grading", "Retouching", "Compositing", "Finishing"],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section ref={sectionRef} id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
            Expertise
          </span>
          <h2 className="section-title">
            WHAT I <span className="text-primary">CREATE</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="service-card group">
                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-display text-3xl text-foreground mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-wider text-muted-foreground px-3 py-1 rounded-full border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
