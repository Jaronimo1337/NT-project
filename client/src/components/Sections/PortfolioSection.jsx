import React from 'react';

const ProjectCard = ({ title, category, return: roi, delay, index }) => {
    return (
      <div
        className="group relative overflow-hidden rounded-lg shadow-lg animate-fade-in-up h-64"
        style={{ animationDelay: `${delay}s` }}
      >
        <img
          src={`/api/placeholder/${600 + index}/${400 + index}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300">
          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">{category}</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {roi}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  const PortfolioSection = ({ registerSection, scrollToSection }) => {
    const projects = [
      {
        title: "Real Estate Fund",
        category: "Property Investment",
        return: "18% ROI",
        delay: 0
      },
      {
        title: "Tech Startup Portfolio",
        category: "Venture Capital",
        return: "32% ROI",
        delay: 0.2
      },
      {
        title: "Sustainable Energy",
        category: "Green Investment",
        return: "22% ROI",
        delay: 0.4
      },
      {
        title: "Healthcare Innovation",
        category: "Growth Stocks",
        return: "27% ROI",
        delay: 0.2
      },
      {
        title: "Global Diversification",
        category: "International Markets",
        return: "15% ROI",
        delay: 0.4
      },
      {
        title: "Fixed Income Strategy",
        category: "Bonds & Securities",
        return: "12% ROI",
        delay: 0.6
      }
    ];
  
    return (
      <section
        id="portfolio"
        ref={(el) => registerSection('portfolio', el)}
        className="h-screen w-full snap-start flex items-center bg-white"
      >
        <div className="w-full px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
              Featured <span className="text-blue-600">Projects</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-8 animate-fade-in-up"></div>
            <p className="text-lg text-gray-700  mx-auto animate-fade-in-up">
              A showcase of successful client portfolios and investment projects.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                index={index}
                title={project.title}
                category={project.category}
                return={project.return}
                delay={project.delay}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PortfolioSection;