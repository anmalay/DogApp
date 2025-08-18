// features/contact-organizer/ui/ContactButton/ContactButton.tsx
import React, { FC } from "react";
import { callOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { Button } from "@shared/ui/Button/Button";

interface ContactButtonProps {
  contactMethod: string;
  variant?: "primary" | "outline";
  expand?: "block" | "full";
  onClick: () => void;
}

export const ContactButton: FC<ContactButtonProps> = ({
  contactMethod,
  variant = "outline",
  expand,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      variant={variant === "primary" ? "outline" : "ghost"}
      expand={expand}
      icon={callOutline}
      iconPosition={expand === "block" ? "start" : "icon-only"}
      onClick={onClick}
    >
      {expand === "block" && t("Contact Organizer")}
    </Button>
  );
};
