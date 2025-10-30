import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useWillStore } from '../../store/willStore';
import type { FormStepProps } from '../../types/form';

const burialPreferencesSchema = z.object({
  preferredCemetery: z.string().optional(),
  preferredLocation: z.string().optional(),
  graveSite: z.enum(['family', 'new', 'specific']).optional(),
  customRequests: z.string().optional(),
});

type BurialPreferencesFormData = z.infer<typeof burialPreferencesSchema>;

export const BurialPreferencesForm: React.FC<FormStepProps> = ({
  onNext,
  onPrevious,
}) => {
  const { willData, setBurialPreferences, updateLastModified } = useWillStore();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BurialPreferencesFormData>({
    resolver: zodResolver(burialPreferencesSchema),
    defaultValues: willData.burialPreferences || {},
  });

  const graveSite = watch('graveSite');

  const onSubmit = (data: BurialPreferencesFormData) => {
    setBurialPreferences(data);
    updateLastModified();
    onNext();
  };

  return (
    <Card title="Préférences d'enterrement">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-primary-900/20 border-l-4 border-primary-500 p-4 mb-6">
          <p className="text-sm text-gray-300">
            Selon l'Islam, l'enterrement doit se faire rapidement et simplement, 
            directement dans la terre, le corps tourné vers la Qibla.
          </p>
        </div>

        <Input
          label="Cimetière préféré"
          placeholder="Ex: Cimetière musulman de Bobigny"
          {...register('preferredCemetery')}
          error={errors.preferredCemetery?.message}
          helperText="Le cimetière où vous souhaitez être enterré"
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Type d'emplacement
          </label>
          
          <div className="space-y-2">
            <label className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800">
              <input
                type="radio"
                value="family"
                {...register('graveSite')}
                className="w-4 h-4 text-primary-600 bg-gray-900 border-gray-700 focus:ring-primary-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-100">
                  Caveau familial
                </span>
                <span className="block text-sm text-gray-400">
                  Rejoindre un emplacement familial existant
                </span>
              </div>
            </label>

            <label className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800">
              <input
                type="radio"
                value="new"
                {...register('graveSite')}
                className="w-4 h-4 text-primary-600 bg-gray-900 border-gray-700 focus:ring-primary-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-100">
                  Nouvel emplacement
                </span>
                <span className="block text-sm text-gray-400">
                  Nouvelle concession au cimetière
                </span>
              </div>
            </label>

            <label className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800">
              <input
                type="radio"
                value="specific"
                {...register('graveSite')}
                className="w-4 h-4 text-primary-600 bg-gray-900 border-gray-700 focus:ring-primary-500"
              />
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-100">
                  Emplacement spécifique
                </span>
                <span className="block text-sm text-gray-400">
                  Préciser ci-dessous
                </span>
              </div>
            </label>
          </div>
        </div>

        {(graveSite === 'family' || graveSite === 'specific') && (
          <Input
            label="Détails de l'emplacement"
            placeholder="Ex: Section, carré, numéro..."
            {...register('preferredLocation')}
            error={errors.preferredLocation?.message}
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Demandes supplémentaires
          </label>
          <textarea
            {...register('customRequests')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Ex: Planter un arbre, inscription sur la tombe, présence de personnes spécifiques..."
          />
        </div>

        <div className="bg-gray-700/30 border-l-4 border-gray-600 p-4">
          <h4 className="font-medium text-gray-100 mb-2">Principes islamiques</h4>
          <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
            <li>L'enterrement doit être simple et humble</li>
            <li>Le corps est placé directement dans la terre</li>
            <li>Orienté vers la Qibla (direction de La Mecque)</li>
            <li>Éviter les dépenses excessives</li>
          </ul>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
          >
            Précédent
          </Button>
          <Button type="submit">
            Suivant
          </Button>
        </div>
      </form>
    </Card>
  );
};
