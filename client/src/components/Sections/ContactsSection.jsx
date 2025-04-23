import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import React from 'react';

const ContactInfo = ({ icon, title, content, delay }) => {
  return (
    <div className="flex items-start animate-fade-in-up" style={{ animationDelay: delay ? `${delay}s` : '0s' }}>
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

const ContactForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Email"
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            id="subject"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Subject"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
          <textarea
            id="message"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Your Message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

const ContactSection = ({ registerSection, scrollToSection }) => {
  return (
    <section
      id="contact"
      ref={(el) => registerSection('contact', el)}
      className="h-screen w-full snap-start flex items-center bg-gray-50"
    >
      <div className="w-full px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
              Get In <span className="text-blue-600">Touch</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 mb-8 animate-fade-in-up"></div>
            <p className="text-lg text-gray-700 mb-8 animate-fade-in-up">
              Ready to take the next step in your financial journey? Contact us today to schedule a consultation and discover how our brokerage services can help you achieve your goals.
            </p>

            <div className="space-y-6 mb-8">
              <ContactInfo 
                icon={<Phone size={20} />}
                title="Phone"
                content="+1 (555) 123-4567"
              />
              <ContactInfo 
                icon={<Mail size={20} />}
                title="Email"
                content="contact@brokerportfolio.com"
                delay="0.2"
              />
              <ContactInfo 
                icon={<MapPin size={20} />}
                title="Office"
                content="123 Financial District, New York, NY 10001"
                delay="0.4"
              />
            </div>

            <div className="flex space-x-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <a href="#" className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2 animate-fade-in">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
