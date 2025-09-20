
import React from 'react';
import type { PizzaCounts } from '../types';
import { Card } from './Card';
import { PizzaIcon, PlusIcon } from './icons';

interface PizzaSectionProps {
  pizzaCounts: PizzaCounts;
  totalPizzas: number;
  onAddPizza: (type: keyof PizzaCounts) => void;
}

const PizzaButton: React.FC<{ label: string; count: number; onClick: () => void }> = ({ label, count, onClick }) => (
  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col items-center justify-center text-center gap-2">
    <span className="font-semibold text-slate-600">{label}</span>
    <span className="text-3xl font-bold text-blue-600">{count}</span>
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <PlusIcon /> Adicionar
    </button>
  </div>
);

export const PizzaSection: React.FC<PizzaSectionProps> = ({ pizzaCounts, totalPizzas, onAddPizza }) => {
  return (
    <Card 
      title="Pizzas" 
      icon={<PizzaIcon />}
      headerContent={
        <div className="text-right">
            <span className="text-sm font-medium text-slate-500">Total</span>
            <p className="text-2xl font-bold text-slate-800">{totalPizzas}</p>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row gap-4">
        <PizzaButton label="Mesa" count={pizzaCounts.mesa} onClick={() => onAddPizza('mesa')} />
        <PizzaButton label="Levar" count={pizzaCounts.levar} onClick={() => onAddPizza('levar')} />
        <PizzaButton label="Entrega" count={pizzaCounts.entrega} onClick={() => onAddPizza('entrega')} />
      </div>
    </Card>
  );
};
