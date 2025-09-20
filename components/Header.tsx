
import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(date);
  }, []);

  return (
    <header className="text-center mb-8 max-w-5xl w-full mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
        Sistema de Pizzaria <span className="text-blue-600">Bella Napoli</span>
      </h1>
      <p className="mt-2 text-lg text-slate-500">{currentDate}</p>
    </header>
  );
};
