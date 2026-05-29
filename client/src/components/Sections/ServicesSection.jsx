import React from 'react';
import { PieChart, BarChart, TrendingUp, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

const ServiceCard = ({ icon, title, description, delay, scrollToSection, ctaLabel }) => {
  return (
    <div
      className="service-card bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up border border-[#325b5d]/5 hover:border-[#325b5d]/15"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4 sm:mb-6">{icon}</div>
      <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold mb-3 sm:mb-4 text-[#1a3335]">{title}</h3>
      <p className="text-responsive-sm sm:text-responsive-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{description}</p>
      <button
        onClick={() => scrollToSection('contact')}
        className="text-[#325b5d] font-medium flex items-center hover:text-blue-600 transition-colors text-sm sm:text-base"
      >
        {ctaLabel} <ArrowRight size={16} className="ml-2" />
      </button>
    </div>
  );
};

const ServicesSection = ({ registerSection, scrollToSection }) => {
  const { t } = useSiteContent();

  const services = [
    {
      icon: <PieChart size={32} className="text-[#325b5d] sm:w-10 sm:h-10" />,
      title: t('services.card1Title', 'Pardavimas'),
      description: t('services.card1Desc', ''),
      delay: 0
    },
    {
      icon: <BarChart size={32} className="text-[#325b5d] sm:w-10 sm:h-10" />,
      title: t('services.card2Title', 'Sklypų paieška ir jų vertinimas'),
      description: t('services.card2Desc', ''),
      delay: 0.2
    },
    {
      icon: <TrendingUp size={32} className="text-[#325b5d] sm:w-10 sm:h-10" />,
      title: t('services.card3Title', 'Pirkimas ir Paieška'),
      description: t('services.card3Desc', ''),
      delay: 0.4
    },
  ];

  return (
    <section
      id="services"
      ref={(el) => registerSection('services', el)}
      className="page-section section-reveal h-screen mobile-min-h-screen mobile-h-auto w-full flex items-center bg-[#eef3f1] overflow-y-auto lg:overflow-hidden"
    >
      <div className="section-container w-full mobile-padding px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-responsive-3xl sm:text-responsive-4xl font-bold mb-3 sm:mb-4 animate-fade-in-up text-[#1a3335]">
            <span className="text-[#325b5d]">{t('services.title', 'Paslaugos')}</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-400 mx-auto mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up"></div>
          <p className="text-responsive-base sm:text-responsive-lg text-[#3d5a5c] mx-auto animate-fade-in-up max-w-3xl leading-relaxed">
            {t('services.subtitle', '')}
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
              ctaLabel={t('services.cardCta', 'Sužinok daugiau')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
