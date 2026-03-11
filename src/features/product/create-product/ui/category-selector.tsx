"use client";

import { useMemo, useState } from "react";

import { Category } from "@/entities/category/model/types";
import { Button } from "@/shared/ui/shadcn/button";
import { Input } from "@/shared/ui/shadcn/input";

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelect: (category: Category) => void;
  disabled?: boolean;
}

export const CategorySelector = ({ categories, disabled, onSelect, selectedCategoryId }: CategorySelectorProps) => {
  const [opened, setOpened] = useState(false);
  const [query, setQuery] = useState("");

  const selected = useMemo(() => categories.find((category) => category.id === selectedCategoryId) ?? null, [categories, selectedCategoryId]);
  const filtered = useMemo(() => {
    if (!query.trim()) {
      return categories;
    }
    return categories.filter((category) => category.name.toLowerCase().includes(query.toLowerCase()));
  }, [categories, query]);

  return (
    <div className="relative">
      <Button className="w-full justify-between" disabled={disabled} onClick={() => setOpened((prev) => !prev)} type="button" variant="outline">
        <span className="truncate">{selected?.name ?? "Select category"}</span>
        <span className="text-xs text-slate-500">Search</span>
      </Button>
      {opened ? (
        <div className="absolute z-30 mt-2 w-full rounded-md border border-slate-200 bg-white p-2 shadow-lg">
          <Input onChange={(event) => setQuery(event.target.value)} placeholder="Type to search category..." value={query} />
          <div className="mt-2 max-h-52 overflow-y-auto">
            {filtered.map((category) => {
              return (
                <button
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-slate-100"
                  key={category.id}
                  onClick={() => {
                    onSelect(category);
                    setOpened(false);
                  }}
                  type="button"
                >
                  <span>{category.name}</span>
                  <span className="text-xs text-slate-500">#{category.id}</span>
                </button>
              );
            })}
            {filtered.length === 0 ? <p className="px-2 py-4 text-sm text-slate-500">No categories found</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
