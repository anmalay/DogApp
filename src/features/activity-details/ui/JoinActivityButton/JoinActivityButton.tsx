// features/join-activity/ui/JoinActivityButton/JoinActivityButton.tsx
import { Button } from "@shared/ui/Button/Button";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

interface JoinActivityButtonProps {
  isOrganizer: boolean;
  isJoined: boolean;
  isFull: boolean;
  requiresApproval: boolean;
  isLoading?: boolean;
  onJoin: () => void;
  onLeave: () => void;
  onEdit?: () => void;
}

export const JoinActivityButton: FC<JoinActivityButtonProps> = ({
  isOrganizer,
  isJoined,
  isFull,
  requiresApproval,
  isLoading = false,
  onJoin,
  onLeave,
  onEdit,
}) => {
  const { t } = useTranslation();

  if (isOrganizer && onEdit) {
    return (
      <Button
        variant="primary"
        expand="block"
        onClick={onEdit}
        loading={isLoading}
        disabled={isLoading}
      >
        {t("Edit")}
      </Button>
    );
  }

  if (isJoined) {
    return (
      <Button
        variant="secondary"
        expand="block"
        onClick={onLeave}
        loading={isLoading}
        disabled={isLoading}
      >
        {t("Leave Activity")}
      </Button>
    );
  }

  const canJoin = !isOrganizer && !isFull && !isJoined;

  if (!canJoin) {
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
      loading={isLoading}
      disabled={isLoading}
    >
      {requiresApproval ? t("Request to Join") : t("Join")}
    </Button>
  );
};
