// src/entities/activity-list/ui/ActivityCardSkeleton/ActivityCardSkeleton.tsx
import React, { FC } from "react";

export const ActivityCardSkeleton: FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-52 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-5">
        {/* Title */}
        <div className="h-7 bg-gray-200 rounded-lg mb-4 w-3/4" />

        {/* Meta Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-48" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Button */}
        <div className="h-12 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
};
