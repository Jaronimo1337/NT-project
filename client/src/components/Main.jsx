import React from "react";
import { useState, useEffect, useRef } from "react";
import Navigation from "./Navigation";
import ScrollToTopButton from "./ScrollToTopButton";
import HeroSection from "./Sections/HeroSection";
import AboutSection from "./Sections/AboutSection";
import ServicesSection from "./Sections/ServicesSection";
import PortfolioSection from "./Sections/PortfolioSection";
import SuccessStoriesSection from "./Sections/SuccessStoriesSection";
import ContactSection from "./Sections/ContactsSection";
import Footer from "./Footer";
import AnimationStyles from "./AnimationStyles";
import { SiteContentProvider } from "../context/SiteContentContext";

const NAV_OFFSET = 88;

export default function BrokerPortfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionsRef = useRef({});
  const mainRef = useRef(null);

  const registerSection = (id, ref) => {
    if (ref && ref instanceof Element) {
      sectionsRef.current[id] = ref;
    }
  };

  const scrollToSection = (id) => {
    const element = sectionsRef.current[id];
    const container = mainRef.current;
    if (element && element instanceof Element && container) {
      const top = element.offsetTop - NAV_OFFSET;
      container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const observers = [];
    const navOptions = {
      root: mainRef.current,
      threshold: [0.25, 0.4, 0.55],
      rootMargin: `-${NAV_OFFSET}px 0px -20% 0px`
    };

    const navCallback = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length > 0) {
        setActiveSection(visible[0].target.id);
      }
    };

    const revealCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    };

    const revealOptions = {
      root: mainRef.current,
      threshold: 0.1,
      rootMargin: `-${NAV_OFFSET}px 0px -6% 0px`
    };

    const timeoutId = setTimeout(() => {
      const home = sectionsRef.current.home;
      if (home instanceof Element) {
        home.classList.add('is-revealed');
      }

      Object.entries(sectionsRef.current).forEach(([id, section]) => {
        if (section && section instanceof Element) {
          try {
            const navObserver = new IntersectionObserver(navCallback, navOptions);
            navObserver.observe(section);
            observers.push(navObserver);

            const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
            revealObserver.observe(section);
            observers.push(revealObserver);
          } catch (error) {
            console.error(`Failed to observe section ${id}:`, error);
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <SiteContentProvider>
      <div className="font-sans text-gray-800 bg-[#f8faf9] w-screen overflow-hidden">
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

        <main
          ref={mainRef}
          className="main-scroll h-screen w-full overflow-y-auto scroll-smooth"
          style={{ scrollPaddingTop: `${NAV_OFFSET}px` }}
        >
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
          <SuccessStoriesSection
            registerSection={registerSection}
            scrollToSection={scrollToSection}
          />
          <ContactSection
            registerSection={registerSection}
            scrollToSection={scrollToSection}
          />
          <Footer
            scrollToSection={scrollToSection}
            registerSection={registerSection}
          />
        </main>

        <AnimationStyles />
      </div>
    </SiteContentProvider>
  );
}
