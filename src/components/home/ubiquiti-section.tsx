import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';

export function UbiquitiSection() {
    return (
        <Fragment>
            <div className='w-full mx-auto container relative'>
                <video className='w-full rounded-xl' autoPlay muted loop>
                    <source src="/assets/videos/u6-pro-smart-business.mp4" type="video/mp4" />
                </video>
                <div className='absolute left-10 p-10 top-10 w-[400px] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 '>
                    <p className=' text-xl font-semibold text-gray-200'>Todo lo necesario para redes empresariales de primer nivel</p>
                    <p className='text-gray-300 '>
                        Contamos con lo necesario para una red empresarial exigente.
                    </p>
                    <ol className='text-sm text-gray-300'>
                        <li>-Switches PoE</li>
                        <li>-Access Points</li>
                        <li>-Cable UTP Certificados</li>
                    </ol>
                </div>
                <div className='absolute right-10 p-2 bottom-10  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 flex gap-2'>
                    <Image src="/assets/images/corporate/unifi-icon-smart-business.png" width={50} height={50} alt="unifi icon" />
                    <Image src="/assets/images/corporate/smart_business_logo_white_letters.png" width={170} height={50} alt="unifi icon" />
                </div>
            </div>
            <div className='w-full mx-auto container mb-5 mt-10'>
                <div className='mb-5'>
                    <h3 className='text-3xl font-semibold text-gray-900'>WiFi líder en la industria</h3>
                </div>
                <div className='flex gap-5 justify-between'>
                    <div className='grow bg-[#F9F9F9] p-7 rounded-md'>
                        <h5 className='font-semibold text-gray-700 mb-2'>El original</h5>
                        <p className='font-bold text-gray-950 text-3xl'>Buque insignia</p>
                        <p className='font-semibold text-gray-600'>Wifi Perfecto</p>
                        <Link className='flex gap-2 items-center mb-5 text-blue-600 hover:text-blue-500' href=''>
                            <p className=' font-semibold'>Comprar</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                        <div className='flex mt-15 justify-center'>
                            <Image src="/assets/images/products/U6-Pro-smart-business.png" width={270} height={270} alt="unifi icon" />
                        </div>
                    </div>
                    <div className='grow bg-[#F9F9F9] p-7 rounded-md'>
                        <h5 className='font-semibold text-gray-700 mb-2'>Indoor / Outdoor</h5>
                        <p className='font-bold text-gray-950 text-3xl'>Mesh</p>
                        <p className='font-semibold text-gray-600'>Plug-and-play PoE mesh</p>
                        <Link className='flex gap-2 items-center mb-5 text-blue-600 hover:text-blue-500' href=''>
                            <p className=' font-semibold'>Comprar</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                        <div className='flex mt-15 justify-center'>
                            <Image src="/assets/images/products/U6-Mesh-smart-business.png" width={270} height={270} alt="unifi icon" />
                        </div>
                    </div>
                    <div className='grow bg-[#F9F9F9] p-7 rounded-md'>
                        <h5 className='font-semibold text-gray-700 mb-2'>Compacto</h5>
                        <p className='font-bold text-gray-950 text-3xl'>In-Wall</p>
                        <p className='font-semibold text-gray-600'>Amplíe la cobertura WiFi sin problemas</p>
                        <Link className='flex gap-2 items-center mb-5 text-blue-600 hover:text-blue-500' href=''>
                            <p className=' font-semibold'>Comprar</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                        <div className='flex mt-15 justify-center'>
                            <Image src="/assets/images/products/U6-IW-smart-business.png" width={270} height={270} alt="unifi icon" />
                        </div>
                    </div>
                </div>
                <div className='container flex mt-5 items-center rounded-md bg-[#F9F9F9] p-5'>
                    <div className='grow'>
                        <Image className='rounded-md' src='/assets/images/products/project-ubiquiti.png' width={600} height={600} alt='Proyectos cableado' />
                    </div>
                    <div className='p-14 grow flex-col justify-center items-center'>
                        <div className='text-center'>
                            <p className='text-center font-semibold text-2xl'>¿Tienes un proyecto en mente?</p>
                            <p className='text-center'>Si tienes un proyecto de cableado estructurado podemos ayudarte en todo lo que necesites y nos ajustamos a tu presupuesto.</p>
                            <p className='font-semibold'>Contamos con:</p>
                            <ol className=' justify-center items-center'>
                                <li className='text-sm text-center flex justify-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    <p>Switches</p>
                                </li>
                                <li className='text-sm text-center flex justify-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    <p>Access Point</p>
                                </li>
                                <li className='text-sm text-center flex justify-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    <p>Routers</p>
                                </li>
                                <li className='text-sm text-center flex justify-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    <p>Cable UTP 100% cobre</p>
                                </li>
                                <li className='text-sm text-center flex justify-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    <p>Toda clase de accesorios</p>
                                </li>
                            </ol>
                        </div>
                        <div className='flex items-center mt-8 justify-center'>
                            <Link href='/contact' className='p-2 bg-blue-500 text-white rounded-md'>Contactar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}