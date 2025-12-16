import Image from 'next/image';
export default function CertificatesComponent() {
    return (
    <div className="container w-full rounded-md px-2 md:px-0 mx-auto mt-5 border border-gray-200 py-5">
        <div className="font-bold text-center text-gray-700 text-2xl md:text-3xl">
                Distribuidores Oficiales de Marcas Insignia
        </div>
        <div className="flex justify-center">
            <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-10 rounded-md mt-5 items-center">
            <div>
                <Image src="/images/corporate/unifi-icon-smart-business.png" width={80} height={80} alt="unifi logo"/>
            </div>
            <div>
                <Image src="/images/brands/Hikvision-Technology-Partner.webp" width={150} height={100} alt="hikvision partner logo"/>
            </div>
            <div>
                <Image src="/images/brands/panduit-icon-smart-business.svg" width={150} height={100} alt="panduit logo"/>
            </div>
            <div>
                <Image src="/images/corporate/mikrotik-logo.png" width={230} height={100} alt="mikrotik logo"/>
            </div>
            <div>
                <Image src="/images/brands/apc-partnert-smart-business.png" width={130} height={100} alt="apc partner logo"/>
            </div>
        </div>
    </div>
    )
}