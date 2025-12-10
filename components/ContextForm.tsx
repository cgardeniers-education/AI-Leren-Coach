import React, { useState } from 'react';
import { UserContext } from '../types';
import { GraduationCap, BookOpen, School } from 'lucide-react';

interface ContextFormProps {
  onComplete: (context: UserContext) => void;
}

const ContextForm: React.FC<ContextFormProps> = ({ onComplete }) => {
  const [level, setLevel] = useState<'VMBO' | 'HAVO' | 'VWO'>('HAVO');
  const [year, setYear] = useState('3');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) {
      setError('Vul alsjeblieft een vak of onderwerp in.');
      return;
    }
    onComplete({ level, year, subject, hasStarted: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 p-4 rounded-full inline-flex mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Welkom bij je AI-Coach</h1>
          <p className="text-slate-500 mt-2">Vertel me even wie je bent, dan kan ik je beter helpen.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <School className="w-4 h-4" /> Niveau
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['VMBO', 'HAVO', 'VWO'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setLevel(opt)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    level === opt
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Leerjaar / Klas</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border-slate-200 border p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-slate-50"
            >
              {[1, 2, 3, 4, 5, 6].map((y) => (
                <option key={y} value={y}>
                  Klas {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Vak of Onderwerp
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Bijv. Geschiedenis, Engels, Wiskunde..."
              className="w-full rounded-lg border-slate-200 border p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all active:scale-95"
          >
            Start Coaching
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContextForm;
