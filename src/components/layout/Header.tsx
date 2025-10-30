import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-sm border-b border-gray-700">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold text-gray-100">Wassiya.fr</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-primary-500 transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-primary-500 transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/generator"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Créer mon testament
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
