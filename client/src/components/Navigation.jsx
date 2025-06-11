import { Menu, X } from 'lucide-react';

const Navigation = ({ activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }) => {
  const navSections = [
    { id: 'home', label: 'Pagrindinis' },
    { id: 'about', label: 'Apie mane' },
    { id: 'services', label: 'Paslaugos' },
    { id: 'portfolio', label: 'Namai' },
    { id: 'testimonials', label: 'Patirtis' },
    { id: 'contact', label: 'Kontaktai' }
  ];
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="w-full nav-container px-2 sm:px-4 lg:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-responsive-lg flex font-bold">
            <img 
              src="/newnewlogo.png" 
              className="nav-logo w-12 sm:w-16 lg:w-20 py-2 sm:py-3" 
              alt="Lilija Eimontienė Logo" 
            />
            <div className="pt-8 sm:pt-10 lg:pt-12 pl-1 sm:pl-2 text-[#325b5d] text-xs sm:text-sm lg:text-base">
              <div className="font-mono font-light nav-text">
                Lilija Eimontienė
              </div>
              <div className="font-extralight opacity-75 text-xs sm:text-sm">
                Nekilnojamo turto paslaugos
              </div>
            </div>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-4 xl:space-x-8">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 px-2 py-1 ${
                activeSection === section.id
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white w-full shadow-lg animate-fade-in border-t border-gray-100">
          <div className="w-full mobile-padding px-2 py-2 flex flex-col space-y-1">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id);
                  setIsMenuOpen(false);
                }}
                className={`py-2 px-3 text-left font-medium tracking-wide transition-colors rounded-lg text-sm ${
                  activeSection === section.id
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {section.label}
              </button>
            ))}
            
            {/* Mobile Contact Info */}
            <div className="pt-3 mt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-2">Greitas kontaktas</div>
              <div className="text-xs text-gray-600">
                <div className="mb-1">📞 +370 68528893</div>
                <div>✉️ lilija.eimontiene@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;