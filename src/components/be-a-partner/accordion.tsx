'use client'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

function ReasonsToTrustInUs() {
    return (
        <div className='w-full mt-5'>
            <Disclosure as='div' className="mb-2">
                {({ open }) => (
                    <>
                        <Disclosure.Button className='w-full border border-gray font-semibold items-center bg-slate-50 py-2 px-5 rounded-md flex justify-between'>
                            Somos como tu
                            <ChevronRightIcon height={16} width={16} className={open ? 'rotate-90 transform' : ''} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                        <Disclosure.Panel className="bg-slate-50 px-5 py-2">
                            Comenzamos como tu, siendo un integrador y queremos verte crecer, <strong>sabemos que el mercado abusa de los precios</strong> y queremos mejorar eso para ti.
                        </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure as='div' className="mb-2">
                {({ open }) => (
                    <>
                        <Disclosure.Button className='w-full border border-gray font-semibold items-center bg-slate-50 py-2 px-5 rounded-md flex justify-between'>
                            Nos importas
                            <ChevronRightIcon height={16} width={16} className={open ? 'rotate-90 transform' : ''} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                        <Disclosure.Panel className="bg-slate-50 px-5 py-2">
                            Para nosotros siempre seras una prioridad, <strong>a las empresas grandes solo les interesan otras empresas grandes</strong> para nosotros siempre seras el #1 en nuestra lista de prioridades.
                        </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
            <Disclosure as='div' className="mb-2">
                {({ open }) => (
                    <>
                        <Disclosure.Button className='w-full border border-gray font-semibold items-center bg-slate-50 py-2 px-5 rounded-md flex justify-between'>
                            Variedad de equipo
                            <ChevronRightIcon height={16} width={16} className={open ? 'rotate-90 transform' : ''} />
                        </Disclosure.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                        <Disclosure.Panel className="bg-slate-50 px-5 py-2">
                            Sabemos que tienes variedad de clientes con variedad de presupuestos, <strong>nos adaptamos a TUS clientes</strong> y te podemos proveer desde el equipo mas economico hasta gama premium.
                        </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default ReasonsToTrustInUs