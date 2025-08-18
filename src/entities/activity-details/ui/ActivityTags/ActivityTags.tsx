// entities/activity/ui/ActivityTags/ActivityTags.tsx
import { Category, Subcategory } from "@shared/config/categories";
import { Badge } from "@shared/ui/IonBadge/Badge";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ActivityTagsProps {
  category?: Category | null;
  subcategory?: Subcategory | null;
  isRecurring?: boolean;
  price?: number | null;
}

export const ActivityTags: FC<ActivityTagsProps> = ({
  category,
  subcategory,
  isRecurring,
  price,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      {category && <Badge variant="primary">{t(category.name)}</Badge>}

      {subcategory && <Badge variant="outline">{t(subcategory.name)}</Badge>}

      {isRecurring && <Badge variant="tertiary">{t("Recurring")}</Badge>}

      <Badge variant={price === 0 ? "success" : "outline"}>
        {price === 0 ? t("Free") : `$${price}`}
      </Badge>
    </div>
  );
};
