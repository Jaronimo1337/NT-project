import React from 'react';

const Footer = ({ scrollToSection }) => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-gray-900 text-white py-12 snap-end w-full">
        <div className="w-full px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">
                <span className="text-blue-400">B</span>roker
              </h2>
              <p className="text-gray-400 ">
                Professional brokerage services to help you navigate the financial landscape.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500">© {currentYear} Broker Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;