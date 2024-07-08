import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';

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
        <Script id='tag-manager'
        dangerouslySetInnerHTML={
          { __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W4PPLW2');`}
        } />
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
        <Script id='googleAnalitycs'
          dangerouslySetInnerHTML={
            {
              __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6R2P5JT4NX');`}}
        />
        <meta name="google-site-verification" content="S-MABBGjddcLo8_kNkNfuqVi7etsoBNnLSR-OpHJBeg" />
        <link rel="shortcut icon" href="assets/images/favicon.ico" />
      </head>
      <body className={poppins.className}>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W4PPLW2" height="0" width="0" className='hidden'></iframe></noscript>
      <Providers>
        {/* <SessionAuthProvider> */}
        {children}
        <SpeedInsights/>
        {/* </SessionAuthProvider> */}
      </Providers>
      </body>
    </html>
  );
}
