import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Code, 
  Terminal, 
  Compass, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  Cpu, 
  Lightbulb, 
  Repeat, 
  Hammer, 
  GitBranch 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SETUP_TOOLS } from '../../data/initialData';
import { ToolLogo } from '../common/ToolLogos';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  // Group tools by category
  const categories = [
    'Code Editors & IDEs',
    'Programming Language',
    'Version Control & Code Hosting',
    'AI Coding & Research Tools',
    'Community & Problem Solving',
  ] as const;

  const workflowSteps = [
    {
      num: '01',
      title: 'Learn',
      desc: 'Understand a concept and study reliable learning resources.',
      icon: BookOpen,
    },
    {
      num: '02',
      title: 'Explore',
      desc: 'Use documentation, AI assistants, and research tools to clarify ideas.',
      icon: Lightbulb,
    },
    {
      num: '03',
      title: 'Code',
      desc: 'Practise programming and implement what I learn in clean scripts.',
      icon: Code,
    },
    {
      num: '04',
      title: 'Solve',
      desc: 'Work through coding problems and debug mistakes with patience.',
      icon: Terminal,
    },
    {
      num: '05',
      title: 'Build',
      desc: 'Apply knowledge to practical, hands-on projects with real utility.',
      icon: Hammer,
    },
    {
      num: '06',
      title: 'Improve',
      desc: 'Review code, track with Git, and refine the architecture step by step.',
      icon: Repeat,
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto space-y-24">
      {/* 1. Header & Introduction */}
      <section className="relative">
        <div className="max-w-3xl">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            Personal Narrative
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-3">
            About Me
          </h1>
          <p className="text-lg text-emerald-300 font-medium mb-8">
            Every great journey begins with curiosity.
          </p>
          
          <div className="prose prose-invert text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Hello, I am <strong className="text-white font-semibold">Umar Mehmood</strong>. I am currently a student in Class 9 with a profound curiosity for computing, software architecture, and the transformative potential of artificial intelligence.
            </p>
            <p>
              My journey began with a natural fascination for how software interacts with logic and the physical world. Today, I am focused on mastering Python fundamentals and building my core technical foundation. My long-term aspiration is to become an <span className="text-emerald-400 font-medium">AI Engineer</span>, designing intelligent agents, scalable machine learning systems, and automated pipelines.
            </p>
            <p>
              I believe in learning consistently, writing authentic code, building practical projects, and embracing mistakes as the quickest path to mastery. <strong className="text-white">TreeCode</strong> represents this personal development philosophy: growing step by step, branching into new territories, and staying grounded in strong roots — just like a tree.
            </p>
          </div>
        </div>
      </section>

      {/* 2. My Journey — Past, Present & Future */}
      <section className="border-t border-emerald-950/60 pt-16">
        <div className="mb-10">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            Chronology
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            My Journey
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            A continuous progression of curiosity, discipline, and vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Past: My Beginning */}
          <div className="p-6 rounded-2xl bg-[#0a110c] border border-emerald-900/30 flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
            <div>
              <span className="text-xs font-mono text-zinc-500 font-semibold uppercase block mb-2">
                01 · The Past
              </span>
              <h3 className="text-lg font-bold text-white mb-3">My Beginning</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                It began with tinkering on computers and wondering how complex software actually runs under the hood. I started experimenting with basic programming concepts, exploring terminal environments, and understanding how computers execute sequential instructions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-950/50 text-[11px] font-mono text-emerald-400">
              Curiosity & Initial Exploration
            </div>
          </div>

          {/* Present: Where I Am Today */}
          <div className="p-6 rounded-2xl bg-[#0c140f] border border-emerald-500/40 flex flex-col justify-between shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                  02 · The Present
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Where I Am Today</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Currently studying in Class 9, immersing myself in Python fundamentals, object-oriented concepts, and core data structures. I actively write programs, experiment with developer tools like Cursor and VS Code, and build practical projects to cement conceptual knowledge.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-950/60 text-[11px] font-mono text-emerald-300 font-medium">
              Python 3.13.3 & Algorithmic Foundations
            </div>
          </div>

          {/* Future: Where I Want to Go */}
          <div className="p-6 rounded-2xl bg-[#0a110c] border border-emerald-900/30 flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
            <div>
              <span className="text-xs font-mono text-zinc-500 font-semibold uppercase block mb-2">
                03 · The Horizon
              </span>
              <h3 className="text-lg font-bold text-white mb-3">Where I Want to Go</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                My ambition is to qualify as a professional AI Engineer. I aim to architect autonomous agent swarms, train neural networks, design real-time intelligent applications, and contribute meaningful open-source tools that solve real human challenges.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-950/50 text-[11px] font-mono text-emerald-400">
              Autonomous Systems & Neural Architecture
            </div>
          </div>
        </div>
      </section>

      {/* 3. My Mindset — Growing Every Day */}
      <section className="border-t border-emerald-950/60 pt-16">
        <div className="mb-10">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Growing Every Day
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            The core philosophy that guides my study and coding habits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#09100b] border border-emerald-900/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Fundamentals First</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Understand the core logic before rushing to advanced frameworks. Solid basics prevent fragile architectures.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#09100b] border border-emerald-900/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Build Practical Projects</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Watching tutorials is passive. True learning happens when creating tangible scripts and solving actual errors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#09100b] border border-emerald-900/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <Repeat className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Mistakes as Stepping Stones</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Traceback errors and broken outputs are not failures — they are precise diagnostic clues for growth.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#09100b] border border-emerald-900/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Stay Insatiably Curious</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Explore how AI models reason, investigate new paradigms, and understand computational mechanics deeply.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#09100b] border border-emerald-900/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Grow Consistently</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Progress compounds over time. Showing up every single day yields profound breakthroughs over months and years.
            </p>
          </div>
        </div>
      </section>

      {/* 4. My Development Environment & Setup (ALL 12 EXACT TOOLS DISPLAYED) */}
      <section className="border-t border-emerald-950/60 pt-16">
        <div className="mb-10">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            Hardware & Software Rig
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            My Development Environment
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            The tools I use to learn, build, research, code, and solve problems.
          </p>
        </div>

        {/* Display categorized tools */}
        <div className="space-y-10">
          {categories.map((catName) => {
            const categoryTools = SETUP_TOOLS.filter((t) => t.category === catName);
            if (categoryTools.length === 0) return null;

            return (
              <div key={catName}>
                <h3 className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span>{catName}</span>
                  <span className="h-px flex-1 bg-emerald-950/70" />
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryTools.map((tool) => (
                    <div
                      key={tool.name}
                      className="p-5 rounded-2xl bg-[#09110c] border border-emerald-900/30 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <ToolLogo type={tool.logoType} className="w-8 h-8 shrink-0" />
                          
                          {/* Exact Python Version Badge or Category Label */}
                          {tool.version ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold tracking-tight">
                              v{tool.version}
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono text-zinc-500">
                              Verified Setup
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {tool.name}
                          {tool.version && <span className="text-emerald-400 font-mono ml-1.5 text-xs">3.13.3</span>}
                        </h4>
                        
                        <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. My Workflow — How I Learn & Build */}
      <section className="border-t border-emerald-950/60 pt-16">
        <div className="mb-10">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
            Execution Method
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            How I Learn & Build
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            A deliberate six-step loop for acquiring knowledge and building verified software.
          </p>
        </div>

        {/* Workflow steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="p-4 rounded-2xl bg-[#09100c] border border-emerald-900/30 flex flex-col justify-between relative group hover:border-emerald-500/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-extrabold text-emerald-500/80">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. TreeCode Philosophy */}
      <section className="border-t border-emerald-950/60 pt-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#09140e] to-[#060b08] border border-emerald-500/30 relative overflow-hidden text-center shadow-[0_0_40px_-15px_rgba(16,185,129,0.2)]">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-6">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22v-7" />
              <path d="m9 15 3-3 3 3" />
              <path d="m7 11 5-5 5 5" />
              <path d="m5 7 7-5 7 5" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Grow Like a Tree.
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
            Strong foundations take time. Every line of code, every problem solved, and every lesson learned is another step toward something greater.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('projects')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-[0_0_20px_-3px_rgba(16,185,129,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('roadmap')}
              className="px-6 py-3 rounded-xl bg-[#0d1711] hover:bg-[#122018] text-emerald-300 border border-emerald-500/30 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>AI Engineering Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
