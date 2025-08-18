import { ActivityFilters } from "@shared/typings/interfaces/filters.interface";

export const DEFAULT_FILTERS: ActivityFilters = {
  dateFilter: "all",
  categories: [],
  subcategories: [],
  priceType: "all",
  availabilityFilter: "all",
  myActivitiesFilter: "all",
  sortBy: "date",
};

// Quick filter options for the top bar
export const QUICK_FILTERS = {
  DATE: [
    { key: "today", labelKey: "Today" },
    { key: "tomorrow", labelKey: "Tomorrow" },
    { key: "weekend", labelKey: "Weekend" },
  ],
  TYPE: [
    { key: "free", labelKey: "Free", color: "green" },
    { key: "available", labelKey: "Has spots", color: "blue" },
  ],
} as const;
