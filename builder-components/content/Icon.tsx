import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  name?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizes = { sm: "w-5 h-5 text-lg", md: "w-8 h-8 text-2xl", lg: "w-12 h-12 text-4xl" };

export function Icon({ name = "⭐", size = "md", color, className }: IconProps) {
  return (
    <span className={cn("inline-flex items-center justify-center", sizes[size], className)} style={{ color }}>
      {name}
    </span>
  );
}
