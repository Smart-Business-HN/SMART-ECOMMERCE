import { LoginUserCommand, LoginResponse } from '@/interfaces/auth/auth.interface';

export async function loginUser(credentials: LoginUserCommand): Promise<LoginResponse> {
  try {
    // Determinar si estamos en el cliente o servidor
    const isClient = typeof window !== 'undefined';
    
    let url: string;
    if (isClient) {
      // En el cliente, usar URL relativa al proxy interno
      url = '/api/auth/ecommerce-login';
    } else {
      // En el servidor, usar URL completa
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'https://localhost:3000' 
        : process.env.NEXT_PUBLIC_BASE_URL || '';
      url = `${baseUrl}/api/auth/ecommerce-login`;
    }

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