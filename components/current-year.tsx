"use client";

import { useEffect, useState } from "react";

export default function CurrentYear() {
  const [year, setYear] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setYear(new Date().getFullYear().toString());
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return <span>2024</span>; // Fallback year
  }

  return <span>{year}</span>;
}
