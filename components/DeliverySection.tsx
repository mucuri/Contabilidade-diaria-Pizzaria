
import React, { useState } from 'react';
import { Card } from './Card';
import { DeliveryIcon, PlusIcon } from './icons';

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

export const DeliverySection: React.FC<DeliverySectionProps> = (props) => {
  const {
    entregasMucuri, setEntregasMucuri, motoboyMucuriCost,
    remessasNV, setRemessasNV,
    entregasNV, setEntregasNV, motoboyNVCost
  } = props;

  const [nvDeliveriesInput, setNvDeliveriesInput] = useState('');

  const handleAddNvDeliveries = () => {
    const amount = parseInt(nvDeliveriesInput, 10);
    if (!isNaN(amount) && amount > 0) {
      setEntregasNV(prev => prev + amount);
      setNvDeliveriesInput('');
    }
  };

  return (
    <Card title="Entregas" icon={<DeliveryIcon />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mucuri */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-lg mb-3 text-slate-700">Mucuri</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-slate-600">Total de Entregas:</span>
            <span className="text-2xl font-bold">{entregasMucuri}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-slate-600">Valor Motoboy:</span>
            <span className="font-bold text-green-600">R$ {motoboyMucuriCost.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setEntregasMucuri(prev => prev + 1)}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
          >
            <PlusIcon /> Adicionar Entrega
          </button>
        </div>

        {/* Nova Viçosa */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-lg mb-3 text-slate-700">Nova Viçosa</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-slate-600">Remessas:</span>
            <span className="text-2xl font-bold">{remessasNV}</span>
          </div>
           <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-slate-600">Total de Entregas:</span>
            <span className="text-2xl font-bold">{entregasNV}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-slate-600">Valor Motoboy:</span>
            <span className="font-bold text-green-600">R$ {motoboyNVCost.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setRemessasNV(prev => prev + 1)}
              className="w-full flex items-center justify-center gap-2 bg-slate-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-800 transition-colors"
            >
              <PlusIcon /> Adicionar Remessa
            </button>
            <div className="flex gap-2">
              <input
                type="number"
                value={nvDeliveriesInput}
                onChange={(e) => setNvDeliveriesInput(e.target.value)}
                placeholder="Nº entregas"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button onClick={handleAddNvDeliveries} className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600 transition-colors">Add</button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
