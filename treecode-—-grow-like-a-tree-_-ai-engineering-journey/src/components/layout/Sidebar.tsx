import React from 'react';
import { 
  Home, 
  FolderGit2, 
  User as UserIcon, 
  Milestone, 
  Code2, 
  Mail, 
  Settings, 
  MessageSquareCode, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Route } from '../../types';

interface NavItem {
  id: Route;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { 
    currentRoute, 
    navigateTo, 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    mobileSidebarOpen, 
    setMobileSidebarOpen,
    currentUser,
    isAdmin,
    logout
  } = useApp();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'about', label: 'About', icon: UserIcon },
    { id: 'roadmap', label: 'Roadmap', icon: Milestone },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'try-tree', label: 'Try Tree', icon: MessageSquareCode, badge: 'Free' },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Only verified administrator can see Admin Panel in navigation
  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: ShieldCheck });
  }

  const handleNavClick = (route: Route) => {
    navigateTo(route);
  };

  const userInitials = currentUser?.displayName
    ? currentUser.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'TC';

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/75 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar (Fixed left layout ONLY - No top navbar) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between 
          bg-[#0a110c] dark:bg-[#080d0a] text-zinc-200 border-r border-emerald-900/30
          transition-all duration-300 ease-in-out
          ${mobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
        aria-label="Sidebar Navigation"
      >
        {/* Top: Brand & Logo */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-emerald-950/60">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/60 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-sm group-hover:border-emerald-400 transition-colors">
                <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22v-7" />
                  <path d="m9 15 3-3 3 3" />
                  <path d="m7 11 5-5 5 5" />
                  <path d="m5 7 7-5 7 5" />
                </svg>
              </div>
              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <div className="overflow-hidden">
                  <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                    TreeCode
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[11px] text-emerald-400/80 block -mt-0.5 font-medium tracking-wide">
                    Grow Like a Tree
                  </span>
                </div>
              )}
            </button>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-emerald-950/40 cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-230px)]" aria-label="Main menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative group cursor-pointer
                    ${isActive 
                      ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30 shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-emerald-950/30'
                    }
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-emerald-300'}`} />
                  
                  {(!sidebarCollapsed || mobileSidebarOpen) && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {(!sidebarCollapsed || mobileSidebarOpen) && item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-medium">
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator Bar on Left */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-400 rounded-r-md" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile, Collapse Toggle, Sign Out */}
        <div className="p-3 border-t border-emerald-950/60 bg-[#070c08]/95">
          {/* User Profile Card */}
          <div className={`p-2 rounded-xl bg-emerald-950/20 border border-emerald-900/30 flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="relative shrink-0">
              {currentUser?.avatarUrl ? (
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.displayName} 
                  className="w-9 h-9 rounded-full object-cover border border-emerald-400/50" 
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-950 border border-emerald-400/50 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                  {userInitials}
                </div>
              )}
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#080d0a] ${isAdmin ? 'bg-emerald-400' : 'bg-teal-400'}`} />
            </div>

            {(!sidebarCollapsed || mobileSidebarOpen) && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-zinc-100 truncate">
                  {currentUser?.displayName || 'User'}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.2 rounded font-bold ${
                    isAdmin 
                      ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/30' 
                      : 'text-zinc-300 bg-zinc-800/80 border border-zinc-700/50'
                  }`}>
                    {isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>
            )}

            {(!sidebarCollapsed || mobileSidebarOpen) && (
              <button 
                onClick={logout}
                title="Sign out of TreeCode"
                className="p-1.5 text-zinc-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/30 transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Sidebar Collapse Toggle */}
          <div className="hidden lg:flex items-center justify-between mt-2 pt-2 border-t border-emerald-950/40">
            <button
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-zinc-400 hover:text-emerald-300 rounded-lg hover:bg-emerald-950/30 transition-colors cursor-pointer"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-[11px] font-medium">Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
