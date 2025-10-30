import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useWillStore } from '../../store/willStore';
import type { FormStepProps } from '../../types/form';

const personalInfoSchema = z.object({
  lastName: z.string().min(2, 'Le nom est requis'),
  firstName: z.string().min(2, 'Le prénom est requis'),
  birthDate: z.string().min(1, 'La date de naissance est requise'),
  birthCity: z.string().min(2, 'La ville de naissance est requise'),
  birthCountry: z.string().min(2, 'Le pays de naissance est requis'),
  fatherLastName: z.string().min(2, 'Le nom du père est requis'),
  fatherFirstName: z.string().min(2, 'Le prénom du père est requis'),
  motherLastName: z.string().min(2, 'Le nom de la mère est requis'),
  motherFirstName: z.string().min(2, 'Le prénom de la mère est requis'),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export const PersonalInfoForm: React.FC<FormStepProps> = ({
  onNext,
  onPrevious,
  isFirstStep,
}) => {
  const { willData, setPersonalInfo, updateLastModified } = useWillStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: willData.personalInfo,
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    setPersonalInfo(data);
    updateLastModified();
    onNext();
  };

  return (
    <Card title="Informations personnelles">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom"
            {...register('lastName')}
            error={errors.lastName?.message}
            required
          />
          <Input
            label="Prénom"
            {...register('firstName')}
            error={errors.firstName?.message}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Date de naissance"
            type="date"
            {...register('birthDate')}
            error={errors.birthDate?.message}
            required
          />
          <Input
            label="Ville de naissance"
            {...register('birthCity')}
            error={errors.birthCity?.message}
            required
          />
          <Input
            label="Pays de naissance"
            {...register('birthCountry')}
            error={errors.birthCountry?.message}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom du père"
            {...register('fatherLastName')}
            error={errors.fatherLastName?.message}
            required
          />
          <Input
            label="Prénom du père"
            {...register('fatherFirstName')}
            error={errors.fatherFirstName?.message}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom de la mère"
            {...register('motherLastName')}
            error={errors.motherLastName?.message}
            required
          />
          <Input
            label="Prénom de la mère"
            {...register('motherFirstName')}
            error={errors.motherFirstName?.message}
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={isFirstStep}
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
