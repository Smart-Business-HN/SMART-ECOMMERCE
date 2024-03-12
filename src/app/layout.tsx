import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  title: 'Smart Business',
  description: 'Expertos en soluciones de seguridad: Cámaras Hikvision, redes Ubiquiti y cableado estructurado. Transforma tu espacio con la mejor tecnología CCTV y de red.',
  keywords: ['Ubiquiti','Camaras', 'Redes','Wifi Empresarial', 'Contratista CCTV','Hikvision','IT','servidores NAS'],
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <Script
          id='clarityScript'
          dangerouslySetInnerHTML={
            {
              __html: `(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "imw8vbk3te");`,
            }}
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6R2P5JT4NX" />
        <Script id='googleAnalitycs'
          dangerouslySetInnerHTML={
            {
              __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6R2P5JT4NX');`}}
        />
        <meta name="google-site-verification" content="S-MABBGjddcLo8_kNkNfuqVi7etsoBNnLSR-OpHJBeg" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <link rel="shortcut icon" href="assets/images/favicon.ico" />
      </head>
      <body className={poppins.className}>
        {/* <SessionAuthProvider> */}
        {children}
        <SpeedInsights/>
        {/* </SessionAuthProvider> */}
      </body>
    </html>
  );
}
