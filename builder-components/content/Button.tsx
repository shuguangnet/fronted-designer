import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Button as ShadcnButton } from "@/components/ui/button";

interface BuilderButtonProps {
  children?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  href?: string;
  className?: string;
  asChild?: boolean;
}

const variantOverride: Record<string, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
};

export function BuilderButton({
  children,
  variant = "default",
  size = "default",
  href,
  className,
  asChild,
}: BuilderButtonProps) {
  const variantClassName = variantOverride[variant];

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          variant === "link" && "text-primary underline-offset-4 hover:underline",
          variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3",
          size === "lg" && "h-11 rounded-md px-8",
          size === "icon" && "h-10 w-10",
          className
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <ShadcnButton
      variant={variant === "primary" ? "default" : variant as any}
      size={size as any}
      className={variantClassName}
      asChild={asChild}
    >
      {asChild ? (
        <>{children}</>
      ) : (
        <span>{children || <span className="opacity-50">按钮文字</span>}</span>
      )}
    </ShadcnButton>
  );
}

// Export as Button for compatibility
export { BuilderButton as Button };
