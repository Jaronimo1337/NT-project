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
      <div className="w-full px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl flex font-bold">
            <img src="/newnewlogo.png" className='w-20 py-3' alt="Lilija Eimontienė Logo" />
            <div className='pt-12 pl-2 text-[#325b5d] text-[1rem]'>
              <div className='font-mono font-light'>
                Lilija Eimontienė
              </div>
              <div className='font-extralight opacity-75 '>
                Nekilnojamo turto paslaugos
              </div>
            </div>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
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
          className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-lg animate-fade-in border-t border-gray-100">
          <div className="w-full px-4 py-4 flex flex-col space-y-1">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id);
                  setIsMenuOpen(false);
                }}
                className={`py-3 px-4 text-left font-medium tracking-wide transition-colors rounded-lg ${
                  activeSection === section.id
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {section.label}
              </button>
            ))}
            
            {/* Mobile Contact Info */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-2">Greitas kontaktas</div>
              <div className="text-sm text-gray-600">
                <div className="mb-1">📞 +370 XXX XXXXX</div>
                <div>✉️ lilija.eimontiene@example.com</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;