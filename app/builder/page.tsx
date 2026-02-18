"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageBuilder } from "@/components/builder/PageBuilder";
import type { PageContent } from "@/types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// 示例页面内容（原子化结构）
const samplePageContent: PageContent = {
  version: "1.0",
  meta: {
    title: "首页",
    description: "企业官网首页",
  },
  root: {
    id: "root",
    type: "container",
    props: { maxWidth: "1200px", padding: "md" },
    styles: { minHeight: "100vh" },
    children: [
      {
        id: "hero-1",
        type: "hero-section",
        props: { alignment: "center", minHeight: "500px" },
        children: [
          { id: "hero-title", type: "text", props: { variant: "h1", align: "center" }, children: [] },
          { id: "hero-subtitle", type: "text", props: { variant: "lead", align: "center" }, children: [] },
        ],
      },
      {
        id: "features-1",
        type: "feature-grid",
        props: { columns: "3" },
        children: [],
      },
      {
        id: "cta-section",
        type: "container",
        props: { maxWidth: "800px", padding: "lg" },
        styles: { background: "hsl(var(--muted))" },
        children: [
          {
            id: "cta-column",
            type: "column",
            props: { gap: "md", align: "center" },
            children: [
              { id: "cta-title", type: "text", props: { variant: "h2", align: "center" }, children: [] },
              { id: "cta-text", type: "text", props: { variant: "body", align: "center" }, children: [] },
              { id: "cta-button", type: "button", props: { variant: "primary", size: "lg" }, children: [] },
            ],
          },
        ],
      },
    ],
  },
};

export default function BuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pageId, setPageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSave = async (content: PageContent) => {
    setIsLoading(true);
    try {
      let response;
      if (pageId) {
        response = await fetch(`/api/pages/${pageId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
      } else {
        response = await fetch("/api/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: content.meta.title || "未命名页面",
            content,
          }),
        });
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "保存失败");
      }

      if (!pageId && result.data?.id) {
        setPageId(result.data.id);
      }

      toast.success("保存成功");
    } catch {
      toast.error("保存失败，请重试");
      throw new Error("保存失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute top-4 right-4 z-50 bg-background border rounded-md px-3 py-2 flex items-center gap-2 shadow-lg">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">保存中...</span>
        </div>
      )}
      <PageBuilder initialContent={samplePageContent} onSave={handleSave} />
    </div>
  );
}
