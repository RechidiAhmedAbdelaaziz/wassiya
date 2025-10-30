import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Download, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-900 py-20 border-b border-primary-900/20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
              Créez votre testament islamique en toute simplicité
            </h1>
            <div className="text-xl text-gray-300 mb-8">
              <p className="text-2xl font-arabic mb-4" dir="rtl">
                كُتِبَ عَلَيْكُمْ إِذَا حَضَرَ أَحَدَكُمُ الْمَوْتُ إِن تَرَكَ خَيْرًا <span className="text-primary-500 font-bold">الْوَصِيَّةُ</span> لِلْوَالِدَيْنِ وَالْأَقْرَبِينَ بِالْمَعْرُوفِ ۖ حَقًّا عَلَى الْمُتَّقِينَ
              </p>
              <p className="text-lg leading-relaxed">
                « On vous a prescrit, quand la mort est proche de l'un de vous et s'il laisse des biens, de faire un <span className="text-primary-500 font-semibold">testament</span> en règle en faveur de ses père et mère et de ses plus proches. C'est un devoir pour les pieux. »
              </p>
              <span className="block mt-3 text-sm italic text-gray-400">(Sourate 2 – Verset 180)</span>
            </div>
            <Link to="/generator">
              <Button size="lg" className="text-lg px-8 py-4">
                Commencer maintenant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
            Pourquoi utiliser Wassiya.fr ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900/30 text-primary-500 mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Confidentialité totale</h3>
              <p className="text-gray-400">
                Vos données ne quittent jamais votre appareil. Aucun serveur, aucune base de données.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900/30 text-primary-500 mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Conforme à la Charia</h3>
              <p className="text-gray-400">
                Testament basé sur les enseignements islamiques et les principes de succession.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900/30 text-primary-500 mb-4">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Téléchargement gratuit</h3>
              <p className="text-gray-400">
                Téléchargez votre testament en format PDF prêt à être imprimé et signé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">
            Comment ça fonctionne ?
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { step: 1, title: 'Informations personnelles', desc: 'Renseignez vos informations de base' },
              { step: 2, title: 'Déclarations religieuses', desc: 'Sélectionnez vos déclarations de foi' },
              { step: 3, title: 'Préférences funéraires', desc: 'Indiquez vos souhaits pour vos funérailles' },
              { step: 4, title: 'Biens et dettes', desc: 'Listez vos actifs et obligations' },
              { step: 5, title: 'Téléchargement', desc: 'Téléchargez et signez votre testament' },
            ].map((item) => (
              <div key={item.step} className="flex items-start bg-gray-900 p-6 rounded-lg border border-gray-700">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-4">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                <CheckCircle className="ml-auto text-primary-500 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white border-t border-gray-800">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à créer votre testament ?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Ne remettez pas à demain ce qui peut être fait aujourd'hui
          </p>
          <Link to="/generator">
            <Button variant="secondary" size="lg">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
