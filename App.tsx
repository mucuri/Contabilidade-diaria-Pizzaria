
import React, { useState, useMemo, useCallback } from 'react';
import { PizzaSection } from './components/PizzaSection';
import { DeliverySection } from './components/DeliverySection';
import { PaymentSection } from './components/PaymentSection';
import { EmployeeSection } from './components/EmployeeSection';
import { NotesSection } from './components/NotesSection';
import { SummarySection } from './components/SummarySection';
import type { PizzaCounts, Payments, PaymentType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [pizzaCounts, setPizzaCounts] = useState<PizzaCounts>({ mesa: 0, levar: 0, entrega: 0 });
  const [entregasMucuri, setEntregasMucuri] = useState(0);
  const [remessasNV, setRemessasNV] = useState(0);
  const [entregasNV, setEntregasNV] = useState(0);
  const [payments, setPayments] = useState<Payments>({ pix: [], dinheiro: [], cartao: [], online: [] });
  const [presentEmployees, setPresentEmployees] = useState<string[]>([]);
  const [customEmployees, setCustomEmployees] = useState<string[]>(['', '', '']);
  const [observations, setObservations] = useState('');
  const [shoppingList, setShoppingList] = useState('');

  const handleAddPizza = useCallback((type: keyof PizzaCounts) => {
    setPizzaCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
  }, []);

  const handleRemovePizza = useCallback((type: keyof PizzaCounts) => {
    setPizzaCounts(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
  }, []);

  const handleAddPayment = useCallback((type: PaymentType, amount: number) => {
    if (amount > 0) {
      setPayments(prev => ({ ...prev, [type]: [...prev[type], amount] }));
    }
  }, []);
  
  const handleToggleEmployee = useCallback((name: string) => {
    setPresentEmployees(prev =>
      prev.includes(name) ? prev.filter(e => e !== name) : [...prev, name]
    );
  }, []);

  const handleCustomEmployeeChange = useCallback((index: number, value: string) => {
    setCustomEmployees(prev => {
        const newCustom = [...prev];
        newCustom[index] = value;
        return newCustom;
    });
  }, []);

  const totalPizzas = useMemo(() => Object.values(pizzaCounts).reduce((a, b) => a + b, 0), [pizzaCounts]);
  
  const totalPayments = useMemo(() => {
    return Object.values(payments)
      .flat()
      .reduce((sum, value) => sum + value, 0);
  }, [payments]);

  const motoboyMucuriCost = useMemo(() => entregasMucuri * 5, [entregasMucuri]);
  
  const motoboyNVCost = useMemo(() => {
    const baseCost = remessasNV * 50;
    const extraDeliveries = Math.max(0, entregasNV - remessasNV * 2);
    const extraCost = extraDeliveries * 15;
    return baseCost + extraCost;
  }, [remessasNV, entregasNV]);
  
  const allPresentEmployees = useMemo(() => [
    ...presentEmployees, 
    ...customEmployees.filter(name => name.trim() !== '')
  ], [presentEmployees, customEmployees]);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-slate-50">
      <Header />
      <main className="flex-grow max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PizzaSection 
            pizzaCounts={pizzaCounts} 
            totalPizzas={totalPizzas}
            onAddPizza={handleAddPizza} 
            onRemovePizza={handleRemovePizza}
          />
          <DeliverySection 
            entregasMucuri={entregasMucuri}
            setEntregasMucuri={setEntregasMucuri}
            motoboyMucuriCost={motoboyMucuriCost}
            remessasNV={remessasNV}
            setRemessasNV={setRemessasNV}
            entregasNV={entregasNV}
            setEntregasNV={setEntregasNV}
            motoboyNVCost={motoboyNVCost}
          />
          <PaymentSection 
            payments={payments}
            totalPayments={totalPayments}
            onAddPayment={handleAddPayment}
          />
        </div>

        {/* Coluna Lateral */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <EmployeeSection 
            presentEmployees={presentEmployees}
            onToggleEmployee={handleToggleEmployee}
            customEmployees={customEmployees}
            onCustomEmployeeChange={handleCustomEmployeeChange}
          />
          <NotesSection 
            observations={observations}
            setObservations={setObservations}
            shoppingList={shoppingList}
            setShoppingList={setShoppingList}
          />
        </div>

        {/* Seção de Resumo (Ocupa toda a largura) */}
        <div className="lg:col-span-3">
          <SummarySection
            pizzaCounts={pizzaCounts}
            totalPizzas={totalPizzas}
            entregasMucuri={entregasMucuri}
            remessasNV={remessasNV}
            entregasNV={entregasNV}
            motoboyMucuriCost={motoboyMucuriCost}
            motoboyNVCost={motoboyNVCost}
            payments={payments}
            totalPayments={totalPayments}
            presentEmployees={allPresentEmployees}
            observations={observations}
            shoppingList={shoppingList}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
