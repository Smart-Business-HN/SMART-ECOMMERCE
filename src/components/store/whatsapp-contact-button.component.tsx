// @ts-nocheck
'use client';
import { Button } from '@/utils/MTailwind';

interface WhatsAppContactButtonProps {
    productUrl: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'filled' | 'outlined' | 'gradient' | 'text';
    color?: 'blue' | 'green' | 'red' | 'amber' | 'purple' | 'pink' | 'indigo' | 'gray';
    'aria-label'?: string;
}

export default function WhatsAppContactButton({ 
    productUrl, 
    className = '',
    size = 'lg',
    variant = 'outlined',
    color = 'blue',
    'aria-label': ariaLabel = 'Contactar sobre este producto'
}: WhatsAppContactButtonProps) {
    const handleWhatsAppClick = () => {
        const phoneNumber = '50488187765'; // Número sin el + para WhatsApp
        const message = `¡Hola! Me interesa obtener más información sobre el siguiente producto:

        *Enlace del producto:* ${productUrl}

¿Podrían brindarme más detalles sobre disponibilidad y opciones de envío?

¡Gracias!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <Button 
            size={size}
            variant={variant}
            color={color}
            className={className}
            aria-label={ariaLabel}
            onClick={handleWhatsAppClick}
        >
            Contactar
        </Button>
    );
}
