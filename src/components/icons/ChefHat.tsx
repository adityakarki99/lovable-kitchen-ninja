
import React from 'react';

interface ChefHatProps {
  className?: string;
  size?: number;
}

const ChefHat: React.FC<ChefHatProps> = ({ className, size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 9.18 0A4 4 0 0 1 18 13.87V21H6Z"></path>
      <line x1="6" x2="18" y1="17" y2="17"></line>
    </svg>
  );
};

export default ChefHat;
