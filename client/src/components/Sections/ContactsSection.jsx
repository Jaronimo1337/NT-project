import { Phone, Mail, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useSiteContent } from '../../context/SiteContentContext';

const ContactInfo = ({ icon, title, content, delay }) => {
  return (
    <div className="flex items-start animate-fade-in-up mb-3" style={{ animationDelay: delay ? `${delay}s` : '0s' }}>
      <div className="mr-3 bg-[#325b5d] p-2 rounded-full text-white">
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <div>
        <h3 className="text-base text-left font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-700">{content}</p>
      </div>
    </div>
  );
};

const ContactSection = ({ registerSection, scrollToSection }) => {
  const { t } = useSiteContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const result = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_phone: formData.phone,
          from_email: formData.email,
          service_type: formData.service,
          message: formData.message,
          to_name: 'Lilija Eimontienė',
        },
        EMAIL_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      setStatus('success');
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });

    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={(el) => registerSection('contact', el)}
      className="page-section section-reveal h-screen w-full flex items-center bg-[#eef3f1] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 animate-fade-in-up text-[#1a3335]">
            {t('contact.title', 'Susisiekite Su Manimi')}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-[#c4a35a] mx-auto mb-3 animate-fade-in-up"></div>
          <p className="text-sm sm:text-base text-[#3d5a5c] mb-4 animate-fade-in-up max-w-xl mx-auto">
            {t('contact.subtitle', '')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 animate-fade-in-up">Kontaktai</h3>
            
            <div className="space-y-3 mb-4">
              <ContactInfo 
                icon={<Phone />}
                title="Telefonas"
                content={t('contact.phone', '+370 68528893')}
              />
              <ContactInfo 
                icon={<Mail />}
                title="El. paštas"
                content={t('contact.email', 'lilija.eimontiene@gmail.com')}
                delay="0.1"
              />
              <ContactInfo 
                icon={<MapPin />}
                title="Veiklos zona"
                content={t('contact.location', 'Vilnius ir apylinkės')}
                delay="0.2"
              />
            </div>

            <div className="p-3 bg-[#325b5d]/10 rounded-lg animate-fade-in-up border border-[#325b5d]/10" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-semibold text-[#325b5d] mb-2 text-sm">Darbo laikas</h4>
              <p className="text-[#3d5a5c] text-xs leading-relaxed">
                {t('contact.hours', 'Pr-Pt: 9:00-18:00 • Št: 10:00-16:00 • Sk: susitarus')}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 bg-white rounded-lg shadow-lg p-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-3 gap-3 text-xs text-gray-700">
                <div className="text-center">
                  <span className="font-medium block text-blue-900">🏠 10+ metų</span>
                  <p className="mt-1">Patirtis</p>
                </div>
                <div className="text-center">
                  <span className="font-medium block text-blue-900">💼 Profesionalus</span>
                  <p className="mt-1">Darbas</p>
                </div>
                <div className="text-center">
                  <span className="font-medium block text-blue-900">🤝 Individualus</span>
                  <p className="mt-1">Požiūris</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Parašykite man</h3>
              
              {/* Status Messages */}
              {status === 'success' && (
                <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                  ✅ Žinutė sėkmingai išsiųsta! Susisieksiu su jumis greitai.
                </div>
              )}
              
              {status === 'error' && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  ❌ Klaida siunčiant žinutę. Patikrinkite laukus ir bandykite dar kartą.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-1 font-medium text-sm">
                      Vardas *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      placeholder="Jūsų vardas"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-1 font-medium text-sm">
                      Telefonas *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                      placeholder="+370 XXX XXXXX"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1 font-medium text-sm">
                    El. paštas
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    placeholder="jusu@email.com"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-gray-700 mb-1 font-medium text-sm">
                    Paslauga
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    disabled={loading}
                  >
                    <option value="">Pasirinkite</option>
                    <option value="pardavimas">Pardavimas</option>
                    <option value="pirkimas">Pirkimas</option>
                    <option value="nuoma">Nuoma</option>
                    <option value="konsultacija">Konsultacija</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1 font-medium text-sm">
                    Žinutė
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    placeholder="Trumpai apie poreikius..."
                    disabled={loading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.name || !formData.phone}
                  className={`w-full py-2 rounded font-medium transition-colors shadow-md text-sm ${
                    loading || !formData.name || !formData.phone
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Siunčiama...
                    </div>
                  ) : (
                    'Siųsti žinutę'
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-2 text-center">
                Sutinkate su kontaktu telefonu ar el. paštu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
