import Link from "next/link";

import { Category } from "@/entities/category/model/types";
import { ProductForm } from "@/features/product/create-product/ui/product-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";

interface ProductCreatePageProps {
  categories: Category[];
}

export const ProductCreatePage = ({ categories }: ProductCreatePageProps) => {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-8">
      <Card className="mb-6 border-none bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription className="text-slate-200">Fill product information, generate SEO with AI and publish to marketplace.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-200">Dashboard / Products / Create</p>
            <Link className="text-sm font-medium text-white underline" href="/dashboard/products">
              Open products list
            </Link>
          </div>
        </CardContent>
      </Card>
      <ProductForm categories={categories} />
    </div>
  );
};
