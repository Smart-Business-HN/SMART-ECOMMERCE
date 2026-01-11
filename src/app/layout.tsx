import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import NavBarComponent from "@/components/shared/nav-bar.component";
import Footer from "@/components/shared/footer.component";
import SideCartDrawerComponent from "@/components/shared/cart-drawer.component";
import { Analytics } from '@vercel/analytics/next';
import AuthProvider from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Smart Business | Tienda Online de Tecnología en Honduras",
    template: "%s | Smart Business"
  },
  description: "Proveedor líder de tecnología en Honduras especializado en redes, videovigilancia, fibra óptica y soluciones IT empresariales. Productos originales, soporte experto y envíos a todo el país.",
  keywords: [
    "tecnología Honduras",
    "redes empresariales",
    "videovigilancia",
    "cableado estructurado",
    "fibra óptica",
    "Ubiquiti Honduras",
    "Hikvision Honduras",
    "Mikrotik Honduras",
    "Smart Business"
  ],
  authors: [{ name: "SMART BUSINESS S. DE R.L." }],
  creator: "SMART BUSINESS S. DE R.L.",
  publisher: "SMART BUSINESS S. DE R.L.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.smartbusiness.site"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "es_HN",
    url: "https://www.smartbusiness.site",
    siteName: "Smart Business",
    title: "Smart Business | Tienda Online de Tecnología en Honduras",
    description: "Proveedor líder de tecnología en Honduras especializado en redes, videovigilancia, fibra óptica y soluciones IT empresariales.",
    images: [
      {
        url: "https://www.smartbusiness.site/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Business - Tienda Online de Tecnología en Honduras"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@smartbusinesshn",
    creator: "@smartbusinesshn",
    title: "Smart Business | Tienda Online de Tecnología en Honduras",
    description: "Proveedor líder de tecnología en Honduras especializado en redes, videovigilancia, fibra óptica y soluciones IT empresariales.",
    images: ["https://www.smartbusiness.site/images/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'electronics store',
  other: {
    'geo.region': 'HN',
    'geo.placename': 'Honduras',
    'DC.title': 'Smart Business - Tienda Online de Tecnología en Honduras',
    'DC.creator': 'SMART BUSINESS S. DE R.L.',
    'DC.subject': 'Tecnología, Redes, CCTV, Fibra Óptica, Ubiquiti, Hikvision, Mikrotik',
    'DC.description': 'Proveedor líder de tecnología en Honduras especializado en redes, videovigilancia, fibra óptica y soluciones IT empresariales',
    'DC.publisher': 'SMART BUSINESS S. DE R.L.',
    'DC.type': 'Website',
    'DC.format': 'text/html',
    'DC.identifier': 'https://www.smartbusiness.site',
    'DC.language': 'es',
    'DC.coverage': 'Honduras'
  },
  verification: {
    google: 'S-MABBGjddcLo8_kNkNfuqVi7etsoBNnLSR-OpHJBeg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true} data-lt-installed={true}>
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
        <link rel="shortcut icon" href="/images/corporate/smart.webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <AuthProvider>
          <NavBarComponent cartItemsCount={0} onCartClick={undefined} />
          {/* <SideCartDrawerComponent open={false} onClose={() => {}} />
           */}
          {children}
          <Analytics />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
