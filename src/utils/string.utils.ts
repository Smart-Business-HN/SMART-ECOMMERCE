/**
 * Convierte un slug en un título legible
 * Ejemplo: "mi-slug-de-ejemplo" -> "Mi Slug De Ejemplo"
 * @param slug - El slug a convertir
 * @returns El título formateado
 */
export function slugToTitle(slug: string): string {
    if (!slug) return '';
    
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Convierte un título en un slug
 * Ejemplo: "Mi Título De Ejemplo" -> "mi-titulo-de-ejemplo"
 * @param title - El título a convertir
 * @returns El slug formateado
 */
export function titleToSlug(title: string): string {
    if (!title) return '';
    
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
        .replace(/\s+/g, '-') // Reemplazar espacios con guiones
        .replace(/-+/g, '-') // Remover guiones múltiples
        .trim();
} 