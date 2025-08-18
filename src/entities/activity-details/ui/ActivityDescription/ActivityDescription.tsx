// entities/activity/ui/ActivityDescription/ActivityDescription.tsx
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ActivityDescriptionProps {
  description: string;
}

export const ActivityDescription: FC<ActivityDescriptionProps> = ({
  description,
}) => {
  const { t } = useTranslation();

  if (!description) return null;

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">{t("Description")}</h3>
      <p className="text-gray-600 whitespace-pre-line leading-relaxed">
        {description}
      </p>
    </div>
  );
};
