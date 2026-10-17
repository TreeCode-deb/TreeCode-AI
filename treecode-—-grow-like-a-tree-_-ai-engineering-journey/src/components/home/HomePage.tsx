import React from 'react';
import { 
  ArrowRight, 
  Github, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Compass, 
  Mail,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeroBackground } from './HeroBackground';
import { TypingHero } from './TypingHero';

export const HomePage: React.FC = () => {
  const { navigateTo, projects, roadmapStages } = useApp();

  const featuredProjects = projects.filter(p => p.published).slice(0, 3);
  const completedStagesCount = roadmapStages.filter(s => s.completed).length;
  const totalStagesCount = roadmapStages.length;
  const roadmapPercent = Math.round((completedStagesCount / totalStagesCount) * 100);
  const currentStage = roadmapStages.find(s => s.inProgress) || roadmapStages[0];

  return (
    <div className="relative min-h-screen">
      {/* 1. Centered Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 text-center overflow-hidden">
        <HeroBackground />

        {/* Content Container (Layered above video & dark overlays) */}
        <div className="relative z-10 max-w-4xl mx-auto py-16 flex flex-col items-center">
          {/* Subtle Identity Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AI Engineering Journey</span>
            <span className="text-emerald-600">/</span>
            <span>Grow Like a Tree</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
              TreeCode
            </span>
          </h1>

          {/* Centered Typing Animation */}
          <div className="mb-6 w-full">
            <TypingHero />
          </div>

          {/* Creative Developer Paragraph */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300/90 leading-relaxed font-normal mb-10">
            Growing through code, exploring intelligence, and building something meaningful — one line at a time.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('projects')}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all shadow-[0_0_20px_-3px_rgba(16,185,129,0.5)] flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('about')}
              className="px-6 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-emerald-900/50 hover:border-emerald-500/50 font-semibold text-sm transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>My Journey</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Short Introduction Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto border-t border-emerald-950/50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              The Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2 mb-4">
              Building Strong Foundations
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              TreeCode is my personal learning and development identity. It documents my practical path from writing Python scripts to engineering intelligent systems and autonomous agents.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0c140f] border border-emerald-900/30">
              <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-1">Code & Experiment</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Writing authentic code, debugging real errors, and constructing verifiable algorithms from scratch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c140f] border border-emerald-900/30">
              <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-1">AI Engineering Path</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Progressing through mathematics, machine learning principles, and modern agentic development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto border-t border-emerald-950/50">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              Selected Work
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">
              Featured Projects
            </h2>
          </div>
          <button
            onClick={() => navigateTo('projects')}
            className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {featuredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0a110c] border border-emerald-900/30 text-zinc-400 text-sm">
            No published projects available at this moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                className="group flex flex-col rounded-2xl bg-[#0b130e] border border-emerald-900/30 hover:border-emerald-500/40 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                {/* Project Image */}
                <div className="relative aspect-video w-full bg-[#080d0a] overflow-hidden">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-950/60 to-[#080d0a] text-emerald-400/40">
                      <Terminal className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b130e] via-transparent to-transparent opacity-60" />
                </div>

                {/* Project Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata / Technologies */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-emerald-400/80 mb-2.5 font-mono">
                      {project.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {idx < project.technologies.length - 1 && <span className="text-zinc-600">·</span>}
                        </React.Fragment>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-3 border-t border-emerald-950/40 text-xs font-medium">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-300 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors ml-auto"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Learning Progress Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto border-t border-emerald-950/50">
        <div className="p-8 rounded-3xl bg-[#09110c] border border-emerald-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
                Active Learning Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                AI Engineering Roadmap Status
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Accurate progress tracked directly from verified milestones.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  {completedStagesCount}/{totalStagesCount}
                </span>
                <span className="block text-[11px] text-zinc-400 font-mono">Stages Mastered ({roadmapPercent}%)</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#131f17] h-2.5 rounded-full overflow-hidden mb-6 border border-emerald-950">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700" 
              style={{ width: `${Math.max(roadmapPercent, 8)}%` }} 
            />
          </div>

          {/* Currently In Progress Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#0e1711] border border-emerald-900/30 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                  Currently Studying
                </span>
                <p className="text-sm font-bold text-white">
                  Stage {currentStage.id}: {currentStage.title}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                  {currentStage.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('roadmap')}
              className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold shrink-0 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Complete Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Contact Call-To-Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center border-t border-emerald-950/50">
        <div className="w-12 h-12 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
          <Mail className="w-5 h-5" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
          Let’s Connect & Learn Together
        </h2>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
          Have an idea, feedback on my projects, or want to discuss AI engineering fundamentals? Send a message anytime.
        </p>
        <button
          onClick={() => navigateTo('contact')}
          className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all shadow-[0_0_20px_-3px_rgba(16,185,129,0.4)] inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Get in Touch</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
