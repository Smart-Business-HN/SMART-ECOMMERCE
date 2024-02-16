import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="/assets/images/backgrounds/404-image.png"
        alt="Error 404"
        className="mb-8 max-w-full -my-32"
      />
      <div className="flex flex-col space-y-4 text-center">
        <p className="text-2xl font-bold">¡Oops! Página no encontrada</p>
        <p className="text-lg">La página que estás buscando no existe.</p>
      </div>
      <div className="space-x-4">
          <Link className='text-blue-500 hover:underline' href="/">Inicio</Link>
          <Link className="text-blue-500 hover:underline" href="/shop">Tienda</Link>
          <Link className="text-blue-500 hover:underline" href="/contact">Contacto</Link>
        </div>
    </div>
  )
}