import React, { FC } from "react";
import { Avatar } from "../Avatar/Avatar";

interface AvatarGroupProps {
  avatars: Array<{ id: string | number; src: string; alt?: string }>;
  max?: number;
  size?: "sm" | "md" | "lg";
  overlap?: boolean;
}

export const AvatarGroup: FC<AvatarGroupProps> = ({
  avatars,
  max = 5,
  size = "sm",
  overlap = true,
}) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={`flex ${overlap ? "-space-x-3" : "space-x-2"}`}>
      {visibleAvatars.map((avatar) => (
        <Avatar
          key={avatar.id}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
          className={overlap ? "border-2 border-white" : undefined}
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={`
          ${
            size === "sm"
              ? "w-10 h-10"
              : size === "md"
              ? "w-12 h-12"
              : "w-16 h-16"
          }
          rounded-full bg-gray-200 
          ${overlap ? "border-2 border-white" : ""} 
          flex items-center justify-center
        `}
        >
          <span className="text-xs text-gray-600">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
};
