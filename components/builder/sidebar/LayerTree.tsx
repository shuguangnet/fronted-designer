"use client";

import React from "react";
import { useEditorStore } from "@/store/editor";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentNode } from "@/types";

export function LayerTree() {
  const { currentPage, selectedComponentId, selectComponent, hoveredComponentId, hoverComponent } = useEditorStore();

  if (!currentPage) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">无页面内容</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">图层</h2>
        <p className="text-sm text-muted-foreground">组件结构树</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          <LayerNode
            node={currentPage.root}
            depth={0}
            selectedId={selectedComponentId}
            hoveredId={hoveredComponentId}
            onSelect={selectComponent}
            onHover={hoverComponent}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

function LayerNode({
  node, depth, selectedId, hoveredId, onSelect, onHover,
}: {
  node: ComponentNode;
  depth: number;
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}) {
  const [open, setOpen] = React.useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;
  const isHovered = hoveredId === node.id;

  return (
    <div>
      {hasChildren ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "w-full flex items-center gap-1 px-2 py-1 rounded text-sm hover:bg-accent transition-colors",
                isSelected && "bg-primary/10 text-primary font-medium",
                isHovered && !isSelected && "bg-accent",
              )}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
              onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
              onMouseEnter={() => onHover(node.id)}
              onMouseLeave={() => onHover(null)}
            >
              <ChevronRight className={cn("h-3 w-3 shrink-0 transition-transform", open && "rotate-90")} />
              <span className="truncate">{node.type}</span>
              {node.children && (
                <span className="ml-auto text-xs text-muted-foreground">{node.children.length}</span>
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {node.children?.map((child) => (
              <LayerNode
                key={child.id}
                node={child}
                depth={depth + 1}
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelect={onSelect}
                onHover={onHover}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <button
          className={cn(
            "w-full flex items-center gap-1 px-2 py-1 rounded text-sm hover:bg-accent transition-colors",
            isSelected && "bg-primary/10 text-primary font-medium",
            isHovered && !isSelected && "bg-accent",
          )}
          style={{ paddingLeft: `${depth * 12 + 20}px` }}
          onClick={() => onSelect(node.id)}
          onMouseEnter={() => onHover(node.id)}
          onMouseLeave={() => onHover(null)}
        >
          <span className="truncate">{node.type}</span>
        </button>
      )}
    </div>
  );
}
