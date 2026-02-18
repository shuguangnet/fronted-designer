import React from "react";
import { cn } from "@/lib/utils";

interface FeatureGridProps {
  columns?: "2" | "3" | "4";
  title?: string;
  className?: string;
}

// 默认功能项
const defaultFeatures = [
  {
    icon: "🚀",
    title: "快速部署",
    description: "基于现代化技术栈，快速搭建和部署您的企业官网",
  },
  {
    icon: "🎨",
    title: "多主题切换",
    description: "支持多种主题皮肤，一键切换，满足不同场景需求",
  },
  {
    icon: "🛠️",
    title: "低代码编辑",
    description: "拖拽式页面构建器，无需编写代码即可创建精美页面",
  },
  {
    icon: "📱",
    title: "响应式设计",
    description: "完美适配各种设备，从手机到桌面都能完美展示",
  },
  {
    icon: "🔒",
    title: "安全可靠",
    description: "企业级安全标准，保护您的数据和用户隐私",
  },
  {
    icon: "⚡",
    title: "极速性能",
    description: "优化的代码和资源加载，提供流畅的访问体验",
  },
];

export function FeatureGrid({
  columns = "3",
  title = "我们的优势",
  className,
}: FeatureGridProps) {
  const columnsMap = {
    "2": "grid-cols-1 md:grid-cols-2",
    "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("py-16 px-6 bg-muted/30", className)}>
      <div className="container mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        <div className={cn("grid gap-8", columnsMap[columns])}>
          {defaultFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
