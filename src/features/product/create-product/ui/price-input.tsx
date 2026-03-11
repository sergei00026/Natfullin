"use client";

import { Button } from "@/shared/ui/shadcn/button";
import { Input } from "@/shared/ui/shadcn/input";
import { formatPrice, normalizePrice } from "@/shared/lib/utils/price";

interface PriceInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSuggest: () => void;
  disabled?: boolean;
}

export const PriceInput = ({ disabled, label, onChange, onSuggest, value }: PriceInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <Button disabled={disabled} onClick={onSuggest} size="sm" type="button" variant="secondary">
          Suggest price
        </Button>
      </div>
      <div className="relative">
        <Input
          disabled={disabled}
          onChange={(event) => onChange(formatPrice(event.target.value))}
          placeholder="0"
          value={value}
        />
        <span className="pointer-events-none absolute right-3 top-2 text-sm text-slate-500">RUB</span>
      </div>
      <p className="text-xs text-slate-500">Numeric value: {normalizePrice(value)}</p>
    </div>
  );
};
