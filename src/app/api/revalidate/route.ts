import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Revalida bajo demanda las páginas de la tienda cuando el backend re-fija un precio,
 * para que el precio nuevo aparezca antes de que venza el ISR (detalle de producto = 1h).
 *
 * Protegido por el header `x-revalidate-secret`, que debe coincidir con `REVALIDATE_SECRET`
 * (o `BACKEND_SECRET_KEY`) y con el valor configurado en el backend (RepricingScraper:RevalidateSecret).
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET ?? process.env.BACKEND_SECRET_KEY;
  const provided = request.headers.get('x-revalidate-secret');

  if (!secret || provided !== secret) {
    return NextResponse.json({ revalidated: false, message: 'No autorizado' }, { status: 401 });
  }

  try {
    // Revalida todas las páginas de detalle de producto y los listados de la tienda.
    revalidatePath('/tienda/[category]/[subcategory]/[product]', 'page');
    revalidatePath('/tienda/[category]/[subcategory]', 'page');
    revalidatePath('/tienda/[category]', 'page');
    revalidatePath('/tienda', 'page');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ revalidated: false, message }, { status: 500 });
  }
}
