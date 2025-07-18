import React from "react";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";

interface SideCartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function SideCartDrawerComponent({ open, onClose }: SideCartDrawerProps) {
  return (
    <>
      {/* @ts-expect-error Material Tailwind Drawer type definitions are overly strict; props are correct per docs */}
      <Drawer open={open} onClose={onClose} placement="right" className="p-4">
        <div className="mb-6 flex items-center justify-between">
          {/* @ts-expect-error Material Tailwind Typography type definitions are overly strict; props are correct per docs */}
          <Typography variant="h5" color="blue-gray">
            Tu Carrito
          </Typography>
          {/* @ts-expect-error Material Tailwind IconButton type definitions are overly strict; props are correct per docs */}
          <IconButton variant="text" color="blue-gray" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        {/* Aquí puedes agregar el contenido del carrito */}
      </Drawer>
    </>
  );
} 