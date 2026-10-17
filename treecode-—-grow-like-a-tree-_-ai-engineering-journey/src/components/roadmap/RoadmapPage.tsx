import React from 'react';
import { 
  Milestone, 
  CheckCircle2, 
  Clock, 
  Circle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RoadmapPage: React.FC = () => {
  const { roadmapStages, toggleRoadmapStage, isAdmin } = useApp();

  const completedCount = roadmapStages.filter((s) => s.completed).length;
  const totalCount = roadmapStages.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto space-y-12">
      {/* Header & Metrics */}
      <div className="border-b border-emerald-950/60 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              Curriculum & Mastery Plan
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              AI Engineering Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              A structured 12-stage learning sequence from Python programming to autonomous AI agents and deployment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#09110c] border border-emerald-900/40 text-right min-w-[200px]">
            <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
              {completedCount} <span className="text-zinc-500 font-normal">/ {totalCount}</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-medium">
              {progressPercent}% Complete
            </div>
            {isAdmin && (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-mono mt-1">
                <ShieldCheck className="w-3 h-3" /> Admin Edit Active
              </span>
            )}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 w-full bg-[#0d1610] h-2.5 rounded-full overflow-hidden border border-emerald-950">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(progressPercent, 4)}%` }}
          />
        </div>
      </div>

      {/* Stage Sequence */}
      <div className="space-y-4">
        {roadmapStages.map((stage) => {
          const isDone = stage.completed;
          const isInProgress = stage.inProgress && !isDone;

          return (
            <div
              key={stage.id}
              className={`p-5 sm:p-6 rounded-2xl transition-all duration-200 border
                ${isDone 
                  ? 'bg-[#09120c] border-emerald-500/30' 
                  : isInProgress 
                    ? 'bg-[#0b140e] border-emerald-400/50 shadow-[0_0_20px_-8px_rgba(16,185,129,0.25)]' 
                    : 'bg-[#080d0a] border-emerald-950/50 opacity-80'
                }
              `}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Stage Number / Status Icon */}
                  <div className="shrink-0 mt-0.5">
                    {isDone ? (
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : isInProgress ? (
                      <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/50 flex items-center justify-center text-teal-300">
                        <Clock className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 font-mono text-xs font-bold">
                        {stage.id}
                      </div>
                    )}
                  </div>

                  {/* Stage Details */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-zinc-500 font-medium">
                        Stage {String(stage.id).padStart(2, '0')}
                      </span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-[11px] font-mono text-emerald-400 font-medium">
                        {stage.category}
                      </span>
                      {isInProgress && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                          In Progress
                        </span>
                      )}
                      {isDone && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Mastered
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {stage.title}
                    </h3>

                    <p className="text-xs text-zinc-300 leading-relaxed mb-3 max-w-2xl">
                      {stage.description}
                    </p>

                    {/* Key Concepts (Clean unboxed text) */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
                      <span className="text-zinc-500">Topics:</span>
                      {stage.keyConcepts.map((concept, i) => (
                        <React.Fragment key={concept}>
                          <span className="text-zinc-300">{concept}</span>
                          {i < stage.keyConcepts.length - 1 && <span className="text-zinc-600">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Admin Checkbox Control */}
                {isAdmin && (
                  <div className="sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-emerald-950/50">
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50 cursor-pointer hover:border-emerald-500/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={stage.completed}
                        onChange={() => toggleRoadmapStage(stage.id)}
                        className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                      />
                      <span className="text-xs font-mono font-medium text-emerald-300 select-none">
                        {stage.completed ? 'Completed' : 'Mark Complete'}
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
