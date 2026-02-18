import React from "react";
import { cn } from "@/lib/utils";

interface FAQProps {
  title?: string;
  items?: { question: string; answer: string }[];
  className?: string;
}

const defaultItems = [
  { question: "如何开始使用？", answer: "注册账号后，进入构建器即可通过拖拽方式搭建页面。" },
  { question: "支持自定义域名吗？", answer: "专业版及以上支持绑定自定义域名。" },
  { question: "数据安全如何保障？", answer: "所有数据加密存储，支持定期备份与私有部署。" },
];

export function FAQ({ title = "常见问题", items = defaultItems, className }: FAQProps) {
  return (
    <section className={cn("py-16 px-6", className)}>
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, i) => (
          <details key={i} className="group border border-border/50 rounded-lg">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-medium hover:bg-muted/50 rounded-lg">
              {item.question}
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
