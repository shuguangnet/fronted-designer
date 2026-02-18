"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { EditableComponent, RenderComponent } from "./RenderComponent";
import type { PageContent } from "@/types";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/editor";

// Re-export ComponentLibrary for convenience
export { ComponentLibrary } from "../sidebar/ComponentLibrary";

interface CanvasProps {
  content: PageContent;
  className?: string;
  isBuilder?: boolean;
}

export function Canvas({ content, className, isBuilder = true }: CanvasProps) {
  if (!isBuilder) {
    return (
      <div className={cn("min-h-screen bg-background", className)}>
        <RenderComponent node={content.root} />
      </div>
    );
  }

  return <BuilderCanvas content={content} className={className} />;
}

interface CanvasContentProps {
  content: PageContent;
  activeId?: string | null;
  isBuilder?: boolean;
}

export function CanvasContent({ content, activeId, isBuilder = true }: CanvasContentProps) {
  const rootChildIds = content.root.children?.map((c) => c.id) ?? [];

  if (!isBuilder) {
    return <RenderComponent node={content.root} />;
  }

  return (
    <CanvasDropZoneContainer isEmpty={rootChildIds.length === 0}>
      {rootChildIds.length > 0 ? (
        content.root.children?.map((child) => (
          <EditableComponent key={child.id} node={child} />
        ))
      ) : (
        <div className="min-h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground text-sm">拖拽组件到此处开始构建</p>
        </div>
      )}
    </CanvasDropZoneContainer>
  );
}

function BuilderCanvas({ content, className }: { content: PageContent; className?: string }) {
  const rootChildIds = content.root.children?.map((c) => c.id) ?? [];

  return (
    <div className={cn("min-h-screen bg-background", className)} onClick={(e) => {
      if (!(e.target as HTMLElement).dataset.componentId) {
        useEditorStore.getState().selectComponent(null);
      }
    }}>
      {rootChildIds.length > 0 ? (
        content.root.children?.map((child) => (
          <EditableComponent key={child.id} node={child} />
        ))
      ) : (
        <CanvasDropZoneContainer isEmpty={true}>
          <div className="min-h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground text-sm">拖拽组件到此处开始构建</p>
          </div>
        </CanvasDropZoneContainer>
      )}
    </div>
  );
}

function CanvasDropZoneContainer({ children, isEmpty }: { children: React.ReactNode; isEmpty: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-root" });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "transition-colors",
        isOver && "bg-primary/5",
        isEmpty && "flex items-center justify-center border-2 border-dashed border-muted-foreground/30 m-4 rounded-lg min-h-[400px]"
      )}
    >
      {children}
    </div>
  );
}
