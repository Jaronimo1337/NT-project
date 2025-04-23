import { ArrowRight } from 'lucide-react';
import React from 'react';


const AboutSection = ({ registerSection, scrollToSection }) => {
  return (
    <section
      id="about"
      ref={(el) => registerSection('about', el)}
      className="h-screen w-full snap-start flex items-center bg-white"
    >
      <div className="w-full px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-2/5">
            <div className="relative">
              <div className="w-full h-96 rounded-lg overflow-hidden animate-fade-in">
                <img
                  src="../../public/broker.jpg"
                  alt="Broker in office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-6 rounded-lg shadow-xl">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm uppercase tracking-wider">Metų patirties</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">
              Apie <span className="text-blue-600">Mane</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-8 animate-fade-in-up"></div>
            <p className="text-lg text-gray-700 mb-6 animate-fade-in-up">
            Esu Lilija Eimontienė – nekilnojamojo turto brokerė, daugiau nei 10 metų dirbanti šioje srityje. Per šį laiką sukaupiau vertingos patirties, ypač namų pardavimo srityje,  padėjau daugybei klientų sėkmingai įgyvendinti savo nekilnojamojo turto planus.            </p>
            <p className="text-lg text-gray-700 mb-8 animate-fade-in-up">
            Mano stiprybė – ne tik ilgametė patirtis, bet ir puikus statybos procesų bei pačios statybos išmanymas. Šios žinios man leidžia patarti klientams ne tik pardavimo ar pirkimo klausimais, bet ir įvertinti būsto kokybę, galimus patobulinimus ar rizikas.             </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="animate-fade-in-up">
                <h3 className="text-xl font-semibold mb-2">Profesionalumas</h3>
                <p className="text-gray-600">Jei ieškote žmogaus, kuriuo galite pasitikėti – kviečiu susisiekti. </p>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-semibold mb-2">Lankstumas</h3>
                <p className="text-gray-600">Kartu tikrai rasime geriausią sprendimą jums. </p>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center"
            >
              Susisiekite <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;