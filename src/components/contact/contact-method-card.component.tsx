import React from 'react';
import Link from 'next/link';
import { Card, Typography } from '@/utils/MTailwind';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ContactMethodCardProps {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

export default function ContactMethodCard({
  title,
  subtitle,
  href,
  icon,
  gradientFrom,
  gradientTo
}: ContactMethodCardProps) {
  return (
    <Card
      className="p-6 shadow-lg border-0 hover:shadow-xl
                 hover:-translate-y-1 transition-all cursor-pointer
                 group"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <Link href={href} className="flex items-center gap-4">
        <div
          className={`w-14 h-14 bg-gradient-to-br ${gradientFrom} ${gradientTo}
                      rounded-full flex items-center justify-center
                      group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <Typography variant="h6" className="font-bold text-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
            {title}
          </Typography>
          <Typography className="text-gray-600 text-sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
            {subtitle}
          </Typography>
        </div>
        <ArrowRightIcon
          className="h-5 w-5 text-gray-400
                     group-hover:text-blue-600
                     group-hover:translate-x-2 transition-all"
        />
      </Link>
    </Card>
  );
}
