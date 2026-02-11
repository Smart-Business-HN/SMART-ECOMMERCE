'use server';
import { getApiUrl } from '@/utils/server-url';
import { isServer } from '@/utils/is-server';
import { authOptions } from '@/auth.config';
import { getServerSession } from 'next-auth';
import {
  PaymentMethodListResponse,
  PaymentMethodResponse,
  CreatePaymentMethodCommand,
  UpdatePaymentMethodCommand,
  DeletePaymentMethodResponse,
} from '@/interfaces/payment-method/payment-method.interface';

export async function getAllPaymentMethods(ecommerceUserId: string): Promise<PaymentMethodListResponse> {
  try {
    const url = isServer
      ? getApiUrl(`/api/payment-method/GetAll/${ecommerceUserId}?all=true`)
      : `/api/payment-method/GetAll/${ecommerceUserId}?all=true`;
    const session = await getServerSession(authOptions);
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
        errors: errorData.errors || ['Error de conexión'],
        pageNumber: 0,
        pageSize: 0,
        totalItems: 0,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión'],
      pageNumber: 0,
      pageSize: 0,
      totalItems: 0,
    };
  }
}

export async function createPaymentMethod(command: CreatePaymentMethodCommand): Promise<PaymentMethodResponse> {
  try {
    const url = isServer
      ? getApiUrl('/api/payment-method/Create')
      : '/api/payment-method/Create';
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(command),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        succeeded: false,
        message: errorData.message || `Error del servidor: ${response.status}`,
        errors: errorData.errors || ['Error de conexión'],
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment method:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión'],
    };
  }
}

export async function updatePaymentMethod(id: number, command: UpdatePaymentMethodCommand): Promise<PaymentMethodResponse> {
  try {
    const url = isServer
      ? getApiUrl(`/api/payment-method/Update/${id}`)
      : `/api/payment-method/Update/${id}`;
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(command),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        succeeded: false,
        message: errorData.message || `Error del servidor: ${response.status}`,
        errors: errorData.errors || ['Error de conexión'],
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating payment method:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión'],
    };
  }
}

export async function deletePaymentMethod(id: number): Promise<DeletePaymentMethodResponse> {
  try {
    const url = isServer
      ? getApiUrl(`/api/payment-method/Delete/${id}`)
      : `/api/payment-method/Delete/${id}`;
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const response = await fetch(url, {
      method: 'DELETE',
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
        errors: errorData.errors || ['Error de conexión'],
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting payment method:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión'],
    };
  }
}
