// entities/user/ui/ParticipantsList/ParticipantsList.tsx
import { AvatarGroup } from "@shared/ui/AvatarGroup/AvatarGroup";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

interface ParticipantsListProps {
  count: number;
  maxVisible?: number;
}

export const ParticipantsList: FC<ParticipantsListProps> = ({
  count,
  maxVisible = 5,
}) => {
  const { t } = useTranslation();

  if (count === 0) return null;

  // В реальном приложении здесь будут данные участников
  const mockParticipants = Array.from({ length: count }, (_, i) => ({
    id: i + 10,
    src: `https://i.pravatar.cc/150?u=${i + 10}`,
  }));

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">
        {t("Participants")} ({count})
      </h3>
      <AvatarGroup avatars={mockParticipants} max={maxVisible} />
    </div>
  );
};
