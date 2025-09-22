// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { Card, Typography, Button, Input, Select, Option, Alert } from '@/utils/MTailwind';
import { EcommerceUserDto, UpdateUserCommand } from '@/interfaces/auth/auth.interface';
import { updateUser } from '@/services/user.service';
import { departments as departmentsSeed } from '@/utils/seeds/departments.seed';
import { genders as gendersSeed } from '@/utils/seeds/genders.seed';

interface UserUpdateFormProps {
  user: EcommerceUserDto;
  onUserUpdate: (updatedUser: EcommerceUserDto) => void;
  onCancel: () => void;
}

export default function UserUpdateForm({ user, onUserUpdate, onCancel }: UserUpdateFormProps) {
  const [formData, setFormData] = useState<UpdateUserCommand>({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    phoneNumber: user.phoneNumber || '',
    genderId: user.genderId,
    departmentId: user.departmentId,
    birthDay: user.birthDay ? new Date(user.birthDay).toISOString().split('T')[0] : undefined
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

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

    if (!formData.userName.trim()) {
      setError('El nombre de usuario es requerido');
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      setError('El número de teléfono es requerido');
      return false;
    }

    if (!formData.genderId) {
      setError('El género es requerido');
      return false;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('El email no es válido');
      return false;
    }

    // Validación de teléfono
    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('El número telefónico debe tener el formato 0000-0000');
      return false;
    }

    // Validación de fecha de nacimiento si se proporciona
    if (formData.birthDay) {
      const birthDate = new Date(formData.birthDay);
      const today = new Date();
      if (birthDate >= today) {
        setError('La fecha de nacimiento debe ser anterior a hoy');
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
      const response = await updateUser(user.id, formData);
      
      if (response.succeeded && response.data) {
        setSuccess('Información actualizada correctamente');
        onUserUpdate(response.data);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            label="Correo Electrónico"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            disabled={isLoading}
          />
          <Input
            type="text"
            label="Nombre de Usuario"
            value={formData.userName}
            onChange={(e) => handleInputChange('userName', e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <Input
          type="tel"
          label="Número de Teléfono"
          placeholder="0000-0000"
          value={formData.phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          required
          disabled={isLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Género"
            value={formData.genderId}
            onChange={(value) => handleInputChange('genderId', parseInt(value))}
            required
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

        <Input
          type="date"
          label="Fecha de Nacimiento"
          value={formData.birthDay || ''}
          onChange={(e) => handleInputChange('birthDay', e.target.value)}
          disabled={isLoading}
        />


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
            className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
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
