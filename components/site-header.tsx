"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <span className="font-bold text-lg tracking-tight">ComBuilder</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/demo">
            <Button variant="ghost" size="sm">演示</Button>
          </Link>
          {session ? (
            <Link href="/builder">
              <Button size="sm">构建器</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">登录</Button>
              </Link>
              <Link href="/builder">
                <Button size="sm">进入构建器</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
