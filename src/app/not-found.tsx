'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br  px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animación Lottie */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <DotLottieReact
      src="/images/backgrounds/404-animation.lottie"
      loop
      autoplay
    />
          </div>
        </div>

        {/* Contenido de texto */}
        <div className="space-y-4">
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700">
            ¡Oops! Página no encontrada
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto">
            La página que buscas no existe o ha sido movida. 
            No te preocupes, te ayudamos a encontrar lo que necesitas.
          </p>

          {/* Botones de navegación */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link 
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Volver al Inicio
            </Link>
            
            <Link 
              href="/tienda"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Ir a la Tienda
            </Link>
          </div>

          {/* Enlaces adicionales */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              También puedes visitar:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/quienes-somos" className="text-blue-600 hover:text-blue-800 transition-colors">
                Quiénes Somos
              </Link>
              <Link href="/servicios" className="text-blue-600 hover:text-blue-800 transition-colors">
                Servicios
              </Link>
              <Link href="/contacto" className="text-blue-600 hover:text-blue-800 transition-colors">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 