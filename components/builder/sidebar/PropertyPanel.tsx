"use client";

import React from "react";
import { useEditorStore } from "@/store/editor";
import { getComponentSchema } from "@/components.registry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ComponentNode } from "@/types";

export function PropertyPanel() {
  const { selectedComponentId, currentPage, updateComponent } = useEditorStore();

  const selectedNode = React.useMemo(() => {
    if (!selectedComponentId || !currentPage) return null;
    return findComponentById(currentPage.root, selectedComponentId);
  }, [selectedComponentId, currentPage]);

  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground text-center">
          选择一个组件以编辑属性
        </p>
      </div>
    );
  }

  const schema = getComponentSchema(selectedNode.type);
  if (!schema) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <p className="text-sm text-destructive text-center">
          未找到组件定义: {selectedNode.type}
        </p>
      </div>
    );
  }

  const handlePropChange = (propName: string, value: any) => {
    updateComponent(selectedNode.id, {
      props: { ...selectedNode.props, [propName]: value },
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">{schema.name}</h2>
        <p className="text-sm text-muted-foreground">{schema.description}</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 组件信息 */}
          <div>
            <Label className="text-xs text-muted-foreground">组件类型</Label>
            <p className="text-sm font-mono">{selectedNode.type}</p>
          </div>

          {/* 属性编辑器 */}
          {Object.entries(schema.props).map(([key, propDef]) => (
            <PropertyField
              key={key}
              propName={key}
              propDef={propDef}
              value={selectedNode.props[key]}
              onChange={(value) => handlePropChange(key, value)}
            />
          ))}

          {/* 样式信息 */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-3">样式</h3>
            <div className="space-y-2 text-sm">
              {selectedNode.styles?.display && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">显示</span>
                  <span className="font-mono">{selectedNode.styles.display}</span>
                </div>
              )}
              {selectedNode.styles?.padding && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">内边距</span>
                  <span className="font-mono">{String(selectedNode.styles.padding)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// 属性字段渲染器
interface PropertyFieldProps {
  propName: string;
  propDef: {
    type: string;
    label: string;
    defaultValue?: any;
    options?: { label: string; value: any }[];
    placeholder?: string;
  };
  value: any;
  onChange: (value: any) => void;
}

function PropertyField({ propName, propDef, value, onChange }: PropertyFieldProps) {
  switch (propDef.type) {
    case "string":
      return (
        <div>
          <Label htmlFor={propName}>{propDef.label}</Label>
          <Input
            id={propName}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={propDef.placeholder}
            className="mt-1"
          />
        </div>
      );

    case "text":
      return (
        <div>
          <Label htmlFor={propName}>{propDef.label}</Label>
          <Textarea
            id={propName}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={propDef.placeholder}
            rows={3}
            className="mt-1"
          />
        </div>
      );

    case "select":
      return (
        <div>
          <Label>{propDef.label}</Label>
          <Select value={value ?? propDef.defaultValue} onValueChange={onChange}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {propDef.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    default:
      return (
        <div>
          <Label>{propDef.label}</Label>
          <Input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1"
          />
        </div>
      );
  }
}

// 在组件树中查找组件
function findComponentById(
  node: ComponentNode,
  id: string
): ComponentNode | null {
  if (node.id === id) return node;

  if (node.children) {
    for (const child of node.children) {
      const found = findComponentById(child, id);
      if (found) return found;
    }
  }

  return null;
}
