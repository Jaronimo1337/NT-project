import { ArrowRight } from 'lucide-react';
import React from 'react';

const AboutSection = ({ registerSection, scrollToSection }) => {
  return (
    <section
      id="about"
      ref={(el) => registerSection('about', el)}
      className="h-screen mobile-min-h-screen mobile-h-auto w-full snap-start flex items-center bg-white overflow-y-auto lg:overflow-hidden"
    >
      <div className="section-container w-full mobile-padding px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row mobile-gap-6 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          <div className="w-full lg:w-2/5 order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="w-full aspect-square sm:aspect-[4/5] lg:h-96 rounded-lg overflow-hidden animate-fade-in shadow-xl">
                <img
                  src="/broker.jpg"
                  alt="Broker in office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 -right-4 sm:-right-6 lg:-right-8 bg-blue-600 text-white mobile-p-4 p-4 sm:p-6 rounded-lg shadow-xl">
                <p className="text-responsive-2xl sm:text-responsive-3xl lg:text-4xl font-bold">10+</p>
                <p className="text-responsive-xs sm:text-sm uppercase tracking-wider">Metų patirties</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <h2 className="text-responsive-3xl sm:text-responsive-4xl font-bold mb-4 sm:mb-6 animate-fade-in-up text-center lg:text-left">
              Apie <span className="text-blue-600">Mane</span>
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-blue-600 mb-6 sm:mb-8 animate-fade-in-up mx-auto lg:mx-0"></div>
            
            <p className="text-responsive-base sm:text-responsive-lg text-gray-700 mb-4 sm:mb-6 animate-fade-in-up leading-relaxed">
              Esu Lilija Eimontienė – nekilnojamojo turto partnerė, daugiau nei 10 metų dirbanti šioje srityje. Per šį laiką sukaupiau vertingos patirties, ypač namų pardavimo srityje, padėjau daugybei klientų sėkmingai įgyvendinti savo nekilnojamojo turto planus.
            </p>
            
            <p className="text-responsive-base sm:text-responsive-lg text-gray-700 mb-6 sm:mb-8 animate-fade-in-up leading-relaxed">
              Mano stiprybė – ne tik ilgametė patirtis, bet ir puikus statybos procesų bei pačios statybos išmanymas. Šios žinios man leidžia patarti klientams ne tik pardavimo ar pirkimo klausimais, bet ir įvertinti būsto kokybę, galimus patobulinimus ar rizikas.
            </p>
            
            <div className="responsive-grid-2 grid grid-cols-1 sm:grid-cols-2 mobile-gap-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="animate-fade-in-up">
                <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold mb-2">Profesionalumas</h3>
                <p className="text-responsive-sm sm:text-responsive-base text-gray-600">Jei ieškote žmogaus, kuriuo galite pasitikėti – kviečiu susisiekti.</p>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold mb-2">Lankstumas</h3>
                <p className="text-responsive-sm sm:text-responsive-base text-gray-600">Kartu tikrai rasime geriausią sprendimą jums.</p>
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-responsive bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center mx-auto lg:mx-0"
              >
                Susisiekite <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;