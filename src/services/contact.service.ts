'use server';
import {
  CreateContactMessageCommand,
  ContactMessageResponse,
  CountriesResponse,
  DepartmentsResponse
} from '@/interfaces/contact/contact.interface';
import { getApiUrl } from '@/utils/server-url';
import { isServer } from '@/utils/is-server';

export async function sendContactMessage(data: CreateContactMessageCommand): Promise<ContactMessageResponse> {
  try {
    // Construir URL absoluta para Server Components
    const url = isServer ? getApiUrl(`/api/messages/create`) : `/api/messages/create`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        succeeded: false,
        message: errorData.message || `Error del servidor: ${response.status}`,
        errors: errorData.errors || ['Error de conexión']
      };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending contact message:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}

export async function getCountries(): Promise<CountriesResponse> {
  try {
    const url = isServer ? getApiUrl('/api/countries') : '/api/countries';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
    console.error('Error fetching countries:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}

export async function getDepartments(): Promise<DepartmentsResponse> {
  try {
    const url = isServer ? getApiUrl('/api/departments') : '/api/departments';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
    console.error('Error fetching departments:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}
