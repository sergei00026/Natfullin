import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  type: z.literal("product"),
  descriptionShort: z.string().min(10, "Short description must be at least 10 characters"),
  descriptionLong: z.string().min(20, "Long description must be at least 20 characters"),
  code: z.string().min(3, "SKU is required"),
  unit: z.string().min(1, "Unit is required"),
  categoryId: z.number().nullable().refine((value) => value !== null, "Category is required"),
  cashbackType: z.enum(["lcard_cashback", "money"]),
  seoTitle: z.string().max(70, "SEO title must be max 70 characters"),
  seoDescription: z.string().max(160, "SEO description must be max 160 characters"),
  seoKeywords: z.array(z.string().min(2)).min(1, "Add at least one SEO keyword"),
  globalCategoryId: z.number().nullable().refine((value) => value !== null, "Global category is required"),
  marketplacePrice: z.string().min(1, "Price is required"),
  chattingPercent: z.string().min(1, "Chatting percent is required"),
  address: z.string().min(5, "Address is required"),
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
  images: z.array(z.any()),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
