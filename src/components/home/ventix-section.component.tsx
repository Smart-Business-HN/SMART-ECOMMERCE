// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/utils/MTailwind";
import {
    ShoppingCartIcon,
    DocumentTextIcon,
    CubeIcon,
    UsersIcon,
    ArrowTopRightOnSquareIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function VentixSectionComponent() {
    const features = [
        { icon: ShoppingCartIcon, title: "Punto de Venta", desc: "POS rápido y simple, listo en minutos." },
        { icon: DocumentTextIcon, title: "Facturación CAI/SAR", desc: "Cumple con la normativa hondureña sin complicaciones." },
        { icon: CubeIcon, title: "Inventario", desc: "Control multi-bodega y multi-sucursal en tiempo real." },
        { icon: UsersIcon, title: "CRM y Reportes", desc: "Conoce a tus clientes y mide tu negocio." },
    ];

    return (
        <div className="container mx-auto px-4 md:px-0 mt-10 mb-5">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 shadow-xl">
                {/* Decorative background */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>

                <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                    {/* Left: copy + CTAs */}
                    <div className="text-white animate-fade-right animate-ease-in">
                        <div className="mb-5">
                            <Image
                                src="/images/ventix/logo/logo-text-on-dark.png"
                                width={180}
                                height={50}
                                alt="Logo de Ventix - ERP y POS en la nube"
                                className="h-12 w-auto"
                            />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                            Lleva tu negocio al siguiente nivel con Ventix
                        </h2>
                        <p className="text-blue-100 text-base md:text-lg mb-6">
                            Tu negocio organizado, simple y en control. POS, facturación CAI/SAR,
                            inventario y CRM en un solo lugar — desde Smart Business.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="bg-white/15 backdrop-blur-sm rounded-md p-1.5 flex-shrink-0">
                                        <feature.icon className="h-4 w-4 text-blue-100" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white leading-tight">{feature.title}</p>
                                        <p className="text-xs text-blue-100 leading-tight">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
                            <Button size="md" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg">
                                <Link href="/ventix" className="flex items-center gap-2">
                                    <span>Conocer más</span>
                                    <ArrowRightIcon className="h-4 w-4" />
                                </Link>
                            </Button>
                            <a
                                href="https://ventix.smartbusiness.site/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-sm font-semibold flex items-center gap-1.5 hover:text-blue-200 transition-colors"
                            >
                                <span>Visitar sitio oficial</span>
                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Right: dashboard screenshot */}
                    <div className="relative animate-fade-left animate-ease-in flex justify-center md:justify-end">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute inset-0 bg-white/10 rounded-xl blur-2xl"></div>
                            <Image
                                src="/images/ventix/screenshots/Dashboard.png"
                                width={900}
                                height={560}
                                alt="Captura del dashboard de Ventix mostrando reportes y métricas del negocio"
                                className="relative rounded-xl shadow-2xl ring-1 ring-white/20 w-full h-auto"
                                priority={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
