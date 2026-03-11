import * as React from "react";

import { cn } from "@/shared/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "muted";
}

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "default" | "compact";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, tone = "default", ...props }, ref) => {
  return (
    <div
      className={cn(
        "rounded-xl border shadow-sm",
        tone === "muted" ? "border-slate-100 bg-slate-50" : "border-slate-200 bg-white",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export const CardHeader = React.forwardRef<HTMLDivElement, CardSectionProps>(({ className, spacing = "default", ...props }, ref) => {
  return <div className={cn("flex flex-col space-y-1.5", spacing === "default" ? "p-6" : "p-4", className)} ref={ref} {...props} />;
});

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} ref={ref} {...props} />;
  },
);

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p className={cn("text-sm text-slate-500", className)} ref={ref} {...props} />;
  },
);

export const CardContent = React.forwardRef<HTMLDivElement, CardSectionProps>(({ className, spacing = "default", ...props }, ref) => {
  return <div className={cn(spacing === "default" ? "p-6 pt-0" : "p-4 pt-0", className)} ref={ref} {...props} />;
});

export const CardFooter = React.forwardRef<HTMLDivElement, CardSectionProps>(({ className, spacing = "default", ...props }, ref) => {
  return <div className={cn("flex items-center", spacing === "default" ? "p-6 pt-0" : "p-4 pt-0", className)} ref={ref} {...props} />;
});

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";
