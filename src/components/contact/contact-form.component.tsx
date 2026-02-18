//@ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Alert, Typography, Spinner, Select, Option } from '@/utils/MTailwind';
import {
  CreateContactMessageCommand,
  CountryDto,
  DepartmentDto
} from '@/interfaces/contact/contact.interface';
import { sendContactMessage, getCountries, getDepartments } from '@/services/contact.service';
import {
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const initialFormData: CreateContactMessageCommand = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  subject: '',
  messageContent: '',
  countryId: 0,
  departmentId: 0
};

export default function ContactForm() {
  const [formData, setFormData] = useState<CreateContactMessageCommand>(initialFormData);
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Cargar países y departamentos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const [countriesRes, departmentsRes] = await Promise.all([
          getCountries(),
          getDepartments()
        ]);

        if (countriesRes.succeeded && countriesRes.data) {
          setCountries(countriesRes.data);
        }

        if (departmentsRes.succeeded && departmentsRes.data) {
          setDepartments(departmentsRes.data);
        }
      } catch (err) {
        console.error('Error loading form data:', err);
        setError('Error al cargar los datos del formulario');
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (field: keyof CreateContactMessageCommand, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(''); // Limpiar error al escribir
  };

  const handlePhoneChange = (value: string) => {
    // Formatear automáticamente el número de teléfono
    let formattedValue = value.replace(/\D/g, ''); // Solo números

    if (formattedValue.length > 4) {
      formattedValue = formattedValue.substring(0, 4) + '-' + formattedValue.substring(4, 8);
    }

    handleInputChange('phoneNumber', formattedValue);
  };

  const validateForm = (): boolean => {
    // Validación de FirstName: 1-30 caracteres
    if (!formData.firstName.trim() || formData.firstName.length > 30) {
      setError('El nombre debe tener entre 1 y 30 caracteres');
      return false;
    }

    // Validación de LastName: 1-30 caracteres
    if (!formData.lastName.trim() || formData.lastName.length > 30) {
      setError('El apellido debe tener entre 1 y 30 caracteres');
      return false;
    }

    // Validación de Email: formato válido, máx 30 caracteres
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return false;
    }

    if (formData.email.length > 30) {
      setError('El email no puede exceder 30 caracteres');
      return false;
    }

    // Validación de PhoneNumber: formato XXXX-XXXX
    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('El teléfono debe tener el formato 0000-0000');
      return false;
    }

    // Validación de Subject: 1-50 caracteres
    if (!formData.subject.trim()) {
      setError('El asunto es requerido');
      return false;
    }

    if (formData.subject.length > 50) {
      setError('El asunto no puede exceder 50 caracteres');
      return false;
    }

    // Validación de MessageContent: 1-300 caracteres
    if (!formData.messageContent.trim()) {
      setError('El mensaje es requerido');
      return false;
    }

    if (formData.messageContent.length < 20) {
      setError('El mensaje debe tener al menos 20 caracteres');
      return false;
    }

    if (formData.messageContent.length > 300) {
      setError('El mensaje no puede exceder 300 caracteres');
      return false;
    }

    // Validación de CountryId requerido
    if (!formData.countryId || formData.countryId === 0) {
      setError('Debes seleccionar un país');
      return false;
    }

    // Validación de DepartmentId requerido
    if (!formData.departmentId || formData.departmentId === 0) {
      setError('Debes seleccionar un departamento');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validación client-side
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await sendContactMessage(formData);

      if (response.succeeded) {
        setSuccess('¡Mensaje enviado exitosamente! Te contactaremos pronto.');

        // Limpiar formulario después de 3 segundos
        setTimeout(() => {
          setFormData(initialFormData);
          setSuccess('');
        }, 3000);
      } else {
        setError(response.message || 'Error al enviar el mensaje. Por favor intenta de nuevo.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Error de conexión. Por favor verifica tu internet e intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner className="h-8 w-8" />
        <Typography className="ml-3 text-gray-600">Cargando formulario...</Typography>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nombre */}
        <div>
          <Input
            type="text"
            label="Nombre *"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            color="blue"
            size="lg"
            className="bg-white"
            disabled={isLoading}
            required
            crossOrigin={undefined}
          />
        </div>

        {/* Apellido */}
        <div>
          <Input
            type="text"
            label="Apellido *"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            color="blue"
            size="lg"
            className="bg-white"
            disabled={isLoading}
            required
            crossOrigin={undefined}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <Input
            type="email"
            label="Correo Electrónico *"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            color="blue"
            size="lg"
            className="bg-white"
            disabled={isLoading}
            required
            crossOrigin={undefined}
          />
        </div>

        {/* Teléfono */}
        <div>
          <Input
            type="tel"
            label="Teléfono *"
            placeholder="0000-0000"
            value={formData.phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            color="blue"
            size="lg"
            className="bg-white"
            disabled={isLoading}
            required
            crossOrigin={undefined}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* País */}
        <div>
          <Select
            label="País *"
            value={formData.countryId}
            onChange={(value) => handleInputChange('countryId', parseInt(value))}
            color="blue"
            disabled={isLoading}
          >
            {countries.map((country) => (
              <Option key={country.id} value={country.id}>
                {country.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Departamento */}
        <div>
          <Select
            label="Departamento *"
            value={formData.departmentId}
            onChange={(value) => handleInputChange('departmentId', parseInt(value))}
            color="blue"
            disabled={isLoading}
          >
            {departments.map((dept) => (
              <Option key={dept.id} value={dept.id}>
                {dept.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Asunto */}
      <div>
        <Input
          type="text"
          label="Asunto *"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          color="blue"
          size="lg"
          className="bg-white"
          disabled={isLoading}
          required
          crossOrigin={undefined}
        />
      </div>

      {/* Mensaje */}
      <div className="relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Mensaje *
        </label>
        <textarea
          className="w-full resize-none h-36 border border-blue-gray-200
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                     bg-white p-3 rounded-lg transition-all"
          value={formData.messageContent}
          onChange={(e) => handleInputChange('messageContent', e.target.value)}
          disabled={isLoading}
          required
          maxLength={300}
          placeholder="Escribe tu mensaje aquí (mínimo 20 caracteres)..."
        />
        <Typography variant="small" className="text-gray-600 text-right mt-1" placeholder={undefined}>
          {formData.messageContent.length}/300 caracteres
        </Typography>
      </div>

      {/* Alertas de error/éxito */}
      {error && (
        <Alert
          color="red"
          className="animate-fade-down animate-duration-300"
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          color="green"
          className="animate-fade-down animate-duration-300"
          icon={<CheckCircleIcon className="h-6 w-6" />}
        >
          {success}
        </Alert>
      )}

      {/* Botón de envío */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          color="blue"
          className="w-full md:w-auto px-12 flex items-center justify-center gap-2
                     hover:shadow-lg hover:shadow-blue-500/50
                     transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
          placeholder={undefined}
        >
          {isLoading ? (
            <>
              <Spinner className="h-5 w-5" />
              Enviando...
            </>
          ) : (
            <>
              <PaperAirplaneIcon className="h-5 w-5" />
              Enviar Mensaje
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
