// entities/user/ui/OrganizerCard/OrganizerCard.tsx
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { IonButton, IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";
import { Avatar } from "@shared/ui/Avatar/Avatar";
import { Badge } from "@shared/ui/IonBadge/Badge";
import { User } from "@shared/store/app.store";

interface OrganizerCardProps {
  organizer: User | undefined;
  isCurrentUser?: boolean;
  onContact?: () => void;
}

export const OrganizerCard: FC<OrganizerCardProps> = ({
  organizer,
  isCurrentUser = false,
  onContact,
}) => {
  const { t } = useTranslation();

  if (!organizer) return null;

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">{t("Organizer")}</h3>
      <div className="flex items-center gap-3">
        <Avatar
          src={`https://i.pravatar.cc/150?u=${organizer.id}`}
          alt={organizer.firstName}
        />
        <div className="flex-1">
          <p className="font-medium text-gray-900">
            {organizer.firstName} {organizer.lastName}
          </p>
          {isCurrentUser && (
            <Badge variant="tertiary" className="mt-1">
              {t("You")}
            </Badge>
          )}
        </div>
        {!isCurrentUser && onContact && (
          <IonButton
            fill="outline"
            size="small"
            className="border-gray-200 hover:border-gray-300"
            onClick={onContact}
          >
            <IonIcon icon={callOutline} slot="icon-only" />
          </IonButton>
        )}
      </div>
    </div>
  );
};
