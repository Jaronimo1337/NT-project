import React from 'react';
import { PieChart, BarChart, TrendingUp, Users, ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon, title, description, delay, scrollToSection }) => {
  return (
    <div
      className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <button
        onClick={() => scrollToSection('contact')}
        className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors"
      >
        Sužinok daugiau <ArrowRight size={16} className="ml-2" />
      </button>
    </div>
  );
};

const ServicesSection = ({ registerSection, scrollToSection }) => {
  const services = [
    {
      icon: <PieChart size={40} className="text-blue-600" />,
      title: "Pardavimas",
      description: "Parduodant būstą svarbiausia – profesionalus požiūris, rinkos išmanymas ir tinkama strategija. Pasirūpinsiu viskuo nuo A iki Z -  pradedant turto įvertinimu, rinkodara, potencialių pirkėjų atranka ir baigiant sklandžiu sandoriu.",
      delay: 0
    },
    {
      icon: <BarChart size={40} className="text-blue-600" />,
      title: "Nuoma",
      description: "Ieškai patikimo nuomininko ar nori išnuomoti turtą be rūpesčių? Padėsiu tinkamai paruošti nuomojamą būstą, pritraukti atsakingus nuomininkus ir pasirūpint",
      delay: 0.2
    },
    {
      icon: <TrendingUp size={40} className="text-blue-600" />,
      title: "Pirkimas ir Paieška",
      description: "Naujo būsto paieška gali būti varginanti – bet tik ne tada, kai dirbame kartu. Įsiklausau į tavo poreikius ir padedu rasti ne bet kokį, o tinkamiausią variantą. Patariu ne tik dėl kainos ar vietos, bet ir dėl būsto būklės, vertės bei statybos kokybės.",
      delay: 0.4
    },
  ];

  return (
    <section
      id="services"
      ref={(el) => registerSection('services', el)}
      className="h-screen w-full snap-start flex items-center bg-gray-50"
    >
      <div className="w-full px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            <span className="text-blue-600">Paslaugos</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8 animate-fade-in-up"></div>
          <p className="text-lg text-gray-700 mx-auto animate-fade-in-up">
          Tavo tikslas – mano prioritetas. O saugumas ir aiškumas kiekviename žingsnyje – garantuotas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
