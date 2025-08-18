// src/shared/types/activity.types.ts
import { ActivityDtoType } from "@shared/api/generated/types";

export interface ExtendedActivityType extends ActivityDtoType {
  // Поля, которые пока не поддерживаются API - закомментированы
  // categoryId?: string;
  // subcategoryId?: string;
  // shortDescription?: string;
  // requiresApproval?: boolean;
  // isRecurring?: boolean;
  // contactMethod?: string;
  // currentParticipants?: number;
  
  // Временные поля для совместимости
  imageUrl?: string; // Пока используем вместо image
}

// Вспомогательные функции для работы с активностями
export const mapActivityFromDto = (dto: ActivityDtoType): ExtendedActivityType => {
  return {
    ...dto,
    imageUrl: dto.image?.fileId 
      ? `/api/GetFile?fileId=${dto.image.fileId}` 
      : `https://picsum.photos/seed/${dto.id}/400/300`,
  };
};

export const mapActivityToCreateCommand = (data: Partial<ExtendedActivityType>) => {
  const contacts = data.contacts || [];
  
  // Если есть contactMethod в старом формате, конвертируем
  // if (data.contactMethod) {
  //   if (data.contactMethod.includes('t.me')) {
  //     contacts.push({ type: 1, value: data.contactMethod });
  //   } else if (data.contactMethod.includes('wa.me')) {
  //     contacts.push({ type: 2, value: data.contactMethod });
  //   } else {
  //     contacts.push({ type: 0, value: data.contactMethod });
  //   }
  // }

  return {
    title: data.title || "",
    description: data.description || "",
    address: data.address,
    maxParticipants: data.maxParticipants,
    startDate: data.startDate,
    endDate: data.endDate,
    minAge: data.minAge,
    maxAge: data.maxAge,
    organizerId: data.organizerId || "",
    price: data.price || 0,
    categoryIds: data.categoryIds || [],
    activityImageFileId: null, // TODO: implement file upload
    contacts,
  };
};