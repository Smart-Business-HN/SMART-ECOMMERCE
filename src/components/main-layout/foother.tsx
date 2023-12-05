import React from 'react'
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
            <div className='container py-4 max-w-7xl 2xl:max-w-screen-xl mx-auto'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-12 md:col-span-3 items-center justify-center md:items-start flex-col flex'>
                        <Image src='/assets/images/corporate/logo-smart-business.png' width={250} height={100} alt='Smart Business Logo' />
                    </div>
                    <div className='col-span-12 md:col-span-5 w-full'>
                        <div className='grid sm:grid-cols-2 gap-4'>
                            <div className='py-15 ml-10 md:ml-0 mt-4 md:mt-0 grow'>
                                <h6 className='text-gray-500 font-bold text-md text-ellipsis'>Contactanos</h6>
                                <p className='text-gray-400 pt-1 text-md md:text-xs'><strong className='text-gray-500'>E-mail:</strong></p>
                                <p className='text-gray-400 pt-1 text-md md:text-xs'>ventas@smartbusiness.site</p>
                                <p className='text-gray-400 pt-1 text-md md:text-xs'><strong className='text-gray-500'>Telefono:</strong></p>
                                <p className='text-gray-400 pt-1 text-md md:text-xs'>(+504) 2445-1515 / (+504) 8818-7765</p>
                                <p className='text-gray-400 pt-1 text-md md:text-xs'><strong className='text-gray-500'>Horario:</strong></p>
                                <p className='text-gray-400 pt-1 text-md md:text-xs'>Lunes a Viernes / 8:00 AM a 5:00 PM</p>
                            </div>
                            <div className='py-15 ml-10 md:ml-0 mt-4 md:mt-0 grow'>
                                <h6 className='text-gray-500 font-bold text-md md:text-md'>Compañia</h6>
                                <Link href='/about-us'><p className='pt-1 text-md md:text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Historia</p></Link>
                                <p className='pt-1 text-md md:text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Nuestras Marcas</p>
                                <p className='pt-1 text-md md:text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Oportunidad de empleo</p>
                                <Link href='/contact'><p className='pt-1 text-md md:text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Contacto</p></Link>
                                <Link href='/terms-and-conditions'><p className='pt-1 text-md md:text-xs text-gray-400 hover:cursor-pointer hover:text-blue-500'>Terminos y Condiciones</p></Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-4 mt-4 md:mt-0'>
                        <form className='mx-10'>
                            <h6 className='text-gray-500 font-bold text-md md:text-md'>Enterate de nuestras noticias</h6>
                            <div className=' flex-col gap-4'>
                                <div className='text-gray-400 pt-1 text-md md:text-xs'>Correo:</div>
                                <input className='w-full rounded-md border p-2' id='email' type='text' autoComplete='true' />
                                <div className=' mt-2 flex justify-center sm:justify-start'>
                                    <button className='bg-blue-500 px-4 py-2 text-white rounded-md font-medium'>Suscribirme</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='border-t-2 mt-5 md:mx-10 lg:mx-0 pt-2 md:flex justify-between'>
                    <div>
                        <p className='text-gray-400 text-sm text-center md:text-left '>© {year} Smart Business S. de R.L. Todos los derechos reservados.</p>
                    </div>
                    <div className='flex md:flex-row-reverse justify-center gap-4 my-4 md:my-0'>
                        <div>
                            <a href={socialMedia.instagram}>
                            <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.9" fillRule="evenodd" clipRule="evenodd" d="M4.52032 14H2.05764V7.63755H0V5.16979H2.05764V3.33996C2.05764 2.28795 2.34117 1.47935 2.90823 0.914173C3.4753 0.348995 4.21248 0.0664062 5.11979 0.0664062C5.56264 0.0664062 5.95418 0.0803958 6.29442 0.108375C6.63466 0.136354 6.85878 0.155939 6.9668 0.167131V2.38308H5.70305C5.2062 2.38308 4.88486 2.49499 4.73904 2.71883C4.59323 2.94266 4.52032 3.23364 4.52032 3.59177V5.16979H6.88579L6.57795 7.63755H4.52032V14Z" fill="#525461"/>
</svg>

                            </a>
                        </div>
                        <div>
                            <a href={socialMedia.instagram}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M9.82761 3.20685C9.82761 3.68358 10.2141 4.07001 10.6907 4.07001C11.1675 4.07001 11.5539 3.68358 11.5539 3.20685C11.5539 2.73015 11.1675 2.34372 10.6907 2.34372C10.2141 2.34372 9.82761 2.73015 9.82761 3.20685ZM9.50522 9.6269C10.1903 8.93594 10.5795 8.01214 10.6011 7.02566C10.6236 5.99516 10.3065 5.09921 9.68399 4.43469C9.02718 3.73348 8.07091 3.34507 6.91858 3.31149C5.95527 3.28335 5.03714 3.64392 4.33416 4.32671C3.61311 5.02702 3.19958 6.00578 3.19958 7.01204C3.19958 9.05267 4.85977 10.7129 6.9004 10.7129C7.88577 10.7129 8.81085 10.3272 9.50522 9.6269ZM4.10217 0.0664062H9.69866C11.8928 0.0664062 13.6778 1.85142 13.6778 4.04553V10.0173C13.6778 12.2114 11.8928 13.9964 9.69866 13.9964H4.10217C1.90806 13.9964 0.123047 12.2114 0.123047 10.0173V4.04553C0.123047 1.85142 1.90806 0.0664062 4.10217 0.0664062ZM6.81501 4.55701C6.83736 4.55701 6.85979 4.55736 6.88223 4.558C7.69511 4.58171 8.34921 4.83387 8.77388 5.28723C9.16887 5.7089 9.36961 6.30064 9.35433 6.99845C9.3241 8.38207 8.2462 9.46587 6.90041 9.46587C5.54737 9.46587 4.44658 8.3651 4.44658 7.01206C4.44658 6.34086 4.7223 5.68815 5.20298 5.22129C5.64558 4.79138 6.21573 4.55701 6.81501 4.55701Z" fill="#626470"/>
</svg>

                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;