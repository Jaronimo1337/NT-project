import { ArrowRight } from 'lucide-react';
import React from 'react';

const HeroSection = ({ registerSection, scrollToSection }) => {
  return (
    <section
      id="home"
      ref={(el) => registerSection('home', el)}
      className="h-screen mobile-min-h-screen w-full snap-start flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden"
    >
      <div className="absolute right-0 bottom-0 w-1/2 h-full bg-blue-600 clip-diagonal opacity-10" />
      <div className="hero-container w-full mobile-padding px-4 sm:px-6 lg:px-8 xl:px-16 py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-12 max-w-7xl mx-auto">
        <div className="w-full lg:w-3/5 mb-6 lg:mb-0 z-10 text-center lg:text-left">
          <div className="animate-fade-in-up">
            <h2 className="text-responsive-3xl sm:text-responsive-4xl font-bold mb-4 sm:mb-6 leading-tight">
              Patikimas kelias į jūsų naujus namus
            </h2>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              10+ metų patirties. Profesionalumas. Dėmesys žmogui. Puikiai išmanau statybų procesus. Būsto pardavimas ir pirkimas – sklandžiai, aiškiai, be streso.
              <br className="hidden sm:block" />
              <span className="block mt-2">
                Dirbu sąžiningai, atsakingai, nuoširdžiai ir visada siekiu geriausio rezultato savo klientui.
              </span>
              <br className="hidden sm:block" />
              <span className="block mt-2">
                Ieškote patikimo partnerio nekilnojamojo turto klausimais? Kreipkitės – kartu tikrai rasime geriausią kelią.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
              <button
                onClick={() => scrollToSection('services')}
                className="btn-responsive bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
              >
                Paslaugos
                <ArrowRight className="ml-2" size={18} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-responsive bg-white text-blue-600 border border-blue-600 px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                Kontaktai
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
          <div className="hero-image relative w-55 h-55 sm:w-65 sm:h-65 lg:w-80 lg:h-80 xl:w-100 xl:h-100 rounded-full bg-blue-600 overflow-hidden animate-fade-in shadow-2xl">
            <img
              src="/1.jpg"
              alt="Professional broker portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;