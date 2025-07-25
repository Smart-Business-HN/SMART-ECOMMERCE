import { NavCategoryResponse } from '@/interfaces/http/responses.interface';
import CategoryTreeClient from './category-tree-client.component';
import { getApiUrl } from '@/utils/server-url';

// Server Component para obtener datos
async function getCategories(): Promise<NavCategoryResponse> {
    const url = getApiUrl('/api/categories');

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
}

// Server Component principal
export default async function CategoryTree() {
        const categories: NavCategoryResponse = await getCategories();

        return <CategoryTreeClient categories={categories.data} />;

}