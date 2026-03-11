import { ProductCreatePage } from "@/widgets/product-create-page/ui/product-create-page";
import { getCategories } from "@/services/products";

export const revalidate = 300;

const CreateProductRoute = async () => {
  const categories = await getCategories();
  return <ProductCreatePage categories={categories} />;
};

export default CreateProductRoute;
