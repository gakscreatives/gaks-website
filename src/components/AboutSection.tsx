import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutPortrait from "@/assets/about-portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)", scale: 1.2 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Text animations
      const textElements = textRef.current?.querySelectorAll(".animate-text");
      if (textElements) {
        gsap.fromTo(
          textElements,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Stats counter animation
      const stats = statsRef.current?.querySelectorAll(".stat-number");
      if (stats) {
        stats.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-value") || "0", 10);
          gsap.fromTo(
            stat,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: stat,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 5, label: "Years Experience" },
    { value: 150, label: "Projects Delivered" },
    { value: 40, label: "Global Clients" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 bg-secondary/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative overflow-hidden rounded-lg">
            <img
              src={aboutPortrait}
              alt="Creative director portrait"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

            {/* Floating accent */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-primary/30 rounded-full animate-float" />
          </div>

          {/* Text Content */}
          <div ref={textRef}>
            <span className="animate-text text-primary text-sm uppercase tracking-[0.3em] block mb-4">
              Philosophy
            </span>
            <h2 className="animate-text section-title mb-8">
              CRAFTING
              <br />
              <span className="text-primary">IMPOSSIBLE</span>
              <br />
              VISIONS
            </h2>

            <p className="animate-text text-lg text-muted-foreground leading-relaxed mb-6">
              I exist at the intersection of photography and digital art, where
              the tangible meets the ethereal. Every frame I create is a
              doorway, an invitation to step beyond the ordinary and witness
              worlds that exist only in the space between blinks.
            </p>

            <p className="animate-text text-muted-foreground leading-relaxed mb-12">
              With over a decade of experience, I have collaborated with
              visionary brands and artists to transform concepts into cinematic
              experiences. My work does not just document reality—it reimagines
              it, layer by layer, pixel by pixel.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="animate-text grid grid-cols-3 gap-8 pt-8 border-t border-border"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span
                    className="stat-number font-display text-4xl md:text-5xl text-foreground"
                    data-value={stat.value}
                  >
                    0
                  </span>
                  <span className="font-display text-4xl md:text-5xl text-primary">
                    +
                  </span>
                  <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
};

export default AboutSection;
