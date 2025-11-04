import { useEffect } from "react";

export function useSafeArea() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const safeArea = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("env(safe-area-inset-bottom)");
    document.documentElement.style.setProperty("--sat", safeArea);
  }, []);
}
