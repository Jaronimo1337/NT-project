import React from 'react';
import { Phone, Mail, MapPin, Clock, Home } from 'lucide-react';

const Footer = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8 snap-end w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Home size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-blue-400">Lilija Eimontienė</h2>
                <p className="text-gray-400 text-xs">Nekilnojamojo turto paslaugos</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              10+ metų patirties nekilnojamojo turto srityje. Padėsiu rasti jūsų svajonių namus arba sėkmingai parduoti turimą turtą.
            </p>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-3 text-blue-400">Paslaugos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center justify-center md:justify-start"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Namų pardavimas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center justify-center md:justify-start"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Namų pirkimas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center justify-center md:justify-start"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Turto vertinimas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center justify-center md:justify-start"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Nemokamos konsultacijos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-3 text-blue-400">Kontaktai</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center md:justify-start text-gray-300">
                <Phone size={14} className="mr-2 text-blue-400 flex-shrink-0" />
                <span>+370 68528893</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-300">
                <Mail size={14} className="mr-2 text-blue-400 flex-shrink-0" />
                <span className="break-all">lilija.eimontiene@gmail.com</span>
              </div>
              <div className="flex items-start justify-center md:justify-start text-gray-300">
                <MapPin size={14} className="mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Vilnius ir apylinkės</span>
              </div>
              <div className="flex items-start justify-center md:justify-start text-gray-300">
                <Clock size={14} className="mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Pr-Pt: 9:00-18:00</p>
                  <p>Št: 10:00-16:00 • Sk: susitarus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-3 text-blue-400">Nuorodos</h3>
            <ul className="space-y-2 text-sm mb-4">
              {['Pagrindinis', 'Apie mane', 'Paslaugos', 'Namai', 'Kontaktai'].map((item, index) => {
                const sectionIds = ['home', 'about', 'services', 'portfolio', 'contact'];
                return (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(sectionIds[index])}
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Quick Stats */}
            <div className="border-t border-gray-700 pt-3">
              <h4 className="text-sm font-semibold mb-2 text-gray-400">Statistika</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-blue-400 font-bold">150+</div>
                  <div className="text-gray-500">Parduotų namų</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-bold">10+</div>
                  <div className="text-gray-500">Metų patirtis</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-gray-400 text-xs text-center md:text-left">
              © {currentYear}. Visos teisės saugomos. Created by <a href="https://www.linkedin.com/in/jaroslav-pa%C5%A1kel/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors">Jaroslav Paškel</a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-gray-500">
              <button className="hover:text-gray-300 transition-colors">
                Privatumo politika
              </button>
              <button className="hover:text-gray-300 transition-colors">
                Paslaugų teikimo taisyklės
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-gray-300 transition-colors"
              >
                Skundai ir pasiūlymai
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;