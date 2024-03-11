import React, { Fragment } from 'react';
import { ChatBubbleLeftRightIcon, PhoneArrowUpRightIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
export default function ContactPage() {
  return (
    <Fragment>
    <Head>
    <meta
          name="description"
          content="¿Listo para mejorar tu seguridad y redes? Contacta con nosotros para expertos en cámaras Hikvision, equipos Ubiquiti y soluciones de cableado estructurado. Tu socio confiable en tecnología y seguridad."
          key="desc"
    />
    </Head>
    <div className='w-full'>
      <div className='bg-center bg-cover mb-5 bg-blue-950 bg-opacity-25 py-36' style={{ backgroundImage: `url('/assets/images/backgrounds/map_contact.png')`, }}>
        <div className='container mx-auto flex items-center px-10 sm:px-0'>
          <h1 className='text-4xl mx-auto font-bold text-gray-700 text-left container'>Hablanos de tu nuevo proyecto</h1>
          <div className='text-blue-500 rotate-90 hidden md:block'>
            <svg width="272" height="187" viewBox="0 0 272 187" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M266.994 37.102V75.53C269.828 75.443 271.998 77.897 271.998 80.863C271.998 84.173 269.304 86.866 265.994 86.866C264.156 86.866 262.528 86.018 261.426 84.713L228.272 103.847C228.515 104.499 228.666 105.195 228.666 106.2C228.666 109.24 225.973 112.22 222.662 112.22C219.351 112.22 216.658 109.24 216.658 106.2C216.658 105.177 216.813 104.463 217.68 103.798L183.931 84.673C182.829 86.001 181.187 86.866 179.33 86.866C177.473 86.866 175.831 86.001 174.729 84.673L141.593 103.797C141.848 104.462 142.3 105.177 142.3 106.2C142.3 108.898 139.833 111.352 136.999 111.831V150.006C139.833 150.485 142.3 153.3 142.3 156.6C142.3 156.636 141.853 157.326 141.614 158.63L174.731 177.084C175.833 175.757 177.474 174.894 179.33 174.894C182.641 174.894 185.335 177.585 185.335 180.895C185.335 184.205 182.641 186.896 179.33 186.896C176.2 186.896 173.326 184.205 173.326 180.895C173.326 180.16 173.478 179.463 173.721 178.812L140.611 159.703C139.509 161.038 137.862 162.8 135.999 162.8C134.136 162.8 132.49 161.039 131.388 159.704L98.277 178.812C98.52 179.464 98.671 180.16 98.671 180.895C98.671 184.205 95.978 186.896 92.667 186.896C89.356 186.896 86.663 184.205 86.663 180.895C86.663 180.16 86.814 179.464 87.57 178.813L53.946 159.704C52.844 161.039 51.198 162.8 49.335 162.8C46.25 162.8 43.331 159.217 43.331 156.6C43.331 153.3 45.501 150.486 48.334 150.006V111.831C45.501 111.351 43.331 108.898 43.331 106.2C43.331 105.195 43.482 104.499 43.725 103.847L10.571 84.714C9.469 86.018 7.842 86.866 6.4 86.866C2.693 86.866 0 84.173 0 80.865C0 77.897 2.169 75.443 5.3 75.53V36.756C2.169 36.276 0 33.823 0 30.855C0 27.546 2.693 24.853 6.4 24.853C7.877 24.853 9.531 25.733 10.633 27.081L43.725 8.72C43.482 7.331 43.331 6.635 43.331 5.9C43.331 2.591 46.25 0 49.335 0C52.646 0 55.339 2.591 55.339 5.9C55.339 6.635 55.188 7.331 54.945 8.72L88.37 27.081C89.139 25.733 90.794 24.853 92.667 24.853C94.54 24.853 96.195 25.733 97.297 27.081L130.389 8.72C130.146 7.331 129.994 6.635 129.994 5.9C129.994 2.591 132.688 0 135.999 0C139.309 0 142.3 2.591 142.3 5.9C142.3 6.635 141.852 7.331 141.609 8.72L174.895 27.193C175.994 26.68 177.567 25.2 179.33 25.2C181.94 25.2 182.667 26.68 183.766 27.192L217.52 8.72C216.809 7.331 216.658 6.635 216.658 5.9C216.658 2.591 219.351 0 222.662 0C225.973 0 228.666 2.591 228.666 5.9C228.666 6.635 228.515 7.331 228.272 8.72L261.558 27.192C262.657 26.68 264.23 25.2 265.994 25.2C269.304 25.2 271.998 27.892 271.998 31.202C271.998 34.168 269.828 36.623 266.994 37.102ZM179.33 184.897C181.538 184.897 183.333 183.103 183.333 180.895C183.333 178.689 181.538 176.894 179.33 176.894C177.123 176.894 175.328 178.689 175.328 180.895C175.328 183.103 177.123 184.897 179.33 184.897ZM265.994 84.866C268.201 84.866 269.997 83.07 269.997 80.863C269.997 78.657 268.201 76.863 265.994 76.863C263.787 76.863 261.991 78.657 261.991 80.863C261.991 83.07 263.787 84.866 265.994 84.866ZM222.662 110.22C224.869 110.22 226.665 108.138 226.665 106.2C226.665 103.723 224.869 102.19 222.662 102.19C220.455 102.19 218.659 103.723 218.659 106.2C218.659 108.138 220.455 110.22 222.662 110.22ZM179.33 84.866C181.538 84.866 183.333 83.071 183.333 80.865C183.333 78.657 181.538 76.864 179.33 76.864C177.123 76.864 175.327 78.657 175.327 80.865C175.327 83.071 177.123 84.866 179.33 84.866ZM140.1 106.2C140.1 103.723 138.206 102.19 135.999 102.19C133.791 102.19 131.996 103.723 131.996 106.2C131.996 108.138 133.791 110.22 135.999 110.22C138.206 110.22 140.1 108.138 140.1 106.2ZM135.999 160.7C138.206 160.7 140.1 158.114 140.1 156.6C140.1 153.7 138.206 152.4 135.999 152.4C133.791 152.4 131.996 153.7 131.996 156.6C131.996 158.114 133.791 160.7 135.999 160.7ZM92.667 184.897C94.874 184.897 96.67 183.103 96.67 180.895C96.67 178.689 94.874 176.894 92.667 176.894C90.46 176.894 88.664 178.689 88.664 180.895C88.664 183.103 90.46 184.897 92.667 184.897ZM54.95 158.63L88.66 177.085C89.168 175.758 90.81 174.894 92.667 174.894C94.524 174.894 96.166 175.758 97.268 177.085L130.384 158.63C130.145 157.326 129.994 156.636 129.994 156.6C129.994 153.3 132.164 150.486 134.998 150.006V111.831C132.164 111.351 129.994 108.898 129.994 106.2C129.994 105.195 130.146 104.499 130.389 103.847L97.235 84.714C96.132 86.018 94.505 86.866 92.667 86.866C90.811 86.866 89.169 86.001 88.67 84.675L54.93 103.799C55.184 104.463 55.339 105.177 55.339 106.2C55.339 108.898 53.169 111.352 50.336 111.831V150.006C53.169 150.485 55.339 153.3 55.339 156.6C55.339 156.636 55.189 157.326 54.95 158.63ZM96.67 80.865C96.67 78.657 94.874 76.864 92.667 76.864C90.46 76.864 88.664 78.657 88.664 80.865C88.664 83.071 90.46 84.866 92.667 84.866C94.874 84.866 96.67 83.071 96.67 80.865ZM45.332 156.6C45.332 158.114 47.128 160.7 49.335 160.7C51.542 160.7 53.338 158.114 53.338 156.6C53.338 153.7 51.542 152.4 49.335 152.4C47.128 152.4 45.332 153.7 45.332 156.6ZM49.335 110.22C51.542 110.22 53.338 108.138 53.338 106.2C53.338 103.723 51.542 102.19 49.335 102.19C47.128 102.19 45.332 103.723 45.332 106.2C45.332 108.138 47.128 110.22 49.335 110.22ZM2.1 80.865C2.1 83.071 3.796 84.866 6.4 84.866C8.211 84.866 10.6 83.071 10.6 80.865C10.6 78.657 8.211 76.864 6.4 76.864C3.796 76.864 2.1 78.657 2.1 80.865ZM6.4 26.854C3.796 26.854 2.1 28.649 2.1 30.855C2.1 33.062 3.796 34.858 6.4 34.858C8.211 34.858 10.6 33.062 10.6 30.855C10.6 28.649 8.211 26.854 6.4 26.854ZM49.335 1.898C47.128 1.898 45.332 3.693 45.332 5.9C45.332 8.106 47.128 10 49.335 10C51.542 10 53.338 8.106 53.338 5.9C53.338 3.693 51.542 1.898 49.335 1.898ZM87.43 28.817L53.936 9.709C52.834 11.037 51.192 12 49.335 12C47.478 12 45.837 11.037 44.734 9.709L11.627 28.817C11.86 29.456 12.8 30.136 12.8 30.855C12.8 33.823 9.838 36.277 7.4 36.756V75.53C9.838 75.443 12.8 77.897 12.8 80.865C12.8 81.618 11.853 82.332 11.598 83.87L44.734 102.121C45.837 100.793 47.478 100.19 49.335 100.19C51.174 100.19 52.801 100.776 53.903 102.081L87.57 83.38C86.814 82.296 86.663 81.6 86.663 80.865C86.663 77.897 88.833 75.443 91.666 75.53V36.756C88.833 36.276 86.663 33.823 86.663 30.855C86.663 30.136 86.811 29.456 87.43 28.817ZM92.667 26.854C90.46 26.854 88.664 28.649 88.664 30.855C88.664 33.062 90.46 34.858 92.667 34.858C94.874 34.858 96.67 33.062 96.67 30.855C96.67 28.649 94.874 26.854 92.667 26.854ZM135.999 1.898C133.791 1.898 131.996 3.693 131.996 5.9C131.996 8.106 133.791 10 135.999 10C138.206 10 140.1 8.106 140.1 5.9C140.1 3.693 138.206 1.898 135.999 1.898ZM173.798 28.869L140.6 9.709C139.497 11.037 137.856 12 135.999 12C134.142 12 132.5 11.037 131.398 9.709L98.29 28.817C98.523 29.456 98.671 30.136 98.671 30.855C98.671 33.823 96.501 36.277 93.667 36.756V75.53C96.501 75.443 98.671 77.897 98.671 80.865C98.671 81.618 98.516 82.332 98.261 83.87L131.398 102.121C132.5 100.793 134.142 100.19 135.999 100.19C137.836 100.19 139.463 100.776 140.566 102.08L173.72 83.36C173.477 82.295 173.326 81.599 173.326 80.865C173.326 77.897 175.496 75.443 178.329 75.53V37.102C175.496 36.622 173.326 34.168 173.326 31.202C173.326 30.375 173.494 29.587 173.798 28.869ZM179.33 27.2C177.123 27.2 175.328 29.85 175.328 31.202C175.328 33.408 177.123 35.202 179.33 35.202C181.538 35.202 183.333 33.408 183.333 31.202C183.333 29.85 181.538 27.2 179.33 27.2ZM222.662 1.898C220.455 1.898 218.659 3.693 218.659 5.9C218.659 8.106 220.455 10 222.662 10C224.869 10 226.665 8.106 226.665 5.9C226.665 3.693 224.869 1.898 222.662 1.898ZM260.462 28.869L227.263 9.709C226.161 11.037 224.519 12 222.662 12C220.805 12 219.163 11.037 218.61 9.709L184.863 28.869C185.166 29.587 185.335 30.375 185.335 31.202C185.335 34.168 183.165 36.623 180.331 37.102V75.53C183.164 75.443 185.334 77.897 185.334 80.865C185.334 81.599 185.183 82.295 184.94 83.36L218.95 102.08C219.197 100.776 220.824 100.19 222.662 100.19C224.519 100.19 226.161 100.793 227.263 102.121L260.399 83.86C260.145 82.331 259.989 81.617 259.989 80.863C259.989 77.897 262.159 75.443 264.993 75.53V37.102C262.159 36.622 259.989 34.168 259.989 31.202C259.989 30.375 260.158 29.587 260.462 28.869ZM265.994 27.2C263.787 27.2 261.991 29.85 261.991 31.202C261.991 33.408 263.787 35.202 265.994 35.202C268.201 35.202 269.997 33.408 269.997 31.202C269.997 29.85 268.201 27.2 265.994 27.2Z" fill="url(#paint0_linear_663_106)" />
              <defs>
                <linearGradient id="paint0_linear_663_106" x1="0" y1="187" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="0.75" stopColor="#3B82F6" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 mb-5 shadow-md rounded-md'>
          <div className='col-span-1 mx-4 sm:mx-0 rounded-l-md bg-cover px-5 md:px-10 bg-gray-100'>
            <div className='flex flex-col items-center justify-center my-10'>
              <h3 className='text-center text-4xl font-semibold text-gray-700'>Nuestras Soluciones</h3>
              <div className='w-[10%] h-[2px] bg-blue-500'></div> 
            </div>
            <div className='grid grid-cols-5 mb-4 rounded-md bg-white border-2 p-5 gap-5'>
              <div className='col-span-2 sm:col-span-1 flex justify-center p-1 md:p-4 bg-[#061E36] rounded-md'>
                <Image className='text-white brightness-0 invert' src="/assets/images/icons/cctv-icon.svg" alt="Phone Icon" width={70} height={70}/>
              </div>
              <div className='col-span-3 sm:col-span-4 relative'>
                 <h4 className='text-gray-700 font-semibold'>CCTV</h4>
                 <p className='text-gray-600 text-sm'>Productos y accesorios para tus proyectos CCTV y asegurar tu hogar o empresa.</p>
                 <div className='xl:absolute flex gap-1 mt-2 flex-wrap  bottom-0 left-0'>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>Camaras</div>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>Video Balun</div>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>NVR/DVR</div>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>Accesorios</div>
                 </div>
                </div>
            </div>
            <div className='grid grid-cols-5 mb-4 rounded-md bg-white border-2 p-5 gap-5'>
              <div className='col-span-2 sm:col-span-1 flex justify-center p-1 md:p-4 bg-[#061E36] rounded-md'>
                <Image className='text-white brightness-0 invert' src="/assets/images/icons/cabling.png" alt="Phone Icon" width={90} height={90}/>
              </div>
              <div className='col-span-3 sm:col-span-4 relative'>
                 <h4 className='text-gray-700 font-semibold'>Cableado Estructurado</h4>
                 <p className='text-gray-600 text-sm'>Somos proveedores de marcas lideres a nivel mundial para llevar tu red corporativa a niveles que nunca imaginaste.</p>
                 <div className='xl:absolute flex gap-1 mt-2 flex-wrap  bottom-0 left-0'>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>Cable UTP</div>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>Switches</div>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>APs</div>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>Proyectos</div>
                 </div>
                </div>
            </div>
            <div className='grid grid-cols-5 mb-4 rounded-md bg-white border-2 p-5 gap-5'>
              <div className='col-span-2 sm:col-span-1 flex justify-center p-1 md:p-4 bg-[#061E36] rounded-md'>
                <Image className='text-white brightness-0 invert' src="/assets/images/icons/servers.png" alt="Phone Icon" width={90} height={90}/>
              </div>
              <div className='col-span-3 sm:col-span-4 relative'>
                 <h4 className='text-gray-700 font-semibold'>Proveedores de quipo de oficina</h4>
                 <p className='text-gray-600 text-sm'>Te brindamos lo ultimo en equipo ofimatico para la expancion de tu oficina a precios incomparables.</p>
                 <div className='xl:absolute flex gap-1 mt-2 flex-wrap  bottom-0 left-0'>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>UPS</div>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>Monitores</div>
                  <div className='bg-blue-950 px-2 py-1 rounded-md text-white text-xs flex justify-center items-center'>POS</div>
                 </div>
                </div>
            </div>
          </div>
          <div className='col-span-1 bg-cover relative rounded-r-md' style={{ backgroundImage: `url('/assets/images/backgrounds/computadora-dell-y-plano.jpg')`, }}>
            <div className='md:rounded-r-md rounded-bl-md  bg-blue-950 bg-opacity-80 left-0 right-0 top-0 bottom-0'>
              <div className='px-5 sm:px-10'>
                <div className='h-full flex flex-col justify-center'>
                  <div className='flex flex-col items-center justify-center my-10'>
                    <h2 className='font-medium text-4xl text-white'>Contactanos</h2>
                    <div className='w-[10%] h-[2px] bg-blue-500'></div>
                  </div>
                  <p className='text-gray-200'>Te responderemos lo mas pronto posible, sera un placer ayudarte.</p>
                  <p className='text-gray-200 mb-2'>Si es una urgencia llamanos al: +504 8818-7765</p>
                  <form className='pb-10' >
                    <div className='grid gap-5 grid-cols-2'>
                      <div className='col-span-2 md:col-span-1'>
                        <label className='font-medium text-gray-200'>Nombre</label>
                        <input type='text' className="w-full border bg-gray-500 border-none bg-opacity-50 focus:bg-opacity-75 p-2 rounded-md" />
                      </div>
                      <div className='col-span-2 md:col-span-1'>
                        <label className='font-medium text-gray-200'>Apellido</label>
                        <input type='text' className="w-full border bg-gray-500 border-none bg-opacity-50 focus:bg-opacity-75 p-2 rounded-md" />
                      </div>
                      <div className='col-span-2 md:col-span-1'>
                        <label className='font-medium text-gray-200'>Correo Electronico</label>
                        <input type='text' className="w-full border bg-gray-500 border-none bg-opacity-50 focus:bg-opacity-75 p-2 rounded-md" />
                      </div>
                      <div className='col-span-2 md:col-span-1'>
                        <label className='font-medium text-gray-200'>Asunto</label>
                        <input type='text' className="w-full border bg-gray-500 border-none bg-opacity-50 focus:bg-opacity-75 p-2 rounded-md" />
                      </div>
                      <div className='col-span-2'>
                        <label className='font-medium text-gray-200'>Asunto</label>
                        <textarea className="w-full resize-none h-36 border bg-gray-500 border-none bg-opacity-50 focus:bg-opacity-75 p-2 rounded-md" />
                      </div>
                    </div>
                    <div className='flex mt-5 justify-center'>
                      <button className='bg-blue-500 px-10 py-4 text-white font-medium rounded-md hover:shadow-md'>Enviar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-1 hidden'>
            <div className="rounded border border-gray-400 p-5 items-center shadow-md hover:shadow-blue-200 hover:scale-105 transition-all mt-4">
              <Link href='tel:+50488187765'>
                <div className="flex justify-center relative">
                  <div className="absolute -ml-3 mt-1   h-[67px] w-[67px] rounded-lg bg-blue-600"></div>
                  <div className="z-40 p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                    <svg className='h-[50px] w-[50px]' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                      <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(4,4)"><path d="M21.58008,7c-8.039,0 -14.58008,6.54494 -14.58008,14.58594v20.83203c0,8.04 6.54494,14.58203 14.58594,14.58203h20.83203c8.04,0 14.58203,-6.54494 14.58203,-14.58594v-20.83398c0,-8.039 -6.54494,-14.58008 -14.58594,-14.58008zM47,15c1.104,0 2,0.896 2,2c0,1.104 -0.896,2 -2,2c-1.104,0 -2,-0.896 -2,-2c0,-1.104 0.896,-2 2,-2zM32,19c7.17,0 13,5.83 13,13c0,7.17 -5.831,13 -13,13c-7.17,0 -13,-5.831 -13,-13c0,-7.169 5.83,-13 13,-13zM32,23c-4.971,0 -9,4.029 -9,9c0,4.971 4.029,9 9,9c4.971,0 9,-4.029 9,-9c0,-4.971 -4.029,-9 -9,-9z"></path></g></g>
                    </svg>
                  </div>
                </div>
                <h4 className="text-gray-600 text-center mt-2 font-semibold text-lg">Siguenos en Intagram</h4>
              </Link>
            </div>
          </div>
        </div>
        <div className='rounded-md bg-gray-100 shadow-md p-10 mb-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div className='col-span-1'>
              <h3 className='text-3xl text-center text-gray-700 font-semibold'>Nuestros Horarios</h3>
              <div className='flex justify-center'>
                <div className='grid mt-5 grid-cols-3'>
                  <div className=''>
                    <div className='text-left border-b-2 border-blue-950 font-medium text-lg px-10'>Dia</div>
                    <div className='border-b border-blue-950 py-2 flex gap-2 items-center'><ClockIcon height={20} width={20} color='text-blue-950'/>Lunes</div>
                    <div className='border-b border-blue-950 py-2 flex gap-2 items-center'><ClockIcon height={20} width={20} color='text-blue-950'/>Martes</div>
                    <div className='border-b border-blue-950 py-2 flex gap-2 items-center'><ClockIcon height={20} width={20} color='text-blue-950'/>Miercoles</div>
                    <div className='border-b border-blue-950 py-2 flex gap-2 items-center'><ClockIcon height={20} width={20} color='text-blue-950'/>Jueves</div>
                    <div className='border-b border-blue-950 py-2 flex gap-2 items-center'><ClockIcon height={20} width={20} color='text-blue-950'/>Viernes</div>
                    <div className='border-b border-blue-950 py-2 flex gap-2 items-center'><ClockIcon height={20} width={20} color='text-blue-950'/>Sabado</div>
                    <div className='border-b border-blue-950 py-2 flex gap-2 items-center'><ClockIcon height={20} width={20} color='text-blue-950'/>Domingo</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-center border-b-2 border-blue-950 font-medium text-lg px-10'>Apertura</div>
                    <div className='border-b border-blue-950 py-2'>08:00 AM</div>
                    <div className='border-b border-blue-950 py-2'>08:00 AM</div>
                    <div className='border-b border-blue-950 py-2'>08:00 AM</div>
                    <div className='border-b border-blue-950 py-2'>08:00 AM</div>
                    <div className='border-b border-blue-950 py-2'>08:00 AM</div>
                    <div className='border-b border-blue-950 py-2'>08:00 AM</div>
                    <div className='border-b border-blue-950 py-2'>--Cerrado--</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-center border-b-2 border-blue-950 font-medium text-lg px-10'>Cierre</div>
                    <div className='border-b border-blue-950 py-2'>05:00 PM</div>
                    <div className='border-b border-blue-950 py-2'>05:00 PM</div>
                    <div className='border-b border-blue-950 py-2'>05:00 PM</div>
                    <div className='border-b border-blue-950 py-2'>05:00 PM</div>
                    <div className='border-b border-blue-950 py-2'>05:00 PM</div>
                    <div className='border-b border-blue-950 py-2'>12:00 PM</div>
                    <div className='border-b border-blue-950 py-2'>--Cerrado--</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-1 px-5 sm:px-10'>
              <h3 className='text-3xl text-gray-700 mt-5 lg:mt-0 text-center font-semibold'>Nuestros Contactos</h3>
              <div className="rounded border bg-white mt-4 border-gray-200 items-center shadow-md hover:shadow-blue-200 hover:scale-105 transition-all">
                <Link className='flex gap-4 m-2' href='tel:+50488187765'>
                  <div className="col-span-1 ml-4 flex justify-center items-center relative">
                    <div className="absolute -ml-3 mt-1   h-[50px] w-[50px] rounded-lg bg-blue-600"></div>
                    <div className="z-40  h-[50px] flex items-center justify-center w-[50px] p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                      <PhoneArrowUpRightIcon width={25} height={25} />
                    </div>
                  </div>
                  <div className='col-span-4'>
                    <h4 className="text-gray-600 text-left mt-2 font-semibold text-lg">Llamanos</h4>
                    <p className="text-gray-400 text-left">+504 8818-7765</p>
                  </div>
                </Link>
              </div>
              <div className="rounded border bg-white mt-4 border-gray-200 items-center shadow-md hover:shadow-blue-200 hover:scale-105 transition-all">
                <Link className='flex gap-4 m-2' href='https://api.whatsapp.com/send?phone=+50488187765&text=Deseo%20contactarme%20con%20un%20asesor%20de%20ventas'>
                  <div className="col-span-1 ml-4 flex justify-center items-center relative">
                    <div className="absolute -ml-3 mt-1   h-[50px] w-[50px] rounded-lg bg-blue-600"></div>
                    <div className="z-40  h-[50px] flex items-center justify-center w-[50px] p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                      <ChatBubbleLeftRightIcon width={25} height={25} />
                    </div>
                  </div>
                  <div className='col-span-4'>
                    <h4 className="text-gray-600 text-left mt-2 font-semibold text-lg">Whatsapp</h4>
                    <p className="text-gray-400 text-left">+504 8818-7765</p>
                  </div>
                </Link>
              </div>
              <div className="rounded border bg-white mt-4 border-gray-200 items-center shadow-md hover:shadow-blue-200 hover:scale-105 transition-all">
                <Link className='flex gap-4 m-2' href='https://www.facebook.com/SmartBusiness504'   >
                  <div className="col-span-1 ml-4 flex justify-center items-center relative">
                    <div className="absolute -ml-3 mt-1   h-[50px] w-[50px] rounded-lg bg-blue-600"></div>
                    <div className="z-40  h-[50px] flex items-center justify-center w-[50px] p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                    <svg className='h-[50px] w-[50px]' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256">
                      <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" ><g transform="scale(8.53333,8.53333)"><path d="M24,4h-18c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h10v-9h-3v-3h3v-1.611c0,-3.05 1.486,-4.389 4.021,-4.389c1.214,0 1.856,0.09 2.16,0.131v2.869h-1.729c-1.076,0 -1.452,0.568 -1.452,1.718v1.282h3.154l-0.428,3h-2.726v9h5c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.896,-2 -2,-2z"></path></g></g>
                    </svg>
                    </div>
                  </div>
                  <div className='col-span-4'>
                    <h4 className="text-gray-600 text-left mt-2 font-semibold text-lg">Siguenos en Facebook</h4>
                  </div>
                </Link>
              </div>
              <div className="rounded border mt-4 bg-white border-gray-200 items-center shadow-md hover:shadow-blue-200 hover:scale-105 transition-all">
                <Link className='flex gap-4 m-2' href='https://www.instagram.com/smartbusiness504/'   >
                  <div className="col-span-1 ml-4 flex justify-center items-center relative">
                    <div className="absolute -ml-3 mt-1   h-[50px] w-[50px] rounded-lg bg-blue-600"></div>
                    <div className="z-40  h-[50px] flex items-center justify-center w-[50px] p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                    <svg className='h-[50px] w-[50px]' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                      <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(4,4)"><path d="M21.58008,7c-8.039,0 -14.58008,6.54494 -14.58008,14.58594v20.83203c0,8.04 6.54494,14.58203 14.58594,14.58203h20.83203c8.04,0 14.58203,-6.54494 14.58203,-14.58594v-20.83398c0,-8.039 -6.54494,-14.58008 -14.58594,-14.58008zM47,15c1.104,0 2,0.896 2,2c0,1.104 -0.896,2 -2,2c-1.104,0 -2,-0.896 -2,-2c0,-1.104 0.896,-2 2,-2zM32,19c7.17,0 13,5.83 13,13c0,7.17 -5.831,13 -13,13c-7.17,0 -13,-5.831 -13,-13c0,-7.169 5.83,-13 13,-13zM32,23c-4.971,0 -9,4.029 -9,9c0,4.971 4.029,9 9,9c4.971,0 9,-4.029 9,-9c0,-4.971 -4.029,-9 -9,-9z"></path></g></g>
                    </svg>
                    </div>
                  </div>
                  <div className='col-span-4'>
                    <h4 className="text-gray-600 text-left mt-2 font-semibold text-lg">Siguenos en Instagram</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  )
}
