"use client";

import { useEffect, useState } from "react";

interface DateFormatterProps {
  dateString: string;
  className?: string;
}

export default function DateFormatter({ dateString, className = "" }: DateFormatterProps) {
  const [formattedDate, setFormattedDate] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // Fallback to a more stable format if locale formatting fails
        if (isNaN(date.getTime())) {
          return dateString;
        }
        return date.toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };
      setFormattedDate(formatDate(dateString));
    } catch (error) {
      // Fallback to ISO date if formatting fails
      setFormattedDate(new Date(dateString).toISOString().split('T')[0]);
    }
  }, [dateString]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return <span className={`${className} animate-pulse`}>Loading...</span>;
  }

  return <span className={className}>{formattedDate}</span>;
}
