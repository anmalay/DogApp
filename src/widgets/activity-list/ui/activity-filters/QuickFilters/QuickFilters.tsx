// widgets/activity-filters/ui/QuickFilters/QuickFilters.tsx
import React, { FC } from "react";
import { IonChip, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";

interface QuickFiltersProps {
  selectedDateFilter: string;
  showFreeOnly: boolean;
  showAvailableOnly: boolean;
  onDateFilterChange: (filter: string) => void;
  onFreeToggle: () => void;
  onAvailableToggle: () => void;
}

export const QuickFilters: FC<QuickFiltersProps> = ({
  selectedDateFilter,
  showFreeOnly,
  showAvailableOnly,
  onDateFilterChange,
  onFreeToggle,
  onAvailableToggle,
}) => {
  const { t } = useTranslation();

  const dateFilters = [
    { id: "today", label: t("Today") },
    { id: "tomorrow", label: t("Tomorrow") },
    { id: "weekend", label: t("Weekend") },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-5 py-4">
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Date Filter Group */}
          <div className="flex gap-2 shrink-0">
            {dateFilters.map((filter) => (
              <IonChip
                key={filter.id}
                className={`h-9 px-4 font-medium border border-gray-200 whitespace-nowrap transition-colors ${
                  selectedDateFilter === filter.id
                    ? "text-gray-900 border-[var(--ion-color-tertiary)]"
                    : "hover:bg-gray-50"
                }`}
                style={{
                  backgroundColor:
                    selectedDateFilter === filter.id
                      ? "var(--ion-color-tertiary)"
                      : undefined,
                }}
                outline={selectedDateFilter !== filter.id}
                onClick={() =>
                  onDateFilterChange(
                    selectedDateFilter === filter.id ? "all" : filter.id
                  )
                }
              >
                <IonLabel className="text-sm">{filter.label}</IonLabel>
              </IonChip>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-200 shrink-0 self-stretch" />

          {/* Type Filter Group */}
          <div className="flex gap-2 shrink-0">
            <IonChip
              className={`h-9 px-4 font-medium border whitespace-nowrap transition-colors ${
                showFreeOnly
                  ? "text-white border-[var(--ion-color-success)]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              style={{
                backgroundColor: showFreeOnly
                  ? "var(--ion-color-success)"
                  : undefined,
              }}
              outline={!showFreeOnly}
              onClick={onFreeToggle}
            >
              <IonLabel className="text-sm">{t("Free")}</IonLabel>
            </IonChip>

            <IonChip
              className={`h-9 px-4 font-medium border whitespace-nowrap transition-colors ${
                showAvailableOnly
                  ? "text-white border-[var(--ion-color-primary)]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              style={{
                backgroundColor: showAvailableOnly
                  ? "var(--ion-color-primary)"
                  : undefined,
              }}
              outline={!showAvailableOnly}
              onClick={onAvailableToggle}
            >
              <IonLabel className="text-sm">{t("Has spots")}</IonLabel>
            </IonChip>
          </div>
        </div>
      </div>
    </div>
  );
};
