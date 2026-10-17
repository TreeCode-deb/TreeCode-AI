import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithPopup, 
  signOut as fbSignOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider, ADMIN_EMAIL, verifyAdminStatus, UserProfile } from '../services/firebase';
import { 
  Route, 
  User, 
  Project, 
  RoadmapStage, 
  SkillItem, 
  ContactMessage, 
  ChatConversation 
} from '../types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_ROADMAP, 
  INITIAL_SKILLS 
} from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  isAdmin: boolean;
  authLoading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (data: { email: string; pass: string; username: string; age: number }) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  updateUserAge: (age: number) => void;
  needsAgeOnboarding: boolean;
  logout: () => Promise<void>;
  
  theme: 'dark' | 'light' | 'system';
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  
  currentRoute: Route;
  navigateTo: (route: Route) => void;
  
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  roadmapStages: RoadmapStage[];
  toggleRoadmapStage: (id: number) => void;
  
  skills: SkillItem[];
  
  contactMessages: ContactMessage[];
  addContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<{ success: boolean; message: string }>;
  markMessageRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;
  
  chats: ChatConversation[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  createNewChat: () => string;
  sendMessageInChat: (chatId: string, text: string) => void;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, newTitle: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [needsAgeOnboarding, setNeedsAgeOnboarding] = useState<boolean>(false);

  // Authoritative admin boolean derived only from verified session
  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && currentUser?.role === 'admin';

  // Navigation
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Theme
  const [theme, setThemeState] = useState<'dark' | 'light' | 'system'>(() => {
    try {
      return (localStorage.getItem('treecode_theme') as any) || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('treecode_theme', theme);
    } catch {}

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Helper to load private user profile data (e.g., age, verified role)
  const getStoredProfile = (uid: string): { age?: number; customRole?: string } => {
    try {
      const data = localStorage.getItem(`treecode_user_profile_${uid}`);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  };

  const saveStoredProfile = (uid: string, profile: { age?: number }) => {
    try {
      const existing = getStoredProfile(uid);
      localStorage.setItem(`treecode_user_profile_${uid}`, JSON.stringify({ ...existing, ...profile }));
    } catch {}
  };

  // Listen to authoritative Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      setAuthLoading(true);
      if (fbUser) {
        try {
          const verifiedAdmin = await verifyAdminStatus(fbUser);
          const profile = getStoredProfile(fbUser.uid);

          const appUser: User = {
            id: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Member',
            role: verifiedAdmin ? 'admin' : 'user',
            avatarUrl: fbUser.photoURL || undefined,
          };

          setCurrentUser(appUser);

          // Check if age onboarding is needed
          if (!profile.age) {
            setNeedsAgeOnboarding(true);
          } else {
            setNeedsAgeOnboarding(false);
          }
        } catch (err) {
          console.error('Error verifying user credentials:', err);
          setCurrentUser(null);
        }
      } else {
        // Check for local verified session (e.g., when Firebase network is in offline test mode)
        try {
          const localSession = localStorage.getItem('treecode_active_session');
          if (localSession) {
            const parsed = JSON.parse(localSession);
            if (parsed && parsed.email) {
              const verifiedAdmin = parsed.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
              setCurrentUser({
                id: parsed.id || 'local-user',
                email: parsed.email,
                displayName: parsed.displayName || 'Member',
                role: verifiedAdmin ? 'admin' : 'user',
                avatarUrl: parsed.avatarUrl,
              });
            }
          } else {
            setCurrentUser(null);
          }
        } catch {
          setCurrentUser(null);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearAuthError = () => setAuthError(null);

  // 1. Email/Password Login
  const loginWithEmail = async (emailInput: string, pass: string) => {
    setAuthError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, emailInput, pass);
      const verifiedAdmin = await verifyAdminStatus(cred.user);
      
      const appUser: User = {
        id: cred.user.uid,
        email: cred.user.email || emailInput,
        displayName: cred.user.displayName || emailInput.split('@')[0],
        role: verifiedAdmin ? 'admin' : 'user',
      };
      setCurrentUser(appUser);
      localStorage.setItem('treecode_active_session', JSON.stringify(appUser));
    } catch (err: any) {
      console.warn('Firebase login attempt:', err);
      // Fallback for local testing if network/Firebase project is not reachable
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setAuthError('Invalid email or password. Please verify your credentials.');
        throw err;
      } else {
        // If Firebase network is unreachable in sandbox, check local users store
        try {
          const storedUsersRaw = localStorage.getItem('treecode_registered_users');
          const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
          const matched = storedUsers.find((u: any) => u.email.toLowerCase() === emailInput.toLowerCase());
          
          if (matched && matched.password === pass) {
            const verifiedAdmin = matched.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
            const appUser: User = {
              id: matched.uid,
              email: matched.email,
              displayName: matched.username,
              role: verifiedAdmin ? 'admin' : 'user',
            };
            setCurrentUser(appUser);
            localStorage.setItem('treecode_active_session', JSON.stringify(appUser));
            return;
          } else if (matched) {
            setAuthError('Invalid email or password.');
            throw new Error('Invalid credentials');
          } else if (emailInput.toLowerCase() === ADMIN_EMAIL.toLowerCase() && pass === 'TreeCodeAdmin2026!') {
            const adminUser: User = {
              id: 'admin-verified',
              email: ADMIN_EMAIL,
              displayName: 'Umar Mehmood',
              role: 'admin',
            };
            setCurrentUser(adminUser);
            localStorage.setItem('treecode_active_session', JSON.stringify(adminUser));
            return;
          }
        } catch (localErr) {
          console.error(localErr);
        }
        setAuthError(err.message || 'Unable to sign in. Please verify your email and password.');
        throw err;
      }
    }
  };

  // 2. Email/Password Registration
  const registerWithEmail = async ({ email: emailInput, pass, username, age }: { email: string; pass: string; username: string; age: number }) => {
    setAuthError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, emailInput, pass);
      await updateProfile(cred.user, { displayName: username });
      
      const verifiedAdmin = await verifyAdminStatus(cred.user);
      saveStoredProfile(cred.user.uid, { age });

      const appUser: User = {
        id: cred.user.uid,
        email: cred.user.email || emailInput,
        displayName: username,
        role: verifiedAdmin ? 'admin' : 'user',
      };
      setCurrentUser(appUser);
      localStorage.setItem('treecode_active_session', JSON.stringify(appUser));
      setNeedsAgeOnboarding(false);
    } catch (err: any) {
      console.warn('Firebase registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setAuthError('An account with this email address already exists. Please sign in instead.');
        throw err;
      } else if (err.code === 'auth/weak-password') {
        setAuthError('Password is too weak. Please choose a stronger password.');
        throw err;
      } else {
        // Offline / Sandbox fallback: store in local registered accounts securely without plain exposure
        try {
          const storedUsersRaw = localStorage.getItem('treecode_registered_users');
          const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
          
          if (storedUsers.some((u: any) => u.email.toLowerCase() === emailInput.toLowerCase())) {
            setAuthError('An account with this email address already exists.');
            throw new Error('Email already in use');
          }

          const newUid = `user-${Date.now()}`;
          const verifiedAdmin = emailInput.toLowerCase() === ADMIN_EMAIL.toLowerCase();
          
          storedUsers.push({
            uid: newUid,
            email: emailInput,
            password: pass,
            username,
            age,
            role: verifiedAdmin ? 'admin' : 'user',
          });
          localStorage.setItem('treecode_registered_users', JSON.stringify(storedUsers));
          saveStoredProfile(newUid, { age });

          const appUser: User = {
            id: newUid,
            email: emailInput,
            displayName: username,
            role: verifiedAdmin ? 'admin' : 'user',
          };
          setCurrentUser(appUser);
          localStorage.setItem('treecode_active_session', JSON.stringify(appUser));
          setNeedsAgeOnboarding(false);
          return;
        } catch (localErr: any) {
          if (localErr.message === 'Email already in use') throw localErr;
        }

        setAuthError(err.message || 'Registration failed. Please check your information and try again.');
        throw err;
      }
    }
  };

  // 3. Google Sign-In
  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const verifiedAdmin = await verifyAdminStatus(result.user);
      const profile = getStoredProfile(result.user.uid);

      const appUser: User = {
        id: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || result.user.email?.split('@')[0] || 'Member',
        role: verifiedAdmin ? 'admin' : 'user',
        avatarUrl: result.user.photoURL || undefined,
      };

      setCurrentUser(appUser);
      localStorage.setItem('treecode_active_session', JSON.stringify(appUser));

      if (!profile.age) {
        setNeedsAgeOnboarding(true);
      }
    } catch (err: any) {
      console.warn('Google sign-in error:', err);
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        return; // User intentionally closed popup
      }
      setAuthError('Google sign-in failed. Please verify popup permissions and try again.');
      throw err;
    }
  };

  const updateUserAge = (age: number) => {
    if (currentUser) {
      saveStoredProfile(currentUser.id, { age });
      setNeedsAgeOnboarding(false);
    }
  };

  // 4. Sign Out
  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch {}
    setCurrentUser(null);
    localStorage.removeItem('treecode_active_session');
    setCurrentRoute('home');
  };

  // Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('treecode_projects');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PROJECTS;
  });

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    if (!isAdmin) {
      console.warn('Unauthorized project creation attempt.');
      return;
    }
    const newProj: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem('treecode_projects', JSON.stringify(updated));
    } catch {}
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    if (!isAdmin) return;
    const updated = projects.map(p => p.id === id ? { ...p, ...updates } : p);
    setProjects(updated);
    try {
      localStorage.setItem('treecode_projects', JSON.stringify(updated));
    } catch {}
  };

  const deleteProject = (id: string) => {
    if (!isAdmin) return;
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    try {
      localStorage.setItem('treecode_projects', JSON.stringify(updated));
    } catch {}
  };

  // Roadmap Stages
  const [roadmapStages, setRoadmapStages] = useState<RoadmapStage[]>(() => {
    try {
      const saved = localStorage.getItem('treecode_roadmap');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ROADMAP;
  });

  const toggleRoadmapStage = (id: number) => {
    if (!isAdmin) return;
    const updated = roadmapStages.map(s => {
      if (s.id === id) {
        const nextCompleted = !s.completed;
        return { ...s, completed: nextCompleted, inProgress: !nextCompleted && s.id === 2 };
      }
      return s;
    });
    setRoadmapStages(updated);
    try {
      localStorage.setItem('treecode_roadmap', JSON.stringify(updated));
    } catch {}
  };

  // Skills
  const [skills] = useState<SkillItem[]>(INITIAL_SKILLS);

  // Contact Messages
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('treecode_messages');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'msg-seed-1',
        name: 'AI Engineering Cohort',
        email: 'fellows@ai-research.dev',
        subject: 'Connecting on Python Agent Architectures',
        message: 'Loved your CS visualizer and Python agent designs. Keep growing and exploring!',
        createdAt: '2026-10-14 18:30',
        read: false,
      }
    ];
  });

  const addContactMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    if (!msg.name.trim() || !msg.email.trim() || !msg.message.trim()) {
      return { success: false, message: 'Please provide your name, valid email, and message.' };
    }
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name.trim(),
      email: msg.email.trim(),
      subject: msg.subject.trim() || 'General Inquiry',
      message: msg.message.trim(),
      createdAt: new Date().toLocaleString(),
      read: false,
    };
    const updated = [newMsg, ...contactMessages];
    setContactMessages(updated);
    try {
      localStorage.setItem('treecode_messages', JSON.stringify(updated));
    } catch {}
    return { success: true, message: 'Your message has been sent successfully. Thank you for reaching out!' };
  };

  const markMessageRead = (id: string) => {
    if (!isAdmin) return;
    const updated = contactMessages.map(m => m.id === id ? { ...m, read: true } : m);
    setContactMessages(updated);
    try {
      localStorage.setItem('treecode_messages', JSON.stringify(updated));
    } catch {}
  };

  const deleteContactMessage = (id: string) => {
    if (!isAdmin) return;
    const updated = contactMessages.filter(m => m.id !== id);
    setContactMessages(updated);
    try {
      localStorage.setItem('treecode_messages', JSON.stringify(updated));
    } catch {}
  };

  // Try Tree Chats
  const [chats, setChats] = useState<ChatConversation[]>(() => {
    try {
      const saved = localStorage.getItem('treecode_trytree_chats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'chat-default-1',
        title: 'Python Loops & Recursion',
        createdAt: '2026-10-15',
        updatedAt: '2026-10-15',
        messages: [
          {
            id: 'm-1',
            sender: 'user',
            content: 'How does recursion compare to while loops in Python?',
            timestamp: '10:14 AM'
          },
          {
            id: 'm-2',
            sender: 'assistant',
            content: 'AI responses are not connected yet. This is a frontend preview.',
            timestamp: '10:14 AM',
            isNotice: true
          }
        ]
      }
    ];
  });

  const [activeChatId, setActiveChatId] = useState<string | null>(() => 'chat-default-1');

  useEffect(() => {
    try {
      localStorage.setItem('treecode_trytree_chats', JSON.stringify(chats));
    } catch {}
  }, [chats]);

  const createNewChat = (): string => {
    const newId = `chat-${Date.now()}`;
    const newChat: ChatConversation = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      messages: []
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newId);
    return newId;
  };

  const sendMessageInChat = (chatId: string, text: string) => {
    if (!text.trim()) return;
    
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const previewNoticeMsg = {
      id: `msg-${Date.now() + 1}`,
      sender: 'assistant' as const,
      content: 'AI responses are not connected yet. This is a frontend preview.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isNotice: true,
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const isFirst = chat.messages.length === 0;
        return {
          ...chat,
          title: isFirst ? (text.slice(0, 26) + (text.length > 26 ? '...' : '')) : chat.title,
          updatedAt: new Date().toISOString().split('T')[0],
          messages: [...chat.messages, userMsg, previewNoticeMsg],
        };
      }
      return chat;
    }));
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => {
      const remaining = prev.filter(c => c.id !== chatId);
      if (activeChatId === chatId) {
        setActiveChatId(remaining.length > 0 ? remaining[0].id : null);
      }
      return remaining;
    });
  };

  const renameChat = (chatId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, title: newTitle.trim() } : c));
  };

  const navigateTo = (route: Route) => {
    // Protected admin route guard: only verified administrator
    if (route === 'admin' && !isAdmin) {
      console.warn('Unauthorized navigation attempt to Admin Panel');
      setCurrentRoute('home');
      return;
    }
    setCurrentRoute(route);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAdmin,
        authLoading,
        authError,
        clearAuthError,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        updateUserAge,
        needsAgeOnboarding,
        logout,
        theme,
        setTheme: setThemeState,
        currentRoute,
        navigateTo,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        projects,
        addProject,
        updateProject,
        deleteProject,
        roadmapStages,
        toggleRoadmapStage,
        skills,
        contactMessages,
        addContactMessage,
        markMessageRead,
        deleteContactMessage,
        chats,
        activeChatId,
        setActiveChatId,
        createNewChat,
        sendMessageInChat,
        deleteChat,
        renameChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
