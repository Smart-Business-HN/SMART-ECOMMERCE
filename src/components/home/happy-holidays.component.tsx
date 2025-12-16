import Image from 'next/image'
export default function HappyHolidaysComponent() {
    return (
        <div className='w-full mx-auto container my-2 md:my-5 relative p-4 md:p-0'>
        <video className='w-full rounded-md' autoPlay muted loop>
            <source src="/videos/feliz-navidad-big.mp4" type="video/mp4" />
        </video>
        <div className='absolute right-8 p-2 top-8 rounded-md gap-2'>
            {/* <Image src="/images/corporate/unifi-icon-smart-business.png" width={50} height={50} alt="unifi icon"/> */}
            <Image src="/images/corporate/smart_business_logo_white_letters.png" className='w-20 md:w-[170px] ' width={170} height={50} alt="unifi icon"/>
        </div>
        <div className='absolute top-16 right-8 p-2 md:top-28 rounded-md gap-2'>
            {/* <Image src="/images/corporate/unifi-icon-smart-business.png" width={50} height={50} alt="unifi icon"/> */}
           <p className='text-2xl md:text-5xl lg:text-[96px]  text-white font-bold text-right leading-none'>FELIZ <br/> NAVIDAD</p>
           <p className="hidden lg:block mt-10 text-white font-bold  text-md">Descuentos exclusivos y Envios Gratuitos todo el mes</p>
        </div>
    </div>
    );

}