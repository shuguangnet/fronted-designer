import React from "react";
import { cn } from "@/lib/utils";

interface PricingTableProps {
  title?: string;
  columns?: {
    name: string;
    price: string;
    period?: string;
    features: string[];
    highlighted?: boolean;
    ctaText?: string;
  }[];
  className?: string;
}

const defaultColumns = [
  { name: "基础版", price: "¥99", period: "/月", features: ["5个页面", "基础组件", "邮件支持"], ctaText: "开始使用" },
  { name: "专业版", price: "¥299", period: "/月", features: ["无限页面", "全部组件", "优先支持", "自定义域名"], highlighted: true, ctaText: "立即升级" },
  { name: "企业版", price: "¥999", period: "/月", features: ["无限页面", "全部组件", "专属客服", "API 接入", "私有部署"], ctaText: "联系销售" },
];

export function PricingTable({ title = "定价方案", columns = defaultColumns, className }: PricingTableProps) {
  return (
    <section className={cn("py-16 px-6", className)}>
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col, i) => (
          <div
            key={i}
            className={cn(
              "p-8 rounded-xl border",
              col.highlighted
                ? "border-primary bg-primary/5 shadow-lg scale-105"
                : "border-border/50 bg-card"
            )}
          >
            <h3 className="text-lg font-semibold mb-2">{col.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">{col.price}</span>
              {col.period && <span className="text-muted-foreground">{col.period}</span>}
            </div>
            <ul className="space-y-3 mb-8">
              {col.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm">
                  <span className="text-primary">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              className={cn(
                "w-full py-2.5 rounded-lg text-sm font-medium transition-colors",
                col.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border hover:bg-muted"
              )}
            >
              {col.ctaText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
