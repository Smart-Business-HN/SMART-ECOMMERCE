'use client';

import { useState, useRef, useEffect } from 'react';
import { QuotationComment } from '@/interfaces/quotation-preview/quotation-preview.interface';
import { addQuotationComment } from '@/services/quotation-preview.service';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface CommentSectionProps {
  token: string;
  initialComments: QuotationComment[];
}

export default function CommentSection({ token, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<QuotationComment[]>(initialComments);
  const [authorName, setAuthorName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hasStoredName, setHasStoredName] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Restore author name from localStorage
    const savedName = localStorage.getItem('quotation_preview_author');
    if (savedName) {
      setAuthorName(savedName);
      setHasStoredName(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setError('');

    // Save author name for future use
    localStorage.setItem('quotation_preview_author', authorName.trim());
    setHasStoredName(true);

    const response = await addQuotationComment(token, authorName.trim(), message.trim());

    if (response.succeeded && response.data) {
      setComments((prev) => [...prev, response.data]);
      setMessage('');
    } else {
      setError(response.message || 'Error al enviar el comentario');
    }

    setIsSubmitting(false);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-HN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Group comments by date
  const groupedComments: { date: string; comments: QuotationComment[] }[] = [];
  comments.forEach((comment) => {
    const dateKey = new Date(comment.creationDate).toDateString();
    const existing = groupedComments.find((g) => g.date === dateKey);
    if (existing) {
      existing.comments.push(comment);
    } else {
      groupedComments.push({ date: dateKey, comments: [comment] });
    }
  });

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
        <ChatBubbleLeftRightIcon className="w-5 h-5" />
        Comentarios
      </h2>

      {/* Messages area */}
      <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto mb-4">
        {comments.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            No hay comentarios aún. Sé el primero en agregar uno.
          </p>
        ) : (
          groupedComments.map((group) => (
            <div key={group.date} className="mb-4">
              <div className="text-center mb-3">
                <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {formatDate(group.comments[0].creationDate)}
                </span>
              </div>
              {group.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`flex mb-3 ${comment.isFromClient ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      comment.isFromClient
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className={`text-xs font-bold mb-1 ${comment.isFromClient ? 'text-blue-100' : 'text-gray-500'}`}>
                      {comment.isFromClient ? comment.authorName : (comment.userFullName || 'Asesor')}
                    </p>
                    <p className="text-sm">{comment.message}</p>
                    <p className={`text-xs mt-1 ${comment.isFromClient ? 'text-blue-200' : 'text-gray-400'}`}>
                      {formatTime(comment.creationDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {!hasStoredName && (
          <input
            type="text"
            placeholder="Tu nombre"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        )}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Escribe un comentario..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !authorName.trim() || !message.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </form>
    </div>
  );
}
