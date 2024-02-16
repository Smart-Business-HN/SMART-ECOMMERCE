'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { FormEvent } from 'react'

export default function Login() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(formData)
    // ...
  }
  return (
    <div className=' items-center h-screen w-screen bg-[#F1F5F9] flex justify-center mx-auto'>
      <div className='bg-gray-100 p-2'>
        <Link href="/" />

      </div>
      <div className='rounded-md flex flex-col items-center'>
        <div className='grid grid-cols-2 shadow-md rounded-md'>
          <div className='bg-[#1E293B] rounded-l-md relative'>
            <div>
              <p className='text-white absolute bottom-0 right-2 opacity-20 font-extrabold text-3xl'>Welcome Back</p>
            </div>

          </div>
          <div className='p-10 bg-white rounded-r-md'>
            <div>
              <Image src="/assets/images/corporate/logo-smart-business.png" alt="Logo" height={100} width={200} />
            </div>
            <p className='text-left my-5 text-2xl font-extrabold text-[#1E293B]'>Iniciar Sesion</p>
            <form onSubmit={onSubmit} className='flex flex-col my-5'>
              <label htmlFor='email' className='text-gray-600'>Correo *</label>
              <input id='email' required className='p-2 focus:border-blue-950 border border-gray-200 rounded-md' type="email" />
              <label htmlFor='password' className='text-gray-600 mt-2'>Contrase;a *</label>
              <input id='password' required className='p-2 focus:border-blue-950 border border-gray-200 rounded-md' type="password" />
              <div className='flex justify-end mt-2 items-center'>
                <input id="remember" type='checkbox' />
                <label html-for="remember" className=' font-thin text-gray-500 text-xs'>Recordarme</label>
              </div>
              <button type='submit' className='bg-blue-400 mt-5 rounded-md text-white py-2'>Iniciar Sesion</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
