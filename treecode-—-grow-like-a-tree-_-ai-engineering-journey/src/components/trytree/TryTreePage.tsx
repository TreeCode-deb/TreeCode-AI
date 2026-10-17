import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Send, 
  Paperclip, 
  MessageSquare, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Menu, 
  Sparkles,
  Info,
  Terminal,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TryTreePage: React.FC = () => {
  const { 
    chats, 
    activeChatId, 
    setActiveChatId, 
    createNewChat, 
    sendMessageInChat, 
    deleteChat, 
    renameChat,
    currentUser 
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showAttachmentHint, setShowAttachmentHint] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    let targetChatId = activeChatId;
    if (!targetChatId || chats.length === 0) {
      targetChatId = createNewChat();
    }
    sendMessageInChat(targetChatId, inputMessage);
    setInputMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(id);
    setEditingTitle(currentTitle);
  };

  const handleSaveRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingTitle.trim()) {
      renameChat(id, editingTitle.trim());
    }
    setEditingChatId(null);
  };

  const samplePrompts = [
    'Explain how Python generators save memory compared to lists',
    'How do AI agents use tool-calling and reflection loops?',
    'What is the difference between BFS and DFS graph traversals?',
    'Help me understand the backpropagation gradient calculation',
  ];

  return (
    <div className="h-[calc(100vh)] flex flex-col md:flex-row overflow-hidden bg-[#060a08] text-zinc-100">
      {/* Mobile Drawer Overlay for Chat History */}
      {mobileHistoryOpen && (
        <div 
          className="fixed inset-0 bg-black/75 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setMobileHistoryOpen(false)}
        />
      )}

      {/* Try Tree Internal Chat Sidebar (Left) */}
      <aside 
        className={`fixed md:relative top-0 bottom-0 left-0 z-40 w-72 bg-[#09100c] border-r border-emerald-950/70 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
          ${mobileHistoryOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-emerald-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  Try Tree
                  <span className="text-[10px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    Free
                  </span>
                </h2>
                <p className="text-[10px] text-zinc-400">AI Chat Playground</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileHistoryOpen(false)}
              className="md:hidden p-1 text-zinc-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <button
              onClick={() => {
                createNewChat();
                setMobileHistoryOpen(false);
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>

          {/* Chats History Section */}
          <div className="flex-1 overflow-y-auto px-3 space-y-1">
            <div className="px-2 py-1.5 text-[11px] font-mono font-medium text-emerald-400/80 uppercase tracking-wider">
              Chats History
            </div>

            {chats.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-500">
                No conversations yet. Start a new chat!
              </div>
            ) : (
              chats.map((chat) => {
                const isActive = activeChat?.id === chat.id;
                const isEditing = editingChatId === chat.id;

                return (
                  <div
                    key={chat.id}
                    onClick={() => {
                      setActiveChatId(chat.id);
                      setMobileHistoryOpen(false);
                    }}
                    className={`group w-full p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer border
                      ${isActive 
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-white shadow-xs' 
                        : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-emerald-950/20'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                      
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="bg-black/60 border border-emerald-500/50 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none w-full"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className="truncate">{chat.title}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                      {isEditing ? (
                        <button
                          onClick={(e) => handleSaveRename(chat.id, e)}
                          className="p-1 text-emerald-400 hover:text-emerald-300"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={(e) => handleStartRename(chat.id, chat.title, e)}
                            className="p-1 text-zinc-400 hover:text-zinc-200"
                            title="Rename chat"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(chat.id);
                            }}
                            className="p-1 text-zinc-400 hover:text-rose-400"
                            title="Delete chat"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* User Profile Area (anchored at bottom) */}
          <div className="p-3 border-t border-emerald-950/60 bg-[#070c08]">
            <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-900/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600/40 border border-emerald-500/40 flex items-center justify-center text-xs font-bold text-emerald-200">
                {currentUser?.displayName ? currentUser.displayName.slice(0, 2).toUpperCase() : 'TC'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">
                  {currentUser?.displayName || 'Guest Developer'}
                </p>
                <p className="text-[10px] text-zinc-400 font-mono">
                  {currentUser ? 'Free Tier Active' : 'Public Explorer'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Large Chat Workspace (Right) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header Bar for Try Tree */}
        <div className="md:hidden flex items-center justify-between p-3 border-b border-emerald-950/70 bg-[#09100c]">
          <button
            onClick={() => setMobileHistoryOpen(true)}
            className="flex items-center gap-2 text-xs font-medium text-emerald-300 p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50"
          >
            <Menu className="w-4 h-4" />
            <span>Chat History</span>
          </button>
          <span className="text-xs font-bold text-white">Try Tree Preview</span>
          <button
            onClick={() => createNewChat()}
            className="p-1.5 text-xs text-emerald-400 hover:text-emerald-300"
            title="New Chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Container or Empty State */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-12 py-6 space-y-6">
          {!activeChat || activeChat.messages.length === 0 ? (
            /* Centered Empty State */
            <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center max-w-xl mx-auto py-12">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
                <Bot className="w-6 h-6" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Ask Anything for Free
              </h2>
              
              <p className="text-xs sm:text-sm text-zinc-400 mb-8 max-w-md leading-relaxed">
                Try out the TreeCode chat workspace layout. Ask questions on Python fundamentals, AI engineering pathways, or algorithmic logic.
              </p>

              {/* Sample Starters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInputMessage(prompt);
                      textareaRef.current?.focus();
                    }}
                    className="p-3 rounded-xl bg-[#09110c] border border-emerald-950/80 hover:border-emerald-500/40 text-xs text-zinc-300 hover:text-white transition-all text-left flex items-start gap-2 group cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5 text-emerald-400/70 shrink-0 mt-0.5 group-hover:text-emerald-300" />
                    <span className="line-clamp-2">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Conversation Thread */
            <div className="max-w-3xl mx-auto space-y-5">
              {activeChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                      ${msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-xs shadow-md'
                        : msg.isNotice
                          ? 'bg-[#0d1611] border border-amber-500/30 text-amber-200/90 rounded-bl-xs'
                          : 'bg-[#09110c] border border-emerald-950 text-zinc-200 rounded-bl-xs'
                      }
                    `}
                  >
                    {msg.isNotice && (
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 font-semibold mb-1">
                        <Info className="w-3 h-3 shrink-0" />
                        <span>System Preview Notice</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Composer (Fixed at bottom) */}
        <div className="p-4 sm:p-6 border-t border-emerald-950/70 bg-[#070c08] shrink-0">
          <div className="max-w-3xl mx-auto">
            {/* Attachment preview hint tooltip */}
            {showAttachmentHint && (
              <div className="mb-2 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>File and code snippets upload will be available in future version.</span>
                <button 
                  onClick={() => setShowAttachmentHint(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="relative rounded-2xl bg-[#09110c] border border-emerald-900/40 focus-within:border-emerald-400/70 focus-within:shadow-[0_0_20px_-5px_rgba(16,185,129,0.25)] transition-all flex items-end gap-2 p-2.5">
              {/* Future Attachment Button */}
              <button
                type="button"
                onClick={() => setShowAttachmentHint(prev => !prev)}
                title="Add attachment (Future feature)"
                className="p-2 rounded-xl text-zinc-400 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors shrink-0"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Text Input / Textarea */}
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Tree anything..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none resize-none max-h-32 py-1.5 leading-normal"
              />

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                title="Send message (Enter)"
                className={`p-2 rounded-xl transition-all shrink-0 cursor-pointer
                  ${inputMessage.trim()
                    ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-[0_0_12px_-2px_rgba(16,185,129,0.5)]'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  }
                `}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Micro Caption */}
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-mono text-zinc-500">
              <span>Enter to send · Shift+Enter for new line</span>
              <span>Frontend interactive preview</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
