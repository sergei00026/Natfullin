"use client";

import { useEffect } from "react";

export const useDebouncedEffect = (effect: () => void, delay: number, dependency: unknown) => {
  useEffect(() => {
    const timer = window.setTimeout(effect, delay);
    return () => window.clearTimeout(timer);
  }, [delay, dependency, effect]);
};
