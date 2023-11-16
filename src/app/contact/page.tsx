import React from 'react'
import { IconFacebook } from '../../../public/assets/images'
import { ChatBubbleBottomCenterIcon, ChatBubbleBottomCenterTextIcon, ChatBubbleLeftRightIcon, PhoneArrowDownLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className='w-full mx-auto max-w-screen-2xl '>
      <div className='container my-5 p-5 bg-gray-50'>
        <h1 className='text-2xl font-bold text-gray-700 text-center'>Contactanos</h1>
      </div>
      <div className='grid grid-cols-5 gap-5 mb-5'>
        <div className='col-span-4'>
          <div className='border rounded-md h-full mb-2 shadow-xl border-gray-200 container grid grid-cols-2 p-10'>
            <div>
              
            </div>
            <div className='px-5'>
              <div className='h-full flex flex-col justify-center'>
                <div className='flex justify-center my-5'>
                  <h2 className='font-bold text-3xl text-gray-700'>Contactanos</h2>
                </div>
                <form className='container'>
                    <div className='grid gap-5 grid-cols-2'>
                        <div className='col-span-1'>
                          <label className='font-bold'>Nombre</label>
                          <input type='text' className="w-full border p-2 rounded-md"/>
                        </div>
                        <div className='col-span-1'>
                          <label className='font-bold'>Apellido</label>
                          <input type='text' className="w-full border p-2 rounded-md"/>
                        </div>
                        <div className='col-span-1'>
                          <label className='font-bold'>Correo Electronico</label>
                          <input type='text' className="w-full border p-2 rounded-md"/>
                        </div>
                        <div className='col-span-1'>
                          <label className='font-bold'>Asunto</label>
                          <input type='text' className="w-full border p-2 rounded-md"/>
                        </div>
                        <div className='col-span-2'>
                        <label className='font-bold'>Asunto</label>
                          <textarea className="w-full border p-2 h-[250px] rounded-md"/>
                        </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-1'>
          <div  className='mb-2 rounded-md border hover:shadow-sm hover:shadow-green-300'>
            <Link href='tel:+50488187765' className='p-2 container h-full'>
              <h2 className='font-bold text-center'>Llamanos: +504 8818-7765</h2>
            </Link>
          </div>
          <div className='my-2 rounded-md border p-5 hover:shadow-sm hover:shadow-green-300'>
            <div className='flex justify-center'>
              <ChatBubbleLeftRightIcon height={80} width={80} />
            </div>
            <h2 className='font-bold text-center'>Escribenos a nuestro Whatsapp</h2>
          </div>
          <div className='my-2 rounded-md border p-5 hover:shadow-sm hover:shadow-green-300'>
            <div className='flex justify-center'>
              <ChatBubbleLeftRightIcon height={80} width={80} />
            </div>
            <h2 className='font-bold text-center'>Siguenos en Facebook</h2>
          </div>
          <div className='mt-2 rounded-md border p-5 hover:shadow-sm hover:shadow-green-300'>
            <div className='flex justify-center'>
              <ChatBubbleLeftRightIcon height={80} width={80} />
            </div>
            <h2 className='font-bold text-center'>Siguenos en Instagram</h2>
          </div>


        </div>

      </div>
    </div>
  )
}
