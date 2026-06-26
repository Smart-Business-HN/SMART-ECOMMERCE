//@ts-nocheck
import { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/button.component";
import {
    ShoppingCartIcon,
    DocumentTextIcon,
    CubeIcon,
    UsersIcon,
    ChartBarIcon,
    BuildingOffice2Icon,
    CheckCircleIcon,
    BoltIcon,
    ShieldCheckIcon,
    ClockIcon,
    BuildingStorefrontIcon,
    BeakerIcon,
    BriefcaseIcon,
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
            title: "Punto de venta",
            description: "Cobra rápido con una interfaz simple. Maneja varios cajeros y métodos de pago.",
        },
        {
            icon: DocumentTextIcon,
            title: "Facturación CAI / SAR",
            description: "Emite facturas conforme a la normativa hondureña, con control de correlativos.",
        },
        {
            icon: CubeIcon,
            title: "Inventario multi-bodega",
            description: "Controla stock en tiempo real entre múltiples bodegas y sucursales.",
        },
        {
            icon: UsersIcon,
            title: "CRM de clientes",
            description: "Historial de compras, cuentas por cobrar y seguimiento de tus clientes.",
        },
        {
            icon: ChartBarIcon,
            title: "Reportes y analítica",
            description: "Ventas, márgenes, impuestos y desempeño por cajero. Exporta a PDF.",
        },
        {
            icon: BuildingOffice2Icon,
            title: "Multi-sucursal",
            description: "Administra todas tus tiendas desde una sola cuenta, con permisos por usuario.",
        },
    ];

    const benefits = [
        {
            icon: BoltIcon,
            title: "Listo en minutos",
            description: "Sin instalaciones ni servidores",
        },
        {
            icon: ShieldCheckIcon,
            title: "Datos seguros",
            description: "Respaldo automático en la nube",
        },
        {
            icon: ClockIcon,
            title: "Soporte local",
            description: "Equipo en Honduras que responde",
        },
    ];

    const reports = [
        "Ventas mensuales y por sucursal",
        "Productos más vendidos",
        "Ventas por cajero y ticket promedio",
        "Resumen de impuestos y cuentas por cobrar",
    ];

    const targetAudience = [
        {
            icon: BuildingStorefrontIcon,
            title: "Comercio minorista",
            desc: "Tiendas, ferreterías y abarroterías que necesitan cobrar y controlar stock.",
        },
        {
            icon: BeakerIcon,
            title: "Restaurantes y cafés",
            desc: "Pedidos rápidos, múltiples cajeros y reportes de cierre diario.",
        },
        {
            icon: BriefcaseIcon,
            title: "Servicios y PYMES",
            desc: "Facturación conforme, CRM y cuentas por cobrar para negocios en crecimiento.",
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <section className="relative overflow-hidden bg-ink text-white">
                {/* Cyan radial glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-48 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(30,155,232,.45), transparent 62%)",
                    }}
                />
                <div className="relative mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-down">
                        <Image
                            src="/images/ventix/logo/logo-text-on-dark.png"
                            width={232}
                            height={58}
                            alt="Ventix by Smart Business"
                            className="mx-auto mb-8 h-14 w-auto"
                            priority
                        />
                        <h1 className="mx-auto mb-5 max-w-[820px] text-[32px] sm:text-[44px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
                            Tu negocio organizado, simple y bajo control.
                        </h1>
                        <p className="mx-auto mb-8 max-w-[600px] text-[18px] leading-[1.55] text-ink2-300 md:text-[19px]">
                            Punto de venta, facturación CAI/SAR, inventario multi-bodega y CRM en
                            una sola plataforma en la nube. Empieza gratis, sin tarjeta.
                        </p>
                        <div className="mb-4 flex flex-wrap justify-center gap-3.5">
                            <Button
                                variant="ventix"
                                size="lg"
                                href={VENTIX_SIGNUP_URL}
                            >
                                Crear cuenta gratis
                            </Button>
                            <Button
                                variant="secondary"
                                size="lg"
                                href={VENTIX_URL}
                                className="border-white/20 bg-white/[0.07] text-white hover:border-white/40 hover:bg-white/[0.12]"
                            >
                                Ver demo
                            </Button>
                        </div>
                        <p className="mb-14 text-[13px] text-ink2-400">
                            Plan gratuito disponible · Sin tarjeta de crédito
                        </p>
                    </div>

                    {/* Dashboard screenshot anchored to the bottom of the hero */}
                    <div className="relative mx-auto max-w-[1040px] animate-fade-up">
                        <div
                            className="overflow-hidden rounded-t-[18px] border border-b-0 border-white/[0.12]"
                            style={{ boxShadow: "0 -10px 60px -20px rgba(30,155,232,.5)" }}
                        >
                            <Image
                                src="/images/ventix/screenshots/Dashboard.png"
                                width={1040}
                                height={650}
                                alt="Captura del dashboard de Ventix con reportes y métricas del negocio"
                                className="block h-auto w-full"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mini benefits */}
            <section className="border-b border-line bg-white">
                <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 py-11 sm:px-6 md:grid-cols-3 lg:px-8">
                    {benefits.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-3.5 text-left"
                        >
                            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] bg-[#EAF5FE] text-ventix">
                                <item.icon className="h-6 w-6" />
                            </span>
                            <div>
                                <div className="text-[15px] font-bold text-text">
                                    {item.title}
                                </div>
                                <div className="text-[13.5px] text-ink2-500">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features grid */}
            <section className="bg-surface">
                <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-12 max-w-[560px] text-center">
                        <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-ventix">
                            Todo en un solo lugar
                        </p>
                        <h2 className="mb-3 text-[28px] font-bold tracking-[-0.03em] text-text md:text-[34px]">
                            Funciones que tu negocio necesita
                        </h2>
                        <p className="text-[15.5px] leading-[1.6] text-ink2-600">
                            Desde la venta hasta el reporte mensual, Ventix cubre toda tu operación.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-card border border-line bg-white p-[30px] shadow-card transition-all hover:-translate-y-0.5 hover:border-[#CFE3F8] hover:shadow-card-hover animate-fade-up"
                            >
                                <span className="mb-[18px] flex h-[50px] w-[50px] items-center justify-center rounded-[14px] bg-[#EAF5FE] text-ventix">
                                    <feature.icon className="h-6 w-6" />
                                </span>
                                <h3 className="mb-2.5 text-[19px] font-bold tracking-[-0.02em] text-text">
                                    {feature.title}
                                </h3>
                                <p className="text-[14.5px] leading-[1.6] text-ink2-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reports split */}
            <section className="bg-white">
                <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-4 py-14 md:py-20 sm:px-6 md:grid-cols-[1fr_1.1fr] lg:px-8">
                    <div className="animate-fade-right">
                        <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-ventix">
                            Reportes inteligentes
                        </p>
                        <h2 className="mb-[18px] text-[28px] font-bold tracking-[-0.03em] text-text md:text-[34px]">
                            Decisiones con datos reales
                        </h2>
                        <p className="mb-6 text-[15.5px] leading-[1.7] text-ink2-600">
                            Ventas mensuales, productos más vendidos, ventas por cajero, márgenes,
                            impuestos y cuentas por cobrar. Filtra por fecha y exporta a PDF en un clic.
                        </p>
                        <ul className="flex flex-col gap-3">
                            {reports.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 text-[15px] text-text"
                                >
                                    <CheckCircleIcon className="h-5 w-5 flex-none text-ventix" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="overflow-hidden rounded-card border border-line shadow-card-hover animate-fade-left">
                        <Image
                            src="/images/ventix/screenshots/Reports.png"
                            width={1000}
                            height={620}
                            alt="Captura de reportes y analítica de Ventix"
                            className="block h-auto w-full"
                        />
                    </div>
                </div>
            </section>

            {/* Mobile / anywhere */}
            <section className="relative overflow-hidden bg-ink text-white">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-[-160px] h-[520px] w-[520px] -translate-y-1/2 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(30,155,232,.16), transparent 65%)",
                    }}
                />
                <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 py-14 md:py-20 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
                    <div className="animate-fade-right">
                        <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-ventix">
                            En la nube, en cualquier lugar
                        </p>
                        <h2 className="mb-4 text-[28px] font-bold tracking-[-0.03em] text-white md:text-[34px]">
                            Tu negocio en el bolsillo
                        </h2>
                        <p className="mb-7 max-w-[480px] text-[15.5px] leading-[1.65] text-ink2-300">
                            Accede a tus ventas e inventario desde cualquier dispositivo. Ventix
                            funciona en computadora, tablet y celular, sin instalar nada.
                        </p>
                        <Button variant="ventix" size="lg" href={VENTIX_SIGNUP_URL}>
                            Empezar ahora
                        </Button>
                    </div>
                    <div className="flex justify-center animate-fade-left">
                        <div className="max-w-[300px] overflow-hidden rounded-container border border-white/[0.14] shadow-[0_30px_70px_-30px_rgba(0,0,0,.6)]">
                            <Image
                                src="/images/ventix/screenshots/Dashboard-phone.png"
                                width={300}
                                height={620}
                                alt="Ventix en un dispositivo móvil"
                                className="block h-auto w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* For whom */}
            <section className="bg-white">
                <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-11 text-center">
                        <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-ventix">
                            ¿Para quién es?
                        </p>
                        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-text md:text-[34px]">
                            Hecho para tu tipo de negocio
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
                        {targetAudience.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-card border border-line bg-surface p-[30px]"
                            >
                                <span className="mb-[18px] flex h-12 w-12 items-center justify-center rounded-[13px] border border-line bg-white text-ventix">
                                    <item.icon className="h-6 w-6" />
                                </span>
                                <h3 className="mb-2 text-[18px] font-bold tracking-[-0.02em] text-text">
                                    {item.title}
                                </h3>
                                <p className="text-[14.5px] leading-[1.6] text-ink2-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA / planes */}
            <section
                id="planes"
                className="relative overflow-hidden bg-ink text-white"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(30,155,232,.24), transparent 62%)",
                    }}
                />
                <div className="relative mx-auto max-w-[1280px] px-4 py-14 md:py-20 text-center sm:px-6 lg:px-8">
                    <Image
                        src="/images/ventix/logo/logo-text-on-dark.png"
                        width={176}
                        height={44}
                        alt="Ventix"
                        className="mx-auto mb-7 h-11 w-auto"
                    />
                    <h2 className="mb-3.5 text-[28px] font-bold tracking-[-0.03em] text-white md:text-[40px]">
                        Empieza con Ventix hoy
                    </h2>
                    <p className="mx-auto mb-8 max-w-[520px] text-[17px] leading-[1.6] text-ink2-300 md:text-[18px]">
                        Crea tu cuenta gratis y digitaliza tu negocio en minutos. Cuando crezcas,
                        escalas.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3.5">
                        <Button variant="ventix" size="lg" href={VENTIX_SIGNUP_URL}>
                            Crear cuenta gratis
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            href="/contacto"
                            className="border-white/20 bg-white/[0.08] text-white hover:border-white/40 hover:bg-white/[0.14]"
                        >
                            Hablar con ventas
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
