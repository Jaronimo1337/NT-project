import React from 'react';
import { Home, TrendingUp, Users, Award } from 'lucide-react';

const AchievementCard = ({ icon, number, label, description, delay }) => {
  return (
    <div
      className="bg-white text-gray-800 p-3 sm:p-4 rounded-lg shadow-lg animate-fade-in-up text-center"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex justify-center mb-2">
        <div className="bg-blue-100 p-2 rounded-full">
          {React.cloneElement(icon, { size: window.innerWidth < 640 ? 18 : 20 })}
        </div>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">{number}</div>
      <h3 className="text-sm sm:text-base font-semibold mb-1">{label}</h3>
      <p className="text-xs sm:text-sm text-gray-600">{description}</p>
    </div>
  );
};

const ExperienceCard = ({ title, description, years, delay }) => {
  return (
    <div
      className="bg-white text-gray-800 p-3 sm:p-4 rounded-lg shadow-lg animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start">
        <div className="bg-blue-600 p-1 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1 flex-shrink-0">
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
  const achievements = [
    {
      icon: <Home className="text-blue-600" />,
      number: "100+",
      label: "Sėkmingai parduotų namų",
      description: "Per 10 metų veiklos padėjau šeimoms rasti savo svajonių namus",
      delay: 0
    },
    {
      icon: <Users className="text-blue-600" />,
      number: "100+",
      label: "Patenkintų klientų",
      description: "Klientai, kurie patikėjo savo nekilnojamojo turto klausimus",
      delay: 0.2
    },
    {
      icon: <TrendingUp className="text-blue-600" />,
      number: "98%",
      label: "Klientų pasitenkinimas",
      description: "Klientai rekomenduoja mano paslaugas draugams ir šeimai",
      delay: 0.4
    },
    {
      icon: <Award className="text-blue-600" />,
      number: "10+",
      label: "Metų patirtis",
      description: "Statybos patirtis ir rinkos išmanymas padeda priimti teisingus sprendimus.",
      delay: 0.6
    }
  ];

  const experiences = [
    {
      years: "10+",
      title: "Statybos proceso ekspertė",
      description: "Puikus statybos procesų išmanymas leidžia įvertinti būsto kokybę, galimus patobulinimus ir rizikas. Konsultuoju klientus ne tik pirkimo klausimais.",
      delay: 0.2
    },
    {
      years: "5+",
      title: "Vilniaus ir aplinkinių rajonų specialistė",
      description: "Gilus Vilniaus ir aplinkinių rajonų pažinimas. Žinau kiekvieno rajono ypatumus, infrastruktūrą ir vystymo planus.",
      delay: 0.4
    }
  ];

  return (
    <section
      id="testimonials"
      ref={(el) => registerSection('testimonials', el)}
      className="h-screen w-full snap-start flex items-center bg-blue-600 text-white overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 animate-fade-in-up">
            Mano <span className="text-blue-200">Patirtis</span>
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-200 mx-auto animate-fade-in-up"></div>
        </div>

        {/* Achievements Section */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-blue-100">Pasiekimai</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                icon={achievement.icon}
                number={achievement.number}
                label={achievement.label}
                description={achievement.description}
                delay={achievement.delay}
              />
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-blue-100">Specializacijos</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                title={experience.title}
                description={experience.description}
                years={experience.years}
                delay={experience.delay}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md text-sm sm:text-base"
          >
            Susisiekite su manimi
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;