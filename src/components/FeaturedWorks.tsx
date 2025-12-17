import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectModal from "./ProjectModal";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "FANTA",
    category: "Product Photography",
    year: "2024",
    image: project1,
    description:
      "A potrait capturing the essence of the Fanta soft drink bottle. This project was initially made as a Coca-cola project but I ended up switching it up after days of unsuccessfully searching for Coke cans.",
  },
  {
    id: 2,
    title: "LUMINANCE",
    category: "Photography",
    year: "2024",
    image: project2,
    description:
      "A portrait series capturing the interplay of geometric light projections on the human form. Each frame tells a story of fragmented identity and hidden depths.",
  },
  {
    id: 3,
    title: "ETHEREAL VOID",
    category: "Photography",
    year: "2024",
    image: project3,
    description:
      "Floating through the spaces between dreams and reality. This piece features impossible geometries suspended in atmospheric mist.",
  },
  {
    id: 4,
    title: "MONOLITH",
    category: "Photography",
    year: "2023",
    image: project4,
    description:
      "Strong cultural womanhood, captured on a city tower building. The image redifines strength and elegance in the female form",
  },
  {
    id: 5,
    title: "KINETIC FLOW",
    category: "Motion Photography",
    year: "2024",
    image: project5,
    description:
      "Capturing movement through long exposure, transforming human motion into trails of ethereal light. Where bodies become brushstrokes.",
  },
];

const FeaturedWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

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

      // Grid items stagger animation
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Parallax on scroll for each card
        cards.forEach((card) => {
          const image = card.querySelector(".project-card-image");
          gsap.to(image, {
            yPercent: -15,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="py-32 bg-background relative"
      >
        {/* Section Header */}
        <div ref={titleRef} className="container mx-auto px-6 mb-20">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
                Selected Works
              </span>
              <h2 className="section-title">
                FEATURED
                <br />
                PROJECTS
              </h2>
            </div>
            <span className="hidden md:block text-6xl font-display text-muted-foreground/20">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <div className="line-decoration mt-10" />
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`project-card aspect-[4/3] rounded-lg ${
                index === 0 ? "md:col-span-2 md:aspect-[21/9]" : ""
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="project-card-image"
              />
              <div className="project-card-overlay flex flex-col justify-end p-8">
                <span className="text-primary text-sm uppercase tracking-widest mb-2">
                  {project.category}
                </span>
                <h3 className="font-display text-4xl md:text-5xl text-foreground">
                  {project.title}
                </h3>
                <span className="text-muted-foreground mt-2">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default FeaturedWorks;
