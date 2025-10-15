// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { Card, Typography, Button, Alert } from '@/utils/MTailwind';
import { EcommerceUserDto } from '@/interfaces/auth/auth.interface';
import { updateUserProfileImage, updateSessionProfileImage } from '@/services/auth.service';
import { updateUser } from '@/services/user.service';
import { getCartsByCustomerId } from '@/services/cart.service';
import { CartDto } from '@/interfaces/cart/cart.interface';
import { useSession } from 'next-auth/react';
import ProfileImageUpload from './profile-image-upload.component';
import UserUpdateForm from './user-update-form.component';
import { 
  UserIcon, 
  ShoppingCartIcon,
  DocumentTextIcon, 
  ReceiptRefundIcon, 
  MapPinIcon, 
  CreditCardIcon, 
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { formatNumber } from '@/utils/number-format';

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
  const router = useRouter();
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
      <div className="flex md:flex-row flex-col justify-between items-center">
        <Typography variant="h3" color="blue-gray" className="mb-4 text-2xl md:text-3xl" placeholder="">
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

function CartSectionComponent({ user }: { 
  user: EcommerceUserDto; 
  onImageUpdate?: (imageUrl: string) => void;
  onUserUpdate?: (user: EcommerceUserDto) => void;
}) {
  const [carts, setCarts] = useState<CartDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await getCartsByCustomerId(user.id);
        
        if (response.succeeded && response.data) {
          setCarts(response.data);
        } else {
          setError(response.message || 'Error al cargar los carritos');
        }
      } catch (error) {
        console.error('Error fetching carts:', error);
        setError('Error de conexión. Por favor, intenta de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarts();
  }, [user.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateCartTotal = (cart: CartDto) => {
    if (!cart.cartItems) return 0;
    return cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Typography variant="h3" color="blue-gray" className="mb-4" placeholder="">
          Mis Carritos
        </Typography>
        <Card className="p-6" placeholder="">
          <div className="flex justify-center items-center py-8">
            <Typography color="gray" placeholder="">
              Cargando carritos...
            </Typography>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Typography variant="h3" color="blue-gray" className="mb-4" placeholder="">
          Mis Carritos
        </Typography>
        <Alert color="red" className="text-sm">
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Typography variant="h3" color="blue-gray" className="mb-4" placeholder="">
        Mis Carritos
      </Typography>
      
      {carts.length === 0 ? (
        <Card className="p-6" placeholder="">
          <div className="text-center py-8">
            <Typography color="gray" placeholder="">
              No tienes carritos guardados
            </Typography>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {carts.map((cart) => (
            <Card key={cart.id} className="p-6" placeholder="">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Typography variant="h6" color="blue-gray" placeholder="">
                    Carrito #{cart.id.slice(-8)}
                  </Typography>
                  <Typography variant="small" color="gray" placeholder="">
                    Creado el {formatDate(cart.creationDate)}
                  </Typography>
                </div>
                <div className="text-right">
                  <Typography variant="h6" color="green" placeholder="">
                    L.{ formatNumber(calculateCartTotal(cart))}
                  </Typography>
                  <Typography variant="small" color="gray" placeholder="">
                    {cart.cartItems?.length || 0} productos
                  </Typography>
                </div>
              </div>
              
              {cart.cartItems && cart.cartItems.length > 0 && (
                <div className="space-y-2">
                  <Typography variant="small" color="gray" className="font-medium" placeholder="">
                    Productos:
                  </Typography>
                  {cart.cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex-1">
                        <Typography variant="small" color="blue-gray" placeholder="">
                          {item.product?.name || 'Producto no disponible'}
                        </Typography>
                        <Typography variant="small" color="gray" placeholder="">
                          <strong>Cantidad:</strong> {item.quantity} x L.{formatNumber(item.unitPrice)}
                        </Typography>
                      </div>
                      <Typography variant="small" color="blue-gray" className="font-medium" placeholder="">
                        L.{formatNumber(item.totalPrice)}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-end mt-4 space-x-2">
                <Button
                  size="sm"
                  variant="outlined"
                  placeholder=""
                  onClick={() => router.push(`/cart/${cart.id}`)}
                >
                  Ver Detalles
                </Button>
                <Button
                  size="sm"
                  color="blue"
                  placeholder=""
                >
                  Continuar Compra
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
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
    isEnabled: true,
    name: 'Perfil',
    icon: UserIcon,
    component: ProfileSection
  },
  {
    id: 'carts',
    isEnabled: true,
    name: 'Mis Carritos',
    icon: ShoppingCartIcon,
    component: CartSectionComponent
  },
  {
    id: 'quotations',
    isEnabled: false,
    name: 'Mis Cotizaciones',
    icon: DocumentTextIcon,
    component: QuotationsSection
  },
  {
    id: 'invoices',
    isEnabled: false,
    name: 'Mis Facturas',
    icon: ReceiptRefundIcon,
    component: InvoicesSection
  },
  {
    id: 'addresses',
    isEnabled: false,
    name: 'Direcciones',
    icon: MapPinIcon,
    component: AddressesSection
  },
  {
    id: 'payment-methods',
    isEnabled: false,
    name: 'Métodos de Pago',
    icon: CreditCardIcon,
    component: PaymentMethodsSection
  },
  {
    id: 'companies',
    isEnabled: false,
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
      <div className="px-4 md:px-0 max-w-7xl mx-auto">
        <div className="mb-4">
          <Typography variant="h1" color="blue-gray" className="text-2xl md:text-3xl" placeholder="">
            Mi Perfil
          </Typography>
          <Typography color="gray" placeholder="" className="text-sm md:text-base">
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
                      disabled={!item.isEnabled}
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
