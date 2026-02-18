import { NextRequest, NextResponse } from 'next/server';
import { CreateContactMessageCommand } from '@/interfaces/contact/contact.interface';

export async function POST(request: NextRequest) {
  try {
    const body: CreateContactMessageCommand = await request.json();

    // Validación básica server-side
    if (!body.firstName || !body.lastName || !body.email || !body.phoneNumber || !body.subject || !body.messageContent) {
      return NextResponse.json(
        {
          succeeded: false,
          message: 'Todos los campos son requeridos',
          errors: ['Validación fallida']
        },
        { status: 400 }
      );
    }

    // URL del backend - usar v1 para Message controller
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/v2', '/v1') || 'https://localhost:7211/api/v1';
    const url = `${baseUrl}/Message/Create`;

    // Preparar el body con los nombres de campos que espera el backend (PascalCase)
    const backendBody = {
      FirstName: body.firstName,
      LastName: body.lastName,
      Email: body.email,
      PhoneNumber: body.phoneNumber,
      Subject: body.subject,
      MessageContent: body.messageContent,
      CountryId: body.countryId,
      DepartmentId: body.departmentId,
      CustomerId: body.customerId || null
    };

    // Preparar headers con Secret Key
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // Agregar Secret Key si está configurado
    const secretKey = process.env.BACKEND_SECRET_KEY;
    if (secretKey) {
      headers['secret-key'] = secretKey;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(backendBody),
      // En desarrollo, ignorar errores de certificado SSL auto-firmado
      ...(process.env.NODE_ENV === 'development' && {
        // @ts-ignore - Esta opción no está en los tipos de fetch pero es necesaria para Node.js
        rejectUnauthorized: false
      })
    });

    if (!response.ok) {
      // Si es 401, es problema de autenticación (Secret Key inválido)
      if (response.status === 401) {
        return NextResponse.json(
          {
            succeeded: false,
            message: 'Error de autenticación. Contacta al administrador.',
            errors: ['Unauthorized']
          },
          { status: 401 }
        );
      }

      // Intentar obtener mensaje del backend
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          succeeded: false,
          message: errorData.message || `Error del backend: ${response.status}`,
          errors: errorData.errors || ['Error del servidor']
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy messages error:', error);
    return NextResponse.json(
      {
        succeeded: false,
        message: 'Error de conexión. Por favor, intenta de nuevo.',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      },
      { status: 500 }
    );
  }
}
