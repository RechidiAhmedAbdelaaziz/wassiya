import React from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useWillStore } from '../store/willStore';
import { generateWillPDF } from '../utils/pdfGenerator';
import { Download, Edit, Trash2, CheckCircle } from 'lucide-react';
import type { FormStepProps } from '../types/form';
import { useNavigate } from 'react-router-dom';

export const PreviewPage: React.FC<FormStepProps> = ({ onPrevious }) => {
  const { willData, resetWill } = useWillStore();
  const navigate = useNavigate();

  const handleDownload = () => {
    generateWillPDF(willData);
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les données ? Cette action est irréversible.')) {
      resetWill();
      navigate('/');
    }
  };

  const handleEdit = (step: number) => {
    useWillStore.getState().setCurrentStep(step);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-900/30 text-primary-500 mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            Votre testament est prêt !
          </h2>
          <p className="text-gray-300 mb-6">
            Vérifiez les informations ci-dessous avant de télécharger votre testament.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleDownload} size="lg">
              <Download className="w-5 h-5 mr-2" />
              Télécharger en PDF
            </Button>
            <Button onClick={onPrevious} variant="outline" size="lg">
              <Edit className="w-5 h-5 mr-2" />
              Modifier
            </Button>
          </div>
        </div>
      </Card>

      {/* Personal Information Preview */}
      {willData.personalInfo && (
        <Card
          title="Informations personnelles"
          footer={
            <Button variant="ghost" size="sm" onClick={() => handleEdit(0)}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          }
        >
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong className="text-gray-100">Nom :</strong> {willData.personalInfo.lastName} {willData.personalInfo.firstName}</p>
            <p><strong className="text-gray-100">Date de naissance :</strong> {new Date(willData.personalInfo.birthDate).toLocaleDateString('fr-FR')}</p>
            <p><strong className="text-gray-100">Lieu de naissance :</strong> {willData.personalInfo.birthCity}, {willData.personalInfo.birthCountry}</p>
            <p><strong className="text-gray-100">Père :</strong> {willData.personalInfo.fatherFirstName} {willData.personalInfo.fatherLastName}</p>
            <p><strong className="text-gray-100">Mère :</strong> {willData.personalInfo.motherFirstName} {willData.personalInfo.motherLastName}</p>
          </div>
        </Card>
      )}

      {/* Religious Declarations Preview */}
      {willData.religiousDeclarations && willData.religiousDeclarations.length > 0 && (
        <Card
          title="Déclarations religieuses"
          footer={
            <Button variant="ghost" size="sm" onClick={() => handleEdit(1)}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          }
        >
          <ul className="space-y-2">
            {willData.religiousDeclarations
              .filter((d) => d.isSelected)
              .map((decl) => (
                <li key={decl.id} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{decl.text}</span>
                </li>
              ))}
          </ul>
        </Card>
      )}

      {/* Funeral Preferences Preview */}
      {willData.funeralPreferences && (
        <Card
          title="Préférences funéraires"
          footer={
            <Button variant="ghost" size="sm" onClick={() => handleEdit(2)}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          }
        >
          <div className="space-y-2 text-sm text-gray-300">
            {willData.funeralPreferences.washedBy && (
              <p><strong className="text-gray-100">Corps lavé par :</strong> {willData.funeralPreferences.washedBy}</p>
            )}
            {willData.funeralPreferences.washedByContact && (
              <p><strong className="text-gray-100">Coordonnées :</strong> {willData.funeralPreferences.washedByContact}</p>
            )}
          </div>
        </Card>
      )}

      {/* Janaza Preferences Preview */}
      {willData.janazaPreferences && (
        <Card
          title="Prière funéraire"
          footer={
            <Button variant="ghost" size="sm" onClick={() => handleEdit(3)}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          }
        >
          <div className="space-y-2 text-sm text-gray-300">
            {willData.janazaPreferences.janazaLeader && (
              <p><strong className="text-gray-100">Dirigée par :</strong> {willData.janazaPreferences.janazaLeader}</p>
            )}
            {willData.janazaPreferences.janazaLeaderContact && (
              <p><strong className="text-gray-100">Coordonnées :</strong> {willData.janazaPreferences.janazaLeaderContact}</p>
            )}
          </div>
        </Card>
      )}

      {/* Debts Preview */}
      {willData.debts && willData.debts.length > 0 && (
        <Card
          title="Dettes et obligations"
          footer={
            <Button variant="ghost" size="sm" onClick={() => handleEdit(5)}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          }
        >
          <ul className="space-y-3">
            {willData.debts.map((debt, index) => (
              <li key={debt.id} className="border-l-4 border-primary-500 pl-3">
                <p className="font-medium text-gray-100">{index + 1}. {debt.description}</p>
                {debt.amount && <p className="text-sm text-gray-300">Montant : {debt.amount} €</p>}
                {debt.creditor && <p className="text-sm text-gray-300">Créancier : {debt.creditor}</p>}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Assets Preview */}
      {willData.assets && willData.assets.length > 0 && (
        <Card
          title="Biens et actifs"
          footer={
            <Button variant="ghost" size="sm" onClick={() => handleEdit(6)}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          }
        >
          <ul className="space-y-3">
            {willData.assets.map((asset, index) => (
              <li key={asset.id} className="border-l-4 border-primary-500 pl-3">
                <p className="font-medium text-gray-100">{index + 1}. {asset.description}</p>
                {asset.estimatedValue && <p className="text-sm text-gray-300">Valeur : {asset.estimatedValue} €</p>}
                {asset.location && <p className="text-sm text-gray-300">Localisation : {asset.location}</p>}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Final Supplication Preview */}
      {willData.finalSupplication && (
        <Card
          title="Message et supplications finales"
          footer={
            <Button variant="ghost" size="sm" onClick={() => handleEdit(7)}>
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          }
        >
          <p className="text-sm text-gray-300 italic whitespace-pre-wrap">
            {willData.finalSupplication}
          </p>
        </Card>
      )}

      {/* Important Notes */}
      <Card title="Prochaines étapes importantes">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3">
              1
            </div>
            <div>
              <h4 className="font-medium text-gray-100">Imprimez votre testament</h4>
              <p className="text-sm text-gray-300">Téléchargez et imprimez le PDF généré</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3">
              2
            </div>
            <div>
              <h4 className="font-medium text-gray-100">Signez en présence de témoins</h4>
              <p className="text-sm text-gray-300">Deux témoins musulmans adultes et sains d'esprit</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3">
              3
            </div>
            <div>
              <h4 className="font-medium text-gray-100">Conservez-le en lieu sûr</h4>
              <p className="text-sm text-gray-300">Informez une personne de confiance de son emplacement</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mr-3">
              4
            </div>
            <div>
              <h4 className="font-medium text-gray-100">Consultez un expert (recommandé)</h4>
              <p className="text-sm text-gray-300">Un avocat ou un savant peut valider la conformité juridique et religieuse</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="text-primary-500 hover:bg-primary-900/20"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Supprimer toutes les données
        </Button>
        <Button onClick={handleDownload} size="lg">
          <Download className="w-5 h-5 mr-2" />
          Télécharger le PDF
        </Button>
      </div>
    </div>
  );
};
