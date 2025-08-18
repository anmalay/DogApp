// src/shared/utils/date.utils.ts
import {
  format,
  formatDistance,
  isToday,
  isTomorrow,
  isThisWeek,
  parseISO,
} from "date-fns";
import { enUS, ru } from "date-fns/locale";

const locales = {
  en: enUS,
  ru: ru,
};

export const getLocale = (lang: string) =>
  locales[lang as keyof typeof locales] || enUS;

export const formatDate = (
  date: string | Date,
  pattern: string,
  lang = "en"
) => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, pattern, { locale: getLocale(lang) });
};

export const formatActivityDate = (date: string | Date, lang = "en") => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  if (isToday(dateObj)) {
    return `Today, ${format(dateObj, "HH:mm")}`;
  }

  if (isTomorrow(dateObj)) {
    return `Tomorrow, ${format(dateObj, "HH:mm")}`;
  }

  if (isThisWeek(dateObj)) {
    return format(dateObj, "EEEE, HH:mm", { locale: getLocale(lang) });
  }

  return format(dateObj, "MMM d, HH:mm", { locale: getLocale(lang) });
};

export const formatRelativeTime = (date: string | Date, lang = "en") => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), {
    addSuffix: true,
    locale: getLocale(lang),
  });
};

export const getDateFilterOptions = () => ({
  today: {
    key: "today",
    label: "filter.date.today",
    value: () => {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      return { start, end };
    },
  },
  tomorrow: {
    key: "tomorrow",
    label: "filter.date.tomorrow",
    value: () => {
      const start = new Date();
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setDate(end.getDate() + 1);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    },
  },
  weekend: {
    key: "weekend",
    label: "filter.date.weekend",
    value: () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;

      const start = new Date();
      start.setDate(start.getDate() + daysUntilSaturday);
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setDate(start.getDate() + 1);
      end.setHours(23, 59, 59, 999);

      return { start, end };
    },
  },
  nextWeek: {
    key: "nextWeek",
    label: "filter.date.nextWeek",
    value: () => {
      const start = new Date();
      start.setDate(start.getDate() + 7);
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setDate(end.getDate() + 13);
      end.setHours(23, 59, 59, 999);

      return { start, end };
    },
  },
});
