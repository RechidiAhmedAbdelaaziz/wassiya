import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useWillStore } from '../../store/willStore';
import type { FormStepProps } from '../../types/form';
import type { Asset } from '../../types/will';
import { Plus, Trash2 } from 'lucide-react';

export const AssetsForm: React.FC<FormStepProps> = ({
  onNext,
  onPrevious,
}) => {
  const { willData, setAssets, updateLastModified } = useWillStore();
  const [assets, setLocalAssets] = useState<Asset[]>(
    willData.assets || []
  );

  const addAsset = () => {
    const newAsset: Asset = {
      id: Date.now().toString(),
      type: 'property',
      description: '',
    };
    setLocalAssets([...assets, newAsset]);
  };

  const removeAsset = (id: string) => {
    setLocalAssets(assets.filter((asset) => asset.id !== id));
  };

  const updateAsset = (id: string, field: keyof Asset, value: string | number) => {
    setLocalAssets(
      assets.map((asset) =>
        asset.id === id ? { ...asset, [field]: value } : asset
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAssets(assets);
    updateLastModified();
    onNext();
  };

  return (
    <Card title="Biens et actifs">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-primary-900/20 border-l-4 border-primary-500 p-4 mb-6">
          <p className="text-sm text-gray-300">
            Listez vos principaux biens et actifs pour faciliter la succession. 
            Cela aide vos héritiers à identifier votre patrimoine.
          </p>
        </div>

        <p className="text-gray-300">
          Vous pouvez lister vos biens immobiliers, véhicules, comptes bancaires, entreprises, etc.
        </p>

        <div className="space-y-4">
          {assets.length === 0 ? (
            <div className="text-center py-8 bg-gray-800 rounded-lg border-2 border-dashed border-gray-700">
              <p className="text-gray-400 mb-4">Aucun bien ajouté</p>
              <Button type="button" onClick={addAsset} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un bien
              </Button>
            </div>
          ) : (
            assets.map((asset, index) => (
              <div
                key={asset.id}
                className="p-4 border border-gray-700 rounded-lg space-y-4 bg-gray-800"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-100">Bien #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeAsset(asset.id)}
                    className="text-primary-500 hover:text-primary-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Type de bien *
                    </label>
                    <select
                      value={asset.type}
                      onChange={(e) => updateAsset(asset.id, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="property">Bien immobilier</option>
                      <option value="vehicle">Véhicule</option>
                      <option value="savings">Épargne / Compte bancaire</option>
                      <option value="business">Entreprise / Commerce</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <Input
                    label="Valeur estimée (optionnel)"
                    type="number"
                    placeholder="0.00"
                    value={asset.estimatedValue || ''}
                    onChange={(e) => updateAsset(asset.id, 'estimatedValue', parseFloat(e.target.value))}
                  />
                </div>

                <Input
                  label="Description *"
                  placeholder="Ex: Appartement 3 pièces, Voiture Toyota..."
                  value={asset.description}
                  onChange={(e) => updateAsset(asset.id, 'description', e.target.value)}
                  required
                />

                <Input
                  label="Localisation / Référence"
                  placeholder="Ex: Adresse, numéro de compte, immatriculation..."
                  value={asset.location || ''}
                  onChange={(e) => updateAsset(asset.id, 'location', e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Notes supplémentaires
                  </label>
                  <textarea
                    value={asset.notes || ''}
                    onChange={(e) => updateAsset(asset.id, 'notes', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Documents importants, coordonnées bancaires, etc."
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {assets.length > 0 && (
          <Button type="button" onClick={addAsset} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un autre bien
          </Button>
        )}

        <div className="bg-gray-700/30 border-l-4 border-gray-600 p-4">
          <h4 className="font-medium text-gray-100 mb-2">Note sur la succession islamique</h4>
          <p className="text-sm text-gray-300">
            En Islam, la distribution de l'héritage suit des règles précises (Mirath) 
            définies dans le Coran. Après le règlement des dettes et des frais funéraires, 
            vous pouvez léguer jusqu'à 1/3 de vos biens (Wassiya) à des non-héritiers ou des causes.
          </p>
        </div>

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
