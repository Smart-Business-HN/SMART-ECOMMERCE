import React from 'react'
import { IconFacebook, IconInstagram, SmartBusinessLogo } from '../../public/assets/images';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    let year = new Date().getFullYear();
    let socialMedia = {
        facebook: 'mierda',
        instagram: ''
    };
  return (
    <div className="border-t py-5  shadow-sm shadow-gray-400 w-full gap-4 justify-between bg-[#F6F6F8]">
         <div className='container py-4 max-w-7xl mx-auto'>
            <div className='flex justify-between gap-10'>
                <div className='grid items-center'>
                    <Image  src={SmartBusinessLogo} width={250}  alt='Smart Business Logo'/>
                </div>
                <div className=' py-15 ml-10'>
                    <h6 className='text-gray-500 font-bold text-md text-ellipsis'>Contactanos</h6>
                    <p className='text-gray-400 pt-1 text-xs'><strong className='text-gray-500'>E-mail:</strong></p>
                    <p className='text-gray-400 pt-1 text-xs'>ventas@smartbusiness.site</p>
                    <p className='text-gray-400 pt-1 text-xs'><strong className='text-gray-500'>Telefono:</strong></p>
                    <p className='text-gray-400 pt-1 text-xs'>(+504) 2445-1515 / (+504) 8818-7765</p>
                    <p className='text-gray-400 pt-1 text-xs'><strong className='text-gray-500'>Horario:</strong></p>
                    <p className='text-gray-400 pt-1 text-xs'>Lunes a Viernes / 8:00 AM a 5:00 PM</p>
                </div>
                <div className='py-15'>
                    <h6 className='text-gray-500 font-bold text-md'>Compañia</h6>
                    <Link href='/about-us'><p className='pt-1 text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Historia</p></Link>
                    <p className='pt-1 text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Nuestras Marcas</p>
                    <p className='pt-1 text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Oportunidad de empleo</p>
                    <Link href='/contact'><p className='pt-1 text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Contacto</p></Link>
                    <Link href='/terms-and-conditions'><p className='pt-1 text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Terminos y Condiciones</p></Link>
                </div>
                <div className='py-4 grow bg-white'>
                    <a href='https://checkout.baccredomatic.com/ZC5lZTliNTgyNDc5OTlmNjJiNWQzMzAxNjkzNjI5OTY2'>Boton de pago</a>
                </div>
            </div>
            
            <div className='border-t-2 mt-5 pt-2 flex justify-between'>
                <div>
                    <p className='text-gray-400 text-sm'>© {year} Smart Business S. de R.L. Todos los derechos reservados.</p>
                </div>
                <div className='flex flex-row-reverse gap-4'>
                    <div>
                        <a href={socialMedia.instagram}>
                            <Image src={IconInstagram} width={20} alt='instragram' />
                        </a>
                    </div>
                    <div>
                        <a href={socialMedia.instagram}>
                            <Image src={IconFacebook} height={20} alt='facebook' />
                        </a>
                    </div>
                </div>
            </div>
         </div>
    </div>
  )
}
export default Footer;