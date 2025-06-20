import React from 'react';

const AnimationStyles = () => {
    return (
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .clip-diagonal {
          clip-path: polygon(100% 0, 0% 100%, 100% 100%);
        }
      `}</style>
    );
  };
  
  export default AnimationStyles;