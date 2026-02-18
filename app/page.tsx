import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />

      {/* Hero 区域 */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />

        {/* 浮动装饰 */}
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-purple-500/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/3 right-[20%] w-4 h-4 rounded-full bg-primary/40 animate-float" />
        <div className="absolute bottom-1/3 left-[15%] w-3 h-3 rounded-full bg-purple-400/40 animate-float-delayed" />

        {/* 网格背景 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-border/60 bg-muted/50 text-sm text-muted-foreground">
            Next.js 15 · React 19 · Tailwind CSS 4
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              企业官网
            </span>
            <br />
            低代码构建平台
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            拖拽式页面编辑，多主题一键切换，零代码搭建专业企业官网。
            <br className="hidden md:block" />
            从设计到上线，一站式解决。
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/builder">
              <Button size="lg" className="px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                开始构建
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="px-8">
                查看演示
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 特性卡片 */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">核心能力</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
            三大核心能力，助力企业快速搭建专业官网
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">{f.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术栈 */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">技术栈</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techs.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full border border-border/60 bg-muted/40 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        ComBuilder · 企业官网低代码构建平台
      </footer>
    </div>
  );
}

const features = [
  { icon: "🎨", title: "多主题系统", desc: "内置多套精美主题，支持一键切换皮肤，满足不同行业与品牌风格需求。" },
  { icon: "🧩", title: "低代码构建", desc: "可视化拖拽编辑器，20+ 预置组件，实时预览，无需编写代码即可搭建页面。" },
  { icon: "⚡", title: "极速性能", desc: "基于 Next.js 15 与 React 19，SSR/SSG 支持，首屏秒开，SEO 友好。" },
];

const techs = [
  "Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4",
  "Prisma", "SQLite", "Zustand", "shadcn/ui", "@dnd-kit",
];
