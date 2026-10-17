import React from 'react';

interface ToolLogoProps {
  type: string;
  className?: string;
}

export const ToolLogo: React.FC<ToolLogoProps> = ({ type, className = 'w-7 h-7' }) => {
  switch (type) {
    case 'vscode':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 1.5L8.5 8.5L3.5 4.5L1.5 6L6 12L1.5 18L3.5 19.5L8.5 15.5L17.5 22.5L22.5 20V4L17.5 1.5Z" fill="#007ACC" />
          <path d="M17.5 7L11.5 12L17.5 17V7Z" fill="#1F9CF0" />
          <path d="M17.5 1.5L8.5 8.5L6 12L1.5 6L3.5 4.5L8.5 8.5L17.5 1.5Z" fill="#0065A9" />
          <path d="M17.5 22.5L8.5 15.5L6 12L1.5 18L3.5 19.5L8.5 15.5L17.5 22.5Z" fill="#0065A9" />
        </svg>
      );
    case 'cursor':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#111827" />
          <path d="M7 6L17 12L11.5 13.5L9 18.5L7 6Z" fill="#10B981" />
        </svg>
      );
    case 'pycharm':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#21D789" />
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#000000" />
          <path d="M4 18H10V20H4V18Z" fill="#21D789" />
          <path d="M5 6H8.5C10 6 11 7 11 8.5C11 10 10 11 8.5 11H6.5V14H5V6ZM6.5 9.5H8.3C9.2 9.5 9.7 9.1 9.7 8.5C9.7 7.9 9.2 7.5 8.3 7.5H6.5V9.5Z" fill="#FFFFFF" />
          <path d="M12.5 14C12.5 11.5 14.5 9.5 17 9.5C18.2 9.5 19.3 10 19.8 10.8L18.6 11.8C18.2 11.2 17.6 10.8 17 10.8C15.4 10.8 14.2 12.2 14.2 14C14.2 15.8 15.4 17.2 17 17.2C17.6 17.2 18.2 16.8 18.6 16.2L19.8 17.2C19.3 18 18.2 18.5 17 18.5C14.5 18.5 12.5 16.5 12.5 14Z" fill="#FFFFFF" />
        </svg>
      );
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.8 2C6.9 2 7.2 4.1 7.2 4.1L7.2 6.3H12V7H5.1C2.3 7 2 9.3 2 9.3L2 13.1C2 16.4 4.5 16.2 4.5 16.2H6.1V14.1C6.1 11.7 8.1 11.7 8.1 11.7H12.9C14.9 11.7 15.1 10.2 15.1 10.2V5.5C15.1 2.8 12.4 2 11.8 2ZM9.6 3.6C10.2 3.6 10.6 4.1 10.6 4.6C10.6 5.1 10.2 5.6 9.6 5.6C9 5.6 8.6 5.1 8.6 4.6C8.6 4.1 9 3.6 9.6 3.6Z" fill="#3776AB" />
          <path d="M12.2 22C17.1 22 16.8 19.9 16.8 19.9L16.8 17.7H12V17H18.9C21.7 17 22 14.7 22 14.7L22 10.9C22 7.6 19.5 7.8 19.5 7.8H17.9V9.9C17.9 12.3 15.9 12.3 15.9 12.3H11.1C9.1 12.3 8.9 13.8 8.9 13.8V18.5C8.9 21.2 11.6 22 12.2 22ZM14.4 20.4C13.8 20.4 13.4 19.9 13.4 19.4C13.4 18.9 13.8 18.4 14.4 18.4C15 18.4 15.4 18.9 15.4 19.4C15.4 19.9 15 20.4 14.4 20.4Z" fill="#FFD43B" />
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.6 10.7L13.3 2.4C12.8 1.9 12 1.9 11.5 2.4L9.8 4.1L12.3 6.6C12.8 6.5 13.4 6.7 13.7 7C14.1 7.4 14.2 8 14.1 8.5L16.5 10.9C17 10.8 17.6 11 17.9 11.3C18.5 11.9 18.5 12.9 17.9 13.5C17.3 14.1 16.3 14.1 15.7 13.5C15.3 13.1 15.1 12.5 15.2 12L13 9.8V15.7C13.2 15.8 13.3 16 13.4 16.1C14 16.7 14 17.7 13.4 18.3C12.8 18.9 11.8 18.9 11.2 18.3C10.6 17.7 10.6 16.7 11.2 16.1C11.4 15.9 11.6 15.8 11.8 15.7V9.7C11.6 9.6 11.4 9.5 11.2 9.3C10.8 8.9 10.7 8.3 10.8 7.8L8.4 5.4L2.4 11.4C1.9 11.9 1.9 12.7 2.4 13.2L10.7 21.5C11.2 22 12 22 12.5 21.5L21.6 12.4C22.1 11.9 22.1 11.2 21.6 10.7Z" fill="#F05032" />
        </svg>
      );
    case 'github':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case 'claude':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#D97757" />
          <path d="M12 5V19M5 12H19M7 7L17 17M17 7L7 17" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'chatgpt':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#10A37F" />
          <path d="M12 4C9 4 7 5.5 6 7.5V11H8V8C8.5 7 9.5 6 12 6C14.5 6 15.5 7 16 8V10L14 11V13H18C18 9 16 4 12 4Z" fill="#FFFFFF" />
          <path d="M12 20C15 20 17 18.5 18 16.5V13H16V16C15.5 17 14.5 18 12 18C9.5 18 8.5 17 8 16V14L10 13V11H6C6 15 8 20 12 20Z" fill="#FFFFFF" />
        </svg>
      );
    case 'gemini':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E88E5" />
              <stop offset="50%" stopColor="#8E24AA" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="url(#geminiGrad)" />
        </svg>
      );
    case 'notebooklm':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#0E3A2F" />
          <path d="M7 6H15C16.1 6 17 6.9 17 8V18C17 18.6 16.6 19 16 19H7C5.9 19 5 18.1 5 17V8C5 6.9 5.9 6 7 6Z" fill="#10B981" />
          <path d="M9 10H14M9 13H13M9 16H11" stroke="#080D0A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'discord':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#5865F2" />
          <path d="M17.5 7.5C16.4 7 15.3 6.7 14.1 6.5C14 6.8 13.8 7.2 13.7 7.5C12.4 7.3 11.2 7.3 10 7.5C9.8 7.2 9.7 6.8 9.5 6.5C8.3 6.7 7.2 7 6.1 7.5C4 10.6 3.4 13.6 3.7 16.6C5.1 17.6 6.5 18.3 7.8 18.7C8.1 18.3 8.4 17.8 8.7 17.3C8.2 17.1 7.8 16.9 7.4 16.6C7.5 16.5 7.6 16.4 7.7 16.3C10.3 17.5 13.2 17.5 15.8 16.3C15.9 16.4 16 16.5 16.1 16.6C15.7 16.9 15.2 17.1 14.7 17.3C15 17.8 15.3 18.3 15.7 18.7C17 18.3 18.4 17.6 19.8 16.6C20.1 13.1 19.2 10.1 17.5 7.5ZM8.5 14.5C7.7 14.5 7.1 13.8 7.1 12.9C7.1 12 7.7 11.3 8.5 11.3C9.3 11.3 9.9 12 9.9 12.9C9.9 13.8 9.3 14.5 8.5 14.5ZM15.1 14.5C14.3 14.5 13.7 13.8 13.7 12.9C13.7 12 14.3 11.3 15.1 11.3C15.9 11.3 16.5 12 16.5 12.9C16.5 13.8 15.9 14.5 15.1 14.5Z" fill="#FFFFFF" />
        </svg>
      );
    case 'leetcode':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#1A1A1A" />
          <path d="M14.5 5.5L8.5 11.5L14.5 17.5" stroke="#FFA116" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 12H18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <div className={`${className} rounded bg-emerald-900/40 text-emerald-300 flex items-center justify-center font-mono text-xs font-bold border border-emerald-700/50`}>
          TC
        </div>
      );
  }
};
