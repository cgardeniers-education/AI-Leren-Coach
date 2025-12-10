import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Role } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 group`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-indigo-500 text-white' : 'bg-emerald-500 text-white'
        } shadow-sm mt-1`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Bubble */}
        <div className={`
          flex flex-col p-4 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isUser 
            ? 'bg-indigo-600 text-white rounded-tr-none' 
            : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
          }
        `}>
          <div className={`markdown-content ${isUser ? 'text-white' : 'text-slate-800'}`}>
            <ReactMarkdown
              components={{
                p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({children}) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                li: ({children}) => <li>{children}</li>,
                h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-slate-300 pl-3 italic my-2">{children}</blockquote>,
                code: ({children}) => <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded text-xs">{children}</code>,
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
          <span className={`text-[10px] mt-1 ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
