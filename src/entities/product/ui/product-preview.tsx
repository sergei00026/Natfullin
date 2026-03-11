"use client";

import Image from "next/image";

import { ProductFormValues } from "@/entities/product/model/types";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";

interface ProductPreviewProps {
  product: ProductFormValues;
  optimistic?: boolean;
}

export const ProductPreview = ({ optimistic, product }: ProductPreviewProps) => {
  const firstImage = product.images[0]?.preview;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Preview Product Card</CardTitle>
          {optimistic ? <Badge>Publishing...</Badge> : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {firstImage ? <Image alt={product.name} className="h-52 w-full rounded-lg object-cover" height={208} src={firstImage} unoptimized width={640} /> : null}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{product.name || "Product name"}</h3>
          <p className="text-sm text-slate-500">{product.descriptionShort || "Short description"}</p>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{product.code || "SKU"}</Badge>
          <p className="text-lg font-bold">{product.marketplacePrice || 0} RUB</p>
        </div>
      </CardContent>
    </Card>
  );
};
