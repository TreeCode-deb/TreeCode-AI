import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FolderGit2, 
  Milestone, 
  Mail, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  X, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminPanel: React.FC = () => {
  const { 
    isAdmin, 
    navigateTo, 
    projects, 
    roadmapStages, 
    toggleRoadmapStage, 
    contactMessages, 
    markMessageRead, 
    deleteContactMessage 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'roadmap' | 'messages'>('dashboard');

  // Security gate
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-950/40 border border-rose-900/50 flex items-center justify-center text-rose-400 mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Restricted</h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
          The TreeCode Admin Control Center is protected. You must be authenticated as the authorized administrator (<span className="text-emerald-400 font-mono">treepilot1212@gmail.com</span>).
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-sm cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const publishedCount = projects.filter((p) => p.published).length;
  const completedStages = roadmapStages.filter((s) => s.completed).length;
  const unreadMessagesCount = contactMessages.filter((m) => !m.read).length;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-950/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Developer Control Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Admin Panel
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#070d09] border border-emerald-950 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'dashboard' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'projects' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'roadmap' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Roadmap ({completedStages}/{roadmapStages.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors relative ${
              activeTab === 'messages' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Messages
            {unreadMessagesCount > 0 && (
              <span className="ml-1 px-1 rounded-full bg-emerald-400 text-zinc-950 text-[10px] font-bold">
                {unreadMessagesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab: Dashboard Overview */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#09110c] border border-emerald-900/30">
              <span className="text-xs font-mono text-zinc-500">Total Projects</span>
              <p className="text-3xl font-extrabold text-white font-mono mt-2 tabular-nums">
                {projects.length}
              </p>
              <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
                {publishedCount} Publicly Visible
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#09110c] border border-emerald-900/30">
              <span className="text-xs font-mono text-zinc-500">Roadmap Progress</span>
              <p className="text-3xl font-extrabold text-white font-mono mt-2 tabular-nums">
                {Math.round((completedStages / roadmapStages.length) * 100)}%
              </p>
              <span className="text-[11px] text-zinc-400 font-mono mt-1 block">
                {completedStages} of 12 Stages Mastered
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#09110c] border border-emerald-900/30">
              <span className="text-xs font-mono text-zinc-500">Inbound Messages</span>
              <p className="text-3xl font-extrabold text-white font-mono mt-2 tabular-nums">
                {contactMessages.length}
              </p>
              <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
                {unreadMessagesCount} Unread Inquiry
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#09110c] border border-emerald-900/30">
              <span className="text-xs font-mono text-zinc-500">Current Role</span>
              <p className="text-xl font-bold text-emerald-300 font-mono mt-2 truncate">
                Super Admin
              </p>
              <span className="text-[11px] text-zinc-500 font-mono mt-1 block truncate">
                treepilot1212@gmail.com
              </span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-6 rounded-2xl bg-[#09110c] border border-emerald-900/30">
            <h3 className="text-sm font-bold text-white mb-3">Quick Actions</h3>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateTo('projects')}
                className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold"
              >
                Go to Projects Page (Add / Edit)
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold"
              >
                Update Roadmap Milestones
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold"
              >
                Review Inbox Messages
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Projects Management */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">All Authoritative Projects</h2>
            <button
              onClick={() => navigateTo('projects')}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs"
            >
              Open Project Modal
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-[#09110c] border border-emerald-900/30 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white truncate">{p.title}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        p.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate mt-0.5">{p.description}</p>
                </div>

                <div className="text-xs font-mono text-zinc-500 shrink-0">
                  {p.createdAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Roadmap Management */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-bold text-white">Roadmap Milestone Checkboxes</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Toggle stage completion status. Changes instantly save and update the public progress indicator.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roadmapStages.map((stage) => (
              <div
                key={stage.id}
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                  stage.completed ? 'bg-emerald-950/20 border-emerald-500/40 text-white' : 'bg-[#070c08] border-emerald-950 text-zinc-400'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-zinc-500 block">
                    Stage {stage.id} · {stage.category}
                  </span>
                  <p className="text-xs font-bold truncate mt-0.5">{stage.title}</p>
                </div>

                <input
                  type="checkbox"
                  checked={stage.completed}
                  onChange={() => toggleRoadmapStage(stage.id)}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Contact Messages */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h2 className="text-base font-bold text-white">Inbound Inquiries ({contactMessages.length})</h2>

          {contactMessages.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500 rounded-xl bg-[#09110c] border border-emerald-950">
              No messages received yet.
            </div>
          ) : (
            <div className="space-y-4">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    msg.read ? 'bg-[#080d0a] border-emerald-950/50' : 'bg-[#09140d] border-emerald-500/40 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{msg.name}</span>
                        {!msg.read && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-zinc-950 font-bold">
                            NEW
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-emerald-400 font-mono">{msg.email}</p>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">{msg.createdAt}</span>
                  </div>

                  <p className="text-xs font-bold text-zinc-200 mb-1">{msg.subject}</p>
                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap mb-4">
                    {msg.message}
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-emerald-950/60 text-xs">
                    {!msg.read && (
                      <button
                        onClick={() => markMessageRead(msg.id)}
                        className="text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteContactMessage(msg.id)}
                      className="text-rose-400 hover:text-rose-300 font-medium ml-auto cursor-pointer"
                    >
                      Delete Inquiry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
