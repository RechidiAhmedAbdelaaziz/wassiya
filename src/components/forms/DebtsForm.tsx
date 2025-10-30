import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useWillStore } from '../../store/willStore';
import type { FormStepProps } from '../../types/form';
import type { Debt } from '../../types/will';
import { Plus, Trash2 } from 'lucide-react';

export const DebtsForm: React.FC<FormStepProps> = ({
  onNext,
  onPrevious,
}) => {
  const { willData, setDebts, updateLastModified } = useWillStore();
  const [debts, setLocalDebts] = useState<Debt[]>(
    willData.debts || []
  );

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      type: 'loan',
      description: '',
    };
    setLocalDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    setLocalDebts(debts.filter((debt) => debt.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setLocalDebts(
      debts.map((debt) =>
        debt.id === id ? { ...debt, [field]: value } : debt
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebts(debts);
    updateLastModified();
    onNext();
  };

  return (
    <Card title="Dettes et obligations">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-sm text-red-800 font-medium mb-2">
            Important : Les dettes doivent être réglées avant la distribution de l'héritage
          </p>
          <p className="text-sm text-red-700">
            Le Prophète ﷺ a dit : "L'âme du croyant reste suspendue à sa dette jusqu'à ce qu'elle soit payée."
          </p>
        </div>

        <p className="text-gray-300">
          Listez toutes vos dettes et obligations financières pour faciliter leur règlement.
        </p>

        <div className="space-y-4">
          {debts.length === 0 ? (
            <div className="text-center py-8 bg-gray-800 rounded-lg border-2 border-dashed border-gray-700">
              <p className="text-gray-400 mb-4">Aucune dette ajoutée</p>
              <Button type="button" onClick={addDebt} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une dette
              </Button>
            </div>
          ) : (
            debts.map((debt, index) => (
              <div
                key={debt.id}
                className="p-4 border border-gray-700 rounded-lg space-y-4 bg-gray-800"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-100">Dette #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeDebt(debt.id)}
                    className="text-primary-500 hover:text-primary-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Type de dette *
                    </label>
                    <select
                      value={debt.type}
                      onChange={(e) => updateDebt(debt.id, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="loan">Prêt / Emprunt</option>
                      <option value="unpaidZakat">Zakat impayée</option>
                      <option value="hajj">Hajj non effectué</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <Input
                    label="Montant (optionnel)"
                    type="number"
                    placeholder="0.00"
                    value={debt.amount || ''}
                    onChange={(e) => updateDebt(debt.id, 'amount', parseFloat(e.target.value))}
                  />
                </div>

                <Input
                  label="Description *"
                  placeholder="Ex: Prêt bancaire immobilier, dette envers un ami..."
                  value={debt.description}
                  onChange={(e) => updateDebt(debt.id, 'description', e.target.value)}
                  required
                />

                <Input
                  label="Créancier"
                  placeholder="Nom de la personne ou de l'organisation"
                  value={debt.creditor || ''}
                  onChange={(e) => updateDebt(debt.id, 'creditor', e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Notes supplémentaires
                  </label>
                  <textarea
                    value={debt.notes || ''}
                    onChange={(e) => updateDebt(debt.id, 'notes', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Informations supplémentaires..."
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {debts.length > 0 && (
          <Button type="button" onClick={addDebt} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une autre dette
          </Button>
        )}

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrevious}>
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
