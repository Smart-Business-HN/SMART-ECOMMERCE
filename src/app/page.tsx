import HeroComponent from "@/components/home/hero.component";
import BrandingComponent from "@/components/home/branding.component";
import CorporateResumeComponent from "@/components/home/corporate-resume.component";
import UbiquitiSectionComponent from "@/components/home/ubiquiti-section.component";
import UbiquitiWispSectionComponent from "@/components/home/ubiquiti-wisp-section.component";
import Hikvision from "@/components/home/hikvision.component";

export default function Home() {
  return (
    <>
    <HeroComponent />
    <BrandingComponent />
    <CorporateResumeComponent />
    <UbiquitiSectionComponent />
    <UbiquitiWispSectionComponent />
    <Hikvision />
    </>
  );
}

export const metadata = {
  title: "Smart Business | Soluciones Tecnológicas",
  description: "Compra tecnología, redes, videovigilancia y más en Smart Business. Tienda online líder en Honduras. Productos originales, soporte experto y envíos a todo el país.",
  keywords: [
    "tienda online Honduras",
    "tecnología Honduras",
    "redes empresariales",
    "videovigilancia",
    "Ubiquiti Honduras",
    "Hikvision Honduras",
    "productos tecnológicos",
    "Smart Business",
    "comprar tecnología Honduras"
  ],
  alternates: {
    canonical: "https://www.smartbusiness.site/"
  },
  openGraph: {
    title: "Smart Business | Tienda Online de Tecnología en Honduras",
    description: "Compra tecnología, redes, videovigilancia y más en Smart Business. Tienda online líder en Honduras.",
    url: "https://www.smartbusiness.site/",
    siteName: "Smart Business",
    locale: "es_HN",
    type: "website",
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
    title: "Smart Business | Tienda Online de Tecnología en Honduras",
    description: "Compra tecnología, redes, videovigilancia y más en Smart Business. Tienda online líder en Honduras.",
    site: "@smartbusinesshn",
    images: [
      {
        url: "https://www.smartbusiness.site/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Business - Tienda Online de Tecnología en Honduras"
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  },
  language: "es"
};
