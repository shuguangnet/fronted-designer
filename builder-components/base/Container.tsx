import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children?: React.ReactNode;
  maxWidth?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const paddingMap = {
  none: "",
  sm: "px-4 py-2",
  md: "px-6 py-4",
  lg: "px-8 py-6",
  xl: "px-12 py-8",
};

export function Container({
  children,
  maxWidth = "1200px",
  padding = "md",
  className,
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto", paddingMap[padding], className)}
      style={{ maxWidth }}
    >
      {children}
    </div>
  );
}
