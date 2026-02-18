import React from "react";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  items?: { value: string; label: string }[];
  className?: string;
}

const defaultItems = [
  { value: "500+", label: "服务客户" },
  { value: "99.9%", label: "可用性" },
  { value: "50+", label: "组件数量" },
  { value: "24/7", label: "技术支持" },
];

export function StatsCounter({ items = defaultItems, className }: StatsCounterProps) {
  return (
    <section className={cn("py-16 px-6 bg-muted/30", className)}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map((item, i) => (
          <div key={i}>
            <p className="text-4xl font-bold text-primary mb-2">{item.value}</p>
            <p className="text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
