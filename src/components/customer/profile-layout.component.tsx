// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { Card, Typography, Button, Alert, Input, IconButton, Spinner, Select, Option } from '@/utils/MTailwind';
import { EcommerceUserDto } from '@/interfaces/auth/auth.interface';
import { updateUserProfileImage, updateSessionProfileImage } from '@/services/auth.service';
import { updateUser } from '@/services/user.service';
import { getCartsByCustomerId } from '@/services/cart.service';
import { CartDto } from '@/interfaces/cart/cart.interface';
import { AssociatedCompanyDto, CreateAssociatedCompanyCommand, UpdateAssociatedCompanyCommand } from '@/interfaces/associated-company/associated-company.interface';
import { getAllAssociatedCompanies, createAssociatedCompany, updateAssociatedCompany, deleteAssociatedCompany } from '@/services/associated-company.service';
import { PaymentMethodDto, CreatePaymentMethodCommand, UpdatePaymentMethodCommand } from '@/interfaces/payment-method/payment-method.interface';
import { getAllPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } from '@/services/payment-method.service';
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
  PencilIcon,
  TrashIcon,
  PlusIcon,
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
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingMethod, setEditingMethod] = useState<PaymentMethodDto | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();

  const emptyCreateForm = {
    ecommerceUserId: user.id,
    alias: '',
    cardholderName: '',
    cardNumber: '',
    expirationMonth: 1,
    expirationYear: currentYear,
    cardBrand: '',
  };
  const [createFormData, setCreateFormData] = useState(emptyCreateForm);

  const emptyEditForm = {
    id: 0,
    alias: '',
    cardholderName: '',
    expirationMonth: 1,
    expirationYear: currentYear,
    isActive: true,
  };
  const [editFormData, setEditFormData] = useState(emptyEditForm);
  const [formError, setFormError] = useState<string>('');

  const fetchPaymentMethods = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getAllPaymentMethods(user.id);
      if (response.succeeded && response.data) {
        setPaymentMethods(response.data);
      } else {
        setError(response.message || 'Error al cargar los métodos de pago');
      }
    } catch (err) {
      console.error('Error fetching payment methods:', err);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, [user.id]);

  const validateCreateForm = (): boolean => {
    if (!createFormData.alias.trim()) {
      setFormError('El alias es requerido');
      return false;
    }
    if (createFormData.alias.length > 50) {
      setFormError('El alias no debe exceder 50 caracteres');
      return false;
    }
    if (!createFormData.cardholderName.trim()) {
      setFormError('El nombre del titular es requerido');
      return false;
    }
    if (createFormData.cardholderName.length > 100) {
      setFormError('El nombre del titular no debe exceder 100 caracteres');
      return false;
    }
    const cleanNumber = createFormData.cardNumber.replace(/\s/g, '');
    if (!cleanNumber) {
      setFormError('El número de tarjeta es requerido');
      return false;
    }
    if (!/^\d+$/.test(cleanNumber)) {
      setFormError('El número de tarjeta solo debe contener dígitos');
      return false;
    }
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      setFormError('El número de tarjeta debe tener entre 13 y 19 dígitos');
      return false;
    }
    if (!createFormData.cardBrand) {
      setFormError('La marca de la tarjeta es requerida');
      return false;
    }
    const now = new Date();
    if (createFormData.expirationYear < now.getFullYear() ||
      (createFormData.expirationYear === now.getFullYear() && createFormData.expirationMonth < (now.getMonth() + 1))) {
      setFormError('La tarjeta está vencida');
      return false;
    }
    return true;
  };

  const validateEditForm = (): boolean => {
    if (!editFormData.alias.trim()) {
      setFormError('El alias es requerido');
      return false;
    }
    if (editFormData.alias.length > 50) {
      setFormError('El alias no debe exceder 50 caracteres');
      return false;
    }
    if (!editFormData.cardholderName.trim()) {
      setFormError('El nombre del titular es requerido');
      return false;
    }
    if (editFormData.cardholderName.length > 100) {
      setFormError('El nombre del titular no debe exceder 100 caracteres');
      return false;
    }
    const now = new Date();
    if (editFormData.expirationYear < now.getFullYear() ||
      (editFormData.expirationYear === now.getFullYear() && editFormData.expirationMonth < (now.getMonth() + 1))) {
      setFormError('La tarjeta está vencida');
      return false;
    }
    return true;
  };

  const handleCreate = () => {
    setCreateFormData(emptyCreateForm);
    setFormError('');
    setView('create');
  };

  const handleEdit = (method: PaymentMethodDto) => {
    setEditingMethod(method);
    setEditFormData({
      id: method.id,
      alias: method.alias,
      cardholderName: method.cardholderName,
      expirationMonth: method.expirationMonth,
      expirationYear: method.expirationYear,
      isActive: method.isActive,
    });
    setFormError('');
    setView('edit');
  };

  const handleCancel = () => {
    setView('list');
    setEditingMethod(null);
    setCreateFormData(emptyCreateForm);
    setEditFormData(emptyEditForm);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setFormError('');

    try {
      if (view === 'create') {
        if (!validateCreateForm()) { setIsSubmitting(false); return; }
        const command: CreatePaymentMethodCommand = {
          ecommerceUserId: createFormData.ecommerceUserId,
          alias: createFormData.alias,
          cardholderName: createFormData.cardholderName,
          cardNumber: createFormData.cardNumber.replace(/\s/g, ''),
          expirationMonth: createFormData.expirationMonth,
          expirationYear: createFormData.expirationYear,
          cardBrand: createFormData.cardBrand,
        };
        const response = await createPaymentMethod(command);
        if (response.succeeded) {
          setSuccess('Método de pago creado correctamente');
          setView('list');
          await fetchPaymentMethods();
        } else {
          if (response.errors && response.errors.length > 0) {
            setFormError(response.errors.join('. '));
          } else {
            setFormError(response.message || 'Error al crear el método de pago');
          }
        }
      } else if (view === 'edit' && editingMethod) {
        if (!validateEditForm()) { setIsSubmitting(false); return; }
        const command: UpdatePaymentMethodCommand = {
          id: editFormData.id,
          alias: editFormData.alias,
          cardholderName: editFormData.cardholderName,
          expirationMonth: editFormData.expirationMonth,
          expirationYear: editFormData.expirationYear,
          isActive: editFormData.isActive,
        };
        const response = await updatePaymentMethod(editingMethod.id, command);
        if (response.succeeded) {
          setSuccess('Método de pago actualizado correctamente');
          setView('list');
          setEditingMethod(null);
          await fetchPaymentMethods();
        } else {
          if (response.errors && response.errors.length > 0) {
            setFormError(response.errors.join('. '));
          } else {
            setFormError(response.message || 'Error al actualizar el método de pago');
          }
        }
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setFormError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const response = await deletePaymentMethod(id);
      if (response.succeeded) {
        setSuccess('Método de pago eliminado correctamente');
        await fetchPaymentMethods();
      } else {
        if (response.errors && response.errors.length > 0) {
          setError(response.errors.join('. '));
        } else {
          setError(response.message || 'Error al eliminar el método de pago');
        }
      }
    } catch (err) {
      console.error('Error deleting payment method:', err);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const cardBrands = ['Visa', 'Mastercard', 'American Express', 'Discover', 'Otro'];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  // Vista de formulario crear
  if (view === 'create') {
    return (
      <div className="space-y-6">
        <Typography variant="h3" color="blue-gray" className="mb-4 text-2xl md:text-3xl" placeholder="">
          Nuevo Método de Pago
        </Typography>

        <Card className="p-6" placeholder="">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="Alias *"
              value={createFormData.alias}
              onChange={(e) => { setCreateFormData(prev => ({ ...prev, alias: e.target.value })); setFormError(''); }}
              disabled={isSubmitting}
              placeholder="Ej: Mi Visa Personal"
            />

            <Input
              type="text"
              label="Nombre del Titular *"
              value={createFormData.cardholderName}
              onChange={(e) => { setCreateFormData(prev => ({ ...prev, cardholderName: e.target.value })); setFormError(''); }}
              disabled={isSubmitting}
            />

            <Input
              type="text"
              label="Número de Tarjeta *"
              value={createFormData.cardNumber}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
                setCreateFormData(prev => ({ ...prev, cardNumber: formatted }));
                setFormError('');
              }}
              disabled={isSubmitting}
              maxLength={19}
              placeholder="0000 0000 0000 0000"
              inputMode="numeric"
            />

            <div>
              <Select
                label="Marca de Tarjeta *"
                value={createFormData.cardBrand}
                onChange={(val) => { setCreateFormData(prev => ({ ...prev, cardBrand: val || '' })); setFormError(''); }}
                disabled={isSubmitting}
                placeholder=""
              >
                {cardBrands.map((brand) => (
                  <Option key={brand} value={brand}>{brand}</Option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  label="Mes de Expiración *"
                  value={String(createFormData.expirationMonth)}
                  onChange={(val) => { setCreateFormData(prev => ({ ...prev, expirationMonth: Number(val) })); setFormError(''); }}
                  disabled={isSubmitting}
                  placeholder=""
                >
                  {months.map((m) => (
                    <Option key={m} value={String(m)}>{String(m).padStart(2, '0')}</Option>
                  ))}
                </Select>
              </div>
              <div>
                <Select
                  label="Año de Expiración *"
                  value={String(createFormData.expirationYear)}
                  onChange={(val) => { setCreateFormData(prev => ({ ...prev, expirationYear: Number(val) })); setFormError(''); }}
                  disabled={isSubmitting}
                  placeholder=""
                >
                  {years.map((y) => (
                    <Option key={y} value={String(y)}>{y}</Option>
                  ))}
                </Select>
              </div>
            </div>

            {formError && (
              <Alert color="red" className="text-sm">
                {formError}
              </Alert>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outlined"
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
                disabled={isSubmitting}
                placeholder=""
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="blue"
                disabled={isSubmitting}
                placeholder=""
              >
                {isSubmitting ? 'Guardando...' : 'Agregar Tarjeta'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  // Vista de formulario editar
  if (view === 'edit' && editingMethod) {
    return (
      <div className="space-y-6">
        <Typography variant="h3" color="blue-gray" className="mb-4 text-2xl md:text-3xl" placeholder="">
          Editar Método de Pago
        </Typography>

        <Card className="p-6" placeholder="">
          <div className="mb-4 p-3 bg-blue-gray-50 rounded-lg">
            <Typography variant="small" color="blue-gray" placeholder="">
              Tarjeta: {editingMethod.cardBrand} **** {editingMethod.last4Digits}
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="Alias *"
              value={editFormData.alias}
              onChange={(e) => { setEditFormData(prev => ({ ...prev, alias: e.target.value })); setFormError(''); }}
              disabled={isSubmitting}
            />

            <Input
              type="text"
              label="Nombre del Titular *"
              value={editFormData.cardholderName}
              onChange={(e) => { setEditFormData(prev => ({ ...prev, cardholderName: e.target.value })); setFormError(''); }}
              disabled={isSubmitting}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  label="Mes de Expiración *"
                  value={String(editFormData.expirationMonth)}
                  onChange={(val) => { setEditFormData(prev => ({ ...prev, expirationMonth: Number(val) })); setFormError(''); }}
                  disabled={isSubmitting}
                  placeholder=""
                >
                  {months.map((m) => (
                    <Option key={m} value={String(m)}>{String(m).padStart(2, '0')}</Option>
                  ))}
                </Select>
              </div>
              <div>
                <Select
                  label="Año de Expiración *"
                  value={String(editFormData.expirationYear)}
                  onChange={(val) => { setEditFormData(prev => ({ ...prev, expirationYear: Number(val) })); setFormError(''); }}
                  disabled={isSubmitting}
                  placeholder=""
                >
                  {years.map((y) => (
                    <Option key={y} value={String(y)}>{y}</Option>
                  ))}
                </Select>
              </div>
            </div>

            {formError && (
              <Alert color="red" className="text-sm">
                {formError}
              </Alert>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outlined"
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
                disabled={isSubmitting}
                placeholder=""
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="blue"
                disabled={isSubmitting}
                placeholder=""
              >
                {isSubmitting ? 'Guardando...' : 'Actualizar Tarjeta'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  // Vista de lista - loading
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Typography variant="h3" color="blue-gray" className="mb-4 text-2xl md:text-3xl" placeholder="">
          Métodos de Pago
        </Typography>
        <Card className="p-6" placeholder="">
          <div className="flex justify-center items-center py-8">
            <Spinner className="h-8 w-8" />
            <Typography color="gray" className="ml-3" placeholder="">
              Cargando métodos de pago...
            </Typography>
          </div>
        </Card>
      </div>
    );
  }

  // Vista de lista
  return (
    <div className="space-y-6">
      <div className="flex md:flex-row flex-col justify-between items-center">
        <Typography variant="h3" color="blue-gray" className="mb-4 text-2xl md:text-3xl" placeholder="">
          Métodos de Pago
        </Typography>
        <Button
          color="blue"
          size="sm"
          onClick={handleCreate}
          className="flex items-center gap-2"
          placeholder=""
        >
          <PlusIcon className="h-4 w-4" />
          Nueva Tarjeta
        </Button>
      </div>

      {success && (
        <Alert color="green" className="text-sm">
          {success}
        </Alert>
      )}

      {error && (
        <Alert color="red" className="text-sm">
          {error}
        </Alert>
      )}

      {paymentMethods.length === 0 ? (
        <Card className="p-6" placeholder="">
          <div className="text-center py-8">
            <CreditCardIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <Typography color="gray" placeholder="">
              No tienes métodos de pago registrados
            </Typography>
            <Typography variant="small" color="gray" className="mt-1" placeholder="">
              Agrega tu primera tarjeta para agilizar tus compras.
            </Typography>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="p-6" placeholder="">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <CreditCardIcon className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <Typography variant="h6" color="blue-gray" placeholder="">
                      {method.alias}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-mono" placeholder="">
                      **** **** **** {method.last4Digits} &middot; {method.cardBrand}
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      <Typography variant="small" color="gray" placeholder="">
                        <strong>Titular:</strong> {method.cardholderName}
                      </Typography>
                      <Typography variant="small" color="gray" placeholder="">
                        <strong>Vence:</strong> {String(method.expirationMonth).padStart(2, '0')}/{method.expirationYear}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <IconButton
                    variant="text"
                    color="blue"
                    onClick={() => handleEdit(method)}
                    placeholder=""
                  >
                    <PencilIcon className="h-5 w-5" />
                  </IconButton>
                  <IconButton
                    variant="text"
                    color="red"
                    onClick={() => handleDelete(method.id)}
                    disabled={deletingId === method.id}
                    placeholder=""
                  >
                    {deletingId === method.id ? (
                      <Spinner className="h-5 w-5" />
                    ) : (
                      <TrashIcon className="h-5 w-5" />
                    )}
                  </IconButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function CompaniesSection({ user }: {
  user: EcommerceUserDto;
  onImageUpdate?: (imageUrl: string) => void;
  onUserUpdate?: (user: EcommerceUserDto) => void;
}) {
  const [companies, setCompanies] = useState<AssociatedCompanyDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingCompany, setEditingCompany] = useState<AssociatedCompanyDto | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emptyForm: CreateAssociatedCompanyCommand = {
    ecommerceUserId: user.id,
    name: '',
    rtn: '',
    phoneNumber: '',
    address: '',
    email: '',
  };
  const [formData, setFormData] = useState<CreateAssociatedCompanyCommand>(emptyForm);
  const [formError, setFormError] = useState<string>('');

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await getAllAssociatedCompanies(user.id);
      if (response.succeeded && response.data) {
        setCompanies(response.data);
      } else {
        setError(response.message || 'Error al cargar las sociedades');
      }
    } catch (err) {
      console.error('Error fetching associated companies:', err);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [user.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormError('');
  };

  const handlePhoneChange = (value: string) => {
    let formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 4) {
      formattedValue = formattedValue.substring(0, 4) + '-' + formattedValue.substring(4, 8);
    }
    setFormData(prev => ({ ...prev, phoneNumber: formattedValue }));
    setFormError('');
  };

  const handleRtnChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').substring(0, 14);
    setFormData(prev => ({ ...prev, rtn: numericValue }));
    setFormError('');
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setFormError('El nombre es requerido');
      return false;
    }
    if (formData.name.length > 100) {
      setFormError('El nombre no debe exceder 100 caracteres');
      return false;
    }
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setFormError('El correo electrónico no es válido');
        return false;
      }
    }
    if (formData.rtn && formData.rtn.trim()) {
      const rtnRegex = /^\d{14}$/;
      if (!rtnRegex.test(formData.rtn)) {
        setFormError('El RTN debe tener exactamente 14 dígitos numéricos');
        return false;
      }
    }
    if (formData.phoneNumber && formData.phoneNumber.trim()) {
      const phoneRegex = /^\d{4}-\d{4}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        setFormError('El teléfono debe tener el formato 0000-0000');
        return false;
      }
    }
    if (formData.address && formData.address.length > 300) {
      setFormError('La dirección no debe exceder 300 caracteres');
      return false;
    }
    return true;
  };

  const handleCreate = () => {
    setFormData(emptyForm);
    setFormError('');
    setView('create');
  };

  const handleEdit = (company: AssociatedCompanyDto) => {
    setEditingCompany(company);
    setFormData({
      ecommerceUserId: user.id,
      name: company.name,
      rtn: company.rtn || '',
      phoneNumber: company.phoneNumber || '',
      address: company.address || '',
      email: company.email || '',
    });
    setFormError('');
    setView('edit');
  };

  const handleCancel = () => {
    setView('list');
    setEditingCompany(null);
    setFormData(emptyForm);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormError('');

    try {
      if (view === 'create') {
        const createCommand: CreateAssociatedCompanyCommand = {
          ecommerceUserId: formData.ecommerceUserId,
          name: formData.name,
          rtn: formData.rtn || undefined,
          phoneNumber: formData.phoneNumber || undefined,
          address: formData.address || undefined,
          email: formData.email || undefined,
        };
        const response = await createAssociatedCompany(createCommand);
        if (response.succeeded) {
          setSuccess('Sociedad creada correctamente');
          setView('list');
          await fetchCompanies();
        } else {
          setFormError(response.message || 'Error al crear la sociedad');
        }
      } else if (view === 'edit' && editingCompany) {
        const updateCommand: UpdateAssociatedCompanyCommand = {
          id: editingCompany.id,
          name: formData.name,
          rtn: formData.rtn || undefined,
          phoneNumber: formData.phoneNumber || undefined,
          address: formData.address || undefined,
          email: formData.email || undefined,
          isActive: editingCompany.isActive,
        };
        const response = await updateAssociatedCompany(editingCompany.id, updateCommand);
        if (response.succeeded) {
          setSuccess('Sociedad actualizada correctamente');
          setView('list');
          setEditingCompany(null);
          await fetchCompanies();
        } else {
          setFormError(response.message || 'Error al actualizar la sociedad');
        }
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setFormError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const response = await deleteAssociatedCompany(id);
      if (response.succeeded) {
        setSuccess('Sociedad eliminada correctamente');
        await fetchCompanies();
      } else {
        setError(response.message || 'Error al eliminar la sociedad');
      }
    } catch (err) {
      console.error('Error deleting associated company:', err);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setDeletingId(null);
    }
  };

  // Auto-limpiar mensajes de éxito
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Vista de formulario (crear/editar)
  if (view === 'create' || view === 'edit') {
    return (
      <div className="space-y-6">
        <Typography variant="h3" color="blue-gray" className="mb-4 text-2xl md:text-3xl" placeholder="">
          {view === 'create' ? 'Nueva Sociedad' : 'Editar Sociedad'}
        </Typography>

        <Card className="p-6" placeholder="">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="Nombre *"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={isSubmitting}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                label="RTN"
                placeholder="01019021333211"
                maxLength={14}
                value={formData.rtn || ''}
                onChange={(e) => handleRtnChange(e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                type="tel"
                label="Teléfono"
                placeholder="0000-0000"
                value={formData.phoneNumber || ''}
                onChange={(e) => handlePhoneChange(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <Input
              type="email"
              label="Correo Electrónico"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={isSubmitting}
            />

            <Input
              type="text"
              label="Dirección"
              value={formData.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={isSubmitting}
            />

            {formError && (
              <Alert color="red" className="text-sm">
                {formError}
              </Alert>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outlined"
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
                disabled={isSubmitting}
                placeholder=""
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="blue"
                disabled={isSubmitting}
                placeholder=""
              >
                {isSubmitting ? 'Guardando...' : (view === 'create' ? 'Crear Sociedad' : 'Actualizar Sociedad')}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  // Vista de lista
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Typography variant="h3" color="blue-gray" className="mb-4 text-2xl md:text-3xl" placeholder="">
          Sociedades
        </Typography>
        <Card className="p-6" placeholder="">
          <div className="flex justify-center items-center py-8">
            <Spinner className="h-8 w-8" />
            <Typography color="gray" className="ml-3" placeholder="">
              Cargando sociedades...
            </Typography>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex md:flex-row flex-col justify-between items-center">
        <Typography variant="h3" color="blue-gray" className="mb-4 text-2xl md:text-3xl" placeholder="">
          Sociedades
        </Typography>
        <Button
          color="blue"
          size="sm"
          onClick={handleCreate}
          className="flex items-center gap-2"
          placeholder=""
        >
          <PlusIcon className="h-4 w-4" />
          Nueva Sociedad
        </Button>
      </div>

      {success && (
        <Alert color="green" className="text-sm">
          {success}
        </Alert>
      )}

      {error && (
        <Alert color="red" className="text-sm">
          {error}
        </Alert>
      )}

      {companies.length === 0 ? (
        <Card className="p-6" placeholder="">
          <div className="text-center py-8">
            <BuildingOfficeIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <Typography color="gray" placeholder="">
              No tienes sociedades registradas
            </Typography>
            <Typography variant="small" color="gray" className="mt-1" placeholder="">
              Agrega tu primera sociedad para gestionar tus clientes.
            </Typography>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {companies.map((company) => (
            <Card key={company.id} className="p-6" placeholder="">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  <Typography variant="h6" color="blue-gray" placeholder="">
                    {company.name}
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {company.rtn && (
                      <Typography variant="small" color="gray" placeholder="">
                        <strong>RTN:</strong> {company.rtn}
                      </Typography>
                    )}
                    {company.phoneNumber && (
                      <Typography variant="small" color="gray" placeholder="">
                        <strong>Tel:</strong> {company.phoneNumber}
                      </Typography>
                    )}
                    {company.email && (
                      <Typography variant="small" color="gray" placeholder="">
                        <strong>Email:</strong> {company.email}
                      </Typography>
                    )}
                    {company.address && (
                      <Typography variant="small" color="gray" placeholder="">
                        <strong>Dirección:</strong> {company.address}
                      </Typography>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <IconButton
                    variant="text"
                    color="blue"
                    onClick={() => handleEdit(company)}
                    placeholder=""
                  >
                    <PencilIcon className="h-5 w-5" />
                  </IconButton>
                  <IconButton
                    variant="text"
                    color="red"
                    onClick={() => handleDelete(company.id)}
                    disabled={deletingId === company.id}
                    placeholder=""
                  >
                    {deletingId === company.id ? (
                      <Spinner className="h-5 w-5" />
                    ) : (
                      <TrashIcon className="h-5 w-5" />
                    )}
                  </IconButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
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
    isEnabled: true,
    name: 'Métodos de Pago',
    icon: CreditCardIcon,
    component: PaymentMethodsSection
  },
  {
    id: 'companies',
    isEnabled: true,
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
