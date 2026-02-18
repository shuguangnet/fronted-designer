import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/builder-components/content/Button";

interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export function HeroSection({
  headline,
  subheadline,
  description,
  ctaText = "了解更多",
  ctaLink = "#",
  backgroundImage,
  alignment = "center",
  className,
}: HeroSectionProps) {
  const alignMap = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <section
      className={cn(
        "relative min-h-[500px] flex items-center justify-center px-6 py-16",
        alignMap[alignment],
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* 背景遮罩 */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* 内容 */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          {headline}
        </h1>

        {subheadline && (
          <p className="text-xl md:text-2xl text-white/90 drop-shadow">
            {subheadline}
          </p>
        )}

        {description && (
          <p className="text-lg text-white/80 drop-shadow max-w-2xl">
            {description}
          </p>
        )}

        {ctaText && (
          <div className="pt-4">
            <Button text={ctaText} href={ctaLink} variant="primary" size="lg" />
          </div>
        )}
      </div>
    </section>
  );
}
