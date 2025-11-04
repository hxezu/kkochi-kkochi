import { useState, useEffect } from "react";

export function useKeyboardOffset() {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const viewport = window.visualViewport;

    const handleResize = () => {
      const keyboardHeight = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop
      );

      const safeAreaBottom =
        Number(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--sat")
            ?.replace("px", "")
        ) || 0;

      setKeyboardOffset(keyboardHeight + safeAreaBottom);
    };

    viewport.addEventListener("resize", handleResize);
    viewport.addEventListener("scroll", handleResize);

    handleResize();

    return () => {
      viewport.removeEventListener("resize", handleResize);
      viewport.removeEventListener("scroll", handleResize);
    };
  }, []);

  return keyboardOffset;
}
