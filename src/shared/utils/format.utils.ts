// src/shared/utils/format.utils.ts

export const formatPrice = (
  price: number,
  currency = "USD",
  locale = "en-US"
) => {
  if (price === 0) return "Free";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatName = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) return "";
  if (!lastName) return firstName || "";
  if (!firstName) return lastName;
  return `${firstName} ${lastName}`;
};

export const formatInitials = (firstName?: string, lastName?: string) => {
  const initials = [firstName?.[0], lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  return initials || "?";
};

export const formatParticipants = (current: number, max?: number | null) => {
  if (!max) return `${current}`;
  return `${current}/${max}`;
};

export const formatDistance = (distance: number) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

export const formatPhoneNumber = (phone: string) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Format based on length
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  } else if (cleaned.length === 11) {
    return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");
  }

  return phone;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const capitalizeFirst = (text: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatAddress = (address: string, maxLength = 30) => {
  if (!address) return "";

  // If address is short enough, return as is
  if (address.length <= maxLength) return address;

  // Try to find a good breaking point
  const parts = address.split(",");
  if (parts.length > 1) {
    return truncateText(parts[0], maxLength);
  }

  return truncateText(address, maxLength);
};
