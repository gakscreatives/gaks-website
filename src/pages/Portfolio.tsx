import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";

// Import project images
import project1 from "@/assets/3.jpg";
import project2 from "@/assets/(7).jpg";
import project3 from "@/assets/8.jpg";
import project4 from "@/assets/10.jpg";
import project5 from "@/assets/11.jpg";
import project6 from "@/assets/12.jpg";
import project7 from "@/assets/(15).jpg";
import project8 from "@/assets/(16).jpg";
import project9 from "@/assets/(18).jpg";
import project10 from "@/assets/(20).jpg";
import project11 from "@/assets/(26).jpg";
import project12 from "@/assets/(28).jpg";
import project13 from "@/assets/(30).jpg";
import project14 from "@/assets/(32).jpg";
import project15 from "@/assets/(34).jpg";


gsap.registerPlugin(ScrollTrigger);

// Photography gallery items
const photographyItems = [
  { id: 1, image: project1, title: "Urban Dreams" },
  { id: 2, image: project2, title: "Neon Nights" },
  { id: 3, image: project3, title: "Ethereal Light" },
  { id: 4, image: project4, title: "Abstract Motion" },
  { id: 5, image: project5, title: "Digital Pulse" },
  { id: 6, image: project6, title: "City Echoes" },
  { id: 7, image: project7, title: "Liquid Chrome" },
  { id: 8, image: project8, title: "Silent Horizons" },
  { id: 9, image: project9, title: "Fractured Time" },
  { id: 10, image: project10, title: "Void Walker" },
  { id: 11, image: project11, title: "Prism Effect" },
  { id: 12, image: project12, title: "Synthetic Soul" },
  { id: 13, image: project13, title: "Midnight Bloom" },
  { id: 14, image: project14, title: "Electric Haze" },
  { id: 15, image: project15, title: "Temporal Shift" },
];

// 3D Art items
const art3DItems = [
  { id: 1, image: project1, title: "Geometric Chaos", software: "Cinema 4D" },
  { id: 2, image: project2, title: "Fluid Dynamics", software: "Houdini" },
  { id: 3, image: project3, title: "Abstract Forms", software: "Blender" },
  { id: 4, image: project4, title: "Digital Sculpture", software: "ZBrush" },
  { id: 5, image: project5, title: "Particle Storm", software: "After Effects" },
  { id: 6, image: project1, title: "Metallic Flow", software: "Octane" },
];

// Cinematography items
const cinematographyItems = [
  { id: 1, image: project1, title: "Casio Watches ", year: "2024" , vimeoId: "1127509433" },
  { id: 2, image: project2, title: "Versman", year: "2024" , vimeoId: "1127509117" },
  { id: 3, image: project3, title: "Canvas Cosmetics", year: "2023" , vimeoId: "1127509395" },
  { id: 4, image: project4, title: "Java House", year: "2023" , vimeoId: "1127509558" },
  { id: 5, image: project5, title: "Coca-cola", year: "2024" , vimeoId: "1127509511" },
];

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".reveal-hero") || [],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "power3.out" }
      );

      // Section headers
      gsap.utils.toArray<HTMLElement>(".section-header").forEach((header) => {
        gsap.fromTo(
          header,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Gallery items with stagger
      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: (index % 5) * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 3D art items
      gsap.utils.toArray<HTMLElement>(".art3d-item").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Video items
      gsap.utils.toArray<HTMLElement>(".video-item").forEach((item) => {
        gsap.fromTo(
          item,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const closeModal = () => setSelectedImage(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <GrainOverlay />

      {/* Back Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display text-xl tracking-wider">GAKS CREATIVES</span>
          </Link>
          <span className="text-sm text-muted-foreground uppercase tracking-[0.3em]">
            Full Portfolio
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-[60vh] flex items-end pb-16 pt-32">
        <div className="container mx-auto px-6">
          <span className="reveal-hero text-primary text-sm uppercase tracking-[0.3em] block mb-4">
            Complete Collection
          </span>
          <h1 className="reveal-hero font-display text-7xl md:text-9xl text-foreground leading-none">
            PORTFOLIO
          </h1>
          <p className="reveal-hero text-xl text-muted-foreground mt-6 max-w-xl">
            A curated selection of photography, 3D artwork, and cinematic projects
            spanning commercial and personal explorations.
          </p>
        </div>
      </section>

      {/* Photography Section */}
      <section className="py-24 border-t border-border/20">
        <div className="container mx-auto px-6">
          <div className="section-header mb-16">
            <span className="text-primary text-sm uppercase tracking-[0.3em] block mb-4">
              01
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-foreground">
              Photography
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Capturing moments in light, shadow, and emotion.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {photographyItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage({ image: item.image, title: item.title })}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-sm text-foreground font-medium">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Art Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="section-header mb-16">
            <span className="text-primary text-sm uppercase tracking-[0.3em] block mb-4">
              02
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-foreground">
              3D Art
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Digital sculptures and abstract explorations in three dimensions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {art3DItems.map((item) => (
              <div
                key={item.id}
                className="art3d-item group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage({ image: item.image, title: item.title })}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs text-primary uppercase tracking-widest block mb-2">
                    {item.software}
                  </span>
                  <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematography Section */}
      <section className="py-24 border-t border-border/20">
        <div className="container mx-auto px-6">
          <div className="section-header mb-16">
            <span className="text-primary text-sm uppercase tracking-[0.3em] block mb-4">
              03
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-foreground">
              Cinematography
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Motion stories that breathe life into brands and ideas.
            </p>
          </div>

          <div className="space-y-8">
            {cinematographyItems.map((item) => (
              <div
                key={item.id}
                className="video-item group grid md:grid-cols-[1fr,2fr] gap-8 items-center p-6 rounded-2xl hover:bg-card/50 transition-colors duration-500 cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl">
              
                 <iframe
    src={`https://player.vimeo.com/video/${item.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0`}
    title={item.title}
    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
    frameBorder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowFullScreen
     />


   
                    </div>



                <div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest mb-3">
                    <span>{item.year}</span>
                    <span className="w-1 h-1 rounded-full bg-primary" />
                   
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      <Footer />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-8 cursor-pointer"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-8 right-8 text-foreground hover:text-primary transition-colors text-sm uppercase tracking-widest"
          >
            Close
          </button>
          <div className="max-w-5xl max-h-[80vh] relative">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute -bottom-12 left-0 font-display text-2xl text-foreground">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
