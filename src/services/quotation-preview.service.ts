'use server';

import {
  QuotationPreviewResponse,
  QuotationCommentsResponse,
  QuotationCommentResponse,
  QuotationItemObservationResponse,
} from '@/interfaces/quotation-preview/quotation-preview.interface';

function getBackendV1Url(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/v2', '/v1')
    || 'https://localhost:7211/api/v1';
  return baseUrl;
}

export async function getQuotationByToken(token: string): Promise<QuotationPreviewResponse> {
  try {
    const url = `${getBackendV1Url()}/QuotationPreview/GetByToken/${token}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        succeeded: false,
        message: errorData.message || 'Cotización no encontrada',
        data: null as any,
        errors: errorData.errors || ['Error de conexión'],
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching quotation preview:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      data: null as any,
      errors: ['Error de conexión'],
    };
  }
}

export async function getQuotationComments(token: string): Promise<QuotationCommentsResponse> {
  try {
    const url = `${getBackendV1Url()}/QuotationPreview/GetComments/${token}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        succeeded: false,
        message: errorData.message || 'Error al obtener comentarios',
        data: [],
        errors: errorData.errors,
      };
    }

    return await response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: 'Error de conexión',
      data: [],
      errors: ['Error de conexión'],
    };
  }
}

export async function addQuotationComment(
  accessToken: string,
  authorName: string,
  message: string,
  authorEmail?: string,
): Promise<QuotationCommentResponse> {
  try {
    const url = `${getBackendV1Url()}/QuotationPreview/AddComment`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AccessToken: accessToken,
        AuthorName: authorName,
        AuthorEmail: authorEmail || null,
        Message: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        succeeded: false,
        message: errorData.message || 'Error al agregar comentario',
        data: null as any,
        errors: errorData.errors,
      };
    }

    return await response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: 'Error de conexión',
      data: null as any,
      errors: ['Error de conexión'],
    };
  }
}

export async function addItemObservation(
  accessToken: string,
  productOfferedId: number,
  authorName: string,
  observation: string,
): Promise<QuotationItemObservationResponse> {
  try {
    const url = `${getBackendV1Url()}/QuotationPreview/AddItemObservation`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AccessToken: accessToken,
        ProductOfferedId: productOfferedId,
        AuthorName: authorName,
        Observation: observation,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        succeeded: false,
        message: errorData.message || 'Error al agregar observación',
        data: null as any,
        errors: errorData.errors,
      };
    }

    return await response.json();
  } catch (error) {
    return {
      succeeded: false,
      message: 'Error de conexión',
      data: null as any,
      errors: ['Error de conexión'],
    };
  }
}
