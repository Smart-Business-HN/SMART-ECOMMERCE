// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { Card, Typography, Button, Input, Select, Option, Alert } from '@/utils/MTailwind';
import { EcommerceUserDto, UpdateUserCommand } from '@/interfaces/auth/auth.interface';
import { updateUser } from '@/services/auth.service';
import { departments as departmentsSeed } from '@/utils/seeds/departments.seed';
import { genders as gendersSeed } from '@/utils/seeds/genders.seed';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface UserUpdateFormProps {
  user: EcommerceUserDto;
  onUserUpdate: (updatedUser: EcommerceUserDto) => void;
  onCancel: () => void;
}

export default function UserUpdateForm({ user, onUserUpdate, onCancel }: UserUpdateFormProps) {
  const [formData, setFormData] = useState<UpdateUserCommand>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
    genderId: user.genderId,
    departmentId: user.departmentId,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isPasswordChange, setIsPasswordChange] = useState(false);

  const departments = departmentsSeed;
  const genders = gendersSeed;

  const handleInputChange = (field: keyof UpdateUserCommand, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
    setSuccess('');
  };

  const handlePhoneChange = (value: string) => {
    let formattedValue = value.replace(/\D/g, '');
    
    if (formattedValue.length > 4) {
      formattedValue = formattedValue.substring(0, 4) + '-' + formattedValue.substring(4, 8);
    }
    
    handleInputChange('phoneNumber', formattedValue);
  };

  const validateForm = () => {
    // Validación de campos requeridos
    if (!formData.firstName.trim()) {
      setError('El primer nombre es requerido');
      return false;
    }

    if (!formData.lastName.trim()) {
      setError('El apellido es requerido');
      return false;
    }

    if (!formData.email.trim()) {
      setError('El email es requerido');
      return false;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('El email no es válido');
      return false;
    }

    // Validación de teléfono si se proporciona
    if (formData.phoneNumber && formData.phoneNumber.trim()) {
      const phoneRegex = /^\d{4}-\d{4}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        setError('El número telefónico debe tener el formato 0000-0000');
        return false;
      }
    }

    // Validación de cambio de contraseña
    if (isPasswordChange) {
      if (!formData.currentPassword) {
        setError('La contraseña actual es requerida para cambiar la contraseña');
        return false;
      }

      if (!formData.newPassword) {
        setError('La nueva contraseña es requerida');
        return false;
      }

      // Validación de nueva contraseña
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(formData.newPassword)) {
        setError('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula y un número');
        return false;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('Las contraseñas nuevas no coinciden');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Preparar datos para envío (excluir confirmPassword)
      const { confirmPassword, ...dataToSend } = formData;
      
      // Si no se está cambiando la contraseña, excluir campos de contraseña
      if (!isPasswordChange) {
        delete dataToSend.currentPassword;
        delete dataToSend.newPassword;
      }

      const response = await updateUser(user.id, dataToSend);
      
      if (response.succeeded && response.data) {
        setSuccess('Información actualizada correctamente');
        onUserUpdate(response.data);
        
        // Limpiar campos de contraseña después de actualización exitosa
        if (isPasswordChange) {
          setFormData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }));
          setIsPasswordChange(false);
        }
      } else {
        setError(response.message || 'Error al actualizar la información');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6" placeholder="">
      <Typography variant="h6" color="blue-gray" className="mb-6" placeholder="">
        Actualizar Información
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            label="Primer Nombre"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
            disabled={isLoading}
          />
          <Input
            type="text"
            label="Apellido"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <Input
          type="email"
          label="Correo Electrónico"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          disabled={isLoading}
        />

        <Input
          type="tel"
          label="Número de Teléfono"
          placeholder="0000-0000"
          value={formData.phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          disabled={isLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Género"
            value={formData.genderId}
            onChange={(value) => handleInputChange('genderId', parseInt(value))}
            disabled={isLoading}
          >
            {genders.map((gender) => (
              <Option key={gender.id} value={gender.id}>
                {gender.name}
              </Option>
            ))}
          </Select>

          <Select
            label="Departamento"
            value={formData.departmentId || ''}
            onChange={(value) => handleInputChange('departmentId', value ? parseInt(value) : undefined)}
            disabled={isLoading}
          >
            {departments.map((dept) => (
              <Option key={dept.id} value={dept.id}>
                {dept.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Sección de cambio de contraseña */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" color="blue-gray" placeholder="">
              Cambiar Contraseña
            </Typography>
            <Button
              type="button"
              variant="outlined"
              size="sm"
              onClick={() => {
                setIsPasswordChange(!isPasswordChange);
                if (!isPasswordChange) {
                  setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  }));
                }
              }}
              disabled={isLoading}
              placeholder=""
            >
              {isPasswordChange ? 'Cancelar' : 'Cambiar Contraseña'}
            </Button>
          </div>

          {isPasswordChange && (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  label="Contraseña Actual"
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  required
                  disabled={isLoading}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showCurrentPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  }
                />
              </div>

              <div className="relative">
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  label="Nueva Contraseña"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  required
                  disabled={isLoading}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showNewPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  }
                />
                <Typography variant="small" color="gray" className="mt-1" placeholder="">
                  Mínimo 8 caracteres, una mayúscula y un número
                </Typography>
              </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirmar Nueva Contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  disabled={isLoading}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Mensajes de error y éxito */}
        {error && (
          <Alert color="red" className="text-sm">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="green" className="text-sm">
            {success}
          </Alert>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={isLoading}
            placeholder=""
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            color="blue"
            disabled={isLoading}
            placeholder=""
          >
            {isLoading ? 'Actualizando...' : 'Actualizar Información'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
