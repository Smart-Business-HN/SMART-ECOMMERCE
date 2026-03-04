'use server';
import { authOptions } from '@/auth.config';
import { getServerSession } from 'next-auth';
import { Response } from '@/interfaces/http/response.interface';

export interface RequestPaymentLinkData {
  cartId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message?: string;
}

export interface CheckoutResponse extends Response {
  data?: string;
}

export async function requestPaymentLink(data: RequestPaymentLinkData): Promise<CheckoutResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/Checkout/RequestPaymentLink`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData: Record<string, unknown> = {};
      try {
        errorData = JSON.parse(errorText);
      } catch {
        // not JSON
      }
      console.error('Backend error (RequestPaymentLink):', response.status, errorText);
      return {
        succeeded: false,
        message: (errorData as { message?: string }).message || `Error del servidor: ${response.status}`,
        errors: (errorData as { errors?: string[] }).errors || ['Error de conexión']
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error requesting payment link:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}
