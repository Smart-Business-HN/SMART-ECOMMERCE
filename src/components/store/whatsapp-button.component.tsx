// @ts-nocheck
'use client';
import { Button } from '@/utils/MTailwind';

interface WhatsAppButtonProps {
  whatsappUrl: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'gradient' | 'text';
  color?: 'blue' | 'red' | 'green' | 'amber' | 'purple' | 'teal' | 'cyan' | 'pink' | 'indigo' | 'gray';
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

export default function WhatsAppButton({ 
  whatsappUrl, 
  size = 'lg', 
  variant = 'outlined', 
  color = 'blue', 
  className = '',
  children,
  'aria-label': ariaLabel
}: WhatsAppButtonProps) {
  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button 
      size={size}
      variant={variant}
      color={color}
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
      placeholder=""
    >
      {children}
    </Button>
  );
}
