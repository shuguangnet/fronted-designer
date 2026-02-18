import React from "react";
import { cn } from "@/lib/utils";

interface LinkComponentProps {
  text?: string;
  href?: string;
  target?: "_self" | "_blank";
  className?: string;
}

export function LinkComponent({ text = "链接", href = "#", target = "_self", className }: LinkComponentProps) {
  return (
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={cn("text-primary underline-offset-4 hover:underline", className)}>
      {text}
    </a>
  );
}
