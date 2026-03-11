import * as React from "react";

import { cn } from "@/shared/lib/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: boolean;
}

export const Skeleton = ({ className, rounded = true, ...props }: SkeletonProps) => {
  return <div className={cn("animate-pulse bg-slate-200", rounded ? "rounded-md" : "", className)} {...props} />;
};
