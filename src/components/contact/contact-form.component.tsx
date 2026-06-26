'use client';
import React, { useState, useEffect } from 'react';
import {
  CreateContactMessageCommand,
  CountryDto,
  DepartmentDto
} from '@/interfaces/contact/contact.interface';
import { sendContactMessage, getCountries, getDepartments } from '@/services/contact.service';
import { trackFbEvent } from '@/lib/meta/fbpixel';

const SUBJECT_OPTIONS = [
  'Solicitar cotización',
  'Soporte técnico',
  'Proyecto de cableado / redes',
  'Información sobre Ventix',
  'Otro',
];

const initialFormData: CreateContactMessageCommand = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  subject: SUBJECT_OPTIONS[0],
  messageContent: '',
  countryId: 0,
  departmentId: 0
};

// Shared field styling (matches the "Smart Business Rediseño" Contacto design).
const labelCls = 'block text-[13px] font-semibold text-ink2-700 mb-[7px]';
const inputCls =
  'sb-in w-full border border-line-input rounded-btn px-3.5 py-3 text-[14.5px] outline-none bg-white text-text placeholder:text-ink2-400';

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
        if (countriesRes.succeeded && countriesRes.data) setCountries(countriesRes.data);
        if (departmentsRes.succeeded && departmentsRes.data) setDepartments(departmentsRes.data);
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
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handlePhoneChange = (value: string) => {
    let formatted = value.replace(/\D/g, '');
    if (formatted.length > 4) {
      formatted = formatted.substring(0, 4) + '-' + formatted.substring(4, 8);
    }
    handleInputChange('phoneNumber', formatted);
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim() || formData.firstName.length > 30) {
      setError('El nombre debe tener entre 1 y 30 caracteres');
      return false;
    }
    if (!formData.lastName.trim() || formData.lastName.length > 30) {
      setError('El apellido debe tener entre 1 y 30 caracteres');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return false;
    }
    if (formData.email.length > 30) {
      setError('El email no puede exceder 30 caracteres');
      return false;
    }
    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('El teléfono debe tener el formato 0000-0000');
      return false;
    }
    if (!formData.subject.trim() || formData.subject.length > 50) {
      setError('Selecciona un asunto válido');
      return false;
    }
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
    if (!formData.countryId) {
      setError('Debes seleccionar un país');
      return false;
    }
    if (!formData.departmentId) {
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

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await sendContactMessage(formData);
      if (response.succeeded) {
        setSuccess('¡Mensaje enviado exitosamente! Te contactaremos pronto.');

        // Meta Pixel: Contact (navegador + Conversions API con dedup), con email
        // y teléfono del formulario para Advanced Matching.
        trackFbEvent('Contact', {}, {
          email: formData.email,
          phone: formData.phoneNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });

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

  const btnLabel = isLoading ? 'Enviando…' : success ? '¡Mensaje enviado!' : 'Enviar mensaje';

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] mb-[18px]">
        <div>
          <label htmlFor="cf-firstName" className={labelCls}>Nombre</label>
          <input
            id="cf-firstName"
            type="text"
            className={inputCls}
            placeholder="Tu nombre"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={isLoading}
            maxLength={30}
            required
          />
        </div>
        <div>
          <label htmlFor="cf-lastName" className={labelCls}>Apellido</label>
          <input
            id="cf-lastName"
            type="text"
            className={inputCls}
            placeholder="Tu apellido"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={isLoading}
            maxLength={30}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] mb-[18px]">
        <div>
          <label htmlFor="cf-email" className={labelCls}>Correo</label>
          <input
            id="cf-email"
            type="email"
            className={inputCls}
            placeholder="tucorreo@empresa.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isLoading}
            maxLength={30}
            required
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>Teléfono</label>
          <input
            id="cf-phone"
            type="tel"
            className={inputCls}
            placeholder="(+504) 0000-0000"
            value={formData.phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] mb-[18px]">
        <div>
          <label htmlFor="cf-country" className={labelCls}>País</label>
          <select
            id="cf-country"
            className={`${inputCls} cursor-pointer`}
            value={formData.countryId}
            onChange={(e) => handleInputChange('countryId', parseInt(e.target.value, 10) || 0)}
            disabled={isLoading || isLoadingData}
          >
            <option value={0}>{isLoadingData ? 'Cargando…' : 'Selecciona país'}</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-department" className={labelCls}>Departamento</label>
          <select
            id="cf-department"
            className={`${inputCls} cursor-pointer`}
            value={formData.departmentId}
            onChange={(e) => handleInputChange('departmentId', parseInt(e.target.value, 10) || 0)}
            disabled={isLoading || isLoadingData}
          >
            <option value={0}>{isLoadingData ? 'Cargando…' : 'Selecciona departamento'}</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-[18px]">
        <label htmlFor="cf-subject" className={labelCls}>Asunto</label>
        <select
          id="cf-subject"
          className={`${inputCls} cursor-pointer`}
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          disabled={isLoading}
        >
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="cf-message" className={labelCls}>Mensaje</label>
        <textarea
          id="cf-message"
          rows={5}
          className={`${inputCls} resize-y`}
          placeholder="Cuéntanos qué necesitas… (mínimo 20 caracteres)"
          value={formData.messageContent}
          onChange={(e) => handleInputChange('messageContent', e.target.value)}
          disabled={isLoading}
          maxLength={300}
          required
        />
        <div className="text-right text-[12px] text-ink2-400 mt-1">
          {formData.messageContent.length}/300
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-btn bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] text-[14px] px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-btn bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-[14px] px-4 py-3">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="sb-btn w-full bg-accent text-white border-none cursor-pointer font-semibold text-[16px] h-[52px] rounded-[12px] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ boxShadow: '0 8px 24px -8px rgba(0,111,255,.5)' }}
      >
        {btnLabel}
      </button>
      <p className="text-[12.5px] text-ink2-400 text-center mt-3.5">
        También puedes escribirnos a ventas@smartbusiness.site
      </p>
    </form>
  );
}
