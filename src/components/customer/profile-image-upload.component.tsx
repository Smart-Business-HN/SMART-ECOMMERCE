'use client';
import { useState, useRef } from 'react';
import { Card, Typography, Button, Alert } from '@/utils/MTailwind';
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageChange: (file: File | null) => void;
  isLoading?: boolean;
}

export default function ProfileImageUpload({ 
  currentImage, 
  onImageChange, 
  isLoading = false 
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen debe ser menor a 5MB');
      return;
    }

    setError('');
    
    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    onImageChange(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setError('');
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const displayImage = preview || currentImage;

  return (
    <Card className="p-6" placeholder="">
      <Typography variant="h6" color="blue-gray" className="mb-4" placeholder="">
        Foto de Perfil
      </Typography>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Imagen actual/preview */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
            {displayImage ? (
              <Image
                src={displayImage}
                alt="Foto de perfil"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <CameraIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Botón para remover imagen si hay preview */}
          {preview && (
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              disabled={isLoading}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleButtonClick}
            disabled={isLoading}
            size="sm"
            color="blue"
            className="flex items-center gap-2"
            placeholder=""
          >
            <CameraIcon className="h-4 w-4" />
            {displayImage ? 'Cambiar Foto' : 'Subir Foto'}
          </Button>
          
          {displayImage && (
            <Button
              onClick={handleRemoveImage}
              disabled={isLoading}
              size="sm"
              variant="outlined"
              color="red"
              className="flex items-center gap-2"
              placeholder=""
            >
              <XMarkIcon className="h-4 w-4" />
              Remover
            </Button>
          )}
        </div>

        {/* Input oculto para seleccionar archivo */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
        />

        {/* Mensaje de error */}
        {error && (
          <Alert color="red" className="text-sm">
            {error}
          </Alert>
        )}

        {/* Información adicional */}
        <div className="text-center">
          <Typography variant="small" color="gray" placeholder="">
            Formatos soportados: JPG, PNG, GIF
          </Typography>
          <Typography variant="small" color="gray" placeholder="">
            Tamaño máximo: 5MB
          </Typography>
        </div>
      </div>
    </Card>
  );
}
