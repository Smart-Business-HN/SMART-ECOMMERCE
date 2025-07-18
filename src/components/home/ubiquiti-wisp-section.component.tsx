import Image from 'next/image'

export default function UbiquitiWispSectionComponent() {
  return (
    <div className='w-full mx-auto container mt-5 relative p-4 md:p-0'>
            <video className='w-full rounded-xl' autoPlay muted loop>
                <source src="/videos/wired.mp4" type="video/mp4" />
            </video>
            <div className='mt-4 md:mt-0 md:absolute left-10 p-10 top-10 w-full md:w-[400px] bg-gray-900 md:bg-gray-600 rounded-md md:bg-clip-padding md:backdrop-filter md:backdrop-blur-md md:bg-opacity-30 '>
                <p className=' text-xl font-semibold text-gray-200'>Tenemos todo para tu proyecto WISP</p>
                <p className='text-gray-300 '>
                    Brindale lo mejor a tus clientes y evita dolores de cabeza en tu servicio.
                    
                </p>
                <ol className='text-sm text-gray-300'>
                        <li>-LiteBeams</li>
                        <li>-PowerBeams</li>
                        <li>-Protectores</li>
                </ol>
                <div className='md:hidden mt-4 right-10 p-2 bottom-10  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 flex gap-2'>
                    <Image src="/images/corporate/unifi-icon-smart-business.png" width={50} height={50} alt="unifi icon"/>
                    <Image src="/images/corporate/smart_business_logo_white_letters.png" width={170} height={50} alt="unifi icon"/>
                </div>
                
            </div>
            <div className='hidden absolute right-10 p-2 bottom-10  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 md:flex gap-2'>
                <Image src="/images/corporate/unifi-icon-smart-business.png" width={50} height={50} alt="unifi icon"/>
                <Image src="/images/corporate/smart_business_logo_white_letters.png" width={170} height={50} alt="unifi icon"/>
            </div>
        </div>
  )
}