import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useWillStore } from '../../store/willStore';
import type { FormStepProps } from '../../types/form';

const funeralPreferencesSchema = z.object({
  washedBy: z.string().optional(),
  washedByContact: z.string().optional(),
});

type FuneralPreferencesFormData = z.infer<typeof funeralPreferencesSchema>;

export const FuneralPreferencesForm: React.FC<FormStepProps> = ({
  onNext,
  onPrevious,
}) => {
  const { willData, setFuneralPreferences, updateLastModified } = useWillStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FuneralPreferencesFormData>({
    resolver: zodResolver(funeralPreferencesSchema),
    defaultValues: willData.funeralPreferences || {},
  });

  const onSubmit = (data: FuneralPreferencesFormData) => {
    setFuneralPreferences(data);
    updateLastModified();
    onNext();
  };

  return (
    <Card title="Préférences pour la préparation funéraire">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Je souhaite que mon corps soit lavé par"
          placeholder="Nom de la personne"
          {...register('washedBy')}
          error={errors.washedBy?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Voici ses coordonnées
          </label>
          <textarea
            {...register('washedByContact')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Téléphone, email, adresse..."
          />
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
