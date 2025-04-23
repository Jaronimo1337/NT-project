import { ArrowUpCircle } from 'lucide-react';
import React from 'react';

const ScrollToTopButton = ({ activeSection, scrollToSection }) => {
  return (
    <button
      onClick={() => scrollToSection('home')}
      className={`fixed bottom-8 right-8 z-40 p-2 bg-blue-600 text-white rounded-full shadow-lg transform transition-all duration-300 ${
        activeSection === 'home' ? 'opacity-0 scale-90' : 'opacity-100 scale-100 hover:scale-110'
      }`}
    >
      <ArrowUpCircle size={24} />
    </button>
  );
};

export default ScrollToTopButton;