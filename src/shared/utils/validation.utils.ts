// src/shared/utils/validation.utils.ts

export const validators = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  phone: (value: string) => {
    const phoneRegex =
      /^\+?[(]?[0-9]{3}[)]?[-\s.]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(value);
  },

  url: (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  telegram: (value: string) => {
    const telegramRegex = /^(https?:\/\/)?(www\.)?t\.me\/[a-zA-Z0-9_]+$/;
    return telegramRegex.test(value);
  },

  whatsapp: (value: string) => {
    const whatsappRegex = /^(https?:\/\/)?(wa\.me|api\.whatsapp\.com)\/[0-9]+$/;
    return whatsappRegex.test(value);
  },

  minLength: (min: number) => (value: string) => value.length >= min,

  maxLength: (max: number) => (value: string) => value.length <= max,

  minValue: (min: number) => (value: number) => value >= min,

  maxValue: (max: number) => (value: number) => value <= max,

  required: (value: unknown) =>
    value !== null && value !== undefined && value !== "",

  minParticipants: (value: number) => value >= 2,

  maxParticipants: (value: number) => value <= 1000,

  price: (value: number) => value >= 0,

  age: (value: number) => value >= 0 && value <= 120,
};

export const getValidationMessage = (field: string, rule: string): string => {
  // Return i18n keys for translation
  return `validation.${field}.${rule}`;
};

export const validateForm = <T extends Record<string, unknown>>(
  values: T,
  rules: Record<keyof T, Array<(value: unknown) => boolean | string>>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = values[field];

    for (const rule of fieldRules) {
      const result = rule(value);

      if (typeof result === "string") {
        errors[field] = result;
        break;
      } else if (!result) {
        errors[field] = getValidationMessage(field, "invalid");
        break;
      }
    }
  });

  return errors;
};
