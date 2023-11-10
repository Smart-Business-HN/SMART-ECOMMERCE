import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/foother'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100","200","300","400","500","600","700","800","900"]
})

export const metadata: Metadata = {
  title: 'Smart Business',
  description: 'Tu tienda mayorista para tu negocio de redes y seguridad.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
<script
   dangerouslySetInnerHTML={
                 {
     __html: `
     (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "imw8vbk3te");`,
   }}
 />
      </head>
      <body className={poppins.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
