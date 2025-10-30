import React, { useState, useEffect } from 'react';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useWillStore } from '../../store/willStore';
import type { FormStepProps } from '../../types/form';
import type { ReligiousDeclaration } from '../../types/will';

const defaultDeclarations: ReligiousDeclaration[] = [
  {
    id: '1',
    text: 'J\'atteste qu\'il n\'y a de divinité digne d\'adoration qu\'Allah et que Muhammad est Son Messager',
    isSelected: true,
    category: 'shahada',
  },
  {
    id: '2',
    text: 'Je crois en Allah, en Ses anges, en Ses livres, en Ses messagers, au Jour Dernier et au destin',
    isSelected: true,
    category: 'faith',
  },
  {
    id: '3',
    text: 'Je demande à Allah de me pardonner mes péchés et d\'accepter mes bonnes œuvres',
    isSelected: true,
    category: 'other',
  },
  {
    id: '4',
    text: 'Je demande pardon à tous ceux que j\'ai pu offenser ou léser',
    isSelected: true,
    category: 'other',
  },
  {
    id: '5',
    text: 'Je pardonne à tous ceux qui m\'ont offensé ou lésé',
    isSelected: true,
    category: 'other',
  },
];

export const ReligiousDeclarationsForm: React.FC<FormStepProps> = ({
  onNext,
  onPrevious,
}) => {
  const { willData, setReligiousDeclarations, updateLastModified } = useWillStore();
  const [declarations, setDeclarations] = useState<ReligiousDeclaration[]>(
    willData.religiousDeclarations?.length
      ? willData.religiousDeclarations
      : defaultDeclarations
  );

  useEffect(() => {
    if (!willData.religiousDeclarations?.length) {
      setReligiousDeclarations(defaultDeclarations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = (id: string) => {
    setDeclarations((prev) =>
      prev.map((decl) =>
        decl.id === id ? { ...decl, isSelected: !decl.isSelected } : decl
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReligiousDeclarations(declarations);
    updateLastModified();
    onNext();
  };

  return (
    <Card title="Déclarations religieuses">
      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="text-gray-300 mb-4">
          Sélectionnez les déclarations que vous souhaitez inclure dans votre testament.
        </p>

        <div className="space-y-4">
          {declarations.map((declaration) => (
            <div
              key={declaration.id}
              className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Checkbox
                label={declaration.text}
                checked={declaration.isSelected}
                onChange={() => handleToggle(declaration.id)}
              />
            </div>
          ))}
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
