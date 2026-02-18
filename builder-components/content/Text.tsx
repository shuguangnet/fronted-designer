import React from "react";
import { cn } from "@/lib/utils";

interface TextProps {
  children?: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "small" | "muted" | "lead";
  align?: "left" | "center" | "right" | "justify";
  className?: string;
}

const variantMap = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  lead: "text-xl text-muted-foreground",
  body: "leading-7 [&:not(:first-child)]:mt-6",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
};

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export function Text({
  children,
  variant = "body",
  align = "left",
  className,
}: TextProps) {
  const Tag = variant === "h1" ? "h1" :
              variant === "h2" ? "h2" :
              variant === "h3" ? "h3" :
              variant === "h4" ? "h4" : "p";

  const content = children?.toString().trim() || "";

  return (
    <Tag className={cn(variantMap[variant], alignMap[align], className)}>
      {children || <span className="text-muted-foreground italic">点击编辑文本...</span>}
    </Tag>
  );
}
