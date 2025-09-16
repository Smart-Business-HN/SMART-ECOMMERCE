import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { config } from '../[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(config);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      );
    }

    const { userId, photoUrl } = await request.json();
    
    // Verificar que el usuario esté actualizando su propia foto
    if (session.user.id !== userId) {
      return NextResponse.json(
        { success: false, message: 'No autorizado para actualizar este usuario' },
        { status: 403 }
      );
    }

    // Actualizar la sesión con la nueva URL de foto
    // Nota: NextAuth no permite actualizar la sesión directamente desde el servidor
    // En su lugar, devolvemos la nueva URL para que el cliente la maneje
    return NextResponse.json({
      success: true,
      photoUrl: photoUrl
    });

  } catch (error) {
    console.error('Error updating session photo:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
