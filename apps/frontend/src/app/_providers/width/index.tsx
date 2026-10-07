"use client";

import { useEffect, useState } from "react";

interface WidthProviderProps {
  children: (width: number) => React.ReactNode; // Function as a child
}

const WidthProvider: React.FC<WidthProviderProps> = ({ children }) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Call the `children` function and pass the `width` value
  return <>{children(width)}</>;
};

export default WidthProvider;
