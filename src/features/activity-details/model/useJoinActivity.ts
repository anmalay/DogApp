// features/join-activity/model/useJoinActivity.ts
import {
  usePostParticipantsCreate,
  useDeleteParticipantsDelete,
} from "@shared/api/generated/participants/participants";
import { platformUtils } from "@shared/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "@shared/hooks";

interface UseJoinActivityParams {
  activityId: string;
  requiresApproval?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useJoinActivity = ({
  activityId,
  requiresApproval = false,
  onSuccess,
  onError,
}: UseJoinActivityParams) => {
  const { t } = useTranslation();
  const { user } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const joinMutation = usePostParticipantsCreate();
  const leaveMutation = useDeleteParticipantsDelete();

  const handleJoin = async () => {
    if (!user) {
      await platformUtils.showAlert(t("Please login to join activities"));
      return;
    }

    setIsLoading(true);
    try {
      await joinMutation.mutateAsync({
        data: {
          activityId,
          userId: user.id,
        },
      });

      if (requiresApproval) {
        await platformUtils.showAlert(
          t("Your request has been sent to the organizer")
        );
      } else {
        setIsJoined(true);
        platformUtils.haptic.impact("light");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error joining:", error);
      await platformUtils.showAlert(t("Failed to join activity"));
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!user) return;

    const confirmed = await platformUtils.showConfirm(
      t("Are you sure you want to leave this activity?")
    );

    if (confirmed) {
      setIsLoading(true);
      try {
        // TODO: API пока не поддерживает получение ID участника
        // Нужно будет добавить метод для удаления по activityId и userId
        await leaveMutation.mutateAsync({
          data: {
            id: "temp-id", // временное решение
          },
        });

        setIsJoined(false);
        platformUtils.haptic.impact("light");
        onSuccess?.();
      } catch (error) {
        console.error("Error leaving:", error);
        await platformUtils.showAlert(t("Failed to leave activity"));
        onError?.(error as Error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    isJoined,
    isLoading: isLoading || joinMutation.isPending || leaveMutation.isPending,
    handleJoin,
    handleLeave,
  };
};
