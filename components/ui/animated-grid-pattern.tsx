"use client";

import { motion } from "motion/react";
import {
  ComponentPropsWithoutRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export interface AnimatedGridPatternProps
  extends ComponentPropsWithoutRef<"svg"> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string | number | undefined;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState(() => {
    // Initialize with safe dimensions to prevent NaN
    const safeDimensions = { width: 100, height: 100 };
    return Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      pos: [Math.floor(i * 10), Math.floor(i * 10)], // Simple initial positions
    }));
  });

  function getPos(seed: number) {
    // Use a simple pseudo-random function with seed for consistent results
    // Ensure dimensions are valid to prevent NaN
    const safeWidth = dimensions.width || 100;
    const safeHeight = dimensions.height || 100;
    const safeSquareWidth = width || 10;
    const safeSquareHeight = height || 10;
    
    const x = Math.floor((seed * 9301 + 49297) % 233280 / 233280 * safeWidth / safeSquareWidth);
    const y = Math.floor((seed * 9301 + 49297) % 233280 / 233280 * safeHeight / safeSquareHeight);
    return [x, y];
  }

  // Adjust the generateSquares function to return objects with an id, x, and y
  function generateSquares(count: number) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(i),
    }));
  }

  // Function to update a single square's position
  const updateSquarePosition = (id: number) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(id + Date.now()), // Use id + timestamp for unique seed
            }
          : sq
      )
    );
  };

  // Update squares to animate in
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, numSquares]);

  // Resize observer to update container dimensions
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={Number.isFinite(width) ? width : 40}
          height={Number.isFinite(height) ? height : 40}
          patternUnits="userSpaceOnUse"
          x={Number.isFinite(x) ? x : -1}
          y={Number.isFinite(y) ? y : -1}
        >
          <path
            d={`M.5 ${Number.isFinite(height) ? height : 40}V.5H${Number.isFinite(width) ? width : 40}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={Number.isFinite(x) ? x : -1} y={Number.isFinite(y) ? y : -1} className="overflow-visible">
        {squares.map(({ pos: [squareX, squareY], id }, index) => {
          // Ensure values are valid numbers to prevent NaN
          const safeX = Number.isFinite(squareX) ? squareX : 0;
          const safeY = Number.isFinite(squareY) ? squareY : 0;
          const safeWidth = Number.isFinite(width) ? width : 10;
          const safeHeight = Number.isFinite(height) ? height : 10;
          
          return (
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: maxOpacity }}
              transition={{
                duration,
                repeat: 1,
                delay: index * 0.1,
                repeatType: "reverse",
              }}
              onAnimationComplete={() => updateSquarePosition(id)}
              key={`${safeX}-${safeY}-${index}`}
              width={Math.max(1, safeWidth - 1)}
              height={Math.max(1, safeHeight - 1)}
              x={safeX * safeWidth + 1}
              y={safeY * safeHeight + 1}
              fill="currentColor"
              strokeWidth="0"
            />
          );
        })}
      </svg>
    </svg>
  );
}
