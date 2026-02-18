import React from "react";
import { cn } from "@/lib/utils";

interface RowProps {
  children?: React.ReactNode;
  gap?: "0" | "sm" | "md" | "lg" | "xl";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  className?: string;
}

const gapMap = {
  "0": "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export function Row({
  children,
  gap = "md",
  align = "center",
  justify = "flex-start",
  className,
}: RowProps) {
  return (
    <div
      className={cn("flex", gapMap[gap], className)}
      style={{ alignItems: align, justifyContent: justify }}
    >
      {children}
    </div>
  );
}
