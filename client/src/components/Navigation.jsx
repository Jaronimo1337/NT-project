import { Menu, X } from 'lucide-react';
import React from 'react';


const Navigation = ({ activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }) => {
  const navSections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="w-full px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl flex font-bold">
<img src="../public/newnewlogo.png" className='w-20 py-3' alt="" />
<div className='pt-12 pl-2 text-[#325b5d] text-[1rem]'>
    <div className='font-mono font-light'>
        Lilija Eimontienė
    </div>
    <div className='font-extralight opacity-75 '>
        NT brokerė Vilniuje
    </div>
</div>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navSections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`uppercase text-sm font-semibold tracking-wide ${
                activeSection === section
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-lg py-4 animate-fade-in">
          <div className="w-full px-4 flex flex-col space-y-4">
            {navSections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`py-2 uppercase text-sm font-semibold tracking-wide text-left ${
                  activeSection === section
                    ? 'text-blue-600 border-l-4 border-blue-600 pl-2'
                    : 'text-gray-600 hover:text-blue-600 pl-2'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
