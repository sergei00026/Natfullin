import * as React from "react";

import { cn } from "@/shared/lib/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "border-transparent bg-slate-900 text-white",
    secondary: "border-transparent bg-slate-200 text-slate-900",
    outline: "text-slate-900",
  };

  return (
    <div
      className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", variantClasses[variant], className)}
      {...props}
    />
  );
};
