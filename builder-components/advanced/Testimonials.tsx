import React from "react";
import { cn } from "@/lib/utils";

interface TestimonialsProps {
  title?: string;
  items?: { name: string; role: string; content: string }[];
  layout?: "grid" | "list";
  className?: string;
}

const defaultItems = [
  { name: "张总", role: "CEO, 科技公司", content: "这个平台帮助我们快速搭建了企业官网，效率提升了10倍。" },
  { name: "李经理", role: "市场总监", content: "拖拽式编辑非常直观，团队成员无需技术背景也能轻松使用。" },
  { name: "王工", role: "技术负责人", content: "组件丰富，主题灵活，完全满足我们的定制化需求。" },
];

export function Testimonials({ title = "客户评价", items = defaultItems, layout = "grid", className }: TestimonialsProps) {
  return (
    <section className={cn("py-16 px-6", className)}>
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className={cn("max-w-6xl mx-auto", layout === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-6 max-w-2xl")}>
        {items.map((item, i) => (
          <div key={i} className="p-6 rounded-xl border border-border/50 bg-card">
            <p className="text-muted-foreground mb-4 leading-relaxed">"{item.content}"</p>
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
