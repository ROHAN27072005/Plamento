import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-4">
      <div className="flex flex-wrap items-center justify-center space-x-1 text-sm text-gray-400">
        <span>© 2025 Plamento</span>
        <span className="mx-2">|</span>
        <Link 
          to="/support" 
          className="hover:text-violet-400 transition-colors duration-200"
        >
          Support
        </Link>
        <span className="mx-2">|</span>
        <Link 
          to="/privacy" 
          className="hover:text-violet-400 transition-colors duration-200"
        >
          Privacy
        </Link>
        <span className="mx-2">|</span>
        <Link 
          to="/terms" 
          className="hover:text-violet-400 transition-colors duration-200"
        >
          Terms
        </Link>
      </div>
    </footer>
  );
};

export default Footer;