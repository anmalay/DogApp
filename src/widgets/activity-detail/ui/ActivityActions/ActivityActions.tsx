// widgets/activity-detail/ui/ActivityActions/ActivityActions.tsx
import { ContactButton } from "@features/activity-details/ui/ContactButton/ContactButton";
import { JoinActivityButton } from "@features/activity-details/ui/JoinActivityButton/JoinActivityButton";
import React, { FC } from "react";

interface ActivityActionsProps {
  isOrganizer: boolean;
  isJoined: boolean;
  isFull: boolean;
  requiresApproval: boolean;
  isLoading?: boolean;
  contactMethod: string;
  onJoin: () => void;
  onLeave: () => void;
  onEdit?: () => void;
  onContact: () => void;
}

export const ActivityActions: FC<ActivityActionsProps> = ({
  isOrganizer,
  isJoined,
  isFull,
  requiresApproval,
  isLoading,
  contactMethod,
  onJoin,
  onLeave,
  onEdit,
  onContact,
}) => {
  return (
    <div className="space-y-3">
      <JoinActivityButton
        isOrganizer={isOrganizer}
        isJoined={isJoined}
        isFull={isFull}
        requiresApproval={requiresApproval}
        isLoading={isLoading}
        onJoin={onJoin}
        onLeave={onLeave}
        onEdit={onEdit}
      />

      <ContactButton
        contactMethod={contactMethod}
        variant="primary"
        expand="block"
        onClick={onContact}
      />
    </div>
  );
};
