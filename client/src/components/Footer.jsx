import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { SITE_LOGO } from '../config/assets';

const Footer = ({ scrollToSection, registerSection }) => {
  const { t } = useSiteContent();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t('nav.home', 'Pagrindinis'), id: 'home' },
    { label: t('nav.about', 'Apie mane'), id: 'about' },
    { label: t('nav.services', 'Paslaugos'), id: 'services' },
    { label: t('nav.portfolio', 'Projektai'), id: 'portfolio' },
    { label: t('nav.contact', 'Kontaktai'), id: 'contact' }
  ];

  const services = [
    { label: 'Namų pardavimas', id: 'services' },
    { label: 'Namų pirkimas', id: 'services' },
    { label: 'Sklypų paieška', id: 'services' },
    { label: 'Nemokama konsultacija', id: 'contact' }
  ];

  return (
    <footer
      id="footer"
      ref={(el) => registerSection?.('footer', el)}
      className="page-section section-reveal bg-gray-900 text-white w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          <div className="text-center md:text-left lg:col-span-1">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="inline-flex items-center gap-3 mb-4 group"
            >
              <img
                src={SITE_LOGO}
                alt=""
                className="w-16 sm:w-20 object-contain flex-shrink-0"
              />
              <div className="text-left">
                <h2 className="text-lg font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                  {t('nav.brandName', 'Lilija Eimontienė')}
                </h2>
                <p className="text-gray-400 text-xs uppercase tracking-wider mt-0.5">
                  {t('nav.brandTagline', 'Nekilnojamojo turto paslaugos')}
                </p>
              </div>
            </button>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              {t('footer.tagline', '10+ metų patirties nekilnojamojo turto srityje.')}
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">
              Paslaugos
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">
              Kontaktai
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${t('contact.phone', '+37068528893').replace(/\s/g, '')}`}
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Phone size={15} className="text-blue-400 flex-shrink-0" />
                {t('contact.phone', '+370 68528893')}
              </a>
              <a
                href={`mailto:${t('contact.email', 'lilija.eimontiene@gmail.com')}`}
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-blue-400 transition-colors break-all"
              >
                <Mail size={15} className="text-blue-400 flex-shrink-0" />
                {t('contact.email', 'lilija.eimontiene@gmail.com')}
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300">
                <MapPin size={15} className="text-blue-400 flex-shrink-0" />
                {t('contact.location', 'Vilnius ir apylinkės')}
              </div>
              <div className="flex items-start justify-center md:justify-start gap-2 text-gray-400">
                <Clock size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{t('contact.hours', 'Pr-Pt: 9:00-18:00 • Št: 10:00-16:00')}</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">
              Nuorodos
            </h3>
            <ul className="space-y-2.5 text-sm mb-6">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-6 justify-center md:justify-start">
              <div>
                <div className="text-2xl font-bold text-blue-400">100+</div>
                <div className="text-xs text-gray-500 mt-0.5">Klientų</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">10+</div>
                <div className="text-xs text-gray-500 mt-0.5">Metų patirties</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p className="text-center md:text-left">
              © {currentYear} {t('nav.brandName', 'Lilija Eimontienė')}.{' '}
              {t('footer.copyright', 'Visos teisės saugomos.')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button type="button" className="hover:text-blue-400 transition-colors">
                Privatumo politika
              </button>
              <button type="button" className="hover:text-blue-400 transition-colors">
                Taisyklės
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="hover:text-blue-400 transition-colors"
              >
                Susisiekti
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
