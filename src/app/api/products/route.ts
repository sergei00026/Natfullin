import { NextResponse } from "next/server";

import { getProducts } from "@/services/products";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const items = await getProducts();
  return NextResponse.json({ items });
};
