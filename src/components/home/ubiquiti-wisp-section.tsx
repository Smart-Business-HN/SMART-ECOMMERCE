import Image from 'next/image'
import React from 'react'

export function UbiquitiWispSection() {
  return (
    <div className='w-full mx-auto container mt-5 relative'>
            <video className='w-full rounded-xl' autoPlay muted loop>
                <source src="/assets/videos/wired.mp4" type="video/mp4" />
            </video>
            <div className='absolute left-10 p-10 top-10 w-[400px] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 '>
                <p className=' text-xl font-semibold text-gray-200'>Tenemos todo para tu proyecto WISP</p>
                <p className='text-gray-300 '>
                    Brindale lo mejor a tus clientes y evita dolores de cabeza en tu servicio.
                    
                </p>
                <ol className='text-sm text-gray-300'>
                        <li>-LiteBeams</li>
                        <li>-PowerBeams</li>
                        <li>-Protectores</li>
                    </ol>
            </div>
            <div className='absolute right-10 p-2 bottom-10  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 flex gap-2'>
                <Image src="/assets/images/corporate/unifi-icon-smart-business.png" width={50} height={50} alt="unifi icon"/>
                <Image src="/assets/images/corporate/smart_business_logo_white_letters.png" width={170} height={50} alt="unifi icon"/>
            </div>
        </div>
  )
}