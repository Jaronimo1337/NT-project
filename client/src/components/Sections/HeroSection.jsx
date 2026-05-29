import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { HERO_IMAGE } from '../../config/assets';

const HeroSection = ({ registerSection, scrollToSection }) => {
  const { t } = useSiteContent();

  return (
    <section
      id="home"
      ref={(el) => registerSection('home', el)}
      className="page-section section-reveal h-screen mobile-min-h-screen w-full snap-start flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden"
    >
      <div className="absolute right-0 bottom-0 w-1/2 h-full bg-blue-600 clip-diagonal opacity-10" />
      <div className="hero-container w-full mobile-padding px-4 sm:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-12 max-w-7xl mx-auto pt-20">
        <div className="w-full lg:w-3/5 mb-6 lg:mb-0 z-10 text-center lg:text-left">
          <div className="animate-fade-in-up">
            <h1 className="text-responsive-3xl sm:text-responsive-4xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900">
              {t('hero.title', 'Patikimas kelias į jūsų naujus namus')}
            </h1>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              {t('hero.paragraph1', '')}
              <br className="hidden sm:block" />
              <span className="block mt-2">{t('hero.paragraph2', '')}</span>
              <br className="hidden sm:block" />
              <span className="block mt-2">{t('hero.paragraph3', '')}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="btn-responsive bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
              >
                {t('hero.ctaServices', 'Paslaugos')}
                <ArrowRight className="ml-2" size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-responsive bg-white text-blue-600 border border-blue-600 px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                {t('hero.ctaContact', 'Kontaktai')}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
          <div className="hero-image relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-blue-600 overflow-hidden animate-fade-in shadow-2xl">
            <img
              src={HERO_IMAGE}
              alt="Lilija Eimontienė"
              className="w-full h-full object-cover object-[95%_center]"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
