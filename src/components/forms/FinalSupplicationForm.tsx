import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useWillStore } from '../../store/willStore';
import type { FormStepProps } from '../../types/form';

interface FinalSupplicationFormData {
  finalSupplication: string;
}

export const FinalSupplicationForm: React.FC<FormStepProps> = ({
  onNext,
  onPrevious,
}) => {
  const { willData, setFinalSupplication, updateLastModified } = useWillStore();
  
  const { register, handleSubmit } = useForm<FinalSupplicationFormData>({
    defaultValues: {
      finalSupplication: willData.finalSupplication || '',
    },
  });

  const onSubmit = (data: FinalSupplicationFormData) => {
    setFinalSupplication(data.finalSupplication);
    updateLastModified();
    onNext();
  };

  const defaultSupplications = [
    "Ô Allah, pardonne-moi, fais-moi miséricorde et fais-moi rejoindre la plus haute compagnie.",
    "Ô Allah, je témoigne qu'il n'y a de divinité digne d'adoration que Toi. Pardonne mes péchés car nul ne pardonne les péchés si ce n'est Toi.",
    "Ô Allah, aide ma famille et mes proches à supporter mon absence et accorde-leur patience et consolation.",
  ];

  return (
    <Card title="Supplication finale et message">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-primary-900/20 border-l-4 border-primary-500 p-4 mb-6">
          <p className="text-sm text-gray-300">
            C'est votre dernière occasion de laisser un message spirituel, 
            des invocations ou des paroles réconfortantes pour vos proches.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Supplications suggérées
          </label>
          <p className="text-sm text-gray-400 mb-3">
            Vous pouvez vous inspirer de ces invocations prophétiques :
          </p>
          
          {defaultSupplications.map((supplication, index) => (
            <div
              key={index}
              className="p-3 bg-gray-700/30 border border-gray-600 rounded-lg text-sm text-gray-300 italic"
            >
              {supplication}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Votre message et supplications
          </label>
          <textarea
            {...register('finalSupplication')}
            rows={8}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Écrivez vos dernières paroles, vos invocations, vos conseils pour vos proches..."
          />
          <p className="mt-2 text-sm text-gray-400">
            Ce message sera inclus à la fin de votre testament.
          </p>
        </div>

        <div className="bg-gray-700/30 border-l-4 border-gray-600 p-4">
          <h4 className="font-medium text-gray-100 mb-2">Rappel</h4>
          <p className="text-sm text-gray-300">
            "Certes, ceux qui ont dit : 'Notre Seigneur est Allah', et qui se sont montrés droits, 
            les anges descendent sur eux : 'N'ayez pas peur et ne soyez pas affligés; 
            mais ayez la bonne nouvelle du Paradis qui vous était promis.'"
            <span className="block mt-1 italic">- Sourate Fussilat (41:30)</span>
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Précédent
          </Button>
          <Button type="submit">
            Réviser mon testament
          </Button>
        </div>
      </form>
    </Card>
  );
};
