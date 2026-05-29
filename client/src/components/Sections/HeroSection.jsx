import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { HERO_IMAGE } from '../../config/assets';

const stats = [
  { value: '10+', label: 'Metų patirties' },
  { value: '100+', label: 'Klientų' },
  { value: '98%', label: 'Rekomenduoja' }
];

const HeroSection = ({ registerSection, scrollToSection }) => {
  const { t } = useSiteContent();

  const heroContent = (
  <>
          <p className="text-[#c4a35a] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            {t('contact.location', 'Vilnius ir apylinkės')}
          </p>

          <h1 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.12] mb-5">
            {t('hero.title', 'Patikimas kelias į jūsų naujus namus')}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-lg">
            {t('hero.paragraph1', '')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className="inline-flex items-center justify-center gap-2 bg-[#c4a35a] hover:bg-[#d4b36a] text-[#1a3335] font-semibold text-sm sm:text-base px-6 py-3 rounded-lg transition-colors"
            >
              {t('nav.portfolio', 'Projektai')}
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-lg border border-white/30 transition-colors"
            >
              {t('hero.ctaContact', 'Kontaktai')}
            </button>
          </div>

          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-[#c4a35a] leading-none">{stat.value}</p>
                <p className="text-xs sm:text-sm text-white/70 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
  </>
  );

  return (
    <section
      id="home"
      ref={(el) => registerSection('home', el)}
      className="page-section section-reveal relative w-full min-h-screen overflow-hidden"
    >
      {/* Desktop: full-bleed background + side gradient */}
      <img
        src={HERO_IMAGE}
        alt=""
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-[78%_center] brightness-[1.12] contrast-[1.03] saturate-[1.05]"
        fetchPriority="high"
        aria-hidden
      />
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right,
            rgba(26, 51, 53, 0.92) 0%,
            rgba(26, 51, 53, 0.88) 30%,
            rgba(26, 51, 53, 0.72) 38%,
            rgba(26, 51, 53, 0.52) 46%,
            rgba(26, 51, 53, 0.32) 54%,
            rgba(26, 51, 53, 0.16) 62%,
            rgba(26, 51, 53, 0.06) 70%,
            transparent 80%
          )`
        }}
        aria-hidden
      />

      {/* Mobile: photo on top, text below (no text on face) */}
      <div className="md:hidden flex flex-col min-h-screen">
        <div className="relative w-full h-[44vh] min-h-[220px] max-h-[360px] flex-shrink-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[70%_20%] brightness-[1.08]"
            fetchPriority="high"
          />
        </div>
        <div className="flex-1 bg-[#1a3335] px-6 py-8">
          <div className="w-full max-w-md text-left">{heroContent}</div>
        </div>
      </div>

      {/* Desktop: text overlay */}
      <div className="hidden md:flex relative z-10 min-h-screen items-center pt-20 pb-14 pl-[11vw] lg:pl-[12vw] xl:pl-[13vw] pr-8">
        <div className="w-full max-w-md lg:max-w-lg text-left">{heroContent}</div>
      </div>
    </section>
  );
};

export default HeroSection;
