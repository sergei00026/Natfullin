export const generateSku = (name: string): string => {
  const prefix = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 8);

  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix || "SKU"}-${random}`;
};
