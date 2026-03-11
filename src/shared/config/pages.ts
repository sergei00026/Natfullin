export interface AppPage {
  title: string;
  path: string;
  description: string;
  section: "Dashboard" | "Products";
}

export const appPages: AppPage[] = [
  {
    title: "Pages Registry",
    path: "/dashboard/pages",
    description: "All available app routes and quick links.",
    section: "Dashboard",
  },
  {
    title: "Create Product",
    path: "/dashboard/products/create",
    description: "Marketplace seller flow for product creation.",
    section: "Products",
  },
  {
    title: "Products List",
    path: "/dashboard/products",
    description: "All products from TableCRM nomenclature endpoint.",
    section: "Products",
  },
];
