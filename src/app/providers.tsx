"use client";

import { ReactNode } from "react";

import { ToastProvider } from "@/shared/ui/providers/toast-provider";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return <ToastProvider>{children}</ToastProvider>;
};
