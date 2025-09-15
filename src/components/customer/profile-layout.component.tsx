// @ts-nocheck
'use client';
import { useState } from 'react';
import { Card, Typography, Button, Alert } from '@/utils/MTailwind';
import { EcommerceUserDto } from '@/interfaces/auth/auth.interface';
import { updateUserProfileImage, updateSessionProfileImage } from '@/services/auth.service';
import { useSession } from 'next-auth/react';
import ProfileImageUpload from './profile-image-upload.component';
import UserUpdateForm from './user-update-form.component';
import { 
  UserIcon, 
  DocumentTextIcon, 
  ReceiptRefundIcon, 
  MapPinIcon, 
  CreditCardIcon, 
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline';

interface ProfileLayoutProps {
  user: EcommerceUserDto;
}

interface MenuItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<{ 
    user: EcommerceUserDto; 
    onImageUpdate?: (imageUrl: string) => void;
    onUserUpdate?: (user: EcommerceUserDto) => void;
  }>;
}

// Componentes para cada sección del menú
function ProfileSection({ user, onImageUpdate, onUserUpdate }: { 
  user: EcommerceUserDto; 
  onImageUpdate: (imageUrl: string) => void;
  onUserUpdate?: (user: EcommerceUserDto) => void;
}) {
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [imageError, setImageError] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<EcommerceUserDto>(user);
  const [isEditing, setIsEditing] = useState(false);
  const { data: session, update } = useSession();

  const handleImageChange = async (file: File | null) => {
    if (!file) return;

    setIsUpdatingImage(true);
    setImageError('');

    try {
      const response = await updateUserProfileImage(user.id, file);
      
      if (response.succeeded && response.data) {
        // response.data es la URL de la nueva imagen (string)
        const newPhotoUrl = response.data;
        
        // Actualizar el usuario local con la nueva imagen
        const updatedUser = { ...currentUser, photo: newPhotoUrl };
        setCurrentUser(updatedUser);
        onImageUpdate(newPhotoUrl);
        
        // Actualizar la sesión de NextAuth
        await update({
          ...session,
          user: {
            ...session?.user,
            image: newPhotoUrl
          }
        });
      } else {
        setImageError(response.message || 'Error al actualizar la imagen');
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
      setImageError('Error al actualizar la imagen');
    } finally {
      setIsUpdatingImage(false);
    }
  };

  const handleUserUpdateLocal = (updatedUser: EcommerceUserDto) => {
    setCurrentUser(updatedUser);
    setIsEditing(false);
    onUserUpdate?.(updatedUser);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentUser(user); // Restaurar datos originales
  };

  if (isEditing) {
    return (
      <UserUpdateForm
        user={currentUser}
        onUserUpdate={handleUserUpdateLocal}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h3" color="blue-gray" className="mb-4" placeholder="">
          Información Personal
        </Typography>
        <Button
          color="blue"
          size="sm"
          onClick={() => setIsEditing(true)}
          placeholder=""
        >
          Editar Información
        </Button>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Componente de subida de imagen */}
          <div className="lg:col-span-1">
            <ProfileImageUpload
              currentImage={currentUser.photo}
              onImageChange={handleImageChange}
              isLoading={isUpdatingImage}
            />
            
            {/* Mensaje de error */}
            {imageError && (
              <Alert color="red" className="mt-4 text-sm">
                {imageError}
              </Alert>
            )}
          </div>

          {/* Información del usuario */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6" placeholder="">
              <Typography variant="h6" color="blue-gray" className="mb-4" placeholder="">
                Datos Básicos
              </Typography>
              <div className="space-y-3">
                <div>
                  <Typography variant="small" color="gray" placeholder="">
                    Primer Nombre
                  </Typography>
                  <Typography color="blue-gray" placeholder="">
                    {currentUser.firstName}
                  </Typography>
                </div>
                <div>
                  <Typography variant="small" color="gray" placeholder="">
                    Apellido
                  </Typography>
                  <Typography color="blue-gray" placeholder="">
                    {currentUser.lastName}
                  </Typography>
                </div>
                <div>
                  <Typography variant="small" color="gray" placeholder="">
                    Email
                  </Typography>
                  <Typography color="blue-gray" placeholder="">
                    {currentUser.email}
                  </Typography>
                </div>
                <div>
                  <Typography variant="small" color="gray" placeholder="">
                    Usuario
                  </Typography>
                  <Typography color="blue-gray" placeholder="">
                    {currentUser.userName}
                  </Typography>
                </div>
              </div>
            </Card>

            <Card className="p-6" placeholder="">
              <Typography variant="h6" color="blue-gray" className="mb-4" placeholder="">
                Información Adicional
              </Typography>
              <div className="space-y-3">
                <div>
                  <Typography variant="small" color="gray" placeholder="">
                    Teléfono
                  </Typography>
                  <Typography color="blue-gray" placeholder="">
                    {currentUser.phoneNumber || 'No especificado'}
                  </Typography>
                </div>
                <div>
                  <Typography variant="small" color="gray" placeholder="">
                    Departamento
                  </Typography>
                  <Typography color="blue-gray" placeholder="">
                    {currentUser.department?.name || 'No especificado'}
                  </Typography>
                </div>
                <div>
                  <Typography variant="small" color="gray" placeholder="">
                    Tipo de Cliente
                  </Typography>
                  <Typography color="blue-gray" placeholder="">
                    {currentUser.customerType?.name || 'No especificado'}
                  </Typography>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuotationsSection({ user }: { 
  user: EcommerceUserDto; 
  onImageUpdate?: (imageUrl: string) => void;
  onUserUpdate?: (user: EcommerceUserDto) => void;
}) {
  return (
    <div className="space-y-6">
      <Typography variant="h3" color="blue-gray" className="mb-4" placeholder="">
        Mis Cotizaciones
      </Typography>
      <Card className="p-6" placeholder="">
        <Typography color="gray" placeholder="">
          Aquí se mostrarán tus cotizaciones pendientes y realizadas.
        </Typography>
      </Card>
    </div>
  );
}

function InvoicesSection({ user }: { 
  user: EcommerceUserDto; 
  onImageUpdate?: (imageUrl: string) => void;
  onUserUpdate?: (user: EcommerceUserDto) => void;
}) {
  return (
    <div className="space-y-6">
      <Typography variant="h3" color="blue-gray" className="mb-4" placeholder="">
        Mis Facturas
      </Typography>
      <Card className="p-6" placeholder="">
        <Typography color="gray" placeholder="">
          Aquí se mostrarán tus facturas y documentos de compra.
        </Typography>
      </Card>
    </div>
  );
}

function AddressesSection({ user }: { 
  user: EcommerceUserDto; 
  onImageUpdate?: (imageUrl: string) => void;
  onUserUpdate?: (user: EcommerceUserDto) => void;
}) {
  return (
    <div className="space-y-6">
      <Typography variant="h3" color="blue-gray" className="mb-4" placeholder="">
        Direcciones
      </Typography>
      <Card className="p-6" placeholder="">
        <Typography color="gray" placeholder="">
          Aquí podrás gestionar tus direcciones de envío y facturación.
        </Typography>
      </Card>
    </div>
  );
}

function PaymentMethodsSection({ user }: { 
  user: EcommerceUserDto; 
  onImageUpdate?: (imageUrl: string) => void;
  onUserUpdate?: (user: EcommerceUserDto) => void;
}) {
  return (
    <div className="space-y-6">
      <Typography variant="h3" color="blue-gray" className="mb-4" placeholder="">
        Métodos de Pago
      </Typography>
      <Card className="p-6" placeholder="">
        <Typography color="gray" placeholder="">
          Aquí podrás gestionar tus métodos de pago guardados.
        </Typography>
      </Card>
    </div>
  );
}

function CompaniesSection({ user }: { 
  user: EcommerceUserDto; 
  onImageUpdate?: (imageUrl: string) => void;
  onUserUpdate?: (user: EcommerceUserDto) => void;
}) {
  return (
    <div className="space-y-6">
      <Typography variant="h3" color="blue-gray" className="mb-4" placeholder="">
        Sociedades
      </Typography>
      <Card className="p-6" placeholder="">
        <Typography color="gray" placeholder="">
          Aquí podrás gestionar las sociedades asociadas a tu cuenta.
        </Typography>
      </Card>
    </div>
  );
}

const menuItems: MenuItem[] = [
  {
    id: 'profile',
    name: 'Perfil',
    icon: UserIcon,
    component: ProfileSection
  },
  {
    id: 'quotations',
    name: 'Mis Cotizaciones',
    icon: DocumentTextIcon,
    component: QuotationsSection
  },
  {
    id: 'invoices',
    name: 'Mis Facturas',
    icon: ReceiptRefundIcon,
    component: InvoicesSection
  },
  {
    id: 'addresses',
    name: 'Direcciones',
    icon: MapPinIcon,
    component: AddressesSection
  },
  {
    id: 'payment-methods',
    name: 'Métodos de Pago',
    icon: CreditCardIcon,
    component: PaymentMethodsSection
  },
  {
    id: 'companies',
    name: 'Sociedades',
    icon: BuildingOfficeIcon,
    component: CompaniesSection
  }
];

export default function ProfileLayout({ user }: ProfileLayoutProps) {
  const [activeSection, setActiveSection] = useState('profile');
  const [currentUser, setCurrentUser] = useState<EcommerceUserDto>(user);

  const handleImageUpdate = (imageUrl: string) => {
    setCurrentUser(prev => ({ ...prev, photo: imageUrl }));
  };

  const handleUserUpdate = (updatedUser: EcommerceUserDto) => {
    setCurrentUser(updatedUser);
  };

  const ActiveComponent = menuItems.find(item => item.id === activeSection)?.component || ProfileSection;

  return (
    <div className=" bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Typography variant="h1" color="blue-gray" className="" placeholder="">
            Mi Perfil
          </Typography>
          <Typography color="gray" placeholder="">
            Gestiona tu información personal y preferencias
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menú lateral */}
          <div className="lg:col-span-1">
            <Card className="p-4" placeholder="">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <ActiveComponent 
              user={currentUser} 
              onImageUpdate={handleImageUpdate}
              onUserUpdate={handleUserUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
