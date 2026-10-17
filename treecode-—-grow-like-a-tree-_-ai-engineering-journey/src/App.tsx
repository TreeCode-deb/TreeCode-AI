/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './components/home/HomePage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { AboutPage } from './components/about/AboutPage';
import { RoadmapPage } from './components/roadmap/RoadmapPage';
import { SkillsPage } from './components/skills/SkillsPage';
import { TryTreePage } from './components/trytree/TryTreePage';
import { ContactPage } from './components/contact/ContactPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { AdminPanel } from './components/admin/AdminPanel';
import { AuthPage } from './components/auth/AuthPage';
import { AgeOnboardingModal } from './components/auth/AgeOnboardingModal';

const MainLayout: React.FC = () => {
  const { 
    currentUser, 
    authLoading, 
    currentRoute, 
    sidebarCollapsed, 
    setMobileSidebarOpen, 
    navigateTo 
  } = useApp();

  // 1. Professional Loading Screen while checking Firebase Auth State
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080d0a] text-zinc-100 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_35px_-5px_rgba(16,185,129,0.35)] animate-pulse">
          <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22v-7" />
            <path d="m9 15 3-3 3 3" />
            <path d="m7 11 5-5 5 5" />
            <path d="m5 7 7-5 7 5" />
          </svg>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Verifying TreeCode credentials...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State: Show ONLY the Authentication Page
  if (!currentUser) {
    return <AuthPage />;
  }

  // 3. Authenticated State: Full Protected Workspace
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'about':
        return <AboutPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'skills':
        return <SkillsPage />;
      case 'try-tree':
        return <TryTreePage />;
      case 'contact':
        return <ContactPage />;
      case 'settings':
        return <SettingsPage />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <HomePage />;
    }
  };

  const isChatPage = currentRoute === 'try-tree';

  return (
    <div className="min-h-screen bg-[#080d0a] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Age Onboarding Dialog for Google Authenticated Users */}
      <AgeOnboardingModal />

      {/* Sidebar (Fixed Left Navigation Only - NO TOP NAVBAR) */}
      <Sidebar />

      {/* Minimal Mobile Floating Menu Toggle */}
      <div className="lg:hidden fixed top-3 left-3 z-30">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2.5 rounded-xl bg-[#09110c]/90 text-emerald-400 border border-emerald-900/60 shadow-lg backdrop-blur-md hover:bg-emerald-950/60 transition-colors"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Workspace beside the fixed Sidebar */}
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
        `}
      >
        {renderCurrentPage()}

        {/* Global Quiet Footer (Shown on non-chat pages) */}
        {!isChatPage && (
          <footer className="py-10 px-4 sm:px-6 lg:px-12 border-t border-emerald-950/50 bg-[#060a07] text-zinc-400 text-xs">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-white tracking-tight">TreeCode</span>
                <span className="text-zinc-600">·</span>
                <span>Grow Like a Tree</span>
                <span className="text-zinc-600">·</span>
                <span>Umar Mehmood</span>
              </div>

              <div className="flex items-center gap-4 text-zinc-400">
                <button 
                  onClick={() => navigateTo('home')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
                <button 
                  onClick={() => navigateTo('projects')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Projects
                </button>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  About
                </button>
                <button 
                  onClick={() => navigateTo('roadmap')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Roadmap
                </button>
                <button 
                  onClick={() => navigateTo('try-tree')} 
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
                >
                  Try Tree
                </button>
              </div>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
