'use client'
import React from 'react';
import { Button, Input, Spacer, Card, Progress, Radio, RadioGroup } from '@nextui-org/react';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, EyeDropperIcon, EyeIcon } from '@heroicons/react/20/solid';

export default function Login() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <div className="h-screen flex items-center justify-center bg-cover relative" style={{ backgroundImage: `url('/assets/images/backgrounds/auth-background.jpg')` }}>
            <div className="max-w-md absolute w-full gap-2 font-semibold p-8 bg-white rounded-lg shadow-md m-4 top-0 flex text-sm text-center">
                <div className='shadow-md shadow-blue-200 border-1 border-gray-200 p-2 rounded-md text-slate-500'>
                    Datos Personales
                </div>
                <div className='shadow-md shadow-blue-200 border-1 border-gray-200 p-2 rounded-md text-slate-500'>
                    Datos de Contacto
                </div>
                <div className='shadow-md shadow-blue-200 border-1 border-gray-200 p-2 rounded-md text-slate-500'>
                    Tus Preferencias
                </div>
                <Progress
                    aria-label="Loading..."
                    color="primary"
                    value={1}
                    maxValue={3}
                    className="max-w-md"
                    />
            </div>
            <Spacer y={6} />
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md m-4">
                <h3 className='font-semibold text-2xl'>Registro</h3>
                <Spacer y={6} />
                <Input label="Nombres" placeholder="Ingrese su nombre" fullWidth />
                <Spacer y={2.5} />
                <Input label="Apellidos" placeholder="Ingrese su nombre" fullWidth />
                <Spacer y={2.5} />
                <RadioGroup
                    label="Soy"
                    orientation="horizontal"
                    >
                    <Radio value="hombre">Hombre</Radio>
                    <Radio value="mujer">Mujer</Radio>
                </RadioGroup>
                <Spacer y={2.5} />
                
                <Spacer y={8} />
                <div className='flex justify-between'>
                    <Link href="/" passHref>
                        <Button>
                            <ArrowLeftIcon className="h-5 w-5" />
                            Cancelar
                        </Button>
                    </Link>
                    <Link href="/register" passHref>
                        <Button>
                           siguiente
                           <ArrowRightIcon className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
