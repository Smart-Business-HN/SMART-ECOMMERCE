'use client';

import { useState, useEffect } from 'react';
import { QuotationItemObservation } from '@/interfaces/quotation-preview/quotation-preview.interface';
import { addItemObservation } from '@/services/quotation-preview.service';
import { ChatBubbleBottomCenterTextIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ItemObservationDialogProps {
  token: string;
  productOfferedId: number;
  productDescription: string;
  existingObservations: QuotationItemObservation[];
}

export default function ItemObservationDialog({
  token,
  productOfferedId,
  productDescription,
  existingObservations,
}: ItemObservationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [observations, setObservations] = useState<QuotationItemObservation[]>(existingObservations);
  const [authorName, setAuthorName] = useState('');
  const [observation, setObservation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('quotation_preview_author');
    if (savedName) setAuthorName(savedName);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !observation.trim()) return;

    setIsSubmitting(true);
    setError('');

    localStorage.setItem('quotation_preview_author', authorName.trim());

    const response = await addItemObservation(token, productOfferedId, authorName.trim(), observation.trim());

    if (response.succeeded && response.data) {
      setObservations((prev) => [...prev, response.data]);
      setObservation('');
    } else {
      setError(response.message || 'Error al agregar observación');
    }

    setIsSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-HN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-400 hover:text-blue-500 transition-colors"
        title="Agregar observación"
      >
        <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-bold text-slate-800 text-sm">
                Observaciones del producto
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Product name */}
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
              <p className="text-xs text-gray-500 truncate">{productDescription}</p>
            </div>

            {/* Existing observations */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {observations.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-4">
                  No hay observaciones para este producto.
                </p>
              ) : (
                observations.map((obs) => (
                  <div key={obs.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-800">{obs.authorName}</span>
                      <span className="text-xs text-amber-600">{formatDate(obs.creationDate)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{obs.observation}</p>
                  </div>
                ))
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 space-y-2">
              <input
                type="text"
                placeholder="Tu nombre"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
              <div className="flex gap-2">
                <textarea
                  placeholder="Escribe tu observación..."
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  rows={2}
                  required
                  disabled={isSubmitting}
                  maxLength={500}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !authorName.trim() || !observation.trim()}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Enviando...' : 'Agregar'}
                </button>
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
