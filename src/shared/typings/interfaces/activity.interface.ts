import type {
  ActivityDtoType,
  ContactDtoType,
} from "@shared/api/generated/types";

// Расширенный тип активности для фронтенда
export interface ExtendedActivityType extends ActivityDtoType {
  // Поля которые будут добавлены позже в API
  // shortDescription?: string;
  // isRecurring?: boolean;
  // requiresApproval?: boolean;
  // subcategoryId?: number;
  // currentParticipants?: number;

  // Вычисляемые поля для UI
  imageUrl?: string; // URL изображения из FileDtoType
  contactMethod?: string; // Основной способ связи из contacts
  categoryId?: number; // Первая категория из categoryIds
}

export interface CreateActivityFormType {
  title: string;
  description: string;
  address?: string;
  startDate: Date;
  endDate?: Date;
  maxParticipants?: number;
  minAge?: number;
  maxAge?: number;
  price: number;
  categoryIds: number[];
  contacts: ContactDtoType[];
  imageFile?: File;
}

export interface ActivityFiltersType {
  categoryIds?: number[];
  freeOnly?: boolean;
  availableOnly?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  location?: string;
}
