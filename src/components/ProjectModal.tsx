import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )
        .fromTo(
          imageRef.current,
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.1"
        )
        .fromTo(
          contentRef.current?.querySelectorAll(".reveal-item") || [],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(contentRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "-=0.2"
    );
  };

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="modal-overlay flex items-center justify-center p-4 md:p-8"
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-8 right-8 z-10 p-2 text-foreground hover:text-primary transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div
        ref={contentRef}
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-12">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <span className="reveal-item text-primary text-sm uppercase tracking-[0.3em] block mb-4">
              {project.category}
            </span>
            <h2 className="reveal-item font-display text-6xl md:text-8xl text-foreground mb-8">
              {project.title}
            </h2>
            <p className="reveal-item text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>

          <div className="space-y-8">
            <div className="reveal-item">
              <span className="text-sm text-muted-foreground uppercase tracking-widest">
                Year
              </span>
              <p className="font-display text-3xl text-foreground mt-2">
                {project.year}
              </p>
            </div>
            <div className="reveal-item">
              <span className="text-sm text-muted-foreground uppercase tracking-widest">
                Role
              </span>
              <p className="font-display text-3xl text-foreground mt-2">
                Creative Direction
              </p>
            </div>
            <div className="reveal-item">
              <span className="text-sm text-muted-foreground uppercase tracking-widest">
                Deliverables
              </span>
              <p className="text-foreground mt-2">
                Photography, 3D Animation, Post-Production
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
