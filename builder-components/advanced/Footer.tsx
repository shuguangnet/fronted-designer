import React from "react";
import { cn } from "@/lib/utils";

interface FooterProps {
  columns?: { title: string; links: { text: string; href: string }[] }[];
  copyright?: string;
  className?: string;
}

const defaultColumns = [
  { title: "产品", links: [{ text: "功能", href: "#" }, { text: "定价", href: "#" }] },
  { title: "公司", links: [{ text: "关于我们", href: "#" }, { text: "联系我们", href: "#" }] },
  { title: "支持", links: [{ text: "帮助中心", href: "#" }, { text: "文档", href: "#" }] },
];

export function Footer({
  columns = defaultColumns,
  copyright = "© 2024 企业名称. All rights reserved.",
  className,
}: FooterProps) {
  return (
    <footer className={cn("border-t border-border/50 bg-muted/20", className)}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
