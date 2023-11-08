import Image from 'next/image'
import React from 'react'
import { SmartBusinessLogo } from '../../../public/assets/images'

const AboutUs: React.FC = () => (
    <div className='container gap-2 p-10 bg-gray-50'>
        <div className='flex justify-center my-10'>
            <h1 className='font-bold text-3xl'>Quienes son Smart Business</h1>
        </div>
        <div className='flex justify-center gap-4'>
            <Image alt="copan ruinas" className='rounded-md' src='/assets/images/products/copan-smart-business.jpg' height={500} width={500} />
            <div className='p-4'>
                <p>Somos una empresa comprometida con el desarrollo de pequeñas y medianas pymes que quieren dar su salto al mundo digital facilitando todo nuestro arsenal de herramientas y conocimientos para poder brindar un producto optimo para ayudar a salir a la luz los sueños de nuestros clientes. Entre nuestros principales servicios estan el provisionamiento de productos de primera calidad.</p>
                <p>Tenemos como meta ser el proveedor principal de todo emprendedor que desee salir adelante con un proyecto personal.</p>
            </div>
        </div>
        <div className='pt-10'>
            <h2 className='text-center text-2xl font-semibold'>Nuestros Servicios</h2>
            <div className='flex gap-5'>
                <div className='border border-gray-700 p-4 rounded-md'>
                    <p>CCTV</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
)


export default AboutUs;