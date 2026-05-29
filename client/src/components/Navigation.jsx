import { Menu, X } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { SITE_LOGO } from '../config/assets';

const Navigation = ({ activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }) => {
  const { t } = useSiteContent();

  const navSections = [
    { id: 'home', labelKey: 'nav.home', fallback: 'Pagrindinis' },
    { id: 'about', labelKey: 'nav.about', fallback: 'Apie mane' },
    { id: 'services', labelKey: 'nav.services', fallback: 'Paslaugos' },
    { id: 'portfolio', labelKey: 'nav.portfolio', fallback: 'Projektai' },
    { id: 'testimonials', labelKey: 'nav.testimonials', fallback: 'Patirtis' },
    { id: 'contact', labelKey: 'nav.contact', fallback: 'Kontaktai' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex justify-between items-center h-[var(--site-header-height)]">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="flex items-center min-w-0 group h-full py-2"
        >
          <img
            src={SITE_LOGO}
            alt=""
            className="h-11 w-auto max-h-full sm:h-12 object-contain flex-shrink-0"
          />
          <div className="hidden sm:block pl-2 text-left min-w-0 pt-1">
            <div className="font-semibold text-[#325b5d] text-sm lg:text-base leading-tight group-hover:text-[#1a3335] transition-colors">
              {t('nav.brandName', 'Lilija Eimontienė')}
            </div>
            <div className="text-xs text-[#325b5d]/75 font-light">
              {t('nav.tagline', 'Nekilnojamojo turto paslaugos')}
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-400 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {t(section.labelKey, section.fallback)}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-lg animate-fade-in border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-1">
            {navSections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    scrollToSection(section.id);
                    setIsMenuOpen(false);
                  }}
                  className={`py-3 px-4 text-left font-medium tracking-wide transition-colors rounded-lg ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-400'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {t(section.labelKey, section.fallback)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
