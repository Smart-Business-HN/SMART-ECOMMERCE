import { getProductBySlug } from '@/services/products.service';
import { ProductDto } from '@/interfaces/product/product.interface';
import Image from 'next/image';
import { Card, Typography, Button, Carousel, Tabs, TabsBody, TabPanel, TabsHeader, Tab } from '@/utils/MTailwind';
import { notFound } from 'next/navigation';
import { formatNumber } from '@/utils/number-format';
import type { Metadata } from 'next';

interface ProductPageProps {
    params: Promise<{ category: string; subcategory: string; product: string }>;
}

// SEO Metadata dinámico
export async function generateMetadata({ params }: { params: { category: string; subcategory: string; product: string } }): Promise<Metadata> {
    const { product } = await params;
    const response = await getProductBySlug(product, false, 0);
    if (!response.succeeded || !response.data) {
        return {
            title: 'Producto no encontrado',
            description: 'El producto solicitado no existe o no está disponible.',
            robots: { index: false, follow: false },
        };
    }
    const productData: ProductDto = response.data;
    const brand = productData.brand?.name || '';
    const category = productData.subCategory?.category?.name || '';
    const subcategory = productData.subCategory?.name || '';
    const name = productData.name || '';
    const sku = productData.code || '';
    const description = productData.ecommerceDescription
        ? productData.ecommerceDescription.replace(/<[^>]+>/g, '').slice(0, 160)
        : productData.description?.slice(0, 160) || '';
    const keywords = [brand, category, subcategory, name, sku].filter(Boolean).join(', ');
    const ogImage = productData.productImages && productData.productImages.length > 0
        ? productData.productImages[0].url
        : '/images/products/no-image-available-icon-vector.webp';
    const canonical = `https://smartbusiness.site/tienda/${productData.subCategory?.category?.slug || ''}/${productData.subCategory?.slug || ''}/${productData.slug}`;

    return {
        title: `${name} | Smart Business Honduras` || 'Producto | Smart Business Honduras',
        description,
        keywords,
        openGraph: {
            title: `${name} | Smart Business Honduras`,
            description,
            url: canonical,
            siteName: 'Smart Business Honduras',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${name} - ${brand}`,
                },
            ],
            locale: 'es_HN',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${name} | ${brand} | Smart Business Honduras`,
            description,
            images: [ogImage],
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
        alternates: {
            canonical,
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, subcategory, product } = await params;
    
    try {
        const response = await getProductBySlug(product, false, 0);
        console.log('Product response:', response);
        
        if (!response.succeeded || !response.data) {
            notFound();
        }
        
        const productData: ProductDto = response.data;
        var hasMoreInformation = false;
        if(productData.ecommerceDescription || productData.productFeatures || productData.productDataSheets) {
            hasMoreInformation = true;
        }

        // Determinar la tab inicial según la jerarquía y disponibilidad
        const initialTab = productData.ecommerceDescription
          ? 'ecommerceDescription'
          : productData.productFeatures && productData.productFeatures.length > 0
          ? 'productFeatures'
          : productData.productDataSheets && productData.productDataSheets.length > 0
          ? 'productDataSheets'
          : undefined;

        return (
            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Carrusel de Imágenes del Producto */}
                    <div className="space-y-4">
                        {productData.productImages && productData.productImages.length > 0 ? (
                            <Carousel loop={true} autoplay={true} className="rounded-xl h-96">
                                {productData.productImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`${productData.name} - Imagen ${index + 1}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                ))}
                            </Carousel>
                        ) : (
                            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/products/no-image-available-icon-vector.webp"
                                    alt={productData.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                    </div>

                    {/* Información del Producto */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{productData.name}</h1>
                            <p className="text-gray-600 text-lg">{'SKU:' + productData.code}</p>
                        </div>

                        {/* Precio */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Precio</p>
                            <p className="text-3xl font-bold text-blue-600">
                                L. {formatNumber(productData.recomendedSalePrice)}
                            </p>
                        </div>

                        {/* Descripción */}
                        {productData.description && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                                <p className="text-gray-600 leading-relaxed">{productData.description}</p>
                            </div>
                        )}

                        {/* Información del Stock */}
                        <div className="gap-4">
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-sm text-gray-600">Stock Actual</p>
                                <p className="text-lg font-semibold text-gray-900">{productData.currentStock > 0 ? 'Disponible' : 'Consultar Stock'}</p>
                            </div>
                           
                        </div>


                        {/* Botones de Acción */}
                        <div className="flex gap-4 pt-4">
                            {/* @ts-ignore */}
                            <Button 
                                size="lg" 
                                color="blue" 
                                className="flex-1"
                                disabled={productData.currentStock <= 0}
                            >
                                {productData.currentStock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                            </Button>
                            {/* @ts-ignore */}
                            <Button 
                                size="lg" 
                                variant="outlined" 
                                color="blue"
                            >
                                Contactar
                            </Button>
                        </div>

                        {/* Información Adicional */}
                        <div className="border-t pt-4">
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p><strong>Marca:</strong> {productData.brand?.name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p><strong>Estado:</strong> {productData.status?.name || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {hasMoreInformation && (
                    <div className="mt-8">
                        <Tabs id="custom-animation" value={initialTab}>
                            <TabsHeader>
                               {productData.ecommerceDescription && (
                                <Tab value="ecommerceDescription">Descripción</Tab>
                               )}
                               {productData.productFeatures && productData.productFeatures.length > 0 && (
                                <Tab value="productFeatures">Características</Tab>
                               )}
                               {productData.productDataSheets && productData.productDataSheets.length > 0 && (
                                <Tab value="productDataSheets">Ficha Técnica</Tab>
                               )}
                            </TabsHeader>
                            <TabsBody
                            animate={{
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 },
                            }}
                        >
                            {productData.ecommerceDescription && (
                                <TabPanel key="ecommerceDescription" value="ecommerceDescription">
                                <div
                                    className="prose"
                                    dangerouslySetInnerHTML={{ __html: productData.ecommerceDescription || '' }}
                                />
                            </TabPanel>
                            )}
                                    {productData.productFeatures && productData.productFeatures.length > 0 && (
                                         <TabPanel key="productFeatures" value="productFeatures">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                                        <div className="space-y-2">
                                            {productData.productFeatures.map((feature, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{feature.title}</p>
                                                        <p className="text-gray-600 text-sm">{feature.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabPanel>
                            )}
                            {productData.productDataSheets && productData.productDataSheets.length > 0 && (
                                <TabPanel key="productDataSheets" value="productDataSheets">
                                    
                                </TabPanel>
                            )}
                        </TabsBody>
                        </Tabs>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
    }
}