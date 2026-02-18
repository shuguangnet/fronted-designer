"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { RenderComponent, EditableComponent } from "./RenderComponent";
import type { PageContent, ComponentNode } from "@/types";
import { useEditorStore } from "@/store/editor";
import { cn } from "@/lib/utils";
import { getComponentSchema } from "@/components.registry";

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

function BuilderCanvas({ content, className }: { content: PageContent; className?: string }) {
  const { addComponent, reorderComponents, selectComponent } = useEditorStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const rootChildIds = content.root.children?.map((c) => c.id) ?? [];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const sourceData = active.data.current;
    const overData = over.data.current;

    if (sourceData?.source === "component-library") {
      const type = sourceData.type as string;
      const schema = getComponentSchema(type);
      const defaultProps: Record<string, any> = {};
      if (schema) {
        for (const [key, def] of Object.entries(schema.props)) {
          if (def.defaultValue !== undefined) defaultProps[key] = def.defaultValue;
        }
      }

      const newComponent: ComponentNode = {
        id: `${type}-${Date.now()}`,
        type,
        props: defaultProps,
        children: schema?.acceptChildren ? [] : undefined,
      };

      // Dropped on empty zone inside a container
      if (overData?.source === "empty-zone") {
        addComponent(overData.parentId as string, newComponent);
      }
      // Dropped on canvas root
      else if ((over.id as string) === "canvas-root") {
        addComponent(content.root.id, newComponent);
      }
      // Dropped on an existing component — add to its parent or itself if container
      else {
        const targetId = over.id as string;
        const targetSchema = overData?.type ? getComponentSchema(overData.type as string) : null;
        if (targetSchema?.acceptChildren) {
          addComponent(targetId, newComponent);
        } else {
          addComponent(content.root.id, newComponent);
        }
      }

      selectComponent(newComponent.id);
    } else {
      // Reorder within canvas
      const sourceId = active.id as string;
      const targetId = over.id as string;
      if (sourceId !== targetId && !(targetId as string).startsWith("empty-")) {
        reorderComponents(sourceId, targetId, "after");
      }
    }
  };

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={rootChildIds} strategy={verticalListSortingStrategy}>
        <div className={cn("min-h-screen bg-background", className)} onClick={() => selectComponent(null)}>
          {rootChildIds.length > 0 ? (
            content.root.children?.map((child) => (
              <EditableComponent key={child.id} node={child} />
            ))
          ) : (
            <CanvasDropZone />
          )}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={null}>
        {activeId && (
          <div className="bg-primary/10 border-2 border-primary border-dashed rounded-md px-4 py-2 text-sm text-primary font-medium shadow-lg">
            {activeId.startsWith("library-") ? activeId.replace("library-", "") : activeId}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

function CanvasDropZone() {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-root" });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg m-4 transition-colors",
        isOver ? "border-primary bg-primary/5" : "border-muted-foreground/30"
      )}
    >
      <p className="text-muted-foreground text-sm">拖拽组件到此处开始构建</p>
    </div>
  );
}
