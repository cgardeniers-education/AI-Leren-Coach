import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Send, RefreshCw, Menu } from 'lucide-react';

import ContextForm from './components/ContextForm';
import ChatBubble from './components/ChatBubble';
import ModuleSelector from './components/ModuleSelector';
import { initializeChat, sendMessageToGemini } from './services/geminiService';
import { Message, Role, UserContext, ModuleType } from './types';
import { SUGGESTED_PROMPTS } from './constants';

const App: React.FC = () => {
  // State
  const [userContext, setUserContext] = useState<UserContext | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat when context is ready
  useEffect(() => {
    if (userContext && messages.length === 0) {
      const startSession = async () => {
        setIsLoading(true);
        const welcomeText = await initializeChat(userContext);
        setMessages([
          {
            id: uuidv4(),
            role: Role.MODEL,
            text: welcomeText,
            timestamp: Date.now(),
          },
        ]);
        setIsLoading(false);
      };
      startSession();
    }
  }, [userContext]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: uuidv4(),
      role: Role.USER,
      text: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(text);

    const aiMsg: Message = {
      id: uuidv4(),
      role: Role.MODEL,
      text: responseText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleModuleSelect = (module: ModuleType) => {
    let prompt = "";
    switch (module) {
      case ModuleType.EXPLAIN_AI:
        prompt = "Leg me in simpele taal uit wat Generatieve AI is en wat het wel en niet kan.";
        break;
      case ModuleType.PROMPTING:
        prompt = "Ik wil leren hoe ik betere prompts (opdrachten) aan AI kan geven. Leg de R-D-C-O-B methode uit.";
        break;
      case ModuleType.HOMEWORK:
        prompt = "Ik heb hulp nodig bij een schooltaak. Help me op weg via het 'Eerst-jij-dan-AI' model.";
        break;
      case ModuleType.FACT_CHECK:
        prompt = "Hoe kan ik controleren of de informatie die AI geeft klopt? Geef me een stappenplan.";
        break;
      case ModuleType.PRACTICE:
        prompt = `Ik wil oefenen voor ${userContext?.subject || 'mijn vak'}. Geef me een creatieve oefenopdracht.`;
        break;
      default:
        return;
    }
    handleSendMessage(prompt);
  };

  const handleContextSubmit = (context: UserContext) => {
    setUserContext(context);
  };

  const handleRestart = () => {
    if (confirm("Weet je zeker dat je opnieuw wilt beginnen? Je gespreksgeschiedenis wordt gewist.")) {
       setUserContext(null);
       setMessages([]);
    }
  };

  if (!userContext) {
    return <ContextForm onComplete={handleContextSubmit} />;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 relative overflow-hidden">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <RefreshCw className="text-white w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight">AI-Leren Coach</h1>
            <p className="text-xs text-slate-500">
              {userContext.level} • Klas {userContext.year} • {userContext.subject}
            </p>
          </div>
        </div>
        <button 
          onClick={handleRestart}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          title="Opnieuw beginnen"
        >
          <RefreshCw size={18} />
        </button>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-slate-400 text-sm">Aan het nadenken...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4 md:p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Module Selectors */}
          <div className="mb-2">
             <ModuleSelector onSelect={handleModuleSelect} disabled={isLoading} />
          </div>

          {/* Prompt Suggestions (Only if chat is short) */}
          {messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {SUGGESTED_PROMPTS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(suggestion.prompt.replace('[vak]', userContext.subject).replace('[onderwerp]', 'het onderwerp'))}
                  disabled={isLoading}
                  className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 whitespace-nowrap transition-colors"
                >
                  {suggestion.title}
                </button>
              ))}
            </div>
          )}

          {/* Input Field */}
          <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Typ je vraag, antwoord of prompt hier..."
              className="flex-1 bg-transparent border-none focus:ring-0 p-2 min-h-[44px] max-h-[120px] resize-none text-slate-800 placeholder:text-slate-400 text-sm"
              rows={1}
              style={{ overflow: 'hidden', height: 'auto' }} 
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-xl flex-shrink-0 transition-all ${
                input.trim() && !isLoading
                  ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:scale-105' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="text-center">
             <p className="text-[10px] text-slate-400">
               AI kan fouten maken. Check belangrijke info altijd in je boek.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
