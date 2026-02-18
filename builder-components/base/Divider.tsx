import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  style?: "solid" | "dashed" | "gradient";
  className?: string;
}

export function Divider({ style = "solid", className }: DividerProps) {
  if (style === "gradient") {
    return (
      <div className={cn("h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-4", className)} />
    );
  }
  return (
    <hr className={cn("w-full my-4 border-border", style === "dashed" && "border-dashed", className)} />
  );
}
