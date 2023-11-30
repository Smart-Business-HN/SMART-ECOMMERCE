import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PhoneArrowUpRightIcon } from '@heroicons/react/24/outline'

function Services() {
  return (
    <>
      <div className='container mx-auto'>
        <div className='grid grid-cols-2 gap-4 my-5'>
          <div className='p-24 bg-gray-200'>
            {/* hacer algo en algun momento de la vida */}
          </div>
          <div className='py-24'>
            <h1 className='font-bold text-4xl'>Escoge a la <strong className='text-blue-500'>MEJOR</strong> <br /> empresa de Soluciones Informaticas<strong className='text-blue-500'>.</strong></h1>
            <div className='border-l-2 border-blue-500 p-2 my-5 text-xl'>
              <p>No queremos venderte productos, no queremos venderte una instalacion.</p>
              <p>Queremos ser quien le de <strong className='font-bold text-blue-500'>solucion</strong> a tus problemas</p>
            </div>
            <div className='flex border-t'></div>
            <div className='grid grid-cols-2 px-10 py-5'>
              <div className='flex gap-4 items-center'>
                <div className='p-10 bg-gray-300 rounded'></div>
                <h3>Expertos Realizando</h3>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='p-10 bg-gray-300 rounded'></div>
                <h3>Expertos Proveyendo</h3>
              </div>
            </div>
            <div className='flex border-t'></div>
            <div className='flex mt-5 gap-10'>
              <div className='flex justify-center items-center'>
                <Link className='bg-blue-500 text-white rounded-md px-4 py-2 font-semibold text-lg' href="/contact">Contactar</Link>
              </div>
              <div className='flex justify-center items-center gap-4'>
                <div className=' rounded-full bg-gray-400 p-3'>
                  <PhoneArrowUpRightIcon className='text-white' height={30} width={30} />
                </div>
                <div>
                  <h6 className='text-gray-900 font-semibold'>Llama por ayuda</h6>
                  <Link href="tel:+50488187765">+504 8818-7765</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10 bg-gray-50 py-10 object-fit' style={{ backgroundImage: `url('/assets/images/backgrounds/pattern-9.png')`, }}>
        <h2 className='font-bold text-center text-3xl'>Nuestros Servicios</h2>
        <div className='pt-1 flex border-t-2 border-blue-400 w-[5%] ml-[50%] -translate-x-[50%]'></div>
        <p className='text-center text-2xl'>Tenemos una variedad de servicios a tu disposicion</p>
        <div className='grid grid-cols-5 gap-5 mt-28 px-4 container mx-auto'>
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-sky-500 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='paginas web' className='-rotate-45 brightness-0 invert' src="/assets/images/icons/web-pages.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>Desarrollo de Sitios Web</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sue;os, hoy en dia un negocio sin sitio web es incenvible.
            </p>
          </div>
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-sky-500 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='paginas web' className='-rotate-45 brightness-0 invert' src="/assets/images/icons/project-management.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>UI/UX Design</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sue;os, hoy en dia un negocio sin sitio web es incenvible.
            </p>
          </div>
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-sky-500 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='paginas web' className='-rotate-45 brightness-0 invert' src="/assets/images/icons/cabling.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>Cableado Estructurado</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sue;os, hoy en dia un negocio sin sitio web es incenvible.
            </p>
          </div>
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-sky-500 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='paginas web' className='-rotate-45 brightness-0 invert' src="/assets/images/icons/voip.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>Telefonia IP</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sue;os, hoy en dia un negocio sin sitio web es incenvible.
            </p>
          </div>
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-sky-500 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='paginas web' className='-rotate-45 brightness-0 invert' src="/assets/images/icons/certificate.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>Sistemas POS</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sue;os, hoy en dia un negocio sin sitio web es incenvible.
            </p>
          </div>
        </div>
      </div>
      <div className='mt-10 bg-gray-50 py-10 object-contain' style={{ backgroundImage: `url('/assets/images/backgrounds/pattern-waves.png')`, }}>
        <h2 className='font-bold text-center text-3xl'>Si quieres triunfar tienes que ser<br /> <strong className='text-blue-500'>SMART</strong></h2>
        <div className='pt-1 flex border-t-2 border-blue-400 w-[5%] ml-[50%] -translate-x-[50%]'></div>
        <div className='container mx-auto'>
          <div className='grid grid-cols-2 mt-10 items-start justify-start'>
            <div className=''>
              <h4 className='flex text-xl font-semibold text-gray-900'>Cuida a los tuyos</h4>
              <div className='border-t-2 border-blue-500 w-[5%] mb-5'></div>
              <p>Sabemos que eres responsable con los tuyos y que quieres lo mejor para ellos</p>
              <p>Por eso te brindamos:</p>
              <ul className=' text-gray-700'>
                <li>-Instalacion de sistemas de circuito cerrado CCTV.</li>
                <li>-Instalacion de sistemas de control de acceso biometrico.</li>
                <li>-Planificacion de sistemas de control termico para plantas quimicas.</li>
              </ul>
              <p className='font-bold mt-5 text-gray-700'>Con la mejor tecnologia al mejor precio</p>
              <div className='flex p-4'>
                <div>
                  <Image src='/assets/images/corporate/hikvision_logo_smart_business.png' width={200} height={100} alt='hikvision' />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <Image className='rounded-md shadow-sm' src='/assets/images/corporate/cctv-room.jpg' width={600} height={400} alt='cuerto cctv' />
            </div>
          </div>
          <div className='grid grid-cols-2 mt-10 items-start justify-start'>
            <video className='w-full rounded-xl mb-2 md:mb-0' autoPlay muted loop>
                    <source src='/assets/videos/fast-network.mp4' type="video/mp4" />
                </video>
            <div className=''>
              <div className=''>
                <h4 className='flex text-xl font-semibold text-gray-900'>Tu red tiene que ser la mejor</h4>
                <div className='border-t-2 border-blue-500 w-[5%] mb-5'></div>
                <p>No dejes que una mala red atrase tu negocio</p>
                <p>Lo que podemos hacer por ti:</p>
                <ul className=' text-gray-700'>
                  <li>-Certificacion de red.</li>
                  <li>-Instalacion de puntos de red empresarial.</li>
                  <li>-Reestructuracion de redes.</li>
                </ul>
                <p className='font-bold mt-5 text-gray-700'>Con la mejor tecnologia al mejor precio</p>
                <div className='flex p-4'>
                  <div>
                    <Image src='/assets/images/corporate/hikvision_logo_smart_business.png' width={200} height={100} alt='hikvision' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services