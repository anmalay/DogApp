// shared/ui/Avatar/Avatar.tsx
import React, { FC } from "react";
import { IonAvatar } from "@ionic/react";
import cn from "classnames";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

export const Avatar: FC<AvatarProps> = ({
  src,
  alt = "",
  size = "md",
  className,
}) => {
  return (
    <IonAvatar className={cn(sizeClasses[size], className)}>
      <img src={src} alt={alt} />
    </IonAvatar>
  );
};
