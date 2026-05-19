//@ts-nocheck
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, Typography, Button } from "@/utils/MTailwind";
import {
    ShoppingCartIcon,
    DocumentTextIcon,
    CubeIcon,
    UsersIcon,
    ChartBarIcon,
    BuildingOffice2Icon,
    CheckCircleIcon,
    ArrowTopRightOnSquareIcon,
    SparklesIcon,
    BoltIcon,
    ShieldCheckIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
    title: "Ventix | ERP & POS en la nube para tu negocio - Smart Business Honduras",
    description: "Ventix es el sistema ERP y POS en la nube de Smart Business: facturación electrónica CAI/SAR, inventario, CRM, multi-sucursal y reportes. Listo en minutos para PyMEs de Honduras.",
    keywords: [
        "Ventix",
        "ERP en la nube Honduras",
        "POS Honduras",
        "sistema POS PyME",
        "facturación CAI SAR",
        "facturación electrónica Honduras",
        "software inventario Honduras",
        "CRM PyME",
        "ERP para tiendas",
        "ERP para restaurantes",
        "punto de venta en la nube",
        "Smart Business",
        "software contable Honduras",
        "multi sucursal",
        "Honduras"
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
        canonical: "/ventix",
    },
    openGraph: {
        title: "Ventix | ERP & POS en la nube - Smart Business",
        description: "Tu negocio organizado, simple y en control. POS, facturación CAI/SAR, inventario y CRM en un solo lugar.",
        url: "https://www.smartbusiness.site/ventix",
        siteName: "Smart Business",
        images: [
            {
                url: "/images/ventix/screenshots/Dashboard.png",
                width: 1200,
                height: 630,
                alt: "Ventix - ERP y POS en la nube para tu negocio",
            },
        ],
        locale: "es_HN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ventix | ERP & POS en la nube - Smart Business",
        description: "POS, facturación CAI/SAR, inventario y CRM. Listo en minutos para PyMEs de Honduras.",
        images: ["/images/ventix/screenshots/Dashboard.png"],
        creator: "SMART BUSINESS S. DE R.L.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    category: "technology",
    classification: "software",
};

const VENTIX_URL = "https://ventix.smartbusiness.site/";
const VENTIX_SIGNUP_URL = "https://ventix.smartbusiness.site/";

export default function VentixPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Ventix",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "Ventix es el sistema ERP y POS en la nube de Smart Business para PyMEs en Honduras. Incluye POS, facturación CAI/SAR, inventario multi-bodega, CRM, reportería y soporte multi-sucursal.",
        url: VENTIX_URL,
        image: "https://www.smartbusiness.site/images/ventix/screenshots/Dashboard.png",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "HNL",
            description: "Plan gratuito disponible",
        },
        publisher: {
            "@type": "Organization",
            name: "SMART BUSINESS S. DE R.L.",
            url: "https://www.smartbusiness.site",
        },
        featureList: [
            "Punto de venta (POS)",
            "Facturación electrónica CAI/SAR",
            "Inventario multi-bodega",
            "CRM y gestión de clientes",
            "Reportes y analítica",
            "Multi-sucursal",
        ],
    };

    const features = [
        {
            icon: ShoppingCartIcon,
            title: "Punto de Venta (POS)",
            description: "Cobra rápido en mostrador o restaurante. Interfaz intuitiva, lista en minutos.",
            gradient: "from-blue-500 to-blue-700",
        },
        {
            icon: DocumentTextIcon,
            title: "Facturación CAI/SAR",
            description: "Emite facturas que cumplen con la normativa hondureña, sin complicaciones.",
            gradient: "from-indigo-500 to-indigo-700",
        },
        {
            icon: CubeIcon,
            title: "Inventario Multi-Bodega",
            description: "Controla stock en tiempo real, varias bodegas y sucursales bajo el mismo sistema.",
            gradient: "from-cyan-500 to-cyan-700",
        },
        {
            icon: UsersIcon,
            title: "CRM Integrado",
            description: "Conoce a tus clientes, su historial de compras y mejora su experiencia.",
            gradient: "from-sky-500 to-sky-700",
        },
        {
            icon: ChartBarIcon,
            title: "Reportes y Analítica",
            description: "Decide con datos. Reportes claros de ventas, inventario y rentabilidad.",
            gradient: "from-blue-600 to-blue-800",
        },
        {
            icon: BuildingOffice2Icon,
            title: "Multi-Sucursal",
            description: "Administra varias sucursales desde un solo lugar. Crece sin fricción.",
            gradient: "from-violet-500 to-violet-700",
        },
    ];

    const benefits = [
        {
            icon: BoltIcon,
            title: "Listo en minutos",
            description: "Sin instalaciones complejas. Crea tu cuenta y empieza a vender hoy.",
        },
        {
            icon: ShieldCheckIcon,
            title: "Tus datos seguros",
            description: "Información protegida en la nube con respaldos automáticos.",
        },
        {
            icon: ClockIcon,
            title: "Soporte local",
            description: "Equipo de Smart Business para acompañarte cuando lo necesites.",
        },
    ];

    const targetAudience = [
        { title: "Tiendas y minoristas", desc: "Control de inventario, ventas y clientes en mostrador." },
        { title: "Restaurantes y cafés", desc: "POS optimizado para servicio rápido y comandas." },
        { title: "PyMEs y emprendedores", desc: "Todo lo que tu negocio necesita en una sola plataforma." },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="container mx-auto px-5 py-2">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                    <li>
                        <Link href="/" className="hover:text-blue-500" aria-label="Ir al inicio">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <span className="mx-2">/</span>
                    </li>
                    <li aria-current="page">
                        <span className="text-blue-500 font-medium">Ventix</span>
                    </li>
                </ol>
            </nav>

            {/* Hero */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 md:py-24 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-5 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-white animate-fade-right">
                            <Image
                                src="/images/ventix/logo/logo-text-on-dark.png"
                                width={220}
                                height={60}
                                alt="Logo de Ventix"
                                className="h-14 w-auto mb-6"
                                priority
                            />
                            <Typography
                                variant="h1"
                                className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
                                placeholder={undefined}
                            >
                                Tu negocio organizado,<br />
                                <span className="text-blue-200">simple y en control</span>
                            </Typography>
                            <Typography
                                className="text-blue-50 text-lg md:text-xl mb-8 leading-relaxed"
                                placeholder={undefined}
                            >
                                Ventix es el sistema ERP y POS en la nube de Smart Business.
                                POS, facturación CAI/SAR, inventario y CRM en un solo lugar —
                                pensado para PyMEs de Honduras.
                            </Typography>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all"
                                    placeholder={undefined}
                                >
                                    <a
                                        href={VENTIX_SIGNUP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <span>Probar gratis</span>
                                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                    </a>
                                </Button>
                                {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
                                <Button
                                    size="lg"
                                    variant="outlined"
                                    className="border-2 border-white text-white hover:bg-white/10"
                                    placeholder={undefined}
                                >
                                    <a
                                        href={VENTIX_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <span>Ver demo</span>
                                    </a>
                                </Button>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-blue-100 text-sm">
                                <SparklesIcon className="h-5 w-5" />
                                <span>Plan gratuito disponible — sin tarjeta de crédito.</span>
                            </div>
                        </div>

                        <div className="relative animate-fade-left">
                            <div className="absolute inset-0 bg-white/10 rounded-2xl blur-3xl"></div>
                            <Image
                                src="/images/ventix/screenshots/Dashboard.png"
                                width={1000}
                                height={620}
                                alt="Captura del dashboard de Ventix con reportes y métricas del negocio"
                                className="relative rounded-2xl shadow-2xl ring-1 ring-white/20 w-full h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Beneficios rápidos */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {benefits.map((item, index) => (
                            <Card
                                key={index}
                                className="border border-gray-100 shadow-md hover:shadow-lg transition-all p-6"
                                placeholder={undefined}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <item.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <Typography
                                            variant="h6"
                                            className="text-gray-800 font-bold mb-1"
                                            placeholder={undefined}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography className="text-gray-600 text-sm" placeholder={undefined}>
                                            {item.description}
                                        </Typography>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Funcionalidades */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-5">
                    <div className="text-center mb-12">
                        <Typography
                            variant="h2"
                            className="text-4xl font-bold text-gray-800 mb-4"
                            placeholder={undefined}
                        >
                            Todo lo que tu negocio necesita
                        </Typography>
                        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                        <Typography
                            className="text-gray-600 text-lg max-w-2xl mx-auto"
                            placeholder={undefined}
                        >
                            Una plataforma integral que reemplaza varias herramientas. Sin complejidad técnica.
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className={`overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-up animate-delay-${(index + 1) * 100}`}
                                placeholder={undefined}
                            >
                                <div className={`bg-gradient-to-br ${feature.gradient} p-6`}>
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                                        <feature.icon className="h-7 w-7 text-white" />
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <Typography
                                        variant="h5"
                                        className="font-bold text-gray-800 mb-2"
                                        placeholder={undefined}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography className="text-gray-600 text-sm" placeholder={undefined}>
                                        {feature.description}
                                    </Typography>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Screenshot showcase: POS */}
            <div className="container mx-auto px-5 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-right">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                                    <ShoppingCartIcon className="h-6 w-6 text-white" />
                                </div>
                                <Typography
                                    variant="h2"
                                    className="text-3xl font-bold text-gray-800"
                                    placeholder={undefined}
                                >
                                    POS rápido y simple
                                </Typography>
                            </div>
                            <div className="w-20 h-1 bg-blue-600 mb-6"></div>
                            <Typography className="text-gray-600 text-lg mb-4" placeholder={undefined}>
                                Cobra rápido, sin curva de aprendizaje. Diseñado para tiendas,
                                restaurantes y cafés que necesitan moverse rápido en mostrador.
                            </Typography>
                            <ul className="space-y-3 mb-6">
                                {[
                                    "Cobros con efectivo, tarjeta o transferencia",
                                    "Catálogo de productos y combos configurables",
                                    "Comandas y tickets impresos",
                                    "Operación incluso con conexión intermitente",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircleIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <Typography className="text-gray-700" placeholder={undefined}>
                                            {item}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="animate-fade-left">
                            <Card className="overflow-hidden shadow-2xl border-0" placeholder={undefined}>
                                <Image
                                    src="/images/ventix/screenshots/POS.png"
                                    width={1000}
                                    height={620}
                                    alt="Captura del punto de venta (POS) de Ventix"
                                    className="w-full h-auto"
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Screenshot showcase: Reportes */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-5">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 animate-fade-right">
                                <Card className="overflow-hidden shadow-2xl border-0" placeholder={undefined}>
                                    <Image
                                        src="/images/ventix/screenshots/Reports.png"
                                        width={1000}
                                        height={620}
                                        alt="Captura de reportes y analítica de Ventix"
                                        className="w-full h-auto"
                                    />
                                </Card>
                            </div>
                            <div className="order-1 md:order-2 animate-fade-left">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center">
                                        <ChartBarIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <Typography
                                        variant="h2"
                                        className="text-3xl font-bold text-gray-800"
                                        placeholder={undefined}
                                    >
                                        Decide con datos
                                    </Typography>
                                </div>
                                <div className="w-20 h-1 bg-indigo-600 mb-6"></div>
                                <Typography className="text-gray-600 text-lg mb-4" placeholder={undefined}>
                                    Reportes claros y al instante: ventas por día, productos más
                                    vendidos, márgenes, rotación de inventario y más.
                                </Typography>
                                <ul className="space-y-3">
                                    {[
                                        "Ventas por sucursal, vendedor y categoría",
                                        "Rotación e inventario valorizado",
                                        "Estado de cuentas de clientes",
                                        "Exportación a Excel y PDF",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircleIcon className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                                            <Typography className="text-gray-700" placeholder={undefined}>
                                                {item}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ¿Para quién es? */}
            <div className="container mx-auto px-5 py-16">
                <div className="text-center mb-12">
                    <Typography
                        variant="h2"
                        className="text-4xl font-bold text-gray-800 mb-4"
                        placeholder={undefined}
                    >
                        ¿Para quién es Ventix?
                    </Typography>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {targetAudience.map((item, index) => (
                        <Card
                            key={index}
                            className="border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-8 text-center"
                            placeholder={undefined}
                        >
                            <Typography
                                variant="h5"
                                className="font-bold text-gray-800 mb-3"
                                placeholder={undefined}
                            >
                                {item.title}
                            </Typography>
                            <Typography className="text-gray-600" placeholder={undefined}>
                                {item.desc}
                            </Typography>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA final */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 py-20">
                <div className="container mx-auto px-5 text-center">
                    <Typography
                        variant="h2"
                        className="text-white text-4xl md:text-5xl font-bold mb-6"
                        placeholder={undefined}
                    >
                        Empieza con Ventix hoy
                    </Typography>
                    <Typography
                        className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto"
                        placeholder={undefined}
                    >
                        Crea tu cuenta gratis y empieza a vender en minutos. Sin compromisos.
                    </Typography>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
                        <Button
                            size="lg"
                            className="bg-white text-blue-700 hover:bg-blue-50 shadow-2xl px-8 py-4 text-lg"
                            placeholder={undefined}
                        >
                            <a
                                href={VENTIX_SIGNUP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                            >
                                <span>Probar gratis</span>
                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                            </a>
                        </Button>
                        {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
                        <Button
                            size="lg"
                            variant="outlined"
                            className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                            placeholder={undefined}
                        >
                            <Link href="/contacto" className="flex items-center gap-2">
                                <span>Solicitar demo</span>
                            </Link>
                        </Button>
                    </div>
                    <p className="text-blue-200 text-sm mt-8">
                        Ventix es parte del grupo Smart Business.
                    </p>
                </div>
            </div>
        </>
    );
}
