// entities/activity/ui/ActivityCard/ActivityCard.tsx
import React, { FC } from "react";
import { IonIcon } from "@ionic/react";
import {
  calendarOutline,
  locationOutline,
  peopleOutline,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { Category } from "@shared/config/categories";
import { Badge } from "@shared/ui/IonBadge/Badge";
import { Button } from "@shared/ui/Button/Button";
import { formatActivityDate } from "@shared/utils";
import { ExtendedActivityType } from "@shared/typings/types/activity.types";

interface ActivityCardProps {
  activity: ExtendedActivityType;
  category: Category | null;
  isOrganizer: boolean;
  onClick: () => void;
  onJoin: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
}

export const ActivityCard: FC<ActivityCardProps> = ({
  activity,
  category,
  isOrganizer,
  onClick,
  onJoin,
  onEdit,
}) => {
  const { t } = useTranslation();
  const isFull = activity.maxParticipants && activity.maxParticipants > 0; // currentParticipants временно недоступен

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200 hover:border-gray-300">
      {/* Clickable area */}
      <div
        onClick={onClick}
        className="cursor-pointer transition-all duration-200 active:scale-[0.98]"
      >
        {/* Image Section */}
        <div className="relative h-52 bg-gray-200">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <Badge variant={activity.price === 0 ? "success" : "outline"}>
              {activity.price === 0 ? t("Free") : `$${activity.price}`}
            </Badge>
          </div>

          {/* Category Badge - временно скрыто */}
          {/* {category && (
            <div className="absolute top-4 left-4">
              <div className="px-4 py-2 rounded-full bg-white/95 border border-white/20 text-gray-900 text-sm font-medium">
                {t(category.name)}
              </div>
            </div>
          )} */}
        </div>

        {/* Content */}
        <div className="p-5 pb-4">
          <h3 className="font-semibold text-xl text-gray-900 mb-3 leading-tight mt-0">
            {activity.title}
          </h3>

          {/* Meta Info */}
          <div className="space-y-3 mb-4">
            <ActivityCardInfo
              icon={calendarOutline}
              text={formatActivityDate(activity.startDate || new Date())}
              // badge={activity.isRecurring ? t("Recurring") : undefined} // временно скрыто
            />

            <ActivityCardInfo
              icon={locationOutline}
              text={activity.address || t("Location TBD")}
              truncate
            />

            <ActivityCardInfo
              icon={peopleOutline}
              text={
                activity.maxParticipants
                  ? `${t("Up to")} ${activity.maxParticipants} ${t("people")}`
                  : t("Unlimited participants")
              }
            />
          </div>

          {/* Description */}
          {activity.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {activity.description.substring(0, 100)}...
            </p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-5 pb-5">
        <ActivityCardButton
          isOrganizer={isOrganizer}
          isFull={false} // временно всегда false
          requiresApproval={false} // временно всегда false
          onJoin={onJoin}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
};

// Sub-component for info rows
interface ActivityCardInfoProps {
  icon: string;
  text: string;
  badge?: string;
  truncate?: boolean;
}

const ActivityCardInfo: FC<ActivityCardInfoProps> = ({
  icon,
  text,
  badge,
  truncate = false,
}) => {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      <IonIcon
        icon={icon}
        className="text-xl flex-shrink-0"
        style={{ color: "var(--ion-color-primary)" }}
      />
      <span className={`text-sm ${truncate ? "truncate" : ""}`}>{text}</span>
      {badge && (
        <Badge variant="tertiary" className="text-xs">
          {badge}
        </Badge>
      )}
    </div>
  );
};

// Sub-component for action button
interface ActivityCardButtonProps {
  isOrganizer: boolean;
  isFull: boolean;
  requiresApproval: boolean;
  onJoin: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
}

const ActivityCardButton: FC<ActivityCardButtonProps> = ({
  isOrganizer,
  isFull,
  requiresApproval,
  onJoin,
  onEdit,
}) => {
  const { t } = useTranslation();

  if (isOrganizer) {
    return (
      <Button variant="secondary" expand="block" onClick={onEdit}>
        {t("Edit")}
      </Button>
    );
  }

  if (isFull) {
    return (
      <Button variant="secondary" expand="block" disabled>
        {t("Full")}
      </Button>
    );
  }

  return (
    <Button
      variant={requiresApproval ? "tertiary" : "primary"}
      expand="block"
      onClick={onJoin}
    >
      {requiresApproval ? t("Request to Join") : t("Join")}
    </Button>
  );
};
