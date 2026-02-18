"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ComponentNode } from "@/types";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/editor";
import { getComponentSchema } from "@/components.registry";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Trash2 } from "lucide-react";

// Static component imports
import { Container } from "@/builder-components/base/Container";
import { Row } from "@/builder-components/base/Row";
import { Column } from "@/builder-components/base/Column";
import { Spacer } from "@/builder-components/base/Spacer";
import { Divider } from "@/builder-components/base/Divider";
import { Text } from "@/builder-components/content/Text";
import { ImageComponent } from "@/builder-components/content/Image";
import { Button as BuilderButton } from "@/builder-components/content/Button";
import { Video } from "@/builder-components/content/Video";
import { Icon } from "@/builder-components/content/Icon";
import { LinkComponent } from "@/builder-components/content/Link";
import { HeroSection } from "@/builder-components/advanced/HeroSection";
import { FeatureGrid } from "@/builder-components/advanced/FeatureGrid";
import { ContactForm } from "@/builder-components/advanced/ContactForm";
import { Testimonials } from "@/builder-components/advanced/Testimonials";
import { PricingTable } from "@/builder-components/advanced/PricingTable";
import { StatsCounter } from "@/builder-components/advanced/StatsCounter";
import { FAQ } from "@/builder-components/advanced/FAQ";
import { Navbar } from "@/builder-components/advanced/Navbar";
import { Footer } from "@/builder-components/advanced/Footer";

const componentRegistry: Record<string, React.ComponentType<any>> = {
  container: Container, row: Row, column: Column, spacer: Spacer, divider: Divider,
  text: Text, image: ImageComponent, button: BuilderButton, video: Video, icon: Icon,
  link: LinkComponent, "hero-section": HeroSection, "feature-grid": FeatureGrid,
  "contact-form": ContactForm, testimonials: Testimonials, "pricing-table": PricingTable,
  "stats-counter": StatsCounter, faq: FAQ, navbar: Navbar, footer: Footer,
};

function buildStyle(styles?: ComponentNode["styles"]): React.CSSProperties {
  if (!styles) return {};
  const s: React.CSSProperties = {};
  if (styles.display) s.display = styles.display;
  if (styles.flexDirection) s.flexDirection = styles.flexDirection;
  if (styles.justifyContent) s.justifyContent = styles.justifyContent;
  if (styles.alignItems) s.alignItems = styles.alignItems;
  if (styles.gap) s.gap = styles.gap;
  if (styles.padding) {
    if (typeof styles.padding === "string") s.padding = styles.padding;
    else {
      if (styles.padding.top) s.paddingTop = styles.padding.top;
      if (styles.padding.right) s.paddingRight = styles.padding.right;
      if (styles.padding.bottom) s.paddingBottom = styles.padding.bottom;
      if (styles.padding.left) s.paddingLeft = styles.padding.left;
    }
  }
  if (styles.margin) {
    if (typeof styles.margin === "string") s.margin = styles.margin;
    else {
      if (styles.margin.top) s.marginTop = styles.margin.top;
      if (styles.margin.right) s.marginRight = styles.margin.right;
      if (styles.margin.bottom) s.marginBottom = styles.margin.bottom;
      if (styles.margin.left) s.marginLeft = styles.margin.left;
    }
  }
  if (styles.width) s.width = styles.width;
  if (styles.height) s.height = styles.height;
  if (styles.maxWidth) s.maxWidth = styles.maxWidth;
  if (styles.minHeight) s.minHeight = styles.minHeight;
  if (styles.background) s.background = styles.background;
  if (styles.backgroundImage) s.backgroundImage = `url(${styles.backgroundImage})`;
  if (styles.backgroundSize) s.backgroundSize = styles.backgroundSize;
  if (styles.backgroundPosition) s.backgroundPosition = styles.backgroundPosition;
  if (styles.border) s.border = styles.border;
  if (styles.borderRadius) s.borderRadius = styles.borderRadius;
  if (styles.boxShadow) s.boxShadow = styles.boxShadow;
  if (styles.textAlign) s.textAlign = styles.textAlign;
  return s;
}

// ── Pure render (preview mode) ──
interface RenderComponentProps {
  node: ComponentNode;
}

export function RenderComponent({ node }: RenderComponentProps) {
  const Component = componentRegistry[node.type];
  if (!Component) return <div className="p-4 border-2 border-dashed border-destructive rounded bg-destructive/10"><p className="text-destructive font-medium">未知组件: {node.type}</p></div>;

  return (
    <div style={buildStyle(node.styles)} className={cn(node.visible === false && "hidden")}>
      <Component {...node.props}>
        {node.children?.map((child) => <RenderComponent key={child.id} node={child} />)}
      </Component>
    </div>
  );
}

// ── Editable render (builder mode with dnd) ──
interface EditableComponentProps {
  node: ComponentNode;
}

export function EditableComponent({ node }: EditableComponentProps) {
  const { selectedComponentId, hoveredComponentId, selectComponent, hoverComponent } = useEditorStore();
  const schema = getComponentSchema(node.type);
  const acceptChildren = schema?.acceptChildren ?? false;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: node.id,
    data: { type: node.type, source: "canvas", node },
  });

  const style: React.CSSProperties = {
    ...buildStyle(node.styles),
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined,
  };

  const isSelected = selectedComponentId === node.id;
  const isHovered = hoveredComponentId === node.id;
  const Component = componentRegistry[node.type];

  if (!Component) {
    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}
        className="p-4 border-2 border-dashed border-destructive rounded bg-destructive/10">
        <p className="text-destructive font-medium">未知组件: {node.type}</p>
      </div>
    );
  }

  const childIds = node.children?.map((c) => c.id) ?? [];

  const content = acceptChildren ? (
    <SortableContext items={childIds} strategy={verticalListSortingStrategy}>
      <Component {...node.props}>
        {node.children?.map((child) => <EditableComponent key={child.id} node={child} />)}
        {childIds.length === 0 && <EmptyDropZone parentId={node.id} />}
      </Component>
    </SortableContext>
  ) : (
    <Component {...node.props} />
  );

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      data-component-id={node.id}
      data-component-type={node.type}
      className={cn(
        "component-wrapper relative cursor-pointer",
        isSelected && "ring-2 ring-primary ring-offset-2",
        isHovered && !isSelected && "ring-1 ring-muted-foreground ring-offset-1",
        node.visible === false && "hidden",
      )}
      style={style}
      onClick={(e) => { e.stopPropagation(); selectComponent(node.id); }}
      onMouseEnter={() => hoverComponent(node.id)}
      onMouseLeave={() => hoverComponent(null)}
    >
      {content}
      {isSelected && <ComponentToolbar nodeId={node.id} nodeType={node.type} />}
    </div>
  );
}

// ── Empty drop zone for containers ──
function EmptyDropZone({ parentId }: { parentId: string }) {
  const { setNodeRef, isOver } = useDroppable({ id: `empty-${parentId}`, data: { parentId, source: "empty-zone" } });
  return (
    <div ref={setNodeRef} className={cn("min-h-[60px] border-2 border-dashed rounded-md flex items-center justify-center text-sm text-muted-foreground transition-colors", isOver ? "border-primary bg-primary/5" : "border-muted-foreground/30")}>
      拖拽组件到此处
    </div>
  );
}

// ── Toolbar ──
function ComponentToolbar({ nodeId, nodeType }: { nodeId: string; nodeType: string }) {
  const { removeComponent, duplicateComponent } = useEditorStore();
  return (
    <div className="absolute -top-8 left-0 flex items-center gap-1 z-10">
      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">{nodeType}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); duplicateComponent(nodeId); }}>
            <Copy className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>复制</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); removeComponent(nodeId); }}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>删除</TooltipContent>
      </Tooltip>
    </div>
  );
}
