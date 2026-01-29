import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.smartbusiness.site';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.smartbusiness.site/api/v2';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tienda`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quienes-somos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  let categoryPages: MetadataRoute.Sitemap = [];
  let productPages: MetadataRoute.Sitemap = [];

  try {
    // Fetch categories with subcategories
    const categoriesRes = await fetch(`${API_BASE_URL}/Category/GetAllNavCategory`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 },
    });

    if (categoriesRes.ok) {
      const categoriesData = await categoriesRes.json();
      const categories = categoriesData.data || [];

      for (const category of categories) {
        categoryPages.push({
          url: `${BASE_URL}/tienda/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });

        for (const sub of category.subCategories || []) {
          categoryPages.push({
            url: `${BASE_URL}/tienda/${category.slug}/${sub.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      }
    }
  } catch (error) {
    console.error('Sitemap: Error fetching categories:', error);
  }

  try {
    // Fetch all products (all=true to get everything)
    const productsRes = await fetch(
      `${API_BASE_URL}/Product/GetAll?pageNumber=0&pageSize=10000&all=true&isUserSignIn=false`,
      {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 },
      }
    );

    if (productsRes.ok) {
      const productsData = await productsRes.json();
      const products = productsData.data || [];

      for (const product of products) {
        if (!product.isActive || !product.showInEcommerce || !product.slug) continue;

        const categorySlug = product.subCategory?.category?.slug;
        const subcategorySlug = product.subCategory?.slug;

        if (categorySlug && subcategorySlug) {
          productPages.push({
            url: `${BASE_URL}/tienda/${categorySlug}/${subcategorySlug}/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      }
    }
  } catch (error) {
    console.error('Sitemap: Error fetching products:', error);
  }

  return [...staticPages, ...categoryPages, ...productPages];
}
