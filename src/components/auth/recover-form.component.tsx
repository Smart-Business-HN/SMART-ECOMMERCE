"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/button.component";

const labelCls = "block text-[13px] font-semibold text-ink2-700 mb-[7px]";
const inputCls =
  "sb-in w-full rounded-[11px] border border-line-input bg-white px-3.5 py-3 text-[14.5px] text-text outline-none placeholder:text-ink2-400";

/**
 * Password recovery form.
 * NOTE: there is no backend forgot-password endpoint yet (no /api proxy, no service).
 * This shows the neutral confirmation message without calling an API. When a
 * `forgot-password` endpoint exists, wire the submit handler to it here.
 */
export default function RecoverForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call backend forgot-password endpoint when available.
    setSent(true);
  };

  return (
    <div>
      <Link
        href="/login"
        className="sb-link inline-flex items-center gap-1.5 text-[14px] text-ink2-500 hover:text-accent"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Volver a iniciar sesión
      </Link>

      <h1 className="mt-5 text-[30px] font-bold tracking-[-0.02em] text-text">
        Recuperar contraseña
      </h1>
      <p className="mt-1.5 text-[15px] leading-[1.55] text-ink2-500">
        Ingresa tu correo y te enviaremos un enlace para restablecer tu
        contraseña.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
          <label htmlFor="recover-email" className={labelCls}>
            Correo
          </label>
          <input
            id="recover-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@empresa.com"
            required
            disabled={sent}
            className={inputCls}
          />
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={sent}>
          {sent ? "Enlace enviado" : "Enviar enlace de recuperación"}
        </Button>
      </form>

      {sent && (
        <div className="mt-4 flex items-start gap-2.5 rounded-[10px] bg-success-soft px-4 py-3 text-[13.5px] text-success">
          <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-none" />
          <span>Si el correo existe, recibirás el enlace en breve.</span>
        </div>
      )}
    </div>
  );
}
