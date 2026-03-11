"use client";

import axios from "axios";
import Link from "next/link";
import { UIEvent, useEffect, useMemo, useRef, useState } from "react";

import { ProductListItemDto, ProductListResponseDto } from "@/entities/product/model";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";
import { Skeleton } from "@/shared/ui/shadcn/skeleton";

const PRODUCTS_ENDPOINT =
  "https://app.tablecrm.com/api/v1/nomenclature/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77";
const PAGE_SIZE = 50;
const ROW_HEIGHT = 48;
const OVERSCAN = 6;

const resolvePrice = (product: ProductListItemDto): string => {
  if (typeof product.marketplace_price === "number") {
    return String(product.marketplace_price);
  }

  const firstPrice = product.prices?.[0];
  if (typeof firstPrice?.value === "number") {
    return String(firstPrice.value);
  }
  if (typeof firstPrice?.price === "number") {
    return String(firstPrice.price);
  }

  return "-";
};

const mergeUniqueById = (current: ProductListItemDto[], next: ProductListItemDto[]): ProductListItemDto[] => {
  const map = new Map<number, ProductListItemDto>();
  [...current, ...next].forEach((item) => map.set(item.id, item));
  return Array.from(map.values());
};

export const ProductsListPage = () => {
  const [products, setProducts] = useState<ProductListItemDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(600);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get<ProductListItemDto[] | ProductListResponseDto>(`${PRODUCTS_ENDPOINT}&limit=${PAGE_SIZE}&offset=0`);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setTotalCount(response.data.length);
          return;
        }
        setProducts(response.data.result ?? []);
        setTotalCount(response.data.count ?? response.data.result?.length ?? 0);
      } catch {
        setError("Failed to load products from TableCRM API.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    setViewportHeight(containerRef.current.clientHeight);
  }, []);

  const hasMore = totalCount > products.length;

  const fetchNextPage = async () => {
    if (loadingMore || !hasMore) {
      return;
    }
    setLoadingMore(true);
    try {
      const response = await axios.get<ProductListItemDto[] | ProductListResponseDto>(
        `${PRODUCTS_ENDPOINT}&limit=${PAGE_SIZE}&offset=${products.length}`,
      );
      const payload = response.data;
      if (Array.isArray(payload)) {
        setProducts((prev) => mergeUniqueById(prev, payload));
        setTotalCount((prev) => (prev > 0 ? prev : products.length + payload.length));
      } else {
        const nextItems = payload.result ?? [];
        setProducts((prev) => mergeUniqueById(prev, nextItems));
        setTotalCount(payload.count ?? 0);
      }
    } catch {
      setError("Failed to load next page from TableCRM API.");
    } finally {
      setLoadingMore(false);
    }
  };

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    setScrollTop(target.scrollTop);
    setViewportHeight(target.clientHeight);

    const distanceToBottom = target.scrollHeight - (target.scrollTop + target.clientHeight);
    if (distanceToBottom < ROW_HEIGHT * 8) {
      void fetchNextPage();
    }
  };

  const virtualState = useMemo(() => {
    const visibleCount = Math.ceil(viewportHeight / ROW_HEIGHT);
    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const endIndex = Math.min(products.length, startIndex + visibleCount + OVERSCAN * 2);
    const topPadding = startIndex * ROW_HEIGHT;
    const bottomPadding = Math.max(0, (products.length - endIndex) * ROW_HEIGHT);
    const rows = products.slice(startIndex, endIndex);
    return { bottomPadding, rows, topPadding };
  }, [products, scrollTop, viewportHeight]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-8">
      <Card className="border-none bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription className="text-slate-200">List from TableCRM API endpoint `/nomenclature`.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Badge>
            Loaded: {products.length}
            {totalCount > 0 ? ` / Total: ${totalCount}` : ""}
          </Badge>
          <Link className="text-sm underline" href="/dashboard/products/create">
            Create new product
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="space-y-2 p-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : null}
          {error ? <p className="p-4 text-sm text-red-600">{error}</p> : null}
          {!loading && !error ? (
            <div>
              <div className="grid grid-cols-[140px_1fr_180px_180px] border-b bg-slate-50 px-4 py-3 text-sm font-medium">
                <div>ID</div>
                <div>Name</div>
                <div>SKU</div>
                <div>Price</div>
              </div>
              <div className="h-[640px] overflow-auto" onScroll={onScroll} ref={containerRef}>
                <div style={{ height: virtualState.topPadding }} />
                {virtualState.rows.map((product) => {
                  return (
                    <div
                      className="grid grid-cols-[140px_1fr_180px_180px] items-center border-b px-4 text-sm"
                      key={product.id}
                      style={{ height: ROW_HEIGHT }}
                    >
                      <div>{product.id ?? "-"}</div>
                      <div className="font-medium">{product.name?.trim() || "Untitled"}</div>
                      <div>{product.code ?? "-"}</div>
                      <div>{resolvePrice(product)}</div>
                    </div>
                  );
                })}
                <div style={{ height: virtualState.bottomPadding }} />
                {products.length === 0 ? <p className="px-4 py-8 text-sm text-slate-500">No products returned from API.</p> : null}
                {loadingMore ? <p className="px-4 py-4 text-sm text-slate-500">Loading more...</p> : null}
              </div>
              <div className="border-t px-4 py-3 text-xs text-slate-500">
                Showing {products.length} of {totalCount}. Scroll to load remaining items.
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
