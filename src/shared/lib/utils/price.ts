export const formatPrice = (value: string): string => {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) {
    return "";
  }
  return new Intl.NumberFormat("ru-RU").format(Number(digits));
};

export const normalizePrice = (value: string): number => {
  return Number(value.replace(/[^\d]/g, "") || 0);
};
