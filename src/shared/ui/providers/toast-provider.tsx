"use client";

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

import { cn } from "@/shared/lib/utils/cn";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

interface ToastContextValue {
  toast: (payload: Omit<ToastItem, "id">) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((payload: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, ...payload }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((item) => {
          return (
            <div
              className={cn(
                "rounded-lg border bg-white p-4 shadow-lg",
                item.variant === "destructive" ? "border-red-300" : "border-emerald-300",
              )}
              key={item.id}
            >
              <p className="text-sm font-semibold">{item.title}</p>
              {item.description ? <p className="mt-1 text-sm text-slate-600">{item.description}</p> : null}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
};
