import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Breadcrumbs,
  Typography,
  Button,
  Card,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@/utils/MTailwind';
import {
  WifiIcon,
  CircleStackIcon,
  ServerIcon,
  SignalIcon,
  VideoCameraIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CubeIcon,
  CommandLineIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  KeyIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  HomeIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import ContactForm from '@/components/contact/contact-form.component';

export const metadata: Metadata = {
  title: 'Ubiquiti UniFi Honduras | Distribuidor Oficial - SMART Business',
  description: 'Distribuidor oficial de Ubiquiti UniFi en Honduras. WiFi empresarial, switches PoE, gateways, cámaras IP y soluciones de red profesionales. Cotiza ahora.',
  keywords: [
    'Ubiquiti Honduras',
    'UniFi Honduras',
    'WiFi empresarial Honduras',
    'Access Points Honduras',
    'Switches PoE Honduras',
    'UniFi Dream Machine',
    'Ubiquiti distribuidor oficial',
    'SMART Business',
  ],
  openGraph: {
    title: 'Ubiquiti UniFi - Distribuidor Oficial en Honduras',
    description: 'Soluciones de red empresarial UniFi: WiFi, switches, seguridad y más.',
    url: 'https://smartbusiness.site/marcas/ubiquiti',
    siteName: 'SMART Business Honduras',
    images: [
      {
        url: '/images/brands/ubiquiti-logo.png',
        width: 1200,
        height: 630,
        alt: 'Ubiquiti UniFi Honduras',
      },
    ],
    locale: 'es_HN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ubiquiti UniFi - Distribuidor Oficial Honduras',
    description: 'Soluciones de red empresarial UniFi',
    images: ['/images/brands/ubiquiti-logo.png'],
  },
};

// JSON-LD for structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Ubiquiti UniFi',
  brand: {
    '@type': 'Brand',
    name: 'Ubiquiti Networks',
  },
  description: 'Soluciones de red empresarial UniFi disponibles en Honduras',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'HNL',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'SMART Business Honduras',
    },
  },
};

// Product interfaces
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  url: string;
}

// WiFi Products
const wifiProducts: Product[] = [
  {
    id: 1,
    name: 'UniFi 6 Pro',
    description: 'Access Point WiFi 6 de alto rendimiento para interiores. 5.3 Gbps, PoE+, cobertura de 185m².',
    image: '/images/products/U6-Pro.png',
    url: '/tienda/conectividad/wifi-empresarial/unifi-u6-pro',
  },
  {
    id: 2,
    name: 'UniFi 6 Enterprise',
    description: 'Access Point WiFi 6E empresarial con tecnología de 6 GHz. 7.2 Gbps, PoE++.',
    image: '/images/products/U6-Pro.png',
    url: '/tienda/conectividad/wifi-empresarial/ap-ubiquiti-mimo-4x4-para-uso-empresarial',
  },
  {
    id: 3,
    name: 'UniFi 6 Mesh',
    description: 'Access Point WiFi 6 para exteriores. Diseño resistente al clima, cobertura de hasta 185m².',
    image: '/images/products/u6-mesh.png',
    url: '/tienda/conectividad/wifi-empresarial/ap-wifi6-de-malla-empresarial-ubiquiti',
  },
  {
    id: 4,
    name: 'UniFi 6 In-Wall',
    description: 'Access Point WiFi 6 de pared con switch integrado. Ideal para hoteles y dormitorios.',
    image: '/images/products/u6-iw.png',
    url: '/tienda/conectividad/wifi-empresarial/ap-ubiquiti-mimo-4x4-wifi-6-doble-banda',
  },
  {
    id: 5,
    name: 'UniFi 6 Long Range',
    description: 'Access Point WiFi 6 de largo alcance. Cobertura de hasta 200m², ideal para espacios amplios.',
    image: '/images/products/U6-Pro.png',
    url: '/tienda/conectividad/wifi-empresarial/unifi-u6-lr',
  },
];

// Switch Products
const switchProducts: Product[] = [
  {
    id: 11,
    name: 'USW-24-PoE',
    description: 'Switch administrable de 24 puertos Gigabit con 16 puertos PoE+. 95W total.',
    image: '/images/products/usw-24-poe.png',
    url: '/tienda/conectividad/switches-poe/unifi-usw-24-poe',
  },
  {
    id: 12,
    name: 'USW-48-PoE',
    description: 'Switch administrable de 48 puertos Gigabit con 32 puertos PoE+. 200W total.',
    image: '/images/products/usw-48-poe.png',
    url: '/tienda/conectividad/switches-poe/unifi-usw-48-poe',
  },
  {
    id: 13,
    name: 'USW-Lite-16-POE',
    description: 'Switch empresarial Layer 3 con 24 puertos 2.5GbE PoE++. 400W total.',
    image: '/images/products/usw-lite-16-poe.png',
    url: '/tienda/conectividad/switches/switch-unifi-administrable-poe-16-puertos-ubiquiti',
  },
  {
    id: 14,
    name: 'USW-Lite-8-PoE',
    description: 'Switch compacto de 8 puertos Gigabit con 4 puertos PoE+. Económico y eficiente.',
    image: '/images/products/ubiquiti-logo.png',
    url: '/tienda/conectividad/switches-poe/unifi-usw-lite-8-poe',
  },
];

// Gateway Products
const gatewayProducts: Product[] = [
  {
    id: 21,
    name: 'Dream Machine Pro',
    description: 'Gateway todo en uno con UniFi Network y Protect integrados. 3.5 Gbps, 8 puertos PoE+.',
    image: '/images/products/udm-pro.png',
    url: '/tienda/conectividad/wifi-empresarial/udm-pro-dream-machine-pro',
  },
  {
    id: 22,
    name: 'Dream Router',
    description: 'Router WiFi 6 con UniFi Network integrado. Compact design, ideal para hogares y pequeñas oficinas.',
    image: '/images/products/udr7.png',
    url: '/tienda/conectividad/wifi-empresarial/unifi-dream-machine',
  },
  {
    id: 23,
    name: 'Cloud Gateway Ultra',
    description: 'Gateway compacto de alto rendimiento. 4 Gbps throughput, ideal para redes medianas.',
    image: '/images/products/ucg-ultra.png',
    url: '/tienda/conectividad/wifi-empresarial/ubiquiti-cloud-gateway-ultra',
  },
];

// WISP Products
const wispProducts: Product[] = [
  {
    id: 31,
    name: 'airMAX NanoStation AC',
    description: 'Radio punto a punto de 5 GHz. 450+ Mbps, hasta 15 km de alcance.',
    image: '/images/products/ubiquiti-logo.png',
    url: '/tienda/conectividad/wisp/airmax-nanostation-ac',
  },
  {
    id: 32,
    name: 'airMAX LiteBeam 5AC',
    description: 'Radio punto a punto compacto. Hasta 25 km de alcance, 450+ Mbps.',
    image: '/images/products/ubiquiti-logo.png',
    url: '/tienda/conectividad/wisp/airmax-litebeam-5ac',
  },
  {
    id: 33,
    name: 'airFiber 60 LR',
    description: 'Radio punto a punto de 60 GHz. Hasta 12 km de alcance, 2+ Gbps.',
    image: '/images/products/ubiquiti-logo.png',
    url: '/tienda/conectividad/wisp/airfiber-60-lr',
  },
];

// Protect Products
const protectProducts: Product[] = [
  {
    id: 41,
    name: 'UniFi G4 Bullet',
    description: 'Cámara IP 4MP con visión nocturna IR. PoE, resistente al agua (IP67).',
    image: '/images/products/ubiquiti-logo.png',
    url: '/tienda/seguridad/camaras-ip/unifi-g4-bullet',
  },
  {
    id: 42,
    name: 'UniFi G4 Dome',
    description: 'Cámara IP 4MP tipo domo. Visión nocturna, vandal-proof (IK10).',
    image: '/images/products/ubiquiti-logo.png',
    url: '/tienda/seguridad/camaras-ip/unifi-g4-dome',
  },
  {
    id: 43,
    name: 'UniFi G4 Pro',
    description: 'Cámara IP 4K profesional. Zoom óptico 3x, visión nocturna avanzada.',
    image: '/images/products/ubiquiti-logo.png',
    url: '/tienda/seguridad/camaras-ip/unifi-g4-pro',
  },
];

// Accessories
const accessoryProducts: Product[] = [
  {
    id: 51,
    name: 'PoE++ Injector',
    description: 'Inyector PoE++ de 60W para alimentar dispositivos UniFi de alto consumo.',
    image: '/images/products/ubiquiti-logo.png',
    url: '/tienda/conectividad/accesorios/unifi-poe-injector',
  },
  {
    id: 52,
    name: 'Mounting Bracket',
    description: 'Soporte de montaje universal para Access Points UniFi. Instalación rápida.',
    image: '/images/products/ubiquiti-logo.png',
    url: '/tienda/conectividad/accesorios/unifi-mounting-bracket',
  },
];

// Featured Products (16 productos más populares)
const featuredProducts: Product[] = [
  ...wifiProducts.slice(0, 5),
  ...switchProducts.slice(0, 4),
  ...gatewayProducts.slice(0, 3),
  ...protectProducts.slice(0, 2),
  ...accessoryProducts.slice(0, 2),
];

// Use Cases
const useCases = [
  {
    title: 'Hoteles y Hospitalidad',
    description: 'WiFi de alta velocidad para huéspedes satisfechos. Gestión centralizada de múltiples ubicaciones.',
    icon: BuildingOffice2Icon,
    gradient: 'from-purple-600 to-purple-900',
  },
  {
    title: 'Empresas Corporativas',
    description: 'Red segura y escalable para oficinas. VLANs, firewall y control de acceso integrado.',
    icon: BriefcaseIcon,
    gradient: 'from-blue-600 to-blue-900',
  },
  {
    title: 'Residencial Premium',
    description: 'WiFi en toda la casa sin puntos muertos. Control parental y seguridad avanzada.',
    icon: HomeIcon,
    gradient: 'from-green-600 to-green-900',
  },
  {
    title: 'Educación',
    description: 'Campus y aulas conectadas. Administración de miles de dispositivos desde una sola interfaz.',
    icon: AcademicCapIcon,
    gradient: 'from-orange-600 to-orange-900',
  },
];

// Benefits
const benefits = [
  {
    title: 'Gestión Centralizada',
    description: 'Controla toda tu red desde una sola interfaz: UniFi Network Controller.',
    icon: CommandLineIcon,
  },
  {
    title: 'Escalable',
    description: 'Desde pequeñas oficinas hasta campus universitarios con miles de dispositivos.',
    icon: ArrowTrendingUpIcon,
  },
  {
    title: 'PoE Integrado',
    description: 'Alimentación y datos en un solo cable. Reduce costos de instalación.',
    icon: BoltIcon,
  },
  {
    title: 'Sin Licencias',
    description: 'Software incluido de por vida. Sin costos ocultos ni renovaciones anuales.',
    icon: KeyIcon,
  },
  {
    title: 'Garantía Oficial',
    description: 'Soporte directo de Ubiquiti y garantía de fábrica en todos los productos.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Instalación Profesional',
    description: 'Equipo técnico certificado con más de 300 proyectos UniFi instalados.',
    icon: WrenchScrewdriverIcon,
  },
];

// ProductCard Component
interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, description, url }) => (
  <Card
    className="overflow-hidden hover:shadow-2xl transition-all group"
    placeholder={undefined}
    onPointerEnterCapture={undefined}
    onPointerLeaveCapture={undefined}
    onResize={undefined}
    onResizeCapture={undefined}
  >
    <div className="relative h-48 bg-gray-100">
      <Image
        src={image}
        alt={name}
        fill
        className="object-contain p-4 group-hover:scale-110 transition-transform"
      />
    </div>
    <div className="p-4">
      <Typography variant="h6" className="font-bold text-gray-800 mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
        {name}
      </Typography>
      <Typography className="text-gray-600 text-sm mb-4 line-clamp-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
        {description}
      </Typography>
      <Link href={url}>
        <Button size="sm" color="blue" className="w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
          Ver Detalles
        </Button>
      </Link>
    </div>
  </Card>
);

// Main Component
export default function UbiquitiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <Breadcrumbs className="container mx-auto px-5 py-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
        <Link href="/">Inicio</Link>
        <Link href="/marcas">Marcas</Link>
        <span>Ubiquiti UniFi</span>
      </Breadcrumbs>

      {/* Hero Section with Video */}
      <div className="relative h-[500px] md:h-[700px] overflow-hidden">
        {/* Video de fondo */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/u6-pro-smart-business.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-800/30 to-blue-900/10 "></div>

        {/* Contenido */}
        <div className="relative z-10 container mx-auto px-5 h-full flex flex-col justify-center items-center text-center">
          <Image
            src="/images/corporate/unifi-icon-smart-business.png"
            alt="Ubiquiti Networks"
            width={200}
            height={80}
            className="mb-8 animate-fade-in rounded-xl"
          />

          <Typography variant="h1" className="text-white text-4xl md:text-7xl font-bold mb-4 animate-fade-in animate-delay-100" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
            UniFi Network Solutions
          </Typography>

          <Typography variant="lead" className="text-blue-100 text-lg md:text-2xl max-w-3xl mb-8 animate-fade-in animate-delay-200" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
            <strong>Distribuidor Oficial</strong> en Honduras - WiFi Empresarial, Switches PoE,
            Seguridad IP y Soluciones de Red Profesionales
          </Typography>

          <Link href="#productos">
            <Button
              size="lg"
              color="white"
              className="animate-fade-in animate-delay-300 shadow-2xl hover:shadow-white/50 transition-all"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              Ver Productos UniFi
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheckIcon, label: 'Distribuidor Oficial', value: 'Ubiquiti' },
              { icon: BuildingOfficeIcon, label: 'Instalaciones', value: '300+' },
              { icon: ClockIcon, label: 'Soporte Técnico', value: '24/7' },
              { icon: CubeIcon, label: 'Stock', value: 'Permanente' },
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <Typography variant="h3" className="text-3xl font-bold text-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                  {stat.value}
                </Typography>
                <Typography className="text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>{stat.label}</Typography>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-5 py-16">
        <Typography variant="h2" className="text-4xl font-bold text-center text-gray-800 mb-12" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
          ¿Por qué elegir UniFi?
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all group" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <Typography variant="h5" className="font-bold text-gray-800 mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                {benefit.title}
              </Typography>
              <Typography className="text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                {benefit.description}
              </Typography>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Categories Tabs */}
      <div id="productos" className="bg-white py-16">
        <div className="container mx-auto px-5">
          <Typography variant="h2" className="text-4xl font-bold text-center text-gray-800 mb-12" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
            Portafolio de Productos UniFi
          </Typography>

          <Tabs value="wifi" className="w-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <TabsHeader className="bg-blue-50" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
              <Tab value="wifi" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                <div className="flex items-center gap-2">
                  <WifiIcon className="h-5 w-5" />
                  <span className="hidden md:inline">WiFi</span>
                </div>
              </Tab>
              <Tab value="switches" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                <div className="flex items-center gap-2">
                  <CircleStackIcon className="h-5 w-5" />
                  <span className="hidden md:inline">Switches</span>
                </div>
              </Tab>
              <Tab value="gateways" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                <div className="flex items-center gap-2">
                  <ServerIcon className="h-5 w-5" />
                  <span className="hidden md:inline">Gateways</span>
                </div>
              </Tab>
              <Tab value="wisp" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                <div className="flex items-center gap-2">
                  <SignalIcon className="h-5 w-5" />
                  <span className="hidden md:inline">WISP</span>
                </div>
              </Tab>
              <Tab value="protect" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                <div className="flex items-center gap-2">
                  <VideoCameraIcon className="h-5 w-5" />
                  <span className="hidden md:inline">Protect</span>
                </div>
              </Tab>
              <Tab value="accessories" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                <div className="flex items-center gap-2">
                  <WrenchScrewdriverIcon className="h-5 w-5" />
                  <span className="hidden md:inline">Accesorios</span>
                </div>
              </Tab>
            </TabsHeader>

            <TabsBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
              {/* Tab WiFi */}
              <TabPanel value="wifi">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {wifiProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabPanel>

              {/* Tab Switches */}
              <TabPanel value="switches">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {switchProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabPanel>

              {/* Tab Gateways */}
              <TabPanel value="gateways">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {gatewayProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabPanel>

              {/* Tab WISP */}
              <TabPanel value="wisp">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {wispProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabPanel>

              {/* Tab Protect */}
              <TabPanel value="protect">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {protectProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabPanel>

              {/* Tab Accessories */}
              <TabPanel value="accessories">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {accessoryProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="container mx-auto px-5 py-16 bg-gray-50">
        <Typography variant="h2" className="text-4xl font-bold text-center text-gray-800 mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
          Productos Destacados
        </Typography>
        <Typography className="text-center text-gray-600 mb-12 max-w-2xl mx-auto" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
          Los productos UniFi más populares y recomendados para tu negocio
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="container mx-auto px-5 py-16">
        <Typography variant="h2" className="text-4xl font-bold text-center text-gray-800 mb-12" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
          Casos de Uso UniFi
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="relative h-80 overflow-hidden group cursor-pointer" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient}`}></div>

              {/* Contenido */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <useCase.icon className="h-12 w-12 mb-3" />
                <Typography variant="h4" className="font-bold mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                  {useCase.title}
                </Typography>
                <Typography className="text-gray-200" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                  {useCase.description}
                </Typography>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quotation Form */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Typography variant="h2" className="text-white text-4xl font-bold mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                Solicita tu Cotización UniFi
              </Typography>
              <Typography className="text-blue-100 text-lg" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
                Completa el formulario y un especialista te contactará en menos de 24 horas
                para diseñar la solución UniFi perfecta para tu proyecto
              </Typography>
            </div>

            <Card className="p-8" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
              <ContactForm />
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-5 text-center">
          <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
            ¿Listo para modernizar tu red?
          </Typography>
          <Typography className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
            Únete a cientos de empresas hondureñas que ya confían en UniFi
            para sus soluciones de conectividad y seguridad
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#productos">
              <Button
                size="lg"
                color="blue"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
              >
                Ver Productos
              </Button>
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=+50488187765" target="_blank">
              <Button
                size="lg"
                variant="outlined"
                color="blue"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
              >
                Contactar por WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
