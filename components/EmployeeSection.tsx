
import React from 'react';
import { EMPLOYEE_NAMES } from '../constants';
import { Card } from './Card';
import { EmployeeIcon } from './icons';

interface EmployeeSectionProps {
  presentEmployees: string[];
  onToggleEmployee: (name: string) => void;
  customEmployees: string[];
  onCustomEmployeeChange: (index: number, value: string) => void;
}

export const EmployeeSection: React.FC<EmployeeSectionProps> = ({ presentEmployees, onToggleEmployee, customEmployees, onCustomEmployeeChange }) => {
  return (
    <Card title="Funcionários Presentes" icon={<EmployeeIcon />}>
      <div className="flex flex-wrap gap-2">
        {EMPLOYEE_NAMES.map(name => {
          const isActive = presentEmployees.includes(name);
          return (
            <button
              key={name}
              onClick={() => onToggleEmployee(name)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ease-in-out border-2
                ${isActive
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
                }`}
            >
              {name}
            </button>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Adicionar Manualmente</h3>
        <div className="space-y-2">
            {customEmployees.map((name, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Funcionário ${index + 1}`}
                    value={name}
                    onChange={(e) => onCustomEmployeeChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
            ))}
        </div>
      </div>
    </Card>
  );
};
