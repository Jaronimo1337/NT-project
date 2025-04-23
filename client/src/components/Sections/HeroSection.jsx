import { ArrowRight } from 'lucide-react';
import React from 'react';

const HeroSection = ({ registerSection, scrollToSection }) => {
  return (
    <section
      id="home"
      ref={(el) => registerSection('home', el)}
      className="h-screen w-full snap-start flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden"
    >
      <div className="absolute right-0 bottom-0 w-1/2 h-full bg-blue-600 clip-diagonal opacity-10" />
      <div className="w-full px-4 md:px-30 py-16 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-12 md:mb-0 z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Patikimas kelias į jūsų naujus namus
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
            10+ metų patirties. Profesionalumas. Dėmesys žmogui. Būsto pardavimas, pirkimas ar nuoma – sklandžiai, aiškiai, be streso.
Dirbu sąžiningai, atsakingai, nuoširdžiai ir visada siekiu geriausio rezultato savo klientui. 
Ieškote patikimo partnerio nekilnojamojo turto klausimais? Kreipkitės – kartu tikrai rasime geriausią kelią.
</p>
            <div className="flex flex-co justify-center sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('services')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
              >
                Paslaugos                <ArrowRight className="ml-2" size={18} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
Kontaktai
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-100 md:h-100 rounded-full bg-blue-600 overflow-hidden animate-fade-in">
            <img
              src="../../public/1.jpg"
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