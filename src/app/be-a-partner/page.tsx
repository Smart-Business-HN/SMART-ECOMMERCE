import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { CreditCardIcon, EnvelopeIcon, GiftIcon, MapIcon, ReceiptRefundIcon } from "@heroicons/react/24/outline";
import ReasonsToTrustInUs from "@/components/be-a-partner/accordion";

const BeAPartner: React.FC = () => (
    <div className="container mx-auto max-w-7xl my-5">
        <div className='grid grid-cols-2 gap-4'>
            <div className='flex items-center flex-col justify-center'>
                <h1 className='text-center text-gray-700 text-3xl font-bold'>Conviertete en un Integrador<br /> <strong>SMART</strong></h1>
                <p className='px-5 mt-2 text-gray-500 text-[14px] text-center font-semibold'>
                    Opta por descuentos increibles en todas nuestras lineas de productos ya sea para equipo CCTV o Cableado Estructurado.
                </p>
            </div>
            <div>
                <Image height={500} width={600} alt='tecnico CCTV' className="rounded-md transform -scale-x-100" src='/assets/images/backgrounds/tecnico-cctv-2.jpg' />
            </div>
        </div>
        <div className="container py-5">
            <div className="w-full mx-auto">
                <h3 className="text-center text-gray-700 text-2xl font-bold">Tendras todas estas ventajas</h3>
            </div>
            <div className="grid grid-cols-5 mt-5 gap-5">
                <div className="rounded hover:shadow-md hover:shadow-blue-400 border border-gray-500 p-5 items-center">
                    <div className="flex justify-center relative">
                        <div className="absolute -ml-3 mt-1   h-[67px] w-[67px] rounded-lg bg-blue-600"></div>
                        <div className="z-40 p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                            <CreditCardIcon width={50} height={50} />
                        </div>
                    </div>
                    <h4 className="text-gray-600 text-center mt-1 font-semibold">Descuentos Exclusivos</h4>
                    <p className="text-gray-400 text-center text-sm">Precios de mayorista sin minimos de compra</p>
                </div>
                <div className="rounded border border-gray-500 p-5 items-center">
                    <div className="flex justify-center relative">
                    <div className="absolute -ml-3 mt-1   h-[67px] w-[67px] rounded-lg bg-blue-600"></div>
                        <div className="z-40 p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                            <MapIcon width={50} height={50} />
                        </div>
                    </div>
                    <h4 className="text-gray-600 text-center mt-1 font-semibold">Entregas en Proyectos</h4>
                    <p className="text-gray-400 text-center text-sm">Hacemos entregas en todo el territorio nacional</p>
                </div>
                <div className="rounded border border-gray-500 p-5 items-center">
                    <div className="flex justify-center relative">
                        <div className="absolute -ml-3 mt-1   h-[67px] w-[67px] rounded-lg bg-blue-600"></div>
                            <div className="z-40 p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                                <GiftIcon width={50} height={50} />
                            </div>
                        </div>
                    <h4 className="text-gray-600 text-center mt-1 font-semibold">Regalias por compras</h4>
                    <p className="text-gray-400 text-center text-sm">Te premiamos por tus compras recurrentes</p>
                </div>
                <div className="rounded border border-gray-500 p-5 items-center">
                    <div className="flex justify-center relative">
                        <div className="absolute -ml-3 mt-1   h-[67px] w-[67px] rounded-lg bg-blue-600"></div>
                        <div className="z-40 p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                            <EnvelopeIcon width={50} height={50} />
                        </div>
                    </div>
                    <h4 className="text-gray-600 text-center mt-1 font-semibold">Recomendaciones</h4>
                    <p className="text-gray-400 text-center text-sm">Podemos dar soporte para ganar tus proyectos</p>
                </div>
                <div className="rounded border border-gray-500 p-5 items-center">
                    <div className="flex justify-center relative">
                    <div className="absolute -ml-3 mt-1   h-[67px] w-[67px] rounded-lg bg-blue-600"></div>
                    <div className="z-40 p-2 text-white bg-slate-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                        <ReceiptRefundIcon width={50} height={50} />
                    </div>
                    </div>
                    <h4 className="text-gray-600 text-center mt-1 font-semibold">Clientes Referidos</h4>
                    <p className="text-gray-400 text-center text-sm">Si tenemos un cliente de tu zona podremos referirtelo</p>
                </div>
            </div>
            <div className="container border border-gray-400  mt-5 p-10 rounded-md">
                <div className="grid grid-cols-2 gap-10">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-gray-700 text-xl font-bold text-center">Cansado de esperar a tu agente de ventas por una simple cotizacion?</h2>
                        <p>Registrese como integrador oficial y realice sus propios presupuestos</p>
                        <div className="flex justify-center mt-5">

                            <button className="bg-blue-500 px-4 py-2 text-white rounded-md hover:shadow-md">Llenar formulario</button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Image height={400} width={500} alt='Persona sin tiempo' className="rounded-md transform -scale-x-100" src='/assets/images/backgrounds/chico-despertador-rojo.jpg' />
                    </div>

                </div>

            </div>
        </div>
        <div className='grid mt-10 grid-cols-2 gap-4'>
            <div className=''>
                <Image height={500} width={600} alt='tecnico CCTV' className="rounded-md transform -scale-x-100" src='/assets/images/backgrounds/tecnico-cctv-2.jpg' />
            </div>
            <div className='flex items-center flex-col justify-center'>
                <h1 className='text-center text-gray-700 text-3xl font-bold'>Porque escoger a<br /> <strong>SMART BUSINESS</strong></h1>
                <ReasonsToTrustInUs/>
            </div>
        </div>
    </div>
)
export default BeAPartner;