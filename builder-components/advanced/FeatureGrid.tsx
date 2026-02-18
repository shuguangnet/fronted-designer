import React from "react";
import { cn } from "@/lib/utils";

interface FeatureGridProps {
  children?: React.ReactNode;
  columns?: "2" | "3" | "4";
  showBackground?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export function FeatureGrid({
  children,
  columns = "3",
  showBackground = true,
  padding = "lg",
  className,
}: FeatureGridProps) {
  const columnsMap = {
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const paddingMap = {
    none: "",
    sm: "py-8 px-4",
    md: "py-12 px-6",
    lg: "py-16 px-6",
  };

  return (
    <section
      className={cn(
        "transition-colors",
        showBackground && "bg-muted/30",
        paddingMap[padding],
        className
      )}
    >
      <div className="container mx-auto">
        <div className={cn("grid gap-6 md:gap-8", columnsMap[columns])}>
          {children}
        </div>
      </div>
    </section>
  );
}
