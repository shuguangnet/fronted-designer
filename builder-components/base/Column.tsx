import React from "react";
import { cn } from "@/lib/utils";

interface ColumnProps {
  children?: React.ReactNode;
  gap?: "0" | "sm" | "md" | "lg" | "xl";
  align?: "flex-start" | "center" | "flex-end";
  className?: string;
}

const gapMap = {
  "0": "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export function Column({
  children,
  gap = "md",
  align = "flex-start",
  className,
}: ColumnProps) {
  return (
    <div
      className={cn("flex flex-col", gapMap[gap], className)}
      style={{ alignItems: align }}
    >
      {children}
    </div>
  );
}
