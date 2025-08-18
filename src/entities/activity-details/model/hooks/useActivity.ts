// entities/activity/model/hooks/useActivity.ts
import {
  mockExtendedActivities,
  mockUsers,
} from "@shared/api/mock/activities.mock";
import { getCategoryById, getSubcategoryById } from "@shared/config/categories";
import { useMemo } from "react";

export const useActivity = (id: string) => {
  const activity = useMemo(
    () => mockExtendedActivities.find((a) => a.id === id),
    [id]
  );

  const organizer = useMemo(
    () => mockUsers.find((u) => u.id === activity?.organizerId),
    [activity]
  );

  const category = useMemo(
    () => (activity ? getCategoryById(activity.categoryId) : null),
    [activity]
  );

  const subcategory = useMemo(
    () => (activity ? getSubcategoryById(activity.subcategoryId) : null),
    [activity]
  );

  const isActivityFull = Boolean(
    activity?.maxParticipants &&
      activity.currentParticipants >= activity.maxParticipants
  );

  return {
    activity,
    organizer,
    category,
    subcategory,
    isActivityFull,
  };
};
