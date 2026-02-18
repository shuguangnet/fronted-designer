import React from "react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  children?: React.ReactNode;
  backgroundImage?: string;
  alignment?: "left" | "center" | "right";
  overlay?: boolean;
  overlayColor?: string;
  minHeight?: string;
  className?: string;
}

export function HeroSection({
  children,
  backgroundImage,
  alignment = "center",
  overlay = true,
  overlayColor = "rgba(0,0,0,0.4)",
  minHeight = "500px",
  className,
}: HeroSectionProps) {
  const alignMap = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover" as const,
        backgroundPosition: "center" as const,
      }
    : {};

  const overlayStyle = overlay && backgroundImage
    ? { backgroundColor: overlayColor }
    : {};

  return (
    <section
      className={cn(
        "relative flex items-center justify-center px-6 py-16",
        alignMap[alignment],
        className
      )}
      style={{ ...backgroundStyle, minHeight }}
    >
      {/* 背景遮罩 */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0" style={overlayStyle} />
      )}

      {/* 内容 */}
      <div className={cn(
        "relative z-10 max-w-4xl mx-auto",
        backgroundImage ? "space-y-6" : "space-y-4"
      )}>
        {children}
      </div>
    </section>
  );
}
