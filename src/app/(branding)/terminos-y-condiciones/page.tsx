import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | SMART BUSINESS - Políticas Legales y Condiciones de Uso',
  description: 'Conoce los términos y condiciones legales de SMART BUSINESS. Políticas de pago, entrega, privacidad, responsabilidades y condiciones de uso de nuestro sitio web de comercio electrónico en Honduras.',
  keywords: [
    'términos y condiciones',
    'políticas legales',
    'condiciones de uso',
    'SMART BUSINESS',
    'comercio electrónico Honduras',
    'políticas de pago',
    'políticas de entrega',
    'privacidad y seguridad',
    'responsabilidades legales',
    'compra online',
    'e-commerce Honduras',
    'políticas de garantía',
    'métodos de pago',
    'entrega a domicilio',
    'protección de datos'
  ],
  authors: [{ name: 'SMART BUSINESS S. DE R.L.' }],
  creator: 'SMART BUSINESS S. DE R.L.',
  publisher: 'SMART BUSINESS S. DE R.L.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://smartbusiness.site'),
  alternates: {
    canonical: '/terminos-y-condiciones',
  },
  openGraph: {
    title: 'Términos y Condiciones | SMART BUSINESS',
    description: 'Conoce los términos y condiciones legales de SMART BUSINESS. Políticas de pago, entrega, privacidad y condiciones de uso de nuestro sitio web.',
    url: 'https://smartbusiness.site/terminos-y-condiciones',
    siteName: 'SMART BUSINESS',
    locale: 'es_HN',
    type: 'website',
    images: [
      {
        url: 'https://www.smartbusiness.site/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Términos y Condiciones SMART BUSINESS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Términos y Condiciones | SMART BUSINESS',
    description: 'Conoce los términos y condiciones legales de SMART BUSINESS. Políticas de pago, entrega, privacidad y condiciones de uso.',
    images: ['/images/twitter-terminos-condiciones.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'legal',
  classification: 'terms and conditions',
  other: {
    'geo.region': 'HN',
    'geo.placename': 'Honduras',
    'DC.title': 'Términos y Condiciones SMART BUSINESS',
    'DC.creator': 'SMART BUSINESS S. DE R.L.',
    'DC.subject': 'Términos y Condiciones, Políticas Legales, Comercio Electrónico',
    'DC.description': 'Términos y condiciones legales para el uso del sitio web de SMART BUSINESS',
    'DC.publisher': 'SMART BUSINESS S. DE R.L.',
    'DC.contributor': 'SMART BUSINESS S. DE R.L.',
    'DC.date': '2023-11-11',
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': 'https://smartbusiness.site/terminos-y-condiciones',
    'DC.language': 'es',
    'DC.coverage': 'Honduras',
    'DC.rights': '© 2023 SMART BUSINESS S. DE R.L. Todos los derechos reservados',
  },
};

export default function TermsAndConditions() {
    return(
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Términos y Condiciones",
                        "description": "Términos y condiciones legales para el uso del sitio web de SMART BUSINESS S. DE R.L.",
                        "url": "https://smartbusiness.site/terminos-y-condiciones",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "SMART BUSINESS S. DE R.L.",
                            "url": "https://smartbusiness.site",
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+504-8818-7765",
                                "email": "consultas@smartbusiness.site",
                                "contactType": "customer service",
                                "availableLanguage": "Spanish"
                            },
                            "address": {
                                "@type": "PostalAddress",
                                "addressCountry": "HN",
                                "addressRegion": "Honduras"
                            }
                        },
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Inicio",
                                    "item": "https://smartbusiness.site"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Términos y Condiciones",
                                    "item": "https://smartbusiness.site/terminos-y-condiciones"
                                }
                            ]
                        },
                        "dateModified": "2023-11-11",
                        "publisher": {
                            "@type": "Organization",
                            "name": "SMART BUSINESS S. DE R.L.",
                            "url": "https://smartbusiness.site"
                        }
                    })
                }}
            />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="w-full max-w-5xl mx-auto px-5 py-4">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                    <li>
                        <Link href="/" className="hover:text-blue-600 transition-colors" aria-label="Ir al inicio">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <span aria-hidden="true">/</span>
                    </li>
                    <li aria-current="page">
                        <span className="text-gray-900 font-medium">Términos y Condiciones</span>
                    </li>
                </ol>
            </nav>

            <div className='w-full max-w-7xl mx-auto px-5'>
                <div className='container my-5'>
                    <h1 id="terminos-titulo" className='text-gray-700 font-bold text-3xl'>Términos y Condiciones</h1>
                    <h2 className='text-gray-700 font-semibold text-md md:text-2xl'>Bienvenido al sitio de compras en Línea de SMART BUSINESS S. DE R.L.</h2>
                    <p className='text-gray-500 text-md mb-5'>Última actualización y revisión: 11 de noviembre, 2023.</p>
                    
                    <section aria-labelledby="terminos-titulo">
                        <p className='text-gray-500 text-md text-justify mb-2'>Smart Business Sociedad de Responsabilidad Limitada (en adelante "Smart Business") te ofrece servicios de compra en línea de los productos que comercializa Smart Business (en adelante el "Producto" o los "Productos") mediante el sitio: www.smartbusiness.site (en adelante el "Sitio") y su uso está sujeto a los términos y condiciones establecidos en el presente documento (en adelante los "Términos y Condiciones"). Por favor lea cuidadosamente estos términos y condiciones antes de utilizar el Sitio. Al acceder o utilizar el Sitio, usted el Usuario (en adelante también podrá ser referido como el "Cliente") expresamente acepta que quedará vinculado a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de los términos y condiciones, favor no utilizar el Sitio. Estos términos y condiciones se aplican a todos los visitantes, usuarios y otras personas que acceden o utilizan el Sitio. Nos reservamos el derecho de cambiar cualquier información en el Sitio y de los presente Términos y Condiciones en cualquier momento. En el Sitio siempre se encontrará la versión actualizada de los Términos y Condiciones.</p>
                    </section>

                    <section aria-labelledby="metodos-pago-titulo">
                        <h2 id="metodos-pago-titulo" className='text-gray-700 font-bold text-2xl'>MÉTODOS DE PAGO</h2>
                        <p className='text-gray-500 text-md text-justify mb-2'>Smart Business utiliza los servicios de pasarela de pago y pagos en línea del producto Compra-Click operada por Banco de America central BAC Credomatic. Para más información sobre el método de pago con <a className='text-blue-400 hover:text-blue-600 transition-colors' href='https://www.baccredomatic.com/es-gt/empresas/comercios-afiliados?categoria=todo&nombre=compra-click&id=115331%3F%3DGUAG-CORE-AFL-000007-GL-TC-PR-GG-B5-SR-00000%2FADQUIRIENCIA&gclid=Cj0KCQiAnuGNBhCPARIsACbnLzqg3AGlrznyyzilmV3LwBpX7pcUkRGrYfHfZHmffzrV562xjTgIE7waAtNDEALw_wcB' target="_blank" rel="noopener noreferrer" aria-label="Más información sobre Compra-Click (se abre en nueva ventana)">Compra-Click</a> ingresar a la siguiente pagina: Pagina de Compra-Click. Las formas de pago autorizadas desde el Sitio son las siguientes:</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Smart Business se limita al envió de los datos necesarios para el pago directo al método de pago mediante un túnel de seguridad, no teniendo acceso a los datos de: número de tarjeta, ccv, fecha de vencimiento y nombre de tarjeta habiente.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Los Clientes que tengan acceso a una línea de crédito para compras con Smart Business estarán sujetos a la POLITICA DE CREDITOS de Smart Business en cuanto al método de pago se refiere. En cuanto al uso y demás condiciones del Sitio se refiere, este tipo de clientes estarán sujetos a estos Términos y Condiciones cuando realicen compras en línea mediante el Sitio. Se deja expresa constancia que Smart Business no se hace responsable por los cobro o reintegros que deban efectuar los Bancos emisores de tarjetas de crédito; siendo dichas entidades emisoras las únicas responsables de efectuar en tiempo y forma el cobro o reintegro correspondiente.</p>
                    </section>

                    <section aria-labelledby="entrega-titulo">
                        <h2 id="entrega-titulo" className='text-gray-700 font-bold text-2xl'>LUGAR Y TIEMPO DE ENTREGA</h2>
                        <p className='text-gray-500 text-md text-justify mb-2'>Los métodos y costos de envío que le brinda Smart Business dependerán de la disponibilidad del Producto/s, cantidad de Productos y del lugar de entrega de los mismos.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Una vez registrado podrá conocer el costo de entrega de los Productos seleccionados para una localidad y departamento de lugar de destino. Las entregas se realizarán en el domicilio indicado por el Usuario. Es requisito del Usuario proporcionar la dirección del domicilio exacta para hacer la entrega del Producto, si la dirección proporcionada no es veraz, es incorrecta, inexacta, ilocalizable o desactualizada, Smart Business no se hace responsable por la entrega del Producto en su domicilio. Si por alguno de los motivos antes descritos Smart Business no pueda hacer la entrega del Producto en la dirección proporcionada, Smart Business enviará un correo, mensaje o llamada de notificación de imposibilidad de entrega y el Usuario podrá hacer su retiro en la Tienda que Smart Business designe durante los diez (10) días hábiles posteriores a la notificación de imposibilidad de entrega. Transcurrido dicho tiempo sin hacer el retiro del Producto, se procederá a la reversión correspondiente. Se deja expresa constancia que Smart Business no se hace responsable por los reintegros que deban efectuar los Bancos emisores de tarjetas de crédito; siendo dichas entidades emisoras las únicas responsables de efectuar en tiempo y forma el reintegro correspondiente. Los domingos y días festivos no se realizarán entregas, por lo tanto, para los plazos otorgados se deberá tener en cuenta solo días hábiles. Días hábiles: lunes a viernes de 8 a.m. a 5 p.m.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>La fecha de entrega comenzará a transcurrir una vez que el pago de la transacción ha sido confirmado. Se exceptúan de la presente disposición los clientes que tiene una línea crédito directamente con Smart Business, quien estarán sujetos a los POLITICAS DE CREDITO en cuanto a los tiempos de envió y/o entrega, Smart Business se reserva el derecho de no entregar pedidos en domicilios que se encuentren zonas en las que las empresas de mensajería tipifiquen como zonas de alto riesgo, en estos casos la entrega se realizará en la tienda de Smart Business o agencia de empresa de paqueteria más cercana a su domicilio.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Asimismo, en el momento de la entrega del Producto adquirido se solicitará a la persona receptora del Producto un documento que identifique a la misma, como:</p>
                        <ul className='ml-2' role="list" aria-label="Documentos de identificación requeridos">
                            <li className='text-gray-500 text-md text-justify mb-2'>·Cédula de Identidad</li>
                            <li className='text-gray-500 text-md text-justify mb-2'>·Carnet de Residente (en caso de extranjero residente)</li>
                            <li className='text-gray-500 text-md text-justify mb-2'>·Pasaporte (en caso de extranjero)</li>
                        </ul>
                        <p className='text-gray-500 text-md text-justify mb-2'>Asimismo, el receptor deberá firmar el recibo, incluir su nombre completo y numero del documento de identidad.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>En caso de que el Cliente no le fuere posible recibirlo, podrá autorizar a un tercero para recibirlo (en adelante la" Persona Autorizada"), notificando su identidad vía correo electrónico a Smart Business o comunicándose a la dirección de correo electrónico: <a href="mailto:consultas@smartbusiness.site" className="text-blue-400 hover:text-blue-600 transition-colors" aria-label="Enviar correo a consultas@smartbusiness.site">consultas@smartbusiness.site</a> o al siguente número de teléfono: <a href="tel:+50488187765" className="text-blue-400 hover:text-blue-600 transition-colors" aria-label="Llamar al 8818-7765">8818-7765</a>. Al momento de la entrega, la Persona Autorizada debe presentar los siguientes documentos:</p>
                        <ul className='ml-2' role="list" aria-label="Documentos requeridos para persona autorizada">
                            <li className='text-gray-500 text-md text-justify mb-2'>·Tarjeta de identidad o identificación válida</li>
                            <li className='text-gray-500 text-md text-justify mb-2'>·Nota de autorización de recepción debidamente firmada por el Usuario</li>
                            <li className='text-gray-500 text-md text-justify mb-2'>·Fotocopia de la tarjeta de identidad del Usuario</li>
                        </ul>
                        <p className='text-gray-500 text-md text-justify mb-2'>Si en el acto de la entrega del Producto(s) solicitado no puede ser recibido por el Usuario o la Persona Autorizada, el Producto no será entregado a ninguna persona que no esté previamente autorizada, procediendo Smart Business a notificar vía correo electrónico o por telefoono al Usuario que no se encontró el responsable de recibirlo y se acordará el retiro del Producto(s) en la tienda designada.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Smart Business podrá contactar al Usuario/Cliente vía telefónica para realizar una validación de sus datos, debiendo el Usuario proporcionar un número telefónico en Honduras para tales efectos. Se recomienda al Usuario/Cliente revisar el Producto que no tenga ralladuras o golpes producto del traslado, antes de firmar la conformidad de entrega. La compra del Producto(s) mediante el Sitio está sujeto a la política de garantías de Smart Business, misma que está disponible en el Sitio: Politicas.</p>
                    </section>

                    <section aria-labelledby="moneda-titulo">
                        <h2 id="moneda-titulo" className='text-gray-700 font-bold text-2xl'>MONEDA</h2>
                        <p className='text-gray-500 text-md text-justify mb-2'>Los precios en la página web serán desplegados en Lempiras. Los precios reflejados en nuestro sitio web ya incluyen el impuesto sobre venta. Los gastos por envío y estos serán acorde al tipo de producto, método de envió y/o al domicilio indicado por el usuario. El detalle de los gastos de envió serán claramente detallados previo a confirmar la compra. Si eres cliente mayorista, los precios reflejados en el sitio no mostraran impuesto sobre venta en la lista de precio – éste se verá reflejado una vez se agregue el producto al carrito.</p>
                    </section>

                    <section aria-labelledby="responsabilidades-titulo">
                        <h2 id="responsabilidades-titulo" className='text-gray-700 font-bold text-2xl'>LIMITACIÓN DE RESPONSABILIDADES</h2>
                        <p className='text-gray-500 text-md text-justify mb-2'>El Usuario está de acuerdo que no podrá:</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Reproducir, modificar, copiar, distribuir, trasmitir, exhibir o de otra forma, hacer uso comercial de cualquier contenido del Sitio, a menos que tenga consentimiento por escrito de parte de Smart Business. Smart Business es una marca registrada y se encuentran todos los derechos reservados a favor de Smart Business.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Hackear, interferir, dañar, inutilizar, sobrecargar, transmitir gusanos o virus o cualquier código de naturaleza destructiva al Sitio, o modificar otro sitio web con el fin de implicar falsamente que está asociado o afiliado con Smart Business.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Smart Business no es responsable por:</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Garantizar la disponibilidad ininterrumpida del sitio, o que este servicio funcionará a tiempo, en forma segura y sin error.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Cualquier acción o transacción efectuada por un tercero que use su nombre y datos personales.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Smart Business quedará exento de toda responsabilidad y liberada del cumplimiento de sus obligaciones, si por razones de caso fortuito o fuerza mayor tales como sismos, cortes de energía eléctrica y/o del servicio telefónico y/o de líneas de transmisión de datos, actos terroristas, huelgas, desordenes públicos, calamidades políticas u otros similares, no se pudiere mantener en funcionamiento u operativo la venta del producto o el servicio contratado.</p>
                    </section>

                    <section aria-labelledby="privacidad-titulo">
                        <h2 id="privacidad-titulo" className='text-gray-700 font-bold text-2xl'>PRIVACIDAD Y SEGURIDAD</h2>
                        <p className='text-gray-500 text-md text-justify mb-2'>Toda la información que provee el cliente al momento de registrarse o realizar una compra será tratada con absoluta confidencialidad y privacidad por parte de Smart Business. El Sitio no recopila información sin su consentimiento, esto con el fin de mejorar la seguridad y confidencialidad.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Smart Business se limita a resguardar la siguiente información del cliente:</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Información personal: su nombre, dirección física, número de teléfono, correo electrónico, numero de identidad y/o RTN.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Información no personalizada identificable: dirección IP, tipo de navegador, sistema operativo, ISP (Proveedor de internet), localidad de conexión y paginaciones específicas del Sitio, que se recopilan para ganar una mejor comprensión de las necesidades del desarrollo del sitio.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Smart Business se limita al envió de los datos necesarios para el pago directo al método de pago mediante un túnel de seguridad, no teniendo acceso a los datos de: número de tarjeta, cvc, fecha de vencimiento y nombre de tarjetahabiente. Al usar nuestro sitio, el Usuario expresamente autoriza a Smart Business la recopilación y el uso de su información personal tal como lo describe esta Política de Privacidad. Si el Usuario tuviere algún tipo de disconformidad se limitará en el ingreso de información personal y no utilizará el Sitio.</p>
                    </section>

                    <section aria-labelledby="conformidad-titulo">
                        <h2 id="conformidad-titulo" className='text-gray-700 font-bold text-2xl'>CONFORMIDAD DEL USUARIO</h2>
                        <p className='text-gray-500 text-md text-justify mb-2'>Mediante la aceptación a estos Términos y Condiciones, se constituye un acuerdo legal entre el Usuario y Smart Business dándose por entendido que el Cliente, antes de solicitar algún servicio o producto a través del Sitio, ha leído, revisado, entendido y acordado los términos expuestos en los Términos y Condiciones de Smart Business. En caso de inconformidad, el usuario deberá abstenerse de completar cualquier compra, de proporcionar información personal, así como de levantar algún requerimiento comercial.</p>
                        <p className='text-gray-500 text-md text-justify mb-2'>Mediante el uso del sitio, el Usuario acepta los Términos y Condiciones del presente y declara bajo juramento ser mayor de edad o contar con la debida autorización para someterse a los Términos y Condiciones. Los padres, tutores o responsables de los menores de edad, son plenamente responsables por el uso del Sitio por parte de éstos.</p>
                    </section>

                    <section aria-labelledby="comunicacion-titulo">
                        <h2 id="comunicacion-titulo" className='text-gray-700 font-bold text-2xl'>COMUNICACIÓN</h2>
                        <p className='text-gray-500 text-md text-justify mb-2'>Para cualquier duda o comentario con respecto a estos Termino y Condiciones y sobre el Sitio se puede contactar con Smart Business a la dirección de correo electrónico: <a href="mailto:consultas@smartbusiness.site" className="text-blue-400 hover:text-blue-600 transition-colors" aria-label="Enviar correo a consultas@smartbusiness.site">consultas@smartbusiness.site</a> o a los número(s) de teléfono: <a href="tel:+50488187765" className="text-blue-400 hover:text-blue-600 transition-colors" aria-label="Llamar al 8818-7765">8818-7765</a> ο El sólo uso del Sitio implica la aceptación irrevocable e incondicional por parte del Usuario/Cliente de todos los términos y condiciones fijados en el presente, asumiendo la obligación de respetar los mismos. Al darle "click" sobre la casilla, únicamente ratifico mi aceptación irrevocable e incondicional a estos Términos y Condiciones.</p>
                    </section>
                </div>
            </div>
        </>
    );
}