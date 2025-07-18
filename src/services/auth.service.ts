import { LoginUserCommand, LoginResponse } from '@/interfaces/auth/auth.interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.smartbusiness.site/api/v2';

export async function loginUser(credentials: LoginUserCommand): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/User/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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