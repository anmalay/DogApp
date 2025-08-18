// entities/activity/ui/ActivityInfo/ActivityInfo.tsx
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IonIcon } from "@ionic/react";
import {
  calendarOutline,
  timeOutline,
  locationOutline,
  peopleOutline,
} from "ionicons/icons";

import { format } from "date-fns";
import { InfoBlock } from "@shared/ui/InfoBlock/InfoBlock";
import { formatActivityDate } from "@shared/utils";

interface ActivityInfoProps {
  startDate: Date;
  endDate?: Date;
  address: string;
  currentParticipants: number;
  maxParticipants?: number;
  minAge?: number;
  maxAge?: number;
}

export const ActivityInfo: FC<ActivityInfoProps> = ({
  startDate,
  endDate,
  address,
  currentParticipants,
  maxParticipants,
  minAge,
  maxAge,
}) => {
  const { t } = useTranslation();

  const formatParticipants = () => {
    let text = `${currentParticipants}`;
    if (maxParticipants) {
      text += ` / ${maxParticipants}`;
    }
    text += ` ${t("people")}`;
    return text;
  };

  const formatAge = () => {
    if (!minAge) return null;
    let text = `${t("Age")}: ${minAge}`;
    if (maxAge) {
      text += `-${maxAge}`;
    }
    text += "+";
    return text;
  };

  return (
    <div className="space-y-4">
      <InfoBlock
        icon={calendarOutline}
        label={t("When")}
        value={formatActivityDate(startDate)}
        subValue={
          endDate && (
            <div className="flex items-center gap-1">
              <IonIcon icon={timeOutline} className="text-xs" />
              {format(endDate, "HH:mm")}
            </div>
          )
        }
      />

      <InfoBlock icon={locationOutline} label={t("Where")} value={address} />

      <InfoBlock
        icon={peopleOutline}
        label={t("Participants")}
        value={formatParticipants()}
        subValue={formatAge()}
      />
    </div>
  );
};
