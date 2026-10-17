import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Monitor, 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  Check, 
  ExternalLink,
  Lock,
  Calendar,
  Mail
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { 
    theme, 
    setTheme, 
    currentUser, 
    isAdmin, 
    logout,
    navigateTo 
  } = useApp();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-emerald-950/60 pb-8">
        <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
          Preferences & Credentials
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Customize website visual appearance, review verified authentication credentials, and access administrator tools.
        </p>
      </div>

      {/* 1. Appearance Settings */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Moon className="w-4 h-4 text-emerald-400" />
          <span>Appearance Theme</span>
        </h2>
        
        <p className="text-xs text-zinc-400">
          Select your visual environment preference. Dark Forest mode is the default brand theme.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer
              ${theme === 'dark' 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-xs' 
                : 'bg-[#09110c] border-emerald-950/80 text-zinc-400 hover:border-emerald-800'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-white">Dark Forest</p>
                <p className="text-[10px] text-zinc-500">Deep charcoal & emerald</p>
              </div>
            </div>
            {theme === 'dark' && <Check className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer
              ${theme === 'light' 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-xs' 
                : 'bg-[#09110c] border-emerald-950/80 text-zinc-400 hover:border-emerald-800'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <Sun className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-xs font-bold text-white">Light Forest</p>
                <p className="text-[10px] text-zinc-500">Fresh high-contrast sage</p>
              </div>
            </div>
            {theme === 'light' && <Check className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => setTheme('system')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer
              ${theme === 'system' 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-xs' 
                : 'bg-[#09110c] border-emerald-950/80 text-zinc-400 hover:border-emerald-800'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <Monitor className="w-4 h-4 text-zinc-400" />
              <div>
                <p className="text-xs font-bold text-white">System Default</p>
                <p className="text-[10px] text-zinc-500">Match operating system</p>
              </div>
            </div>
            {theme === 'system' && <Check className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </section>

      {/* 2. Account Profile & Verified Status */}
      <section className="space-y-4 border-t border-emerald-950/60 pt-8">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-emerald-400" />
          <span>Account Profile & Security</span>
        </h2>

        <div className="p-6 rounded-2xl bg-[#09110c] border border-emerald-900/40 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-950 border border-emerald-500/50 flex items-center justify-center text-sm font-bold text-white">
                {currentUser?.displayName ? currentUser.displayName.slice(0, 2).toUpperCase() : 'TC'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {currentUser?.displayName}
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border
                ${isAdmin 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-zinc-800/80 text-zinc-300 border-zinc-700/50'
                }
              `}>
                ROLE: {isAdmin ? 'ADMIN' : 'USER'}
              </span>

              <button
                onClick={logout}
                className="px-3.5 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-950/60 text-rose-300 border border-rose-900/40 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-950/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px]">Session Status:</span>
              <span className="text-emerald-400 font-semibold">Authenticated Active</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px]">Authorization Engine:</span>
              <span className="text-zinc-300">Firebase Custom Claims / Server Auth</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Developer Options (Visible ONLY to Verified Admin) */}
      {isAdmin ? (
        <section className="space-y-4 border-t border-emerald-950/60 pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Developer Options</span>
            </h2>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Verified Administrator Access
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1710] to-[#070c09] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">Private Admin Panel</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-lg leading-relaxed">
                Manage project entries, toggle roadmap mastery stages, and view inbound contact inquiries.
              </p>
            </div>

            <button
              onClick={() => navigateTo('admin')}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] flex items-center gap-2 self-start sm:self-auto shrink-0 cursor-pointer"
            >
              <span>Open Admin Panel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      ) : (
        <section className="space-y-4 border-t border-emerald-950/60 pt-8 opacity-60">
          <div className="p-5 rounded-2xl bg-[#09110c] border border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-400">
            <Lock className="w-4 h-4 text-zinc-500 shrink-0" />
            <span>Developer options are restricted to the authorized administrator (treepilot1212@gmail.com).</span>
          </div>
        </section>
      )}
    </div>
  );
};
