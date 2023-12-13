import Navbar from '@/components/main-layout/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/main-layout/foother'
import SessionAuthProvider from '@/context/SessionProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  title: 'Smart Business',
  description: 'Tu tienda mayorista para tu negocio de redes y seguridad.',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          dangerouslySetInnerHTML={
            {
              __html: `(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "imw8vbk3te");`,
            }}
        />
        <meta name="google-site-verification" content="S-MABBGjddcLo8_kNkNfuqVi7etsoBNnLSR-OpHJBeg" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </head>
      <body className={poppins.className}>
        <SessionAuthProvider>
          <Navbar />
            {children}
          <Footer />
        </SessionAuthProvider>
      </body>
    </html>
  );
}
