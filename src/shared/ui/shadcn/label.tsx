"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  requiredMark?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, requiredMark, ...props }, ref) => {
  return (
    <label className={cn("text-sm font-medium leading-none", className)} ref={ref} {...props}>
      {props.children}
      {requiredMark ? <span className="ml-1 text-red-600">*</span> : null}
    </label>
  );
});

Label.displayName = "Label";
