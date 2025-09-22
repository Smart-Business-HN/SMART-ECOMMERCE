'use server';
import { getApiUrl } from '@/utils/server-url';
import { isServer } from '@/utils/is-server';
import { config } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { GetCartsResponse, CartDto } from '@/interfaces/cart/cart.interface';

export async function getCartsByCustomerId(customerId: string): Promise<GetCartsResponse> {
  try {
    const url = isServer ? getApiUrl(`/api/cart/GetCarts/${customerId}`) : `/api/cart/GetCarts/${customerId}`;
    const session = await getServerSession(config);
    const token = session?.accessToken;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        succeeded: false,
        message: errorData.message || `Error del servidor: ${response.status}`,
        errors: errorData.errors || ['Error de conexión']
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching carts:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}

export interface GetCartByIdResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data?: CartDto;
}

export async function getCartById(cartId: string): Promise<GetCartByIdResponse> {
  try {
    const url = isServer ? getApiUrl(`/api/cart/GetCartById/${cartId}`) : `/api/cart/GetCartById/${cartId}`;
    const session = await getServerSession(config);
    const token = session?.accessToken;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        succeeded: false,
        message: errorData.message || `Error del servidor: ${response.status}`,
        errors: errorData.errors || ['Error de conexión']
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart by id:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}
