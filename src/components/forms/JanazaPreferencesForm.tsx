import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useWillStore } from '../../store/willStore';
import type { FormStepProps } from '../../types/form';

const janazaPreferencesSchema = z.object({
  janazaLeader: z.string().optional(),
  janazaLeaderContact: z.string().optional(),
});

type JanazaPreferencesFormData = z.infer<typeof janazaPreferencesSchema>;

export const JanazaPreferencesForm: React.FC<FormStepProps> = ({
  onNext,
  onPrevious,
}) => {
  const { willData, setJanazaPreferences, updateLastModified } = useWillStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JanazaPreferencesFormData>({
    resolver: zodResolver(janazaPreferencesSchema),
    defaultValues: willData.janazaPreferences || {},
  });

  const onSubmit = (data: JanazaPreferencesFormData) => {
    setJanazaPreferences(data);
    updateLastModified();
    onNext();
  };

  return (
    <Card title="Prière funéraire (Salat al-Janaza)">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Je souhaite que la salat Janaza soit dirigée par"
          placeholder="Nom de l'imam ou de la personne"
          {...register('janazaLeader')}
          error={errors.janazaLeader?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Voici ses coordonnées
          </label>
          <textarea
            {...register('janazaLeaderContact')}
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
