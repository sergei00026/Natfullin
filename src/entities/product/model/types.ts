export interface ProductImage {
  id: string;
  file: File;
  preview: string;
}

export interface ProductFormValues {
  name: string;
  type: "product";
  descriptionShort: string;
  descriptionLong: string;
  code: string;
  unit: string;
  categoryId: number | null;
  cashbackType: "lcard_cashback" | "money";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  globalCategoryId: number | null;
  marketplacePrice: string;
  chattingPercent: string;
  address: string;
  latitude: string;
  longitude: string;
  images: ProductImage[];
}

export interface ProductRequestDto {
  name: string;
  type: "product";
  description_short: string;
  description_long: string;
  code: string;
  unit: number;
  category: number;
  cashback_type: "lcard_cashback" | "money";
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  global_category_id: number;
  marketplace_price: number;
  chatting_percent: number;
  address: string;
  latitude: number;
  longitude: number;
}

export interface ProductResponseDto {
  id: number;
  name: string;
  code: string;
}

export interface ProductListItemDto {
  id: number;
  name: string;
  code?: string;
  marketplace_price?: number;
  prices?: Array<{ type?: string; value?: number; price?: number }>;
  category?: number;
  description_short?: string;
}

export interface ProductListResponseDto {
  count: number;
  result: ProductListItemDto[];
}
