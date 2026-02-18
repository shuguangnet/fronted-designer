import React from "react";
import { cn } from "@/lib/utils";

interface VideoProps {
  url?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  className?: string;
}

export function Video({ url, aspectRatio = "16/9", className }: VideoProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-lg bg-muted", className)} style={{ aspectRatio }}>
      {url ? (
        <iframe src={url} className="w-full h-full" allowFullScreen />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          视频占位
        </div>
      )}
    </div>
  );
}
