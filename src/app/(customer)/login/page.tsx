'use client'
import React from 'react';
import { Button, Input, Spacer, Card } from '@nextui-org/react';
import Link from 'next/link';
import { ArrowLeftIcon, EyeDropperIcon, EyeIcon } from '@heroicons/react/20/solid';

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: `url('/assets/images/backgrounds/auth-background.jpg')` }}>
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md m-4">
        <h3 className='font-semibold text-2xl'>Iniciar Sesion</h3>
        <Spacer y={6} />
        <Input label="Email" placeholder="Ingrese su Email" fullWidth />
        <Spacer y={2.5} />
        <Input
      label="Password"
      placeholder="Enter your password"
      fullWidth
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeIcon height={24} width={24} className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeDropperIcon  height={24} width={24} className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      
    />
        <Spacer y={2.5} />
        <Button color="primary" className='w-full'>
          Iniciar Sesion
        </Button>
        <Spacer y={2.5} />
        <Link href="/forgot-password" className='text-[#0068E1] text-right' passHref>
          Olvide mi contraseña
        </Link>
        <Spacer y={8} />
        
        <div className='flex justify-between'>
          <Link href="/" passHref>
            <Button>
              <ArrowLeftIcon className="h-5 w-5" />
              Volver a Inicio
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button>
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
