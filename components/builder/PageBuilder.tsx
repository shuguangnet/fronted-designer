"use client";

import React, { useEffect, useCallback } from "react";
import { Canvas } from "./canvas/Canvas";
import { ComponentLibrary } from "./sidebar/ComponentLibrary";
import { PropertyPanel } from "./sidebar/PropertyPanel";
import { LayerTree } from "./sidebar/LayerTree";
import { useEditorStore } from "@/store/editor";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Undo2,
  Redo2,
  Eye,
  Code,
  Save,
  Smartphone,
  Tablet,
  Monitor,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { PageContent, Device, ViewMode } from "@/types";

interface PageBuilderProps {
  initialContent: PageContent;
  onSave?: (content: PageContent) => void | Promise<void>;
  onPreview?: () => void;
}

export function PageBuilder({
  initialContent,
  onSave,
  onPreview,
}: PageBuilderProps) {
  const {
    currentPage,
    setCurrentPage,
    viewMode,
    setViewMode,
    device,
    setDevice,
    panels,
    togglePanel,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useEditorStore();

  // 初始化页面内容
  useEffect(() => {
    setCurrentPage(initialContent);
  }, [initialContent, setCurrentPage]);

  const {
    selectedComponentId,
    removeComponent,
    duplicateComponent,
  } = useEditorStore();

  const handleSave = useCallback(async () => {
    if (!currentPage || !onSave) return;
    try {
      await onSave(currentPage);
      toast.success("保存成功");
    } catch {
      toast.error("保存失败");
    }
  }, [currentPage, onSave]);

  // 键盘快捷键
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if (mod && e.key === "z" && e.shiftKey) { e.preventDefault(); redo(); }
      if (mod && e.key === "s") { e.preventDefault(); handleSave(); }
      if (mod && e.key === "d" && selectedComponentId) { e.preventDefault(); duplicateComponent(selectedComponentId); toast.success("已复制"); }
      if ((e.key === "Delete" || e.key === "Backspace") && selectedComponentId && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault(); removeComponent(selectedComponentId); toast.success("已删除");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, handleSave, selectedComponentId, removeComponent, duplicateComponent]);

  const deviceWidths: Record<Device, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  if (viewMode === "preview" || viewMode === "code") {
    return (
      <div className="h-screen flex flex-col">
        <div className="h-14 border-b flex items-center justify-between px-4">
          <h1 className="font-semibold">
            {viewMode === "preview" ? "预览模式" : "代码模式"}
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("editor")}
          >
            返回编辑
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {viewMode === "preview" && currentPage ? (
            <div className="max-w-4xl mx-auto">
              <Canvas content={currentPage} isBuilder={false} />
            </div>
          ) : (
            <pre className="text-sm p-4 bg-muted rounded-lg overflow-auto">
              {JSON.stringify(currentPage, null, 2)}
            </pre>
          )}
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
    <div className="h-screen flex flex-col">
      {/* 顶部工具栏 */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-background">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold">页面构建器</h1>
          <Separator orientation="vertical" className="h-6 mx-2" />
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={!canUndo()}
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={!canRedo()}
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 设备选择 */}
          <div className="flex items-center border rounded-md p-0.5">
            <Button
              variant={device === "desktop" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setDevice("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={device === "tablet" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setDevice("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={device === "mobile" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setDevice("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("preview")}
          >
            <Eye className="w-4 h-4 mr-1" />
            预览
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("code")}
          >
            <Code className="w-4 h-4 mr-1" />
            代码
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" />
            保存
          </Button>
        </div>
      </div>

      {/* 主编辑区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧组件库 */}
        {panels.left && (
          <div className="w-64 border-r bg-background">
            <ComponentLibrary />
          </div>
        )}

        {/* 图层面板 */}
        {panels.layers && (
          <div className="w-56 border-r bg-background">
            <LayerTree />
          </div>
        )}

        {/* 中间画布 */}
        <div
          className="flex-1 overflow-auto"
          style={{
            backgroundColor: "var(--color-muted)",
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="min-h-full p-8 flex justify-center">
            <div
              className="bg-background shadow-xl rounded-lg transition-all duration-300 border border-border/50"
              style={{
                width: deviceWidths[device],
                minHeight: "800px",
              }}
            >
              {currentPage && <Canvas content={currentPage} />}
            </div>
          </div>
        </div>

        {/* 右侧属性面板 */}
        {panels.right && (
          <div className="w-72 border-l bg-background">
            <PropertyPanel />
          </div>
        )}
      </div>

      {/* 底部面板切换 */}
      <div className="h-10 border-t flex items-center px-4 bg-muted/30">
        <div className="flex items-center gap-2">
          <Button variant={panels.left ? "secondary" : "ghost"} size="sm" className="h-7 text-xs" onClick={() => togglePanel("left")}>
            组件库
          </Button>
          <Button variant={panels.layers ? "secondary" : "ghost"} size="sm" className="h-7 text-xs" onClick={() => togglePanel("layers")}>
            <Layers className="w-3 h-3 mr-1" />
            图层
          </Button>
          <Button variant={panels.right ? "secondary" : "ghost"} size="sm" className="h-7 text-xs" onClick={() => togglePanel("right")}>
            属性面板
          </Button>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
