import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { config } from '@/app/api/auth/[...nextauth]/route';
import { getUserById } from '@/services/auth.service';
import ProfileLayout from '@/components/customer/profile-layout.component';

export default async function ProfilePage() {
  // Verificar autenticación
  const session = await getServerSession(config);
  
  if (!session?.user?.id) {
    redirect('/login');
  }
  // Obtener datos del usuario
  const userResponse = await getUserById(session.user.id);
  if (!userResponse.succeeded || !userResponse.data) {
    console.error('Error fetching user data:', userResponse.message);
    // Redirigir a login si no se pueden obtener los datos
    redirect('/login');
  }

  return (
    <ProfileLayout user={userResponse.data} />
  );
}