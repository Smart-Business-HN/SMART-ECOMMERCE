"use client";
import { useState } from "react";
import Image from "next/image";
import { ProductImageDto } from "@/interfaces/product/product.interface";

const NO_IMAGE = "/images/products/no-image-available-icon-vector.webp";

interface ProductGalleryProps {
  images: ProductImageDto[];
  name: string;
}

/** Native PDP gallery: thumbnail strip + large image (replaces the Material Tailwind Carousel). */
export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const hasImages = images && images.length > 0;
  const mainSrc = hasImages ? images[selected]?.url : NO_IMAGE;

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {hasImages && images.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {images.map((img, i) => (
            <button
              key={img.id ?? i}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === selected}
              className={`relative h-[72px] w-[72px] flex-none overflow-hidden rounded-[12px] border bg-surface transition-colors ${
                i === selected ? "border-accent" : "border-line"
              }`}
            >
              <Image
                src={img.url}
                alt={`${name} miniatura ${i + 1}`}
                fill
                sizes="72px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
      <div className="relative aspect-square w-full overflow-hidden rounded-container border border-line bg-[#F8F9FA]">
        <Image
          src={mainSrc || NO_IMAGE}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          priority
          quality={85}
          className="object-contain p-10"
        />
      </div>
    </div>
  );
}
