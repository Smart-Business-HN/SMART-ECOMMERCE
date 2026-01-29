import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Error de Autenticación | SMART Business',
    robots: {
        index: false,
        follow: false
    }
};

export default function AuthErrorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
