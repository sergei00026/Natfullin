import { ProductListItemDto, ProductListResponseDto, ProductRequestDto, ProductResponseDto } from "@/entities/product/model/types";
import { Category } from "@/entities/category/model/types";
import axios from "axios";
import { api } from "@/shared/api/api";

const PRODUCT_TOKEN = "af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77";
const NOMENCLATURE_ENDPOINT = `https://app.tablecrm.com/api/v1/nomenclature/?token=${PRODUCT_TOKEN}`;

const mockCategories: Category[] = [
  { id: 2477, name: "Home Appliances", globalCategoryId: 127 },
  { id: 2478, name: "Electronics", globalCategoryId: 211 },
  { id: 2479, name: "Beauty and Care", globalCategoryId: 312 },
  { id: 2480, name: "Sports", globalCategoryId: 411 },
];

export const createProduct = async (payload: ProductRequestDto[]): Promise<ProductResponseDto[]> => {
  // Explicit full URL to ensure request is sent to the exact TableCRM endpoint.
  const response = await axios.post<ProductResponseDto[]>(NOMENCLATURE_ENDPOINT, payload);
  return response.data;
};

export const getProducts = async (): Promise<ProductListItemDto[]> => {
  try {
    const response = await api.get<ProductListItemDto[] | ProductListResponseDto>(`/nomenclature/?token=${PRODUCT_TOKEN}`);
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (Array.isArray(response.data?.result)) {
      return response.data.result;
    }
    return [];
  } catch {
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    // This endpoint is a placeholder. In real projects this should call a real category API.
    const response = await api.get<Category[]>(`/categories/?token=${PRODUCT_TOKEN}`);
    if (!Array.isArray(response.data) || response.data.length === 0) {
      return mockCategories;
    }
    return response.data;
  } catch {
    return mockCategories;
  }
};
