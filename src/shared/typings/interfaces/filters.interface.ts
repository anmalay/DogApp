// src/shared/types/filters.ts

export interface ActivityFilters {
  dateFilter: DateFilterType;
  categories: string[];
  subcategories: string[];
  priceType: PriceFilterType;
  availabilityFilter: AvailabilityFilterType;
  myActivitiesFilter: MyActivitiesFilterType;
  sortBy: SortByType;
  location?: string;
  maxDistance?: number;
}

export type DateFilterType =
  | "all"
  | "today"
  | "tomorrow"
  | "weekend"
  | "next_week"
  | "custom";

export type PriceFilterType = "all" | "free" | "paid";

export type AvailabilityFilterType = "all" | "available" | "full";

export type MyActivitiesFilterType =
  | "all"
  | "participating"
  | "organizing"
  | "requested";

export type SortByType =
  | "date"
  | "price"
  | "distance"
  | "popularity"
  | "newest";
