import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".mobile-nav-link",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const navItems = [
    { label: "Work", section: "work", isLink: false },
    { label: "Portfolio", section: "/portfolio", isLink: true },
    { label: "About", section: "about", isLink: false },
    { label: "Services", section: "services", isLink: false },
    { label: "Contact", section: "contact", isLink: false },
  ];

  const handleClick = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass py-4" : "py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => handleClick("hero")}
            className="font-display text-2xl tracking-wider text-foreground hover:text-primary transition-colors"
          >
            GAKS CREATIVES
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) =>
              item.isLink ? (
                <Link
                  key={item.section}
                  to={item.section}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.section}
                  onClick={() => handleClick(item.section)}
                  className="nav-link"
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-transform duration-500 ease-out-expo ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center gap-8">
          {navItems.map((item) =>
            item.isLink ? (
              <Link
                key={item.section}
                to={item.section}
                className="mobile-nav-link font-display text-5xl text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.section}
                onClick={() => handleClick(item.section)}
                className="mobile-nav-link font-display text-5xl text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
