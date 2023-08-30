import Link from 'next/link'
import React from 'react'

export default function HeroComponent() {
  return (
    <div className="bg-cover mx-4 sm:mx-auto  container my-4 h-96 border-2 rounded-3xl hover:border-blue-400 border-[#F6F6F8] " style={{backgroundImage: `url('/assets/images/corporate/landing_smart_business_background.png')`,}}>
          <div className='grid h-full grid-cols-2'>
            <div className='col-span-2 md:col-span-1 h-full align-middle py-28 justify-center  text-center'>
                  <h4 className='text-3xl font-semibold text-black text-opacity-70'>Somos tus aliados<br></br> Tecnologicos</h4>
                  <div className='flex justify-center'>
                  <Link  href="/contact"><div className='p-2 rounded-xl text-blue-600 font-semibold'>Contactanos</div></Link>
                  </div>
            </div>
          </div>
    </div>
  );
}
