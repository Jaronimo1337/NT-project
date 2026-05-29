import { Menu, X } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { SITE_LOGO } from '../config/assets';

const Navigation = ({ activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }) => {
  const { t } = useSiteContent();
  const onHero = activeSection === 'home';

  const navSections = [
    { id: 'home', labelKey: 'nav.home', fallback: 'Pagrindinis' },
    { id: 'about', labelKey: 'nav.about', fallback: 'Apie mane' },
    { id: 'services', labelKey: 'nav.services', fallback: 'Paslaugos' },
    { id: 'portfolio', labelKey: 'nav.portfolio', fallback: 'Projektai' },
    { id: 'testimonials', labelKey: 'nav.testimonials', fallback: 'Patirtis' },
    { id: 'contact', labelKey: 'nav.contact', fallback: 'Kontaktai' }
  ];

  const headerSurface = onHero
    ? 'bg-transparent border-b border-white/10'
    : 'bg-white border-b border-gray-200 shadow-sm';

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className={`transition-all duration-300 ${headerSurface}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-[4.25rem] gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 min-w-0 group justify-self-start"
            >
              <img
                src={SITE_LOGO}
                alt=""
                className={`h-10 w-10 sm:h-11 sm:w-11 object-contain flex-shrink-0 transition-all ${
                  onHero ? 'brightness-0 invert opacity-95' : ''
                }`}
              />
              <div className="hidden sm:block text-left min-w-0">
                <span
                  className={`block font-semibold text-sm lg:text-base leading-tight truncate transition-colors ${
                    onHero ? 'text-white group-hover:text-[#c4a35a]' : 'text-[#1a3335] group-hover:text-[#325b5d]'
                  }`}
                >
                  {t('nav.brandName', 'Lilija Eimontienė')}
                </span>
                <span
                  className={`block text-[10px] lg:text-xs uppercase tracking-widest mt-0.5 ${
                    onHero ? 'text-white/55' : 'text-[#325b5d]/70'
                  }`}
                >
                  NT konsultantė
                </span>
              </div>
            </button>

            <nav
              className={`hidden lg:flex items-center gap-1 p-1 rounded-full transition-colors justify-self-center ${
                onHero ? 'bg-black/25 border border-white/15 backdrop-blur-sm' : 'bg-[#f0f5f3] border border-[#325b5d]/8'
              }`}
            >
              {navSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3 xl:px-4 py-2 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? onHero
                          ? 'bg-white text-[#1a3335]'
                          : 'bg-[#325b5d] text-white shadow-sm'
                        : onHero
                          ? 'text-white/85 hover:text-white hover:bg-white/10'
                          : 'text-[#3d5a5c] hover:text-[#325b5d] hover:bg-white/80'
                    }`}
                  >
                    {t(section.labelKey, section.fallback)}
                  </button>
                );
              })}
            </nav>

            <div className="justify-self-end">
              <button
                type="button"
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  onHero ? 'text-white hover:bg-white/10' : 'text-[#325b5d] hover:bg-[#e8eeec]'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`lg:hidden border-b shadow-lg ${
            onHero ? 'bg-[#1a3335]/95 backdrop-blur-md border-white/10' : 'bg-white border-[#325b5d]/10'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
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
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#c4a35a] text-[#1a3335]'
                      : onHero
                        ? 'text-white/90 hover:bg-white/10'
                        : 'text-[#3d5a5c] hover:bg-[#f0f5f3]'
                  }`}
                >
                  {t(section.labelKey, section.fallback)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
