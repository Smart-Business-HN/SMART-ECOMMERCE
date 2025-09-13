'use server';
import { LoginEcommerceUserCommand, LoginResponse, CreateEcommerceUserCommand, CreateUserResponse } from '@/interfaces/auth/auth.interface';
import { getApiUrl } from '@/utils/server-url';
import { isServer } from '@/utils/is-server';
export async function loginUser(credentials: LoginEcommerceUserCommand): Promise<LoginResponse> {
  try {
    // Construir URL absoluta para Server Components
    const url = isServer ? getApiUrl(`/api/auth/ecommerce-login`) : `/api/auth/ecommerce-login`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
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
    console.error('Error during login:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}

export async function createUser(userData: CreateEcommerceUserCommand): Promise<CreateUserResponse> {
  try {
    // Para el cliente, usar la ruta relativa de la API
    const url = '/api/auth/ecommerce-register';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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
    console.error('Error during user creation:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
} 