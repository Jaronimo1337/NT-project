import { Phone, Mail, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactInfo = ({ icon, title, content, delay }) => {
  return (
    <div className="flex items-center animate-fade-in-up" style={{ animationDelay: delay ? `${delay}s` : '0s' }}>
      <div className="mr-4 bg-blue-600 p-3 rounded-full text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

const ContactSection = ({ registerSection, scrollToSection }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(''); // 'success', 'error', or ''

  // EmailJS configuration - Replace with your actual values
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
    
    // Basic validation
    if (!formData.name || !formData.phone) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      // EmailJS send
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
      
      // Reset form
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
      className="h-screen w-full snap-start flex items-center bg-gray-50"
    >
      <div className="w-full px-2 py-8 max-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 pt-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in-up">
              Susisiekite <span className="text-blue-600">Su Manimi</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-4 animate-fade-in-up"></div>
            <p className="text-base text-gray-700 mb-6 animate-fade-in-up max-w-xl mx-auto">
              Turite klausimų apie nekilnojamąjį turtą? Susisiekite - konsultacija nemokama!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4 animate-fade-in-up">Kontaktai</h3>
              
              <div className="space-y-4 mb-6">
                <ContactInfo 
                  icon={<Phone size={18} />}
                  title="Telefonas"
                  content="+370 68528893"
                />
                <ContactInfo 
                  icon={<Mail size={18} />}
                  title="El. paštas"
                  content="lilija.eimontiene@gmail.com"
                  delay="0.1"
                />
                <ContactInfo 
                  icon={<MapPin size={18} />}
                  title="Veiklos zona"
                  content="Vilnius ir apylinkės"
                  delay="0.2"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h4 className="font-semibold text-blue-900 mb-2 text-sm">Darbo laikas</h4>
                <p className="text-blue-800 text-xs leading-relaxed">
                  Pr-Pt: 9:00-18:00 • Št: 10:00-16:00 • Sk: susitarus
                </p>
              </div>
            </div>

            {/* Contact Form with EmailJS */}
            <div className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-xl font-semibold mb-4">Parašykite man</h3>
                
                {/* Status Messages */}
                {status === 'success' && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                    ✅ Žinutė sėkmingai išsiųsta! Susisieksiu su jumis greitai.
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    ❌ Klaida siunčiant žinutę. Patikrinkite laukus ir bandykite dar kartą.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                      rows="3"
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

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Sutinkate su kontaktu telefonu ar el. paštu
                </p>
              </div>
            </div>
          </div>

          {/* Compact bottom section */}
          <div className="text-center mt-6 mb-4">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-3 gap-4 text-xs text-gray-700">
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;