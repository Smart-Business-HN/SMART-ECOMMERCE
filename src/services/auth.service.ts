'use server';
import { LoginEcommerceUserCommand, LoginResponse, CreateEcommerceUserCommand, CreateUserResponse, UserProfileResponse, UpdateUserCommand, UpdateUserResponse, UpdateProfileImageResponse } from '@/interfaces/auth/auth.interface';
import { getApiUrl } from '@/utils/server-url';
import { isServer } from '@/utils/is-server';
import { config } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
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
        succeeded: errorData.Succeeded,
        message: errorData.Message || `Error del servidor: ${response.status}`,
        errors: errorData.Errors || ['Error de conexión']
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login auth service:', error);
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
    const url = isServer ? getApiUrl('/api/auth/ecommerce-register') : '/api/auth/ecommerce-register';
    
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

export async function getUserById(userId: string): Promise<UserProfileResponse> {
  try {
    const url = isServer ? getApiUrl(`/api/auth/user/${userId}`) : `/api/auth/user/${userId}`;
    const session = await getServerSession(config);
    const token  = session?.accessToken;
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
    console.error('Error during user fetch:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}

export async function updateUserProfileImage(userId: string, imageFile: File): Promise<UpdateProfileImageResponse> {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const url = isServer ? getApiUrl(`/api/auth/user/${userId}/profile-image`) : `/api/auth/user/${userId}/profile-image`;
    const session = await getServerSession(config);
    const token = session?.accessToken;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
        // No incluir Content-Type para FormData - el navegador lo establece automáticamente
      },
      body: formData,
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
    console.error('Error updating profile image:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión']
    };
  }
}

export async function updateUser(userId: string, userData: UpdateUserCommand): Promise<UpdateUserResponse> {
  try {
    const url = isServer ? getApiUrl(`/api/auth/user/${userId}`) : `/api/auth/user/${userId}`;
    const session = await getServerSession(config);
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

export async function updateSessionProfileImage(userId: string, newPhotoUrl: string): Promise<void> {
  try {
    // Esta función se ejecuta en el cliente, por lo que necesitamos usar la API route
    const response = await fetch('/api/auth/update-session-photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        photoUrl: newPhotoUrl
      }),
    });

    if (!response.ok) {
      console.error('Error updating session photo');
    }
  } catch (error) {
    console.error('Error updating session photo:', error);
  }
} 