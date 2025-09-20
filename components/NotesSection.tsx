
import React from 'react';
import { Card } from './Card';
import { NotesIcon } from './icons';

interface NotesSectionProps {
  observations: string;
  setObservations: React.Dispatch<React.SetStateAction<string>>;
  shoppingList: string;
  setShoppingList: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}> = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
    <textarea
      id={id}
      rows={5}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />
  </div>
);

export const NotesSection: React.FC<NotesSectionProps> = ({ observations, setObservations, shoppingList, setShoppingList }) => {
  return (
    <Card title="Anotações" icon={<NotesIcon />}>
      <div className="space-y-4">
        <TextArea
          id="observations"
          label="Observações"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          placeholder="Digite suas observações..."
        />
        <TextArea
          id="shopping-list"
          label="Compras"
          value={shoppingList}
          onChange={(e) => setShoppingList(e.target.value)}
          placeholder="Liste os produtos para comprar..."
        />
      </div>
    </Card>
  );
};
