'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useChatSignalR } from '@/hooks/useChatSignalR';
import {
  createChatSession,
  sendChatMessage,
  getChatMessages,
  getChatSessionByIdentifier,
} from '@/services/chat.service';
import type { ChatMessage, ChatSession } from '@/interfaces/chat/chat.interface';

const STORAGE_KEY = 'sb_chat_session_id';

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function ChatWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [adminTyping, setAdminTyping] = useState(false);
  const [sessionClosed, setSessionClosed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sessionIdentifier = chatSession?.sessionIdentifier || null;
  const accessToken = (session as any)?.accessToken;

  const {
    connect,
    disconnect,
    isConnected,
    connectionState,
    onReceiveMessage,
    onAdminJoined,
    onUserTyping,
    onSessionClosed,
    sendTypingIndicator,
  } = useChatSignalR(sessionIdentifier, accessToken);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, adminTyping, isOpen]);

  // Auto-fill name/email for authenticated users
  useEffect(() => {
    if (session?.user) {
      const s = session as any;
      setVisitorName(s.firstName && s.lastName ? `${s.firstName} ${s.lastName}` : session.user.name || '');
      setVisitorEmail(session.user.email || '');
    }
  }, [session]);

  // Check for existing session on mount
  useEffect(() => {
    const storedId = localStorage.getItem(STORAGE_KEY);
    if (storedId) {
      getChatSessionByIdentifier(storedId).then((res) => {
        if (res.succeeded && res.data) {
          setChatSession(res.data);
          if (res.data.status === 2) {
            setSessionClosed(true);
          }
        }
      });
    }
  }, []);

  // Load messages when chat session is set
  useEffect(() => {
    if (chatSession && !sessionClosed) {
      getChatMessages(chatSession.id).then((res) => {
        if (res.succeeded) {
          setMessages(res.data || []);
        }
      });
    }
  }, [chatSession, sessionClosed]);

  // Connect to SignalR when session exists
  useEffect(() => {
    if (chatSession && !sessionClosed) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [chatSession, sessionClosed, connect, disconnect]);

  // Listen for real-time events
  useEffect(() => {
    if (!isConnected) return;

    const cleanupMessage = onReceiveMessage((message: ChatMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    const cleanupAdmin = onAdminJoined((data) => {
      setChatSession((prev) =>
        prev ? { ...prev, status: 1, assignedAdminName: data.adminName } : prev
      );
    });

    const cleanupTyping = onUserTyping((senderType, isTyping) => {
      if (senderType === 'admin') {
        setAdminTyping(isTyping);
      }
    });

    const cleanupClosed = onSessionClosed(() => {
      setSessionClosed(true);
      setChatSession((prev) => (prev ? { ...prev, status: 2 } : prev));
    });

    return () => {
      cleanupMessage?.();
      cleanupAdmin?.();
      cleanupTyping?.();
      cleanupClosed?.();
    };
  }, [isConnected, onReceiveMessage, onAdminJoined, onUserTyping, onSessionClosed]);

  const handleStartChat = async () => {
    if (!visitorName.trim()) return;
    setIsLoading(true);

    const isAuth = !!session?.user;
    const identifier = isAuth ? (session as any).user?.id || generateUUID() : (localStorage.getItem(STORAGE_KEY) || generateUUID());

    if (!isAuth) {
      localStorage.setItem(STORAGE_KEY, identifier);
    }

    try {
      const res = await createChatSession({
        sessionIdentifier: identifier,
        visitorName: visitorName.trim(),
        visitorEmail: visitorEmail.trim() || undefined,
        isAuthenticated: isAuth,
        ecommerceUserId: isAuth ? (session as any).user?.id : undefined,
      });

      if (res.succeeded && res.data) {
        localStorage.setItem(STORAGE_KEY, res.data.sessionIdentifier);
        setChatSession(res.data);
        setSessionClosed(false);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatSession || isSending) return;
    setIsSending(true);
    const content = inputMessage.trim();
    setInputMessage('');

    try {
      await sendChatMessage({
        chatSessionId: chatSession.id,
        content,
        senderType: 'visitor',
        senderName: chatSession.visitorName,
        sessionIdentifier: chatSession.sessionIdentifier,
      });
    } catch {
      // silently fail
    } finally {
      setIsSending(false);
      sendTypingIndicator(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    sendTypingIndicator(true);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingIndicator(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    setChatSession(null);
    setMessages([]);
    setSessionClosed(false);
    setVisitorName(session?.user?.name || '');
    setVisitorEmail(session?.user?.email || '');
  };

  const formatTime = (dateStr: string) => {
    const utcStr = dateStr && !dateStr.endsWith('Z') ? dateStr + 'Z' : dateStr;
    const date = new Date(utcStr);
    return date.toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    const parts = content.split(urlRegex);
    return parts.map((part, i) =>
      urlRegex.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline break-all">
          {part}
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const getStatusColor = () => {
    if (connectionState === 'Connected') return 'bg-green-500';
    if (connectionState === 'Reconnecting') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Abrir chat"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full h-full sm:bottom-6 sm:right-6 sm:w-[360px] sm:h-[500px] sm:rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <div>
                <p className="font-semibold text-sm">Soporte Smart Business</p>
                {chatSession && !sessionClosed && (
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor()}`} />
                    <span className="text-xs opacity-90">
                      {chatSession.status === 0
                        ? 'Esperando agente...'
                        : chatSession.assignedAdminName || 'Conectado'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 rounded-full p-1 transition-colors">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {/* Start Chat Form */}
            {!chatSession && !sessionClosed && (
              <div className="flex flex-col gap-3 mt-4">
                <p className="text-sm text-gray-600 text-center">
                  Ingresa tu nombre para iniciar el chat
                </p>
                <input
                  type="text"
                  placeholder="Tu nombre *"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={100}
                />
                <input
                  type="email"
                  placeholder="Tu correo (opcional)"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={100}
                />
                <button
                  onClick={handleStartChat}
                  disabled={!visitorName.trim() || isLoading}
                  className="bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Conectando...' : 'Iniciar Chat'}
                </button>
              </div>
            )}

            {/* Session Closed */}
            {sessionClosed && (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <p className="text-sm text-gray-500">Este chat ha sido cerrado.</p>
                <button
                  onClick={handleNewChat}
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Iniciar nuevo chat
                </button>
              </div>
            )}

            {/* Messages */}
            {chatSession && !sessionClosed && (
              <>
                {chatSession.status === 0 && messages.length === 0 && (
                  <div className="text-center text-sm text-gray-400 mt-8">
                    <div className="animate-pulse mb-2">
                      <div className="inline-block w-2 h-2 bg-gray-400 rounded-full mx-0.5" />
                      <div className="inline-block w-2 h-2 bg-gray-400 rounded-full mx-0.5 animation-delay-200" />
                      <div className="inline-block w-2 h-2 bg-gray-400 rounded-full mx-0.5 animation-delay-400" />
                    </div>
                    <p>Esperando a un agente...</p>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderType === 'visitor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                        msg.senderType === 'visitor'
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                      }`}
                    >
                      {msg.senderType === 'admin' && (
                        <p className="text-xs font-medium text-blue-600 mb-0.5">{msg.senderName}</p>
                      )}
                      <p className="break-words">{renderMessageContent(msg.content)}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          msg.senderType === 'visitor' ? 'text-blue-200' : 'text-gray-400'
                        }`}
                      >
                        {formatTime(msg.sentAt)}
                      </p>
                    </div>
                  </div>
                ))}

                {adminTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 px-3 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          {chatSession && !sessionClosed && (
            <div className="border-t border-gray-200 px-3 py-2 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={2000}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isSending}
                  className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
