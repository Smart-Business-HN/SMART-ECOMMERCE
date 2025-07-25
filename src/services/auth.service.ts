import { LoginUserCommand, LoginResponse } from '@/interfaces/auth/auth.interface';
import { getApiUrl } from '@/utils/server-url';

export async function loginUser(credentials: LoginUserCommand): Promise<LoginResponse> {
  try {
    // Construir URL absoluta para Server Components
    const url = getApiUrl(`/api/auth/ecommerce-login`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
debugger;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

   
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