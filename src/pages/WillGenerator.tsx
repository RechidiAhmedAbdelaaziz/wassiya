import React from 'react';
import { useWillStore } from '../store/willStore';
import { PersonalInfoForm } from '../components/forms/PersonalInfoForm';
import { ReligiousDeclarationsForm } from '../components/forms/ReligiousDeclarationsForm';
import { FuneralPreferencesForm } from '../components/forms/FuneralPreferencesForm';
import { JanazaPreferencesForm } from '../components/forms/JanazaPreferencesForm';
import { BurialPreferencesForm } from '../components/forms/BurialPreferencesForm';
import { DebtsForm } from '../components/forms/DebtsForm';
import { AssetsForm } from '../components/forms/AssetsForm';
import { FinalSupplicationForm } from '../components/forms/FinalSupplicationForm';
import { PreviewPage } from './Preview';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CheckCircle, Circle } from 'lucide-react';

const steps = [
  { id: 0, title: 'Informations personnelles' },
  { id: 1, title: 'Déclarations religieuses' },
  { id: 2, title: 'Préférences funéraires' },
  { id: 3, title: 'Prière funéraire' },
  { id: 4, title: 'Préférences d\'enterrement' },
  { id: 5, title: 'Dettes et obligations' },
  { id: 6, title: 'Biens et actifs' },
  { id: 7, title: 'Supplication finale' },
  { id: 8, title: 'Révision et téléchargement' },
];

export const WillGenerator: React.FC = () => {
  const { currentStep, nextStep, previousStep } = useWillStore();

  const renderStep = () => {
    const stepProps = {
      onNext: nextStep,
      onPrevious: previousStep,
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === steps.length - 1,
    };

    switch (currentStep) {
      case 0:
        return <PersonalInfoForm {...stepProps} />;
      case 1:
        return <ReligiousDeclarationsForm {...stepProps} />;
      case 2:
        return <FuneralPreferencesForm {...stepProps} />;
      case 3:
        return <JanazaPreferencesForm {...stepProps} />;
      case 4:
        return <BurialPreferencesForm {...stepProps} />;
      case 5:
        return <DebtsForm {...stepProps} />;
      case 6:
        return <AssetsForm {...stepProps} />;
      case 7:
        return <FinalSupplicationForm {...stepProps} />;
      case 8:
        return <PreviewPage {...stepProps} />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-300">Cette section est en cours de développement.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">
            Créer mon testament islamique
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-4 sticky top-8">
                <h2 className="font-semibold text-gray-100 mb-4">Progression</h2>
                <ProgressBar current={currentStep} total={steps.length} className="mb-6" />
                <nav className="space-y-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-start space-x-3 p-2 rounded-lg transition-colors ${
                        step.id === currentStep
                          ? 'bg-primary-900/30 text-primary-400'
                          : step.id < currentStep
                          ? 'text-gray-400'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary-500 mt-0.5" />
                      ) : (
                        <Circle
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            step.id === currentStep ? 'text-primary-500' : ''
                          }`}
                        />
                      )}
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
