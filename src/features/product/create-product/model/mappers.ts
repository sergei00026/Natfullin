import { ProductFormValues, ProductRequestDto } from "@/entities/product/model/types";
import { normalizePrice } from "@/shared/lib/utils/price";

export const mapProductFormToRequest = (data: ProductFormValues): ProductRequestDto => {
  return {
    name: data.name,
    type: data.type,
    description_short: data.descriptionShort,
    description_long: data.descriptionLong,
    code: data.code,
    unit: Number(data.unit),
    category: data.categoryId ?? 0,
    cashback_type: data.cashbackType,
    seo_title: data.seoTitle,
    seo_description: data.seoDescription,
    seo_keywords: data.seoKeywords,
    global_category_id: data.globalCategoryId ?? 0,
    marketplace_price: normalizePrice(data.marketplacePrice),
    chatting_percent: Number(data.chattingPercent),
    address: data.address,
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
  };
};
