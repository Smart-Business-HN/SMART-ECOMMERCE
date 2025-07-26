import { Metadata } from 'next';
import { slugToTitle } from "@/utils/string.utils";

interface SubCategoryLayoutProps {
    children: React.ReactNode;
    params: Promise<{ category: string; subcategory: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; subcategory: string }> }): Promise<Metadata> {
    const { category, subcategory } = await params;
    const categoryTitle = slugToTitle(category);
    const subcategoryTitle = slugToTitle(subcategory);
    
    return {
        title: `${subcategoryTitle} | SMART BUSINESS - Soluciones Tecnológicas`,
        description: `Explora nuestra selección de ${subcategoryTitle.toLowerCase()} en ${categoryTitle.toLowerCase()}. Productos especializados para cableado estructurado, sistemas CCTV, fibra óptica y equipos de red. Soluciones tecnológicas integrales en Honduras.`,
        keywords: [
            subcategoryTitle.toLowerCase(),
            categoryTitle.toLowerCase(),
            'cableado estructurado',
            'sistemas CCTV',
            'fibra óptica',
            'equipos de red',
            'soluciones tecnológicas',
            'infraestructura de red',
            'cámaras de seguridad',
            'cableado de red',
            'equipos de telecomunicaciones',
            'SMART BUSINESS',
            'tecnología Honduras',
            'equipos de monitoreo',
            'cableado de datos',
            'sistemas de vigilancia',
            'equipos de fibra óptica'
        ],
        authors: [{ name: 'SMART BUSINESS S. DE R.L.' }],
        creator: 'SMART BUSINESS S. DE R.L.',
        publisher: 'SMART BUSINESS S. DE R.L.',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL('https://smartbusiness.site'),
        alternates: {
            canonical: `/tienda/${category}/${subcategory}`,
        },
        openGraph: {
            title: `${subcategoryTitle} | SMART BUSINESS`,
            description: `Productos de ${subcategoryTitle.toLowerCase()} en ${categoryTitle.toLowerCase()} para soluciones tecnológicas. Cableado estructurado, CCTV, fibra óptica y equipos de red en Honduras.`,
            url: `https://smartbusiness.site/tienda/${category}/${subcategory}`,
            siteName: 'SMART BUSINESS',
            locale: 'es_HN',
            type: 'website',
            images: [
                {
                    url: 'https://www.smartbusiness.site/images/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: `${subcategoryTitle} - SMART BUSINESS`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${subcategoryTitle} | SMART BUSINESS`,
            description: `Productos de ${subcategoryTitle.toLowerCase()} en ${categoryTitle.toLowerCase()} para soluciones tecnológicas.`,
            images: ['https://www.smartbusiness.site/images/og-image.jpg'],
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
            'DC.title': `${subcategoryTitle} - SMART BUSINESS`,
            'DC.creator': 'SMART BUSINESS S. DE R.L.',
            'DC.subject': `${subcategoryTitle}, ${categoryTitle}, Cableado Estructurado, CCTV, Fibra Óptica, Equipos de Red`,
            'DC.description': `Productos de ${subcategoryTitle.toLowerCase()} en ${categoryTitle.toLowerCase()} para soluciones tecnológicas y equipos de infraestructura`,
            'DC.publisher': 'SMART BUSINESS S. DE R.L.',
            'DC.type': 'Collection',
            'DC.format': 'text/html',
            'DC.identifier': `https://smartbusiness.site/tienda/${category}/${subcategory}`,
            'DC.language': 'es',
            'DC.coverage': 'Honduras',
        },
    };
}

export default function SubCategoryLayout({ children }: SubCategoryLayoutProps) {
    return (
        <>
            {children}
        </>
    );
} 