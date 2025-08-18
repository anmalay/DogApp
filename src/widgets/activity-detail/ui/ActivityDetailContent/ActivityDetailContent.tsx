// widgets/activity-detail/ui/ActivityDetailContent/ActivityDetailContent.tsx
import { ActivityDescription } from "@entities/activity-details/ui/ActivityDescription/ActivityDescription";
import { ActivityInfo } from "@entities/activity-details/ui/ActivityInfo/ActivityInfo";
import { ActivityTags } from "@entities/activity-details/ui/ActivityTags/ActivityTags";
import { OrganizerCard } from "@entities/user/ui/OrganizerCard/OrganizerCard";

import { UserDtoType } from "@shared/api/generated/types";
import { Category, Subcategory } from "@shared/config/categories";
import { ExtendedActivityType } from "@shared/typings/interfaces/activity.interface";
import React, { FC } from "react";

interface ActivityDetailContentProps {
  activity: ExtendedActivityType;
  organizer: UserDtoType | undefined;
  category?: Category | null;
  subcategory?: Subcategory | null;
  isCurrentUser: boolean;
  onContactOrganizer: () => void;
}

export const ActivityDetailContent: FC<ActivityDetailContentProps> = ({
  activity,
  organizer,
  category,
  subcategory,
  isCurrentUser,
  onContactOrganizer,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-medium text-gray-900 m-0 mb-4">{activity.title}</h1>

        <ActivityTags
          category={category}
          subcategory={subcategory}
          isRecurring={false} // activity.isRecurring - временно false
          price={activity.price || 0}
        />
      </div>

      {/* Info */}
      <ActivityInfo
        startDate={
          activity.startDate ? new Date(activity.startDate) : new Date()
        }
        endDate={activity.endDate ? new Date(activity.endDate) : undefined}
        address={activity.address || ""}
        currentParticipants={0} // activity.currentParticipants - временно 0
        maxParticipants={activity.maxParticipants || undefined}
        minAge={activity.minAge || undefined}
        maxAge={activity.maxAge || undefined}
      />

      {/* Description */}
      <ActivityDescription description={activity.description} />

      {/* Organizer */}
      <OrganizerCard
        organizer={
          organizer
            ? {
                id: organizer.id || "",
                email: organizer.email,
                firstName: organizer.firstName,
                lastName: organizer.lastName,
                about: organizer.about,
              }
            : undefined
        }
        isCurrentUser={isCurrentUser}
        onContact={!isCurrentUser ? onContactOrganizer : undefined}
      />

      {/* Participants - временно скрыто */}
      {/* <ParticipantsList count={activity.currentParticipants || 0} /> */}
    </div>
  );
};
