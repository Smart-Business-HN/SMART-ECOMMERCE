'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Aplica Manual Advanced Matching al Pixel desde el cliente cuando hay sesión.
// Se hace aquí (y no en el código base server-side) para que el root layout
// permanezca estático: leer la sesión en el servidor del layout volvería
// dinámicas todas las páginas. Re-llamar fbq('init', id, matching) fusiona los
// datos del usuario; como el código base no auto-dispara PageView, re-inicializar
// no tiene efectos secundarios.
export default function PixelAdvancedMatching() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return;
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    if (!pixelId || typeof window === 'undefined' || typeof window.fbq !== 'function') return;

    const matching: Record<string, string> = {};
    if (session?.user?.email) matching.em = session.user.email;
    if (session?.firstName) matching.fn = session.firstName;
    if (session?.lastName) matching.ln = session.lastName;
    if (session?.user?.id) matching.external_id = session.user.id;
    if (Object.keys(matching).length === 0) return;

    window.fbq('init', pixelId, matching);
  }, [status, session]);

  return null;
}
