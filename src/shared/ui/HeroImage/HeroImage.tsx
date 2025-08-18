// shared/ui/HeroImage/HeroImage.tsx
import React, { FC } from "react";

interface HeroImageProps {
  src?: string;
  alt: string;
  height?: string;
  gradient?: boolean;
}

export const HeroImage: FC<HeroImageProps> = ({
  src,
  alt,
  height = "h-64",
  gradient = true,
}) => {
  return (
    <div className={`relative ${height} bg-gray-200`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      )}
    </div>
  );
};
