import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Wassiya.fr</h3>
            <p className="text-gray-300 text-sm">
              Un service gratuit pour créer votre testament islamique en toute simplicité et confidentialité.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Confidentialité</h3>
            <p className="text-gray-300 text-sm">
              Vos données ne sont jamais envoyées à nos serveurs. Tout reste sur votre appareil.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm">
              Pour toute question, contactez-nous à contact@wassiya.fr
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {currentYear} Wassiya.fr - Tous droits réservés
        </div>
      </div>
    </footer>
  );
};
