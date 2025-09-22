'use server';
import { getApiUrl } from '@/utils/server-url';
import { isServer } from '@/utils/is-server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { UpdateUserCommand, UpdateUserResponse } from '@/interfaces/auth/auth.interface';

export async function updateUser(userId: string, userData: UpdateUserCommand): Promise<UpdateUserResponse> {
  try {
    const url = isServer ? getApiUrl(`/api/auth/user/${userId}`) : `/api/auth/user/${userId}`;
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    console.error('Error updating user:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}
