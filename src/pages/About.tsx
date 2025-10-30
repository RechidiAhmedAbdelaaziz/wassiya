import React from 'react';
import { Card } from '../components/ui/Card';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
            À propos de Wassiya.fr
          </h1>

          <Card title="Notre mission">
            <p className="text-gray-300 leading-relaxed">
              Wassiya.fr a été créé pour aider les musulmans francophones à accomplir leur devoir religieux
              de rédiger un testament conforme aux principes islamiques. Nous croyons que ce service essentiel
              doit être accessible à tous, gratuit, et respectueux de la vie privée.
            </p>
          </Card>

          <Card title="Importance du testament en Islam">
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Le Prophète Muhammad (paix et bénédictions sur lui) a dit : "Il n'est pas permis à un musulman
                qui possède quelque chose à léguer de laisser passer deux nuits sans avoir auprès de lui son testament écrit."
                <span className="block mt-2 text-sm italic text-gray-400">(Rapporté par al-Bukhari et Muslim)</span>
              </p>
              <p className="text-gray-300 leading-relaxed">
                Le testament (wassiya) permet de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Exprimer vos dernières volontés selon les préceptes islamiques</li>
                <li>Faciliter la succession et éviter les conflits familiaux</li>
                <li>S'assurer que vos dettes sont réglées</li>
                <li>Léguer jusqu'à un tiers de vos biens à des personnes ou causes de votre choix</li>
                <li>Préciser vos préférences pour vos funérailles</li>
              </ul>
            </div>
          </Card>

          <Card title="Confidentialité et sécurité">
            <p className="text-gray-300 leading-relaxed">
              Vos données sont précieuses et sensibles. C'est pourquoi Wassiya.fr ne stocke AUCUNE de vos informations
              sur nos serveurs. Toutes les données que vous entrez restent uniquement sur votre appareil (stockage local du navigateur).
              Vous avez le contrôle total de vos informations et pouvez les effacer à tout moment.
            </p>
          </Card>

          <Card title="Validité juridique">
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Bien que ce testament soit conforme aux principes islamiques, nous vous recommandons fortement de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Consulter un avocat spécialisé en droit des successions</li>
                <li>Faire authentifier votre testament par un notaire si possible</li>
                <li>Respecter les lois de succession de votre pays de résidence</li>
                <li>Avoir deux témoins musulmans adultes lors de la signature</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Ce service est fourni à titre informatif et ne constitue pas un conseil juridique.
              </p>
            </div>
          </Card>

          <Card title="Contact">
            <p className="text-gray-300 leading-relaxed">
              Pour toute question, suggestion ou signalement de problème, n'hésitez pas à nous contacter à :
              <a href="mailto:contact@wassiya.fr" className="text-primary-500 hover:text-primary-400 hover:underline ml-2">
                contact@wassiya.fr
              </a>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
