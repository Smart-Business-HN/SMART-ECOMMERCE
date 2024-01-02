import Image from "next/image";

export default function CorporateResume() {
    return (
        <div className="container mx-auto bg-gray-100 my-5 p-10 rounded-md">
            <div className="grid grid-cols-2">
                <div className="flex flex-col justify-center">
                    <h3 className=" text-2xl text-gray-700 font-semibold animate-fade-left animate-duration-300">El mejor proveedor IT</h3>
                    <p className="mt-5 animate-fade-left animate-delay-300 animate-duration-300">Sabemos que en un mercado saturado necesitas a alguien de confianza<strong className="text-blue-400">.</strong></p>
                    <p className="mt-2 animate-fade-left animate-delay-[600ms] animate-duration-300">Somos tu mejor opcion para <strong className="text-blue-500 font-normal">upgrades</strong> multi-disciplinarios de tu empresa, pues te podemos ayudar con:</p>
                    <div className="mt-5 gap-4 ml-5">
                        <li className="animate-fade-left animate-duration-300 animate-delay-[900ms]">Actualizacion de equipo ofimatico para tu call center.</li>
                        <li className="animate-fade-left animate-duration-300 animate-delay-[1200ms]">Distribucion de produtos de fibra optica.</li>
                        <li className="animate-fade-left animate-duration-300 animate-delay-[1500ms]">Actualizaciones o expanciones de redes.</li>
                        <li className="animate-fade-left animate-duration-300 animate-delay-[1800ms]">Instalacion y venta de Camaras CCTV.</li>
                        <li className="animate-fade-left animate-duration-300 animate-delay-[2100ms]">Sistems POS para tu negocio.</li>
                        <li className="animate-fade-left animate-duration-300 animate-delay-[2400ms]">Backups de Energia via UPS</li>
                        <li className="animate-fade-left animate-duration-300 animate-delay-[2700ms]">Productos de Biometria.</li>
                        <li className="animate-fade-left animate-duration-300 animate-delay-[3000ms]">Productos para WISP.</li>
                        <li className="animate-fade-left animate-duration-300 animate-delay-[3300ms]">NAS Servers.</li>
                    </div>
                </div>
                <div>
                    <Image className="mx-auto animate-fade-down" src='/assets/images/backgrounds/synology-4bays.png' width={600} height={600} alt="ubiquiti drawer" />
                </div>
            </div>
        </div>
    )
}