import React from 'react';
import { Phone, Mail, MapPin, Clock, Home, Users, Award } from 'lucide-react';

const Footer = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12 snap-end w-full">
      <div className="w-full px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Home size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-400">Lilija Eimontienė</h2>
                <p className="text-gray-400 text-sm">Nekilnojamojo turto paslaugos</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              10+ metų patirties nekilnojamojo turto srityje. Padėsiu rasti jūsų svajonių namus arba sėkmingai parduoti turimą turtą.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Paslaugos</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Namų pardavimas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Namų pirkimas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Nuomos paslaugos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Turto vertinimas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                  Nemokamos konsultacijos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Kontaktai</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-3 text-blue-400" />
                <span>+370 68528893</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-3 text-blue-400" />
                <span>lilija.eimontiene@gmail.com</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin size={16} className="mr-3 text-blue-400 mt-0.5" />
                <div>
                  <p>Vilnius ir apylinkės</p>
                </div>
              </div>
              <div className="flex items-start text-gray-300">
                <Clock size={16} className="mr-3 text-blue-400 mt-0.5" />
                <div>
                  <p>Pr-Pt: 9:00-18:00</p>
                  <p>Št: 10:00-16:00</p>
                  <p className="text-xs text-gray-400">Sk: susitarus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & Stats */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Greiti nuorodos</h3>
            <ul className="space-y-3 text-sm mb-6">
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
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-sm font-semibold mb-3 text-gray-400">Statistika</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
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
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear}. Visos teisės saugomos. Created by <a href="https://www.linkedin.com/in/jaroslav-pa%C5%A1kel/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors">Jaroslav Paškel</a>
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-gray-500">
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