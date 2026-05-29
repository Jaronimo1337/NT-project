import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { ABOUT_IMAGE } from '../../config/assets';

const AboutSection = ({ registerSection, scrollToSection }) => {
  const { t } = useSiteContent();
  const [aboutImageOk, setAboutImageOk] = useState(true);
  const title = t('about.title', 'Apie Mane');
  const titleParts = title.split(' ');
  const lastWord = titleParts.pop() || '';
  const firstPart = titleParts.join(' ') || title;

  return (
    <section
      id="about"
      ref={(el) => registerSection('about', el)}
      className="page-section section-reveal h-screen mobile-min-h-screen mobile-h-auto w-full flex items-center bg-white overflow-y-auto lg:overflow-hidden"
    >
      <div className="section-container w-full mobile-padding px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row mobile-gap-6 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          <div className="w-full lg:w-2/5 order-1">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="w-full aspect-[4/3] sm:aspect-[3/2] lg:h-96 rounded-2xl overflow-hidden animate-fade-in shadow-xl bg-gradient-to-br from-[#e8eeec] via-[#f4f7f6] to-[#dce8e5] relative">
                {aboutImageOk ? (
                  <img
                    src={ABOUT_IMAGE}
                    alt=""
                    className="w-full h-full object-cover object-top sm:object-center"
                    onError={() => setAboutImageOk(false)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#5a7577] text-sm px-6 text-center">
                    Nuotrauka nerasta
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 -right-4 sm:-right-6 lg:-right-8 bg-[#325b5d] text-white mobile-p-4 p-4 sm:p-6 rounded-xl shadow-xl border border-blue-200/50">
                <p className="text-responsive-2xl sm:text-responsive-3xl lg:text-4xl font-bold">{t('about.statNumber', '10+')}</p>
                <p className="text-responsive-xs sm:text-sm uppercase tracking-wider text-blue-200">{t('about.statLabel', 'Metų patirties')}</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-3/5 order-2">
            <h2 className="text-responsive-3xl sm:text-responsive-4xl font-bold mb-4 sm:mb-6 animate-fade-in-up text-center lg:text-left text-[#1a3335]">
              {firstPart}{' '}
              <span className="text-[#325b5d]">{lastWord}</span>
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-blue-400 mb-6 sm:mb-8 animate-fade-in-up mx-auto lg:mx-0"></div>
            
            <p className="text-responsive-base sm:text-responsive-lg text-[#3d5a5c] mb-4 sm:mb-6 animate-fade-in-up leading-relaxed">
              {t('about.paragraph1', '')}
            </p>
            
            <p className="text-responsive-base sm:text-responsive-lg text-[#3d5a5c] mb-6 sm:mb-8 animate-fade-in-up leading-relaxed">
              {t('about.paragraph2', '')}
            </p>
            
            <div className="responsive-grid-2 grid grid-cols-1 sm:grid-cols-2 mobile-gap-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="animate-fade-in-up p-4 rounded-xl bg-[#f4f7f6] border border-[#325b5d]/10">
                <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold mb-2 text-[#325b5d]">{t('about.feature1Title', 'Profesionalumas')}</h3>
                <p className="text-responsive-sm sm:text-responsive-base text-gray-600">{t('about.feature1Text', '')}</p>
              </div>
              <div className="animate-fade-in-up p-4 rounded-xl bg-[#f4f7f6] border border-[#325b5d]/10" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-responsive-lg sm:text-responsive-xl font-semibold mb-2 text-[#325b5d]">{t('about.feature2Title', 'Lankstumas')}</h3>
                <p className="text-responsive-sm sm:text-responsive-base text-gray-600">{t('about.feature2Text', '')}</p>
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-responsive btn-brand px-6 sm:px-8 py-3 rounded-lg shadow-md flex items-center mx-auto lg:mx-0"
              >
                {t('about.cta', 'Susisiekite')} <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
