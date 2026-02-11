'use server';
import { getApiUrl } from '@/utils/server-url';
import { isServer } from '@/utils/is-server';
import { authOptions } from '@/auth.config';
import { getServerSession } from 'next-auth';
import {
  AssociatedCompanyListResponse,
  AssociatedCompanyResponse,
  CreateAssociatedCompanyCommand,
  UpdateAssociatedCompanyCommand,
  DeleteAssociatedCompanyResponse,
} from '@/interfaces/associated-company/associated-company.interface';

export async function getAllAssociatedCompanies(ecommerceUserId: string): Promise<AssociatedCompanyListResponse> {
  try {
    const url = isServer
      ? getApiUrl(`/api/associated-company/GetAll/${ecommerceUserId}?all=true`)
      : `/api/associated-company/GetAll/${ecommerceUserId}?all=true`;
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
    console.error('Error fetching associated companies:', error);
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

export async function createAssociatedCompany(command: CreateAssociatedCompanyCommand): Promise<AssociatedCompanyResponse> {
  try {
    const url = isServer
      ? getApiUrl('/api/associated-company/Create')
      : '/api/associated-company/Create';
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
    console.error('Error creating associated company:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión'],
    };
  }
}

export async function updateAssociatedCompany(id: number, command: UpdateAssociatedCompanyCommand): Promise<AssociatedCompanyResponse> {
  try {
    const url = isServer
      ? getApiUrl(`/api/associated-company/Update/${id}`)
      : `/api/associated-company/Update/${id}`;
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
    console.error('Error updating associated company:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión'],
    };
  }
}

export async function deleteAssociatedCompany(id: number): Promise<DeleteAssociatedCompanyResponse> {
  try {
    const url = isServer
      ? getApiUrl(`/api/associated-company/Delete/${id}`)
      : `/api/associated-company/Delete/${id}`;
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
    console.error('Error deleting associated company:', error);
    return {
      succeeded: false,
      message: 'Error de conexión. Por favor, intenta de nuevo.',
      errors: ['Error de conexión'],
    };
  }
}
