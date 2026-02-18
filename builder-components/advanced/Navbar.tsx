import React from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  logo?: string;
  links?: { text: string; href: string }[];
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

const defaultLinks = [
  { text: "首页", href: "#" },
  { text: "产品", href: "#products" },
  { text: "关于", href: "#about" },
  { text: "联系", href: "#contact" },
];

export function Navbar({
  logo = "企业名称",
  links = defaultLinks,
  ctaText = "免费试用",
  ctaLink = "#",
  className,
}: NavbarProps) {
  return (
    <nav className={cn("sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50", className)}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-lg">{logo}</span>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.text}
            </a>
          ))}
        </div>
        {ctaText && (
          <a href={ctaLink} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            {ctaText}
          </a>
        )}
      </div>
    </nav>
  );
}
