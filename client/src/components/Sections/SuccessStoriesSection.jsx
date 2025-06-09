import React from 'react';
import { Home, TrendingUp, Users, Award } from 'lucide-react';

const AchievementCard = ({ icon, number, label, description, delay }) => {
  return (
    <div
      className="bg-white text-gray-800 p-6 rounded-lg shadow-lg animate-fade-in-up text-center"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const ExperienceCard = ({ title, description, years, delay }) => {
  return (
    <div
      className="bg-white text-gray-800 p-6 rounded-lg shadow-lg animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start">
        <div className="bg-blue-600 p-1 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
          {years}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const SuccessStoriesSection = ({ registerSection, scrollToSection }) => {
  const achievements = [
    {
      icon: <Home size={24} className="text-blue-600" />,
      number: "100+",
      label: "Sėkmingai parduotų namų",
      description: "Per 10 metų veiklos padėjau šeimoms rasti savo svajonių namus",
      delay: 0
    },
    {
      icon: <Users size={24} className="text-blue-600" />,
      number: "100+",
      label: "Patenkintų klientų",
      description: "Klientai, kurie patikėjo savo nekilnojamojo turto klausimus",
      delay: 0.2
    },
    {
      icon: <TrendingUp size={24} className="text-blue-600" />,
      number: "98%",
      label: "Klientų pasitenkinimas",
      description: "Klientai rekomenduoja mano paslaugas draugams ir šeimai",
      delay: 0.4
    },
    {
      icon: <Award size={24} className="text-blue-600" />,
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
      className="h-screen w-full snap-start flex items-center bg-blue-600 text-white overflow-y-auto"
    >
      <div className="w-full px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            Mano <span className="text-blue-200">Patirtis</span>
          </h2>
          <div className="w-16 h-1 bg-blue-200 mx-auto  animate-fade-in-up"></div>
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-100">Pasiekimai</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-100">Specializacijos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
        <div className="text-center mt-12">
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md"
          >
            Susisiekite su manimi
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;