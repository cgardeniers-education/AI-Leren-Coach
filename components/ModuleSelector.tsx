import React from 'react';
import { ModuleType } from '../types';
import { HelpCircle, PenTool, BookCheck, ShieldCheck, BrainCircuit, Search } from 'lucide-react';

interface ModuleSelectorProps {
  onSelect: (module: ModuleType) => void;
  disabled: boolean;
}

const modules = [
  { type: ModuleType.EXPLAIN_AI, icon: BrainCircuit, label: 'Wat is AI?', color: 'bg-blue-100 text-blue-600' },
  { type: ModuleType.PROMPTING, icon: PenTool, label: 'Beter Prompten', color: 'bg-purple-100 text-purple-600' },
  { type: ModuleType.HOMEWORK, icon: HelpCircle, label: 'Hulp bij Taak', color: 'bg-indigo-100 text-indigo-600' },
  { type: ModuleType.FACT_CHECK, icon: Search, label: 'Fact-checken', color: 'bg-orange-100 text-orange-600' },
  { type: ModuleType.PRACTICE, icon: BookCheck, label: 'Oefenen', color: 'bg-emerald-100 text-emerald-600' },
];

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ onSelect, disabled }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0">
      {modules.map((mod) => (
        <button
          key={mod.type}
          onClick={() => onSelect(mod.type)}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 
            bg-white hover:bg-slate-50 transition-all whitespace-nowrap shadow-sm
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <div className={`p-1 rounded-full ${mod.color}`}>
            <mod.icon size={14} />
          </div>
          <span className="text-sm font-medium text-slate-700">{mod.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ModuleSelector;
