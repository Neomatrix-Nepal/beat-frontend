import { useState, useEffect } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      setWidth(window.innerWidth); // Set initially
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
}
