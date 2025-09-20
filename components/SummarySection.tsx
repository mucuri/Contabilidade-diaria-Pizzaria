
import React, { useState, useMemo } from 'react';
import type { PizzaCounts, Payments } from '../types';
import { Card } from './Card';
import { SummaryIcon, CopyIcon, CheckIcon, DownloadIcon } from './icons';

interface SummarySectionProps {
  pizzaCounts: PizzaCounts;
  totalPizzas: number;
  entregasMucuri: number;
  remessasNV: number;
  entregasNV: number;
  motoboyMucuriCost: number;
  motoboyNVCost: number;
  payments: Payments;
  totalPayments: number;
  presentEmployees: string[];
  observations: string;
  shoppingList: string;
}

export const SummarySection: React.FC<SummarySectionProps> = (props) => {
  const [copied, setCopied] = useState(false);

  const summaryText = useMemo(() => {
    const todayDate = new Date().toLocaleDateString('pt-BR');
    const paymentReducer = (sum: number, val: number) => sum + val;
    
    const paymentDetails = (Object.keys(props.payments) as (keyof Payments)[]).map(type => {
      const p = props.payments[type];
      const sum = p.reduce(paymentReducer, 0).toFixed(2);
      const count = p.length;
      return `${type.charAt(0).toUpperCase() + type.slice(1)}: R$ ${sum} (${count} pagamentos)`;
    }).join('\n');

    return `
RESUMO BELLA NAPOLI - ${todayDate}
---------------------------------
PIZZAS
- Total de Pizzas: ${props.totalPizzas}
- Mesa: ${props.pizzaCounts.mesa}
- Levar: ${props.pizzaCounts.levar}
- Entrega: ${props.pizzaCounts.entrega}
---------------------------------
ENTREGAS
- Mucuri: ${props.entregasMucuri} entregas (Motoboy: R$ ${props.motoboyMucuriCost.toFixed(2)})
- N. Viçosa: ${props.remessasNV} remessas / ${props.entregasNV} entregas (Motoboy: R$ ${props.motoboyNVCost.toFixed(2)})
---------------------------------
PAGAMENTOS
${paymentDetails}
- TOTAL RECEBIDO: R$ ${props.totalPayments.toFixed(2)}
---------------------------------
EQUIPE PRESENTE
- ${props.presentEmployees.join(', ') || 'Nenhum funcionário selecionado'}
---------------------------------
OBSERVAÇÕES
${props.observations || 'Nenhuma'}
---------------------------------
COMPRAS
${props.shoppingList || 'Nada a comprar'}
    `.trim();
  }, [props]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const todayDate = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
    const filename = `resumo-bella-napoli-${todayDate}.txt`;
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card 
      title="Resumo do Dia" 
      icon={<SummaryIcon />}
      headerContent={
        <div className="flex items-center gap-2">
            <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${copied
                    ? 'bg-green-600 text-white focus:ring-green-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                    }`}
            >
                {copied ? <CheckIcon/> : <CopyIcon />}
                {copied ? 'Copiado!' : 'Copiar Resumo'}
            </button>
             <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors bg-slate-600 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
                <DownloadIcon />
                Download
            </button>
        </div>
      }
    >
      <pre className="whitespace-pre-wrap bg-slate-50 p-4 rounded-md text-sm text-slate-700 font-mono overflow-x-auto">
        {summaryText}
      </pre>
    </Card>
  );
};
