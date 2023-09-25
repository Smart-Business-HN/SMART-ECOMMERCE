import Image from 'next/image'
import React from 'react'
import { SmartBusinessLogo } from '../../../public/assets/images'

const  AboutUs : React.FC = () => (
    <div className='mx-auto p-10 bg-green-50 max-w-8xl'>
        <div className='container grid grid-cols-1 md:grid-cols-2 gap-8 bg-white mx-auto'>
            <Image className='col-span-1 w-full mx-auto' src={SmartBusinessLogo} alt='Smart Business Logotipo'/>
            <div className='col-span-1'>
                <h2 className='text-gray-600 font-semibold text-2xl text-center sm:text-left'>Vision</h2>
                <p className='text-gray-500 font-normal text-sm mt-2 text-center sm:text-left'>Ser reconocidos como líderes en soluciones tecnológicas integrales, impulsando la innovación y la eficiencia en el mundo digital. Nuestra visión es transformar la forma en que las empresas y las comunidades aprovechan la tecnología para mejorar la seguridad, la conectividad y la productividad.</p>
                <h2 className='text-gray-600 font-semibold text-2xl mt-4 text-center sm:text-left'>Mision</h2>
                <p className='text-gray-500 font-normal text-sm mt-2 text-center sm:text-left'>Nuestra misión es proporcionar a nuestros clientes las herramientas y soluciones tecnológicas necesarias para prosperar en un entorno digital en constante evolución. A través de la venta de hardware informático de alta calidad, como sistemas CCTV, equipos WISP y cableado estructurado, así como nuestros servicios de desarrollo de software personalizados.</p>
            </div>
        </div>
        <div className='container mx-auto mt-5'>
            <h3 className='text-center font-bold text-2xl text-gray-600 my-5'>Nuestros Compromisos</h3>
            <div className='container grid gap-5 justify-items-center items-center grid-cols-2'>
                <div className='col-span-1'>
                    <p>Mejorar la Seguridad:</p>
                    <p>Proporcionar sistemas de vigilancia de vanguardia y soluciones de seguridad que protejan a las empresas y las comunidades, garantizando un entorno más seguro para todos.</p>
                </div>
                <div className='col-span-1'>
                {/* <Image className='col-span-1 w-full mx-auto rounded-xl rotate-180 ' src={PTZCamera} alt='Smart Business Logotipo'/> */}

                </div>
            </div>
        </div>
    </div>
  )


export default AboutUs