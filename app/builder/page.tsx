"use client";

import { useState } from "react";
import { PageBuilder } from "@/components/builder/PageBuilder";
import type { PageContent } from "@/types";

// 示例页面内容
const samplePageContent: PageContent = {
  version: "1.0",
  meta: {
    title: "首页",
    description: "企业官网首页",
  },
  root: {
    id: "root",
    type: "container",
    props: {
      maxWidth: "1200px",
      padding: "md",
    },
    styles: {
      minHeight: "100vh",
    },
    children: [
      {
        id: "hero-1",
        type: "hero-section",
        props: {
          headline: "欢迎来到我们的企业",
          subheadline: "专业、创新、卓越",
          description: "我们致力于为客户提供最优质的产品和服务",
          ctaText: "了解更多",
          ctaLink: "#",
          alignment: "center",
        },
      },
      {
        id: "features-1",
        type: "feature-grid",
        props: {
          columns: "3",
          title: "我们的核心优势",
        },
      },
      {
        id: "cta-1",
        type: "container",
        props: {
          maxWidth: "800px",
          padding: "lg",
        },
        styles: {
          background: "hsl(var(--muted))",
          padding: { top: "xl", bottom: "xl" },
        },
        children: [
          {
            id: "column-1",
            type: "column",
            props: {
              gap: "md",
              align: "center",
            },
            children: [
              {
                id: "text-1",
                type: "text",
                props: {
                  content: "准备好开始了吗？",
                  variant: "h2",
                  align: "center",
                },
              },
              {
                id: "text-2",
                type: "text",
                props: {
                  content: "立即联系我们，了解更多产品信息",
                  variant: "body",
                  align: "center",
                },
              },
              {
                id: "button-1",
                type: "button",
                props: {
                  text: "联系我们",
                  variant: "primary",
                  size: "lg",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export default function BuilderPage() {
  const [pageId, setPageId] = useState<string | null>(null);

  const handleSave = async (content: PageContent) => {
    try {
      if (pageId) {
        await fetch(`/api/pages/${pageId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
      } else {
        const res = await fetch("/api/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: content.meta.title,
            content,
          }),
        });
        const page = await res.json();
        setPageId(page.id);
      }
    } catch {
      throw new Error("保存失败");
    }
  };

  return (
    <PageBuilder
      initialContent={samplePageContent}
      onSave={handleSave}
    />
  );
}
