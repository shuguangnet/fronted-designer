"use client";

import { PageRenderer } from "@/lib/page-renderer";
import type { PageContent } from "@/types";

const demoPageContent: PageContent = {
  version: "1.0",
  meta: {
    title: "企业官网演示",
    description: "基于低代码构建的企业官网演示",
  },
  root: {
    id: "root",
    type: "container",
    props: { maxWidth: "100%", padding: "none" },
    children: [
      {
        id: "hero",
        type: "hero-section",
        props: {
          headline: "引领数字化转型",
          subheadline: "专业的企业级解决方案",
          description:
            "我们为企业提供一站式数字化解决方案，从官网搭建到业务系统，助力企业高效运营。",
          ctaText: "免费试用",
          ctaLink: "#contact",
          alignment: "center",
        },
      },
      {
        id: "features",
        type: "feature-grid",
        props: {
          columns: "3",
          title: "为什么选择我们",
        },
      },
      {
        id: "contact",
        type: "contact-form",
        props: {
          title: "联系我们",
          description: "填写表单，我们会在24小时内回复您。",
        },
      },
    ],
  },
};

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold">演示官网</span>
          <a
            href="/builder"
            className="text-sm text-primary hover:underline"
          >
            ← 返回构建器
          </a>
        </div>
      </nav>
      <PageRenderer content={demoPageContent} />
    </div>
  );
}
