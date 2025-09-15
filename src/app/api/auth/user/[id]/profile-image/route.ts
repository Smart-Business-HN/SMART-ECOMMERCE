import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Obtener el archivo de imagen del FormData
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    
    if (!imageFile) {
      return NextResponse.json(
        { 
          succeeded: false, 
          message: 'No se proporcionó ninguna imagen', 
          errors: ['No image provided'] 
        },
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { 
          succeeded: false, 
          message: 'El archivo debe ser una imagen', 
          errors: ['Invalid file type'] 
        },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { 
          succeeded: false, 
          message: 'La imagen debe ser menor a 5MB', 
          errors: ['File too large'] 
        },
        { status: 400 }
      );
    }

    // Crear FormData para enviar al backend
    const backendFormData = new FormData();
    backendFormData.append('file', imageFile);
    const token = request.headers.get('Authorization')?.split(' ')[1];
    // URL del backend
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/User/UpdateProfilePhoto/${id}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
        // No incluir Content-Type para FormData - se establece automáticamente
      },
      method: 'PUT',
      body: backendFormData,
      // En desarrollo, ignorar errores de certificado SSL auto-firmado
      ...(process.env.NODE_ENV === 'development' && {
        // @ts-ignore - Esta opción no está en los tipos de fetch pero es necesaria para Node.js
        rejectUnauthorized: false
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating profile image:', error);
    return NextResponse.json(
      { 
        succeeded: false, 
        message: 'Error al actualizar la imagen de perfil', 
        errors: [error instanceof Error ? error.message : 'Unknown error'] 
      },
      { status: 500 }
    );
  }
}
