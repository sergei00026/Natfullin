import { Category } from "@/entities/category/model/types";
import { ProductFormValues } from "@/entities/product/model/types";

interface SeoResult {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

interface ProductDraftResult extends Partial<ProductFormValues> {
  generatedAt?: string;
}

const wait = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const generateSeo = async (name: string): Promise<SeoResult> => {
  await wait(900);
  const base = name.trim() || "Marketplace Product";
  return {
    seoTitle: `${base} - Buy Online with Fast Delivery`,
    seoDescription: `Order ${base.toLowerCase()} with verified quality, competitive price and marketplace cashback.`,
    seoKeywords: [base.toLowerCase(), "marketplace", "best price", "delivery"],
  };
};

export const improveDescription = async (text: string): Promise<string> => {
  await wait(700);
  if (!text.trim()) {
    return "This product is carefully selected for quality and value. Ideal for daily use with reliable performance.";
  }
  return `${text.trim()}\n\nImproved by AI: structured benefits, clearer language and stronger value proposition for buyers.`;
};

export const detectCategory = async (name: string, categories: Category[]): Promise<Category | null> => {
  await wait(600);
  const lowered = name.toLowerCase();
  const found = categories.find((category) => lowered.includes(category.name.toLowerCase().split(" ")[0]));
  return found ?? categories[0] ?? null;
};

export const generateProductData = async (name: string): Promise<ProductDraftResult> => {
  await wait(1200);
  const cleanedName = name.trim() || "New Product";
  return {
    name: cleanedName,
    descriptionShort: `${cleanedName} with seller warranty and fast delivery.`,
    descriptionLong: `${cleanedName} is designed for customers who value quality and practical everyday use.`,
    marketplacePrice: "500",
    chattingPercent: "4",
  };
};
