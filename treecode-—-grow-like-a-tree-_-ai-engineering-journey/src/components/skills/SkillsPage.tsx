import React from 'react';
import { Code2, BookOpen, Cpu, Sparkles, Terminal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SkillsPage: React.FC = () => {
  const { skills } = useApp();

  const categories = [
    'Programming & Core',
    'AI & Machine Learning',
    'Developer Tools & Workflow',
    'Problem Solving & Math',
  ] as const;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confident':
        return 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40';
      case 'Practicing':
        return 'text-teal-300 bg-teal-500/20 border-teal-500/40';
      case 'Learning':
      default:
        return 'text-zinc-300 bg-zinc-800/60 border-zinc-700/50';
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-emerald-950/60 pb-8">
        <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
          Technical Inventory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
          Skills & Foundations
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
          An honest, transparent inventory of programming languages, tools, and theoretical principles I am actively practicing and studying. No inflated metrics.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-emerald-950/40 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">Confident (Firm fundamentals applied in projects)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <span className="text-zinc-300">Practicing (Regular coding & problem solving)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
            <span className="text-zinc-300">Learning (Conceptual study & initial scripts)</span>
          </div>
        </div>
      </div>

      {/* Categorized Skills */}
      <div className="space-y-10">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;

          return (
            <div key={cat} className="space-y-4">
              <h2 className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <span>{cat}</span>
                <span className="h-px flex-1 bg-emerald-950/70" />
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {catSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-5 rounded-2xl bg-[#09110c] border border-emerald-900/30 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-bold text-white">
                          {skill.name}
                        </h3>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getStatusStyle(
                            skill.status
                          )}`}
                        >
                          {skill.status}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
