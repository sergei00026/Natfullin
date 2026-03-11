"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Category } from "@/entities/category/model/types";
import { ProductFormValues, ProductRequestDto } from "@/entities/product/model/types";
import { ProductPreview } from "@/entities/product/ui/product-preview";
import { mapProductFormToRequest } from "@/features/product/create-product/model/mappers";
import { productFormSchema } from "@/features/product/create-product/model/schema";
import { AiToolsPanel } from "@/features/product/create-product/ui/ai-tools-panel";
import { CategorySelector } from "@/features/product/create-product/ui/category-selector";
import { ImageUploader } from "@/features/product/create-product/ui/image-uploader";
import { MapLocationPicker } from "@/features/product/create-product/ui/map-location-picker";
import { PriceInput } from "@/features/product/create-product/ui/price-input";
import { SeoSection } from "@/features/product/create-product/ui/seo-section";
import { createProduct } from "@/services/products";
import { useDebouncedEffect } from "@/shared/lib/hooks/use-debounced-effect";
import { generateSku } from "@/shared/lib/utils/sku";
import { detectCategory, generateProductData, generateSeo, improveDescription } from "@/shared/services/ai/product-ai";
import { Button } from "@/shared/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";
import { Input } from "@/shared/ui/shadcn/input";
import { Select } from "@/shared/ui/shadcn/select";
import { Textarea } from "@/shared/ui/shadcn/textarea";
import { useToast } from "@/shared/ui/providers/toast-provider";

interface ProductFormProps {
  categories: Category[];
}

const DRAFT_KEY = "marketplace_product_form_draft_v1";

const defaultValues: ProductFormValues = {
  name: "",
  type: "product",
  descriptionShort: "",
  descriptionLong: "",
  code: "",
  unit: "116",
  categoryId: null,
  cashbackType: "lcard_cashback",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: [],
  globalCategoryId: null,
  marketplacePrice: "",
  chattingPercent: "4",
  address: "",
  latitude: "",
  longitude: "",
  images: [],
};

const unitOptions = [
  { value: "116", label: "Piece" },
  { value: "166", label: "Set" },
  { value: "796", label: "Service" },
];

const cashbackOptions = [
  { value: "lcard_cashback", label: "Lcard cashback" },
  { value: "money", label: "Money" },
];

const stripTransientFields = (values: ProductFormValues): Omit<ProductFormValues, "images"> => {
  return Object.fromEntries(Object.entries(values).filter(([key]) => key !== "images")) as Omit<ProductFormValues, "images">;
};

export const ProductForm = ({ categories }: ProductFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [apiError, setApiError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [optimisticProduct, setOptimisticProduct] = useState<ProductFormValues | null>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const values = watch();
  const previewValue = optimisticProduct ?? values;

  useEffect(() => {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as Partial<ProductFormValues>;
      reset({ ...defaultValues, ...parsed, images: [] });
    } catch {
      window.localStorage.removeItem(DRAFT_KEY);
    }
  }, [reset]);

  useDebouncedEffect(
    () => {
      // Autosave everything except transient image blobs.
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(stripTransientFields(values)));
    },
    800,
    values,
  );

  const selectedCategory = useMemo(() => categories.find((item) => item.id === values.categoryId) ?? null, [categories, values.categoryId]);

  const onSaveDraft = () => {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(stripTransientFields(values)));
    toast({ title: "Draft saved", description: "Product draft was saved to localStorage." });
  };

  const onGenerateSeo = async () => {
    setAiLoading(true);
    const result = await generateSeo(values.name);
    setValue("seoTitle", result.seoTitle, { shouldValidate: true });
    setValue("seoDescription", result.seoDescription, { shouldValidate: true });
    setValue("seoKeywords", result.seoKeywords, { shouldValidate: true });
    setAiLoading(false);
  };

  const onImproveDescription = async () => {
    setAiLoading(true);
    const improved = await improveDescription(values.descriptionLong);
    setValue("descriptionLong", improved, { shouldValidate: true });
    setAiLoading(false);
  };

  const onGenerateProductCard = async () => {
    setAiLoading(true);
    const generated = await generateProductData(values.name);
    if (generated.name) {
      setValue("name", generated.name, { shouldValidate: true });
    }
    if (generated.descriptionShort) {
      setValue("descriptionShort", generated.descriptionShort, { shouldValidate: true });
    }
    if (generated.descriptionLong) {
      setValue("descriptionLong", generated.descriptionLong, { shouldValidate: true });
    }
    if (generated.marketplacePrice) {
      setValue("marketplacePrice", generated.marketplacePrice, { shouldValidate: true });
    }
    setAiLoading(false);
  };

  const onSuggestCategory = async () => {
    setAiLoading(true);
    const category = await detectCategory(values.name, categories);
    if (category) {
      setValue("categoryId", category.id, { shouldValidate: true });
      setValue("globalCategoryId", category.globalCategoryId, { shouldValidate: true });
      toast({ title: "Category selected", description: category.name });
    }
    setAiLoading(false);
  };

  const onSubmit = async (data: ProductFormValues) => {
    setApiError(null);
    // Show immediate optimistic preview status while API request is in-flight.
    setOptimisticProduct(data);
    const payload: ProductRequestDto[] = [mapProductFormToRequest(data)];

    try {
      await createProduct(payload);
      toast({
        title: "Product published",
        description: "Your product was created successfully.",
      });
      window.localStorage.removeItem(DRAFT_KEY);
      reset(defaultValues);
      router.push("/dashboard/products");
      router.refresh();
    } catch {
      setApiError("Failed to create product. Please check data and retry.");
      toast({
        title: "Publish failed",
        description: "Could not create product via API.",
        variant: "destructive",
      });
    } finally {
      setOptimisticProduct(null);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Create Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product name</label>
              <Input placeholder="Product name" {...register("name")} />
              {errors.name ? <p className="text-xs text-red-600">{errors.name.message}</p> : null}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">SKU</label>
                <Button onClick={() => setValue("code", generateSku(values.name), { shouldValidate: true })} size="sm" type="button" variant="secondary">
                  Auto-generate SKU
                </Button>
              </div>
              <Input placeholder="SKU" {...register("code")} />
              {errors.code ? <p className="text-xs text-red-600">{errors.code.message}</p> : null}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Unit</label>
                <Select
                  onValueChange={(value) => setValue("unit", value, { shouldValidate: true })}
                  options={unitOptions}
                  value={values.unit}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cashback type</label>
                <Select
                  onValueChange={(value) => setValue("cashbackType", value as ProductFormValues["cashbackType"], { shouldValidate: true })}
                  options={cashbackOptions}
                  value={values.cashbackType}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <CategorySelector
                categories={categories}
                onSelect={(category) => {
                  setValue("categoryId", category.id, { shouldValidate: true });
                  setValue("globalCategoryId", category.globalCategoryId, { shouldValidate: true });
                }}
                selectedCategoryId={values.categoryId}
              />
              {errors.categoryId ? <p className="text-xs text-red-600">{errors.categoryId.message}</p> : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Short description</label>
              <Textarea placeholder="Short description" {...register("descriptionShort")} />
              {errors.descriptionShort ? <p className="text-xs text-red-600">{errors.descriptionShort.message}</p> : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Long description</label>
              <Textarea className="min-h-[140px]" placeholder="Long description" {...register("descriptionLong")} />
              {errors.descriptionLong ? <p className="text-xs text-red-600">{errors.descriptionLong.message}</p> : null}
            </div>

            <PriceInput
              label="Marketplace price"
              onChange={(value) => setValue("marketplacePrice", value, { shouldValidate: true })}
              onSuggest={() => {
                const base = selectedCategory?.globalCategoryId ? selectedCategory.globalCategoryId * 10 : 500;
                setValue("marketplacePrice", String(base), { shouldValidate: true });
              }}
              value={values.marketplacePrice}
            />
            {errors.marketplacePrice ? <p className="text-xs text-red-600">{errors.marketplacePrice.message}</p> : null}

            <div className="space-y-2">
              <label className="text-sm font-medium">Chatting percent</label>
              <Input placeholder="4" {...register("chattingPercent")} />
            </div>

            <MapLocationPicker
              address={values.address}
              latitude={values.latitude}
              longitude={values.longitude}
              onAddressChange={(value) => setValue("address", value, { shouldValidate: true })}
              onLatitudeChange={(value) => setValue("latitude", value, { shouldValidate: true })}
              onLongitudeChange={(value) => setValue("longitude", value, { shouldValidate: true })}
            />
            {errors.address ? <p className="text-xs text-red-600">{errors.address.message}</p> : null}

            <ImageUploader images={values.images} onChange={(images) => setValue("images", images, { shouldValidate: true })} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO settings</CardTitle>
          </CardHeader>
          <CardContent>
            <SeoSection
              disabled={aiLoading}
              onDescriptionChange={(value) => setValue("seoDescription", value, { shouldValidate: true })}
              onGenerateSeo={onGenerateSeo}
              onKeywordsChange={(keywords) => setValue("seoKeywords", keywords, { shouldValidate: true })}
              onTitleChange={(value) => setValue("seoTitle", value, { shouldValidate: true })}
              seoDescription={values.seoDescription}
              seoKeywords={values.seoKeywords}
              seoTitle={values.seoTitle}
            />
          </CardContent>
        </Card>

        {apiError ? <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">{apiError}</p> : null}

        <div className="flex flex-wrap gap-3">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Publishing..." : "Publish product"}
          </Button>
          <Button onClick={onSaveDraft} type="button" variant="outline">
            Save draft
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        <AiToolsPanel
          loading={aiLoading}
          onGenerateProductData={onGenerateProductCard}
          onImproveDescription={onImproveDescription}
          onSuggestCategory={onSuggestCategory}
        />
        <ProductPreview optimistic={Boolean(optimisticProduct || isSubmitting)} product={previewValue} />
      </div>
    </div>
  );
};
