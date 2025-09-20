
import React from 'react';
import type { PizzaCounts } from '../types';
import { Card } from './Card';
import { PizzaIcon, PlusIcon, MinusIcon } from './icons';

interface PizzaSectionProps {
  pizzaCounts: PizzaCounts;
  totalPizzas: number;
  onAddPizza: (type: keyof PizzaCounts) => void;
  onRemovePizza: (type: keyof PizzaCounts) => void;
}

const PizzaButton: React.FC<{
  label: string;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}> = ({ label, count, onAdd, onRemove }) => (
  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col items-center justify-center text-center gap-2">
    <span className="font-semibold text-slate-600">{label}</span>
    <span className="text-3xl font-bold text-blue-600">{count}</span>
    <div className="w-full flex items-center gap-2">
      <button
        onClick={onRemove}
        aria-label={`Remover uma ${label}`}
        disabled={count === 0}
        className="w-1/3 flex items-center justify-center p-2 bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MinusIcon />
      </button>
      <button
        onClick={onAdd}
        aria-label={`Adicionar uma ${label}`}
        className="w-2/3 flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon /> Adicionar
      </button>
    </div>
  </div>
);

export const PizzaSection: React.FC<PizzaSectionProps> = ({ pizzaCounts, totalPizzas, onAddPizza, onRemovePizza }) => {
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
        <PizzaButton label="Mesa" count={pizzaCounts.mesa} onAdd={() => onAddPizza('mesa')} onRemove={() => onRemovePizza('mesa')} />
        <PizzaButton label="Levar" count={pizzaCounts.levar} onAdd={() => onAddPizza('levar')} onRemove={() => onRemovePizza('levar')} />
        <PizzaButton label="Entrega" count={pizzaCounts.entrega} onAdd={() => onAddPizza('entrega')} onRemove={() => onRemovePizza('entrega')} />
      </div>
    </Card>
  );
};
