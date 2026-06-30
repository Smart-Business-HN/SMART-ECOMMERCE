// @ts-nocheck
'use client';
import { useState } from 'react';
import { EcommerceUserDto, UpdateUserCommand } from '@/interfaces/auth/auth.interface';
import { updateUser } from '@/services/user.service';
import { departments as departmentsSeed } from '@/utils/seeds/departments.seed';
import { genders as gendersSeed } from '@/utils/seeds/genders.seed';
import Button from '@/components/ui/button.component';

interface UserUpdateFormProps {
  user: EcommerceUserDto;
  onUserUpdate: (updatedUser: EcommerceUserDto) => void;
  onCancel: () => void;
}

const labelCls = 'mb-1.5 block text-[12.5px] font-semibold text-ink2-700';
const fieldCls =
  'sb-in w-full rounded-[10px] border border-line-input bg-white px-3 py-2.5 text-[14px] text-text outline-none placeholder:text-ink2-400 disabled:opacity-60';

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
    birthDay: user.birthDay ? new Date(user.birthDay).toISOString().split('T')[0] : undefined,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const departments = departmentsSeed;
  const genders = gendersSeed;

  const handleInputChange = (field: keyof UpdateUserCommand, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    if (!formData.firstName.trim()) { setError('El primer nombre es requerido'); return false; }
    if (!formData.lastName.trim()) { setError('El apellido es requerido'); return false; }
    if (!formData.email.trim()) { setError('El email es requerido'); return false; }
    if (!formData.userName.trim()) { setError('El nombre de usuario es requerido'); return false; }
    if (!formData.phoneNumber.trim()) { setError('El número de teléfono es requerido'); return false; }
    if (!formData.genderId) { setError('El género es requerido'); return false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { setError('El email no es válido'); return false; }
    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) { setError('El número telefónico debe tener el formato 0000-0000'); return false; }
    if (formData.birthDay) {
      const birthDate = new Date(formData.birthDay);
      if (birthDate >= new Date()) { setError('La fecha de nacimiento debe ser anterior a hoy'); return false; }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    if (!validateForm()) { setIsLoading(false); return; }
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
    <div className="rounded-container border border-line bg-white p-6 sm:p-8">
      <h3 className="mb-6 text-[18px] font-bold text-text">Actualizar información</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Primer nombre</label>
            <input type="text" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} disabled={isLoading} className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Apellido</label>
            <input type="text" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} disabled={isLoading} className={fieldCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Correo electrónico</label>
            <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} disabled={isLoading} className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Nombre de usuario</label>
            <input type="text" value={formData.userName} onChange={(e) => handleInputChange('userName', e.target.value)} disabled={isLoading} className={fieldCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Número de teléfono</label>
          <input type="tel" placeholder="0000-0000" value={formData.phoneNumber} onChange={(e) => handlePhoneChange(e.target.value)} disabled={isLoading} className={fieldCls} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Género</label>
            <select value={formData.genderId} onChange={(e) => handleInputChange('genderId', parseInt(e.target.value))} disabled={isLoading} className={fieldCls}>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>{gender.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Departamento</label>
            <select value={formData.departmentId || ''} onChange={(e) => handleInputChange('departmentId', e.target.value ? parseInt(e.target.value) : undefined)} disabled={isLoading} className={fieldCls}>
              <option value="">Selecciona…</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Fecha de nacimiento</label>
          <input type="date" value={formData.birthDay || ''} onChange={(e) => handleInputChange('birthDay', e.target.value)} disabled={isLoading} className={fieldCls} />
        </div>

        {error && <p className="rounded-[10px] bg-[#FEF2F2] px-4 py-2.5 text-[14px] text-[#B91C1C]">{error}</p>}
        {success && <p className="rounded-[10px] bg-success-soft px-4 py-2.5 text-[14px] text-success">{success}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" size="md" onClick={onCancel} disabled={isLoading}>Cancelar</Button>
          <Button type="submit" variant="primary" size="md" disabled={isLoading}>
            {isLoading ? 'Actualizando...' : 'Guardar cambios'}
          </Button>
        </div>
      </form>
    </div>
  );
}
