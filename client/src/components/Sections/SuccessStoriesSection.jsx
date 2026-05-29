import React from 'react';
import { Home, TrendingUp, Users, Award } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

const AchievementCard = ({ icon, number, label, description, delay }) => {
  return (
    <div
      className="bg-white text-gray-800 p-3 sm:p-4 rounded-xl shadow-lg animate-fade-in-up text-center border border-white/20"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex justify-center mb-2">
        <div className="bg-[#325b5d]/10 p-2 rounded-full">
          {React.cloneElement(icon, { size: 20, className: 'text-[#325b5d]' })}
        </div>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-[#c4a35a] mb-1">{number}</div>
      <h3 className="text-sm sm:text-base font-semibold mb-1">{label}</h3>
      <p className="text-xs sm:text-sm text-gray-600">{description}</p>
    </div>
  );
};

const ExperienceCard = ({ title, description, years, delay }) => {
  return (
    <div
      className="bg-white text-gray-800 p-3 sm:p-4 rounded-xl shadow-lg animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start">
        <div className="bg-[#c4a35a] p-1 text-[#1a3335] rounded-lg w-10 h-10 flex items-center justify-center text-xs font-bold mr-3 mt-1 flex-shrink-0">
          {years}
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-1">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const SuccessStoriesSection = ({ registerSection, scrollToSection }) => {
  const { t } = useSiteContent();
  const title = t('experience.title', 'Mano Patirtis');
  const titleParts = title.split(' ');
  const lastWord = titleParts.pop() || '';
  const firstPart = titleParts.join(' ') || title;

  const achievements = [
    {
      icon: <Home />,
      number: t('experience.ach1Number', '100+'),
      label: t('experience.ach1Label', ''),
      description: t('experience.ach1Desc', ''),
      delay: 0
    },
    {
      icon: <Users />,
      number: t('experience.ach2Number', '100+'),
      label: t('experience.ach2Label', ''),
      description: t('experience.ach2Desc', ''),
      delay: 0.2
    },
    {
      icon: <TrendingUp />,
      number: t('experience.ach3Number', '98%'),
      label: t('experience.ach3Label', ''),
      description: t('experience.ach3Desc', ''),
      delay: 0.4
    },
    {
      icon: <Award />,
      number: t('experience.ach4Number', '10+'),
      label: t('experience.ach4Label', ''),
      description: t('experience.ach4Desc', ''),
      delay: 0.6
    }
  ];

  const experiences = [
    {
      years: t('experience.exp1Years', '10+'),
      title: t('experience.exp1Title', ''),
      description: t('experience.exp1Desc', ''),
      delay: 0.2
    },
    {
      years: t('experience.exp2Years', '5+'),
      title: t('experience.exp2Title', ''),
      description: t('experience.exp2Desc', ''),
      delay: 0.4
    }
  ];

  return (
    <section
      id="testimonials"
      ref={(el) => registerSection('testimonials', el)}
      className="page-section section-reveal h-screen w-full flex items-center text-white overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #264648 0%, #325b5d 50%, #3d7275 100%)' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 animate-fade-in-up">
            {firstPart} <span className="text-[#c4a35a]">{lastWord}</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-[#c4a35a] mx-auto animate-fade-in-up"></div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white/90">
            {t('experience.achievementsHeading', 'Pasiekimai')}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} {...achievement} />
            ))}
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-white/90">
            {t('experience.specializationsHeading', 'Specializacijos')}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-[#c4a35a] text-[#1a3335] px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#d4b36a] transition-colors shadow-md text-sm sm:text-base"
          >
            {t('experience.cta', 'Susisiekite su manimi')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
