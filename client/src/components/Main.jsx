import React from "react";
import { useState, useEffect, useRef } from "react";
import { ArrowUpCircle } from "lucide-react";
import Navigation from "./Navigation";
import ScrollToTopButton from "./ScrollToTopButton";
import HeroSection from "./Sections/HeroSection";
import AboutSection from "./Sections/AboutSection";
import ServicesSection from "./Sections/ServicesSection";
import PortfolioSection from "./Sections/PortfolioSection";
import TestimonialsSection from "./Sections/TestimonialSection";
import ContactSection from "./Sections/ContactsSection";
import Footer from "./Footer";
import AnimationStyles from "./AnimationStyles";

export default function BrokerPortfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionsRef = useRef({});

  const registerSection = (id, ref) => {
    if (ref && ref instanceof Element) {
      sectionsRef.current[id] = ref;
    }
  };

  const scrollToSection = (id) => {
    const element = sectionsRef.current[id];
    if (element && element instanceof Element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Handle intersection observer for sections
  useEffect(() => {
    const observers = [];
    const options = {
      threshold: 0.6,
      rootMargin: '-10% 0px -10% 0px'
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Add a small delay to ensure all sections are rendered
    const timeoutId = setTimeout(() => {
      Object.entries(sectionsRef.current).forEach(([id, section]) => {
        if (section && section instanceof Element) {
          try {
            const observer = new IntersectionObserver(callback, options);
            observer.observe(section);
            observers.push(observer);
          } catch (error) {
            console.error(`Failed to observe section ${id}:`, error);
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observers.forEach((observer) => {
        try {
          observer.disconnect();
        } catch (error) {
          console.error('Error disconnecting observer:', error);
        }
      });
    };
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white w-screen overflow-hidden">
      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <ScrollToTopButton
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main className="h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <HeroSection
          registerSection={registerSection}
          scrollToSection={scrollToSection}
        />
        <AboutSection
          registerSection={registerSection}
          scrollToSection={scrollToSection}
        />
        <ServicesSection
          registerSection={registerSection}
          scrollToSection={scrollToSection}
        />
        <PortfolioSection
          registerSection={registerSection}
          scrollToSection={scrollToSection}
        />
        <TestimonialsSection
          registerSection={registerSection}
          scrollToSection={scrollToSection}
        />
        <ContactSection
          registerSection={registerSection}
          scrollToSection={scrollToSection}
        />
        <Footer scrollToSection={scrollToSection} />
      </main>

      <AnimationStyles />
    </div>
  );
}