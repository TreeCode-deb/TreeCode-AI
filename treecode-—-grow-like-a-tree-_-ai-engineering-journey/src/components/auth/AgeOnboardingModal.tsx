import React, { useState } from 'react';
import { Calendar, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AgeOnboardingModal: React.FC = () => {
  const { updateUserAge, needsAgeOnboarding, currentUser } = useApp();
  const [age, setAge] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!needsAgeOnboarding || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAge = parseInt(age.trim(), 10);
    if (isNaN(numAge) || numAge < 10 || numAge > 120) {
      setError('Please provide a valid age between 10 and 120.');
      return;
    }
    updateUserAge(numAge);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#09110c] border border-emerald-900/60 max-w-sm w-full space-y-5 shadow-2xl">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-white tracking-tight">Complete Your Profile</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Welcome, <strong className="text-emerald-300">{currentUser.displayName}</strong>. Please enter your age to complete your account setup.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/50 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-emerald-300 mb-1.5">
              Age *
            </label>
            <input
              type="number"
              min={10}
              max={120}
              autoFocus
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 15"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#060b08] border border-emerald-900/40 text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Handled as private profile data only.</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Confirm & Enter TreeCode</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
