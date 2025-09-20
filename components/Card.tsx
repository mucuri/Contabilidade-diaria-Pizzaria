
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerContent?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, children, className = '', headerContent }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      <div className="p-4 md:p-6 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-blue-600">{icon}</div>
          <h2 className="text-xl font-bold text-slate-700 tracking-tight">{title}</h2>
        </div>
        {headerContent}
      </div>
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};
