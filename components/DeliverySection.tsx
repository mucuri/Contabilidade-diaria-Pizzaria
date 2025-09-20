import React, { useState } from 'react';
import { Card } from './Card';
import { DeliveryIcon, PlusIcon, MinusIcon } from './icons';

interface DeliverySectionProps {
  entregasMucuri: number;
  setEntregasMucuri: React.Dispatch<React.SetStateAction<number>>;
  motoboyMucuriCost: number;
  remessasNV: number;
  setRemessasNV: React.Dispatch<React.SetStateAction<number>>;
  entregasNV: number;
  setEntregasNV: React.Dispatch<React.SetStateAction<number>>;
  motoboyNVCost: number;
}

const Counter: React.FC<{
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}> = ({ label, count, onIncrement, onDecrement }) => (
    <div className="flex items-center justify-between">
        <span className="font-medium text-slate-600">{label}:</span>
        <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{count}</span>
            <button
                onClick={onDecrement}
                disabled={count === 0}
                className="p-2 bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-400"
                aria-label={`Remover um ${label}`}
            >
                <MinusIcon />
            </button>
            <button
                onClick={onIncrement}
                className="p-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
                aria-label={`Adicionar um ${label}`}
            >
                <PlusIcon />
            </button>
        </div>
    </div>
);


export const DeliverySection: React.FC<DeliverySectionProps> = (props) => {
  const {
    entregasMucuri, setEntregasMucuri, motoboyMucuriCost,
    remessasNV, setRemessasNV,
    entregasNV, setEntregasNV, motoboyNVCost
  } = props;

  const [nvDeliveriesInput, setNvDeliveriesInput] = useState('');

  const handleAddRemessa = () => {
    const amount = parseInt(nvDeliveriesInput, 10);
    if (!isNaN(amount) && amount > 0) {
      setRemessasNV(prev => prev + 1);
      setEntregasNV(prev => prev + amount);
      setNvDeliveriesInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddRemessa();
    }
  };

  return (
    <Card title="Entregas" icon={<DeliveryIcon />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mucuri */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col gap-3">
          <h3 className="font-bold text-lg text-slate-700">Mucuri</h3>
          <Counter
            label="Entregas"
            count={entregasMucuri}
            onIncrement={() => setEntregasMucuri(prev => prev + 1)}
            onDecrement={() => setEntregasMucuri(prev => Math.max(0, prev - 1))}
          />
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <span className="font-medium text-slate-600">Valor Motoboy:</span>
            <span className="font-bold text-green-600">R$ {motoboyMucuriCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Nova Viçosa */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col gap-4">
          <h3 className="font-bold text-lg text-slate-700">Nova Viçosa</h3>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-600">Remessas:</span>
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{remessasNV}</span>
                <button
                    onClick={() => setRemessasNV(prev => Math.max(0, prev - 1))}
                    disabled={remessasNV === 0}
                    className="p-2 bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-400"
                    aria-label="Remover uma remessa"
                >
                    <MinusIcon />
                </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-600">Entregas:</span>
             <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{entregasNV}</span>
                <button
                    onClick={() => setEntregasNV(prev => Math.max(0, prev - 1))}
                    disabled={entregasNV === 0}
                    className="p-2 bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-400"
                    aria-label="Remover uma entrega"
                >
                    <MinusIcon />
                </button>
            </div>
          </div>
          
          <div className="pt-3 border-t border-slate-200">
            <label htmlFor="nv-lote" className="block text-sm font-medium text-slate-600 mb-1">Nº de entregas na remessa:</label>
            <div className="flex gap-2">
              <input
                id="nv-lote"
                type="number"
                value={nvDeliveriesInput}
                onChange={(e) => setNvDeliveriesInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ex: 3"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                onClick={handleAddRemessa} 
                className="flex-shrink-0 bg-blue-500 text-white font-semibold px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Adicionar Remessa
              </button>
            </div>
          </div>
          
           <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <span className="font-medium text-slate-600">Valor Motoboy:</span>
            <span className="font-bold text-green-600">R$ {motoboyNVCost.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};