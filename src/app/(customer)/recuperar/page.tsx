import type { Metadata } from "next";
import AuthShell from "@/components/auth/auth-shell.component";
import RecoverForm from "@/components/auth/recover-form.component";

export const metadata: Metadata = {
  title: "Recuperar contraseña | SMART BUSINESS",
  description:
    "Restablece la contraseña de tu cuenta de Smart Business.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://smartbusiness.site/recuperar" },
};

export default function RecuperarPage() {
  return (
    <AuthShell>
      <RecoverForm />
    </AuthShell>
  );
}
