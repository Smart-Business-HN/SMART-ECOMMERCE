import React from 'react';
import Image from 'next/image';
import { Card, Typography } from '@/utils/MTailwind';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  tags: string[];
}

export default function SolutionCard({ title, description, icon, iconAlt, tags }: SolutionCardProps) {
  return (
    <Card
      className="border-2 border-gray-100 p-6 hover:border-blue-500
                 hover:shadow-xl transition-all duration-300
                 group cursor-pointer"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <div className="flex gap-5">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800
                          rounded-xl flex items-center justify-center
                          group-hover:scale-110 transition-transform">
            <Image
              src={icon}
              alt={iconAlt}
              width={40}
              height={40}
              className="brightness-0 invert"
            />
          </div>
        </div>
        <div className="flex-1">
          <Typography variant="h5" className="font-bold text-gray-800 mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
            {title}
          </Typography>
          <Typography className="text-gray-600 text-sm mb-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onResize={undefined} onResizeCapture={undefined}>
            {description}
          </Typography>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs
                           rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
