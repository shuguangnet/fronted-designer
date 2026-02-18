"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { getComponentsGroupedByCategory, getComponentSchema } from "@/components.registry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Layout, Type, Image as ImageIcon, MousePointer, Grid, Mail,
  Minus, Play, Star, Link, MessageCircle, CreditCard, BarChart,
  HelpCircle, Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentSchema } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  layout: Layout, rows: Layout, columns: Layout, minus: Minus,
  type: Type, image: ImageIcon, "mouse-pointer": MousePointer,
  play: Play, star: Star, link: Link, grid: Grid, mail: Mail,
  "message-circle": MessageCircle, "credit-card": CreditCard,
  "bar-chart": BarChart, "help-circle": HelpCircle, navigation: Navigation,
};

const categoryNames: Record<string, string> = {
  layout: "布局组件",
  content: "内容组件",
  advanced: "高级组件",
};

export function ComponentLibrary() {
  const groupedComponents = getComponentsGroupedByCategory();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">组件库</h2>
        <p className="text-sm text-muted-foreground">拖拽组件到画布</p>
      </div>
      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={["layout", "content", "advanced"]} className="px-4">
          {Object.entries(groupedComponents).map(([category, components]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="text-sm font-medium text-muted-foreground py-3">
                {categoryNames[category] || category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pb-2">
                  {components.map((comp) => (
                    <DraggableComponent key={comp.type} component={comp} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}

function DraggableComponent({ component }: { component: ComponentSchema }) {
  const schema = getComponentSchema(component.type);
  const defaultProps: Record<string, any> = {};
  if (schema) {
    for (const [key, def] of Object.entries(schema.props)) {
      if (def.defaultValue !== undefined) defaultProps[key] = def.defaultValue;
    }
  }

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${component.type}`,
    data: {
      type: component.type,
      source: "component-library",
      defaultProps,
      acceptChildren: schema?.acceptChildren ?? false,
    },
  });

  const Icon = component.icon ? iconMap[component.icon] : null;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "p-3 border rounded-lg cursor-grab active:cursor-grabbing hover:bg-accent hover:border-accent transition-colors",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
        <span className="text-sm font-medium truncate">{component.name}</span>
      </div>
      {component.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">{component.description}</p>
      )}
    </div>
  );
}
