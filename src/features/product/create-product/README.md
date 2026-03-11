# Create Product Module

## Usage

```tsx
import { ProductCreatePage } from "@/widgets/product-create-page/ui/product-create-page";
import { getCategories } from "@/services/products";

export const revalidate = 300;

const Page = async () => {
  const categories = await getCategories();
  return <ProductCreatePage categories={categories} />;
};

export default Page;
```

## Notes

- Built with FSD layers (`app`, `widgets`, `features`, `entities`, `shared`).
- API calls are isolated in `services/products.ts`.
- Validation is isolated in `features/product/create-product/model/schema.ts`.
