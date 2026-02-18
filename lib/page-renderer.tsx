"use client";

import React from "react";
import { RenderComponent } from "@/components/builder/canvas/RenderComponent";
import type { PageContent } from "@/types";

interface PageRendererProps {
  content: PageContent;
}

export function PageRenderer({ content }: PageRendererProps) {
  return (
    <div className="min-h-screen bg-background">
      <RenderComponent node={content.root} />
    </div>
  );
}
