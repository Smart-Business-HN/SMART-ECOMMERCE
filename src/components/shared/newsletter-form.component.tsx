'use client';

import { useState } from 'react';

/**
 * Footer newsletter form. Previously a non-functional <form> whose button silently
 * reloaded the page (a dead click that showed up in Clarity's rage-click data).
 * Now it validates the email and opens the user's mail client to send the request
 * to ventas@ — a real, honest action with no fabricated "success" state.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    const subject = encodeURIComponent('Suscripción a noticias de Smart Business');
    const body = encodeURIComponent(`Deseo suscribirme a las noticias con el correo: ${email.trim()}`);
    window.location.href = `mailto:ventas@smartbusiness.site?subject=${subject}&body=${body}`;
  };

  return (
    <form className="mx-10" onSubmit={handleSubmit} noValidate>
      <h6 className="text-gray-600 font-bold text-md md:text-md">Enterate de nuestras noticias</h6>
      <div className="flex-col gap-4">
        <label htmlFor="newsletter-email" className="block text-gray-500 pt-1 text-md md:text-xs">
          Correo:
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(false);
          }}
          aria-invalid={error}
          className="w-full h-10 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <p className="mt-1 text-xs text-red-600">Ingresa un correo electrónico válido.</p>
        )}
        <div className="mt-2 flex justify-center sm:justify-start">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 min-h-[44px] text-white rounded-md font-medium transition-colors"
          >
            Suscribirme
          </button>
        </div>
      </div>
    </form>
  );
}
