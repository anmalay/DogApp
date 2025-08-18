import { useState } from "react";

export const useActivitiesFilters = () => {
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("all");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  return {
    selectedDateFilter,
    showFreeOnly,
    showAvailableOnly,
    setSelectedDateFilter,
    setShowFreeOnly,
    setShowAvailableOnly,
  };
};
