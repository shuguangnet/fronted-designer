import React from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  content: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "small" | "muted";
  align?: "left" | "center" | "right" | "justify";
  className?: string;
}

const variantMap = {
  h1: "text-4xl md:text-5xl font-bold",
  h2: "text-3xl md:text-4xl font-semibold",
  h3: "text-2xl md:text-3xl font-semibold",
  h4: "text-xl md:text-2xl font-medium",
  body: "text-base",
  small: "text-sm",
  muted: "text-sm text-muted-foreground",
};

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export function Text({
  content,
  variant = "body",
  align = "left",
  className,
}: TextProps) {
  const Tag = variant.startsWith("h") ? (variant as "h1" | "h2" | "h3" | "h4") : "p";

  return (
    <Tag className={cn(variantMap[variant], alignMap[align], className)}>
      {content}
    </Tag>
  );
}
