
import React, { useState } from 'react';
import type { Payments, PaymentType } from '../types';
import { Card } from './Card';
import { PaymentIcon } from './icons';

interface PaymentSectionProps {
  payments: Payments;
  totalPayments: number;
  onAddPayment: (type: PaymentType, amount: number) => void;
}

const PaymentInput: React.FC<{
  type: PaymentType;
  label: string;
  onAddPayment: (type: PaymentType, amount: number) => void;
}> = ({ type, label, onAddPayment }) => {
  const [amount, setAmount] = useState('');
  
  const handleAdd = () => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      onAddPayment(type, numericAmount);
      setAmount('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={type} className="font-semibold text-slate-600">{label}</label>
      <div className="flex gap-2">
        <span className="flex items-center px-3 text-slate-500 bg-slate-100 border border-r-0 border-slate-300 rounded-l-md">R$</span>
        <input
          id={type}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="0.00"
          className="flex-grow w-full px-3 py-2 border border-slate-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button 
          onClick={handleAdd}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export const PaymentSection: React.FC<PaymentSectionProps> = ({ payments, totalPayments, onAddPayment }) => {
  return (
    <Card 
      title="Pagamentos" 
      icon={<PaymentIcon />}
      headerContent={
         <div className="text-right">
            <span className="text-sm font-medium text-slate-500">Total Recebido</span>
            <p className="text-2xl font-bold text-green-600">R$ {totalPayments.toFixed(2)}</p>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <PaymentInput type="pix" label="Pix" onAddPayment={onAddPayment} />
        <PaymentInput type="dinheiro" label="Dinheiro" onAddPayment={onAddPayment} />
        <PaymentInput type="cartao" label="Cartão" onAddPayment={onAddPayment} />
        <PaymentInput type="online" label="Online" onAddPayment={onAddPayment} />
      </div>
      <div className="mt-6 space-y-2">
        <h4 className="font-semibold text-slate-700">Valores adicionados:</h4>
        {(Object.keys(payments) as PaymentType[]).map(type => (
          payments[type].length > 0 && (
            <div key={type} className="text-sm text-slate-500">
              <span className="font-semibold capitalize">{type}: </span>
              {payments[type].map(p => `R$${p.toFixed(2)}`).join(', ')}
            </div>
          )
        ))}
      </div>
    </Card>
  );
};
