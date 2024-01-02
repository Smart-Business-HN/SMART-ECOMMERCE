import React from 'react'
import Image from 'next/image'

const AboutUs: React.FC = () => (
    <div className='container mx-auto max-w-7xl my-5 scroll-smooth'>
        <div className='grid md:grid-cols-2 gap-4 bg-gray-200 rounded-md'>
            <div className='relative'>
                <Image height={500} width={600} className='opacity-80' alt='buildings backgrounds smart business' src='/assets/images/backgrounds/background-buildings.png' />
                <div className='absolute top-0 bottom-0 flex w-full justify-center items-center'>
                    <Image src='/assets/images/corporate/logo-smart-business.png' width={350} height={250} alt='logo smart business' />
                </div>
            </div>
            <div className='flex items-center flex-col justify-center'>
                <h1 className='text-center text-gray-700 text-3xl font-bold '>Nuestra Historia</h1>
                <p className='px-5 text-center md:text-left mt-2 text-gray-600 text-[15px] font-medium '>
                    Smart Business surge como una respuesta al mercado hondureño con la intencion de brindar precios accesibles a las pequeñas empresas que estan dando su primer salto en el mundo digital. Poco a poco nos hemos convertido en proveedores de medianas y grandes empresas por la confianza que hemos generado en nuestros clientes. <br />Con mas de 15 años de experiencia en el rubro informatico Smart Business es una empresa cuya unica razon de existir es brindar a nuestros clientes el mejor producto para satisfacer sus necesidades ya sea a integradores o clientes finales.
                </p>
            </div>
        </div>
        <div className='md:px-4  px-5 grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
            <div className='hover:shadow-md border mx-auto h-full mt-0 bg-gradient-to-br from-blue-600 via-sky-600 to-sky-400 rounded-md p-[2px] max-w-md'>
                <div className='flex  flex-col py-2 h-full justify-center w-full items-center bg-white rounded-md'>
                    <h3 className='text-gray-700 text-center font-bold text-xl'>Misión</h3>
                    <p className='text-center px-5 mt-2 text-gray-500 text-[14px] font-semibold'>
                        Ser la mayor empresa distribuidora de equipo informatico para emprendedores que necesitan el consejo de una empresa de confianza.
                    </p>
                </div>
            </div>
            <div className='hover:shadow-md mx-auto border grow bg-gradient-to-br from-blue-600 via-sky-600 to-sky-400 rounded-md p-[2px] max-w-md'>
                <div className='flex flex-col py-2 h-full justify-center w-full items-center bg-white rounded-md'>
                    <h3 className='text-gray-700 text-center font-bold text-xl'>Visión</h3>
                    <p className='text-center px-5 mt-2 text-gray-500 text-[14px] font-semibold'>
                        Especializamos en los pequeños y medianos empresarios porque son las personas que rara vez tienen apoyo de parte de otros, nosotros somos parte de ellos por lo tanto tenemos la obligacion humana de apoyarlos en su camino.
                    </p>
                </div>
            </div>
        </div>
        <div className='container w-full mt-24 px-5 md:px-0 mx-auto'>
            <h3 className='text-3xl font-bold text-gray-700 text-center'>Nuestros Productos</h3>
            <div className='mt-5'>
                <div className=''>
                    <h4 className='font-bold text-gray-700 text-xl'>Seguridad</h4>
                    <hr className='w-[5%] -mb-1 border-[#1C68E1] border'></hr>
                    <hr className='mt-1'></hr>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10'>
                        <div className='basis-1/4 border border-gray-300 p-5 rounded-md relative md:skew-y-6 md:-skew-x-6 md:hover:-skew-x-0 md:hover:skew-y-0 transition-all'>
                            <Image className='absolute left-0 -top-0 rounded-t-md right-0 object-cover w-full max-h-[150px]' src='/assets/images/backgrounds/public-security-smart-business.jpg' alt='Seguridad Publica' width={300} height={300} />
                            <div className='h-[150px]'></div>
                            <h5 className='text-left text-gray-700 font-bold text-md'>Seguridad Publica</h5>
                            <p className='text-left text-gray-500'>
                                Ciudades inteligentes y soluciones de tráfico inteligente para la seguridad y la administración urbana.
                            </p>
                        </div>
                        <div className='basis-1/4 border border-gray-300 p-5 rounded-md relative md:skew-y-6 md:-skew-x-6 md:hover:-skew-x-0 md:hover:skew-y-0 transition-all'>
                            <Image className='absolute left-0 -top-0 rounded-t-md right-0 object-cover w-full max-h-[150px]' src='/assets/images/backgrounds/business-smart-business.png' alt='Seguridad para empresas' width={300} height={300} />
                            <div className='h-[150px]'></div>
                            <h5 className='text-left text-gray-700 font-bold text-md'>Empresas</h5>
                            <p className='text-left text-gray-500'>
                                Soluciones inteligentes para la seguridad y las operaciones comerciales que abarcan comercio minorista, logística, energía, educación y mucho más.
                            </p>
                        </div>
                        <div className='basis-1/4 border border-gray-300 p-5 rounded-md relative md:skew-y-6 md:-skew-x-6 md:hover:-skew-x-0 md:hover:skew-y-0 transition-all'>
                            <Image className='absolute left-0 -top-0 rounded-t-md right-0 object-cover w-full max-h-[150px]' src='/assets/images/backgrounds/pymes-smart-business.png' alt='Seguridad para Pymes' width={300} height={300} />
                            <div className='h-[150px]'></div>
                            <h5 className='text-left text-gray-700 font-bold text-md'>PYMEs</h5>
                            <p className='text-left text-gray-500'>
                                Una completa gama de productos de seguridad inteligente, desde seguridad por video, control de acceso e intercomunicación, hasta alarmas y LED, por nombrar algunos.
                            </p>
                        </div>
                        <div className='basis-1/4 border border-gray-300 p-5 rounded-md relative md:skew-y-6 md:-skew-x-6 hover:-skew-x-0 md:hover:skew-y-0 transition-all'>
                            <Image className='absolute left-0 -top-0 rounded-t-md right-0 object-cover w-full max-h-[150px]' src='/assets/images/backgrounds/cliente-fina-smart-business.jpg' alt='Seguridad para clientes' width={300} height={300} />
                            <div className='h-[150px]'></div>
                            <h5 className='text-left text-gray-700 font-bold text-md'>Consumidores</h5>
                            <p className='text-left text-gray-500'>
                                Hogares inteligentes y electrónica avanzada para todos los consumidores.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-24'>
                <div className=''>
                    <h4 className='font-bold text-gray-700 text-xl'>Redes</h4>
                    <hr className='w-[5%] -mb-1 border-[#1C68E1] border'></hr>
                    <hr className='mt-1'></hr>
                    <div className='flex flex-col md:flex-row gap-10 mt-5'>
                        <div className='container mt-5 relative'>
                            <h6 className='text-left font-bold text-gray-700 mb-2 md:hidden'>Productos WISP</h6>
                            <video className='w-full rounded-md' autoPlay muted loop>
                                <source src="/assets/videos/uisp.mp4" type="video/mp4" />
                            </video>
                            <div className='hidden  absolute left-10 p-2 top-10  text-center  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 md:flex gap-2'>
                                <p className='text-white text-xl font-bold'>Productos WISP</p>
                            </div>
                            <div className='md:absolute right-10 p-2 md:bottom-10 left-10 md:text-center  md:bg-gray-600 rounded-md bg-clip-padding backdrop-filter md:backdrop-blur-md md:bg-opacity-30 flex gap-2'>
                                <p className='text-gray-700 md:text-white'>Contamos con todos los productos que necesitas para montar tu propia empresa WISP</p>
                            </div>
                        </div>
                        <div className='container mt-5 relative'>
                        <h6 className='text-left font-bold text-gray-700 mb-2 md:hidden'>Redes Corporativas</h6>
                            <video className='w-full rounded-md' autoPlay muted loop>
                                <source src="/assets/videos/networking.mp4" type="video/mp4" />
                            </video>
                            <div className='hidden md:absolute left-10 p-2 top-10  text-center  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 md:flex gap-2'>
                                <p className='text-white text-xl font-bold'>Redes Corporativas</p>
                            </div>
                            <div className='md:absolute right-10 p-2 md:bottom-10 left-10 md:text-center  md:bg-gray-600 rounded-md bg-clip-padding backdrop-filter md:backdrop-blur-md md:bg-opacity-30 flex gap-2'>
                            <p className='text-gray-700 md:text-white'>Te brindamos todo lo necesario para escalar tu red corporativa al siguiente nivel</p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-md bg-gray-100 p-5 md:p-10 mt-10'>
                        <div className='w-full grid md:grid-cols-2 gap-5'>
                            <div className='order-2 md:order-1 flex flex-col justify-center'>
                                <h4 className=' leading-none text-center text-gray-700 font-bold text-2xl'>Productos y Proyectos de <br/><strong>Cableado estructurado</strong></h4>
                                <p className='text-gray-500 mt-5 font-normal md:font-semibold text-center'>
                                    Te brindamos todo lo que necesitas para ejecutar tu proyecto de cableado estructurado a precios altamente competitivos. Y en caso de que no tengas quien lo desarrolle podemos brindarte descuentos importantes al ejecutar el proyecto por ti.
                                </p>
                                <div className='flex justify-center mt-4'>
                                <button className='rounded-md py-2 px-4 text-white bg-blue-500'>
                                    Contactar
                                </button>
                                </div>
                               
                            </div>
                            <div className='flex justify-center rounded-md'>
                                <Image className='rounded-xl' alt='cableado estructurado' src='/assets/images/backgrounds/cableado-estructurado-smart-business.jpg' width={500} height={500}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='mt-24'>
                <h3 className='text-3xl font-bold text-gray-700 text-center'>Nuestros Clientes</h3>
                <div className='px-5 md:px-0 grid mt-10 grid-cols-2 md:grid-cols-5 gap-5'>
                    <div className='flex justify-center p-2 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>  
                        <Image src='/assets/images/clients/911.png' width={100} height={50} alt='911 logo' />
                    </div>
                    <div className='flex justify-center items-center md:p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image className='h-16' src='/assets/images/clients/acosa-logo.png' width={180} height={40} alt='acosa' />
                    </div>
                    <div className='flex justify-center md:p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image className='h-16' src='/assets/images/clients/BAC_Credomatic_logo.svg.png' width={170} height={40} alt='bac credomatic' />
                    </div>
                    <div className='flex justify-center md:p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/assets/images/clients/Grupo-Karims-smart-business.png' width={80} height={50} alt='grupo karims' />
                    </div>
                    <div className='flex justify-center md:p-10 items-center rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image  className='h-16' src='/assets/images/clients/grupo-platino-smart-business.png' width={190} height={50} alt='Grupo Platino' />
                    </div>
                    <div className='flex justify-center p-5 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/assets/images/clients/logo_la_quinta_la_ceiba.jpg' width={100} height={50} alt='Hotel La Quinta' />
                    </div>
                    <div className='flex justify-center p-5 rounded-mdt bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image className='h-16' src='/assets/images/clients/logo-banco-atlantida.png' width={190} height={40} alt='Banco Atlnatida' />
                    </div>
                    <div className='flex justify-center items-center p-2 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image  className='h-16' src='/assets/images/clients/logo-funda.png' width={200} height={50} alt='Grupo Comidas' />
                    </div>
                    <div className='flex justify-center p-2 rounded-md  bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/assets/images/clients/municipalidad-de-san-pedro-sula-logo.png' width={100} height={50} alt='bac credomatic' />
                    </div>
                    <div className='flex justify-center p-2 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/assets/images/clients/net-laptech.jpeg' width={100} height={50} alt='Netlaptech' />
                    </div>
                    <div className='flex justify-center p-5 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/assets/images/clients/unnamed.png' width={200} height={50} alt='Unitec' />
                    </div>
                    <div className='flex justify-center p-5 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/assets/images/clients/inversiones_aliadas_smart_business.png' width={200} height={50} alt='Unitec' />
                    </div>
                    <div className='flex justify-center p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/assets/images/clients/logo_de_claro.png' width={200} height={50} alt='Unitec' />
                    </div>
                    <div className='md:col-span-2 flex justify-center items-center rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                    <h5 className='text-center font-bold text-2xl'>¡Muchos Mas!</h5>
                    </div>
                    <div className='col-span-2 md:col-span-5 flex justify-center items-center p-5 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110 animate-bounce'>
                        <h5 className='text-center font-bold text-2xl'>¡Proximamente Tu!</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
)


export default AboutUs;