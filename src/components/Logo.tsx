import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 group">
      <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center group-hover:bg-violet-700 transition-colors duration-200">
        <span className="text-white text-xl font-bold">O</span>
      </div>
      <span className="text-white text-xl font-bold tracking-wide">
        PLAMENTO
      </span>
    </Link>
  );
};

export default Logo;