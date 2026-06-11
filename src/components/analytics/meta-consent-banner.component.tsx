'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'meta_consent';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 días

function writeCookie(value: 'granted' | 'revoked') {
  document.cookie = `meta_consent=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function applyConsent(value: 'granted' | 'revoked') {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* almacenamiento no disponible */
  }
  writeCookie(value);
  if (typeof window.fbq === 'function') {
    window.fbq('consent', value === 'granted' ? 'grant' : 'revoke');
  }
}

// Banner de consentimiento opt-out: el rastreo está ACTIVO por defecto (Honduras),
// el usuario puede rechazarlo. Reaplica una decisión previa de "revoked" al
// cargar para que el Pixel siga apagado entre visitas.
export default function MetaConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* almacenamiento no disponible */
    }

    if (stored === 'revoked') {
      // Reaplica el opt-out antes de que se dispare cualquier evento.
      writeCookie('revoked');
      if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
    }

    if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] border-t border-gray-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-700">
          Usamos cookies y tecnologías de medición (incluido el Pixel de Meta) para
          mejorar tu experiencia y mostrarte ofertas relevantes. Puedes rechazarlas
          cuando quieras.{' '}
          <a href="/terminos-y-condiciones" className="font-medium text-blue-600 underline">
            Más información
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              applyConsent('revoked');
              setVisible(false);
            }}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => {
              applyConsent('granted');
              setVisible(false);
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
