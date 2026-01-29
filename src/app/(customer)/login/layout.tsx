import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Iniciar Sesión | SMART Business',
    description: 'Accede a tu cuenta de SMART Business para gestionar pedidos, ver precios especiales y más.',
    robots: {
        index: false,
        follow: true
    }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
