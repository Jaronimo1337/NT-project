import React from 'react';
import { PieChart, BarChart, TrendingUp, Users, ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon, title, description, delay, scrollToSection }) => {
  return (
    <div
      className="service-card bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4 sm:mb-6">{icon}</div>
      <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold mb-3 sm:mb-4">{title}</h3>
      <p className="text-responsive-sm sm:text-responsive-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{description}</p>
      <button
        onClick={() => scrollToSection('contact')}
        className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors text-sm sm:text-base"
      >
        Sužinok daugiau <ArrowRight size={16} className="ml-2" />
      </button>
    </div>
  );
};

const ServicesSection = ({ registerSection, scrollToSection }) => {
  const services = [
    {
      icon: <PieChart size={32} className="text-blue-600 sm:w-10 sm:h-10" />,
      title: "Pardavimas",
      description: "Parduodant būstą svarbiausia – profesionalus požiūris, rinkos išmanymas ir tinkama strategija. Pasirūpinsiu viskuo nuo A iki Z - pradedant turto įvertinimu, rinkodara, potencialių pirkėjų atranka ir baigiant sklandžiu sandoriu.",
      delay: 0
    },
    {
      icon: <BarChart size={32} className="text-blue-600 sm:w-10 sm:h-10" />,
      title: "Sklypų paieška ir jų vertinimas",
      description: "Ieškai tinkamo sklypo namui ar investicijai? Padėsiu įvertinti sklypo formą, paskirtį, privažiavimą ir kitus svarbius aspektus. Naudodamasis duomenų bazėmis ir patirtimi padėsiu priimti geriausią sprendimą.",
      delay: 0.2
    },
    {
      icon: <TrendingUp size={32} className="text-blue-600 sm:w-10 sm:h-10" />,
      title: "Pirkimas ir Paieška",
      description: "Naujo būsto paieška gali būti varginanti – bet tik ne tada, kai dirbame kartu. Įsiklausau į tavo poreikius ir padedu rasti ne bet kokį, o tinkamiausią variantą. Patariu ne tik dėl kainos ar vietos, bet ir dėl būsto būklės, vertės bei statybos kokybės.",
      delay: 0.4
    },
  ];

  return (
    <section
      id="services"
      ref={(el) => registerSection('services', el)}
      className="h-screen mobile-min-h-screen mobile-h-auto w-full snap-start flex items-center bg-gray-50 overflow-y-auto lg:overflow-hidden"
    >
      <div className="section-container w-full mobile-padding px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-responsive-3xl sm:text-responsive-4xl font-bold mb-3 sm:mb-4 animate-fade-in-up">
            <span className="text-blue-600">Paslaugos</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up"></div>
          <p className="text-responsive-base sm:text-responsive-lg text-gray-700 mx-auto animate-fade-in-up max-w-3xl leading-relaxed">
            Tavo tikslas – mano prioritetas. O saugumas ir aiškumas kiekviename žingsnyje – garantuotas.
          </p>
        </div>

        <div className="responsive-grid-3 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
              scrollToSection={scrollToSection}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;