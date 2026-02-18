import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  text: string;
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  href?: string;
  className?: string;
}

const variantMap = {
  default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

const sizeMap = {
  sm: "h-9 px-3 text-sm",
  default: "h-10 px-4 py-2",
  lg: "h-11 px-8 text-lg",
};

export function Button({
  text,
  variant = "default",
  size = "default",
  href,
  className,
}: ButtonProps) {
  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      {text}
    </Component>
  );
}
