export type Route = 
  | 'home' 
  | 'projects' 
  | 'about' 
  | 'roadmap' 
  | 'skills' 
  | 'contact' 
  | 'settings' 
  | 'try-tree' 
  | 'admin';

export type UserRole = 'admin' | 'user' | 'visitor';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  published: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface RoadmapStage {
  id: number;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  inProgress?: boolean;
  keyConcepts: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming & Core' | 'AI & Machine Learning' | 'Developer Tools & Workflow' | 'Problem Solving & Math';
  status: 'Learning' | 'Practicing' | 'Confident';
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isNotice?: boolean;
}

export interface ChatConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface ToolItem {
  name: string;
  category: 'Code Editors & IDEs' | 'Programming Language' | 'Version Control & Code Hosting' | 'AI Coding & Research Tools' | 'Community & Problem Solving';
  description: string;
  version?: string;
  logoType: 'vscode' | 'cursor' | 'pycharm' | 'python' | 'git' | 'github' | 'claude' | 'chatgpt' | 'gemini' | 'notebooklm' | 'discord' | 'leetcode';
}
