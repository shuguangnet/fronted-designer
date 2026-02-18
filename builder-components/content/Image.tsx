import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt?: string;
  width?: "auto" | "full" | "1/2" | "1/3" | "1/4";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
}

const widthMap = {
  auto: "w-auto",
  full: "w-full",
  "1/2": "w-1/2",
  "1/3": "w-1/3",
  "1/4": "w-1/4",
};

const roundedMap = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export function ImageComponent({
  src,
  alt = "",
  width = "full",
  rounded = "md",
  className,
}: ImageProps) {
  if (!src) {
    return (
      <div className={cn("bg-muted aspect-video flex items-center justify-center", widthMap[width], roundedMap[rounded], className)}>
        <span className="text-muted-foreground text-sm">暂无图片</span>
      </div>
    );
  }

  return (
    <div className={cn("relative", widthMap[width], className)}>
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-auto object-cover", roundedMap[rounded])}
      />
    </div>
  );
}
