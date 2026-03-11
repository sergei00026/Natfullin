"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils/cn";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onValueChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const Select = ({ className, disabled, onValueChange, options, placeholder, value }: SelectProps) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      disabled={disabled}
      onChange={(event) => onValueChange(event.target.value)}
      value={value}
    >
      <option value="">{placeholder ?? "Select an option"}</option>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
