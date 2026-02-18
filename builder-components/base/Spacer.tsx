import React from "react";

interface SpacerProps {
  height?: "16" | "32" | "48" | "64" | "96";
}

const heights: Record<string, string> = {
  "16": "16px", "32": "32px", "48": "48px", "64": "64px", "96": "96px",
};

export function Spacer({ height = "32" }: SpacerProps) {
  return <div style={{ height: heights[height] || heights["32"] }} />;
}
