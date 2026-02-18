import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("开始种子数据...");

  // 创建管理员用户
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "管理员",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("创建管理员用户:", admin.email);

  // 创建默认主题
  const defaultTheme = await prisma.theme.upsert({
    where: { name: "default" },
    update: {},
    create: {
      name: "default",
      displayName: "默认主题",
      description: "蓝色系企业主题",
      category: "corporate",
      isBuiltin: true,
      config: JSON.stringify({
        colors: {
          primary: "221.2 83.2% 53.3%",
          secondary: "210 40% 96.1%",
          accent: "221.2 83.2% 53.3%",
          background: "0 0% 100%",
          foreground: "222.2 84% 4.9%",
        },
        typography: {
          fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
          },
        },
      }),
    },
  });
  console.log("创建默认主题:", defaultTheme.name);

  // 创建创意主题
  const creativeTheme = await prisma.theme.upsert({
    where: { name: "creative" },
    update: {},
    create: {
      name: "creative",
      displayName: "创意主题",
      description: "活泼的渐变色主题",
      category: "creative",
      isBuiltin: true,
      config: JSON.stringify({
        colors: {
          primary: "280 80% 60%",
          secondary: "180 80% 60%",
          accent: "320 80% 60%",
          background: "0 0% 100%",
          foreground: "240 10% 3.9%",
        },
        typography: {
          fontFamily: {
            sans: ["Poppins", "system-ui", "sans-serif"],
          },
        },
      }),
    },
  });
  console.log("创建创意主题:", creativeTheme.name);

  // 创建极简主题
  const minimalTheme = await prisma.theme.upsert({
    where: { name: "minimal" },
    update: {},
    create: {
      name: "minimal",
      displayName: "极简主题",
      description: "黑白灰极简设计",
      category: "minimal",
      isBuiltin: true,
      config: JSON.stringify({
        colors: {
          primary: "0 0% 9%",
          secondary: "0 0% 96%",
          accent: "0 0% 9%",
          background: "0 0% 100%",
          foreground: "0 0% 9%",
        },
        typography: {
          fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
          },
        },
      }),
    },
  });
  console.log("创建极简主题:", minimalTheme.name);

  // 注册基础组件
  const components = [
    {
      type: "container",
      category: "layout",
      name: "Container",
      description: "内容容器，控制最大宽度",
      icon: "layout",
      schema: JSON.stringify({
        maxWidth: {
          type: "select",
          label: "最大宽度",
          defaultValue: "1200px",
          options: [
            { label: "窄 (640px)", value: "640px" },
            { label: "中 (960px)", value: "960px" },
            { label: "宽 (1200px)", value: "1200px" },
            { label: "全宽", value: "100%" },
          ],
        },
      }),
      defaultProps: JSON.stringify({ maxWidth: "1200px" }),
      componentPath: "@/builder-components/base/Container",
    },
    {
      type: "row",
      category: "layout",
      name: "Row",
      description: "行布局容器",
      icon: "rows",
      schema: JSON.stringify({
        gap: { type: "select", label: "间距", defaultValue: "md" },
        align: { type: "select", label: "对齐", defaultValue: "center" },
      }),
      defaultProps: JSON.stringify({ gap: "md", align: "center" }),
      componentPath: "@/builder-components/base/Row",
    },
    {
      type: "column",
      category: "layout",
      name: "Column",
      description: "列布局容器",
      icon: "columns",
      schema: JSON.stringify({
        gap: { type: "select", label: "间距", defaultValue: "md" },
      }),
      defaultProps: JSON.stringify({ gap: "md" }),
      componentPath: "@/builder-components/base/Column",
    },
    {
      type: "text",
      category: "content",
      name: "Text",
      description: "文本内容",
      icon: "type",
      schema: JSON.stringify({
        content: { type: "text", label: "文本内容", defaultValue: "在这里输入文本..." },
        variant: {
          type: "select",
          label: "样式",
          defaultValue: "body",
          options: [
            { label: "标题1", value: "h1" },
            { label: "标题2", value: "h2" },
            { label: "标题3", value: "h3" },
            { label: "正文", value: "body" },
          ],
        },
      }),
      defaultProps: JSON.stringify({ content: "在这里输入文本...", variant: "body" }),
      componentPath: "@/builder-components/content/Text",
    },
    {
      type: "image",
      category: "content",
      name: "Image",
      description: "图片",
      icon: "image",
      schema: JSON.stringify({
        src: { type: "image", label: "图片" },
        alt: { type: "string", label: "替代文本", defaultValue: "" },
      }),
      defaultProps: JSON.stringify({ src: "", alt: "" }),
      componentPath: "@/builder-components/content/Image",
    },
    {
      type: "button",
      category: "content",
      name: "Button",
      description: "按钮",
      icon: "mouse-pointer",
      schema: JSON.stringify({
        text: { type: "string", label: "按钮文字", defaultValue: "点击" },
        variant: {
          type: "select",
          label: "样式",
          defaultValue: "default",
          options: [
            { label: "默认", value: "default" },
            { label: "主要", value: "primary" },
            { label: "次要", value: "secondary" },
          ],
        },
      }),
      defaultProps: JSON.stringify({ text: "点击", variant: "default" }),
      componentPath: "@/builder-components/content/Button",
    },
    {
      type: "hero-section",
      category: "advanced",
      name: "Hero Section",
      description: "英雄区，用于页面顶部展示",
      icon: "layout",
      schema: JSON.stringify({
        headline: { type: "text", label: "主标题", defaultValue: "欢迎来到我们的网站" },
        subheadline: { type: "text", label: "副标题", defaultValue: "这里是副标题描述" },
        ctaText: { type: "string", label: "按钮文字", defaultValue: "了解更多" },
        alignment: {
          type: "select",
          label: "对齐方式",
          defaultValue: "center",
          options: [
            { label: "居左", value: "left" },
            { label: "居中", value: "center" },
            { label: "居右", value: "right" },
          ],
        },
      }),
      defaultProps: JSON.stringify({
        headline: "欢迎来到我们的网站",
        subheadline: "这里是副标题描述",
        ctaText: "了解更多",
        alignment: "center",
      }),
      componentPath: "@/builder-components/advanced/HeroSection",
    },
    {
      type: "feature-grid",
      category: "advanced",
      name: "Feature Grid",
      description: "功能展示网格",
      icon: "grid",
      schema: JSON.stringify({
        columns: {
          type: "select",
          label: "列数",
          defaultValue: "3",
          options: [
            { label: "2列", value: "2" },
            { label: "3列", value: "3" },
            { label: "4列", value: "4" },
          ],
        },
      }),
      defaultProps: JSON.stringify({ columns: "3" }),
      componentPath: "@/builder-components/advanced/FeatureGrid",
    },
  ];

  for (const comp of components) {
    await prisma.component.upsert({
      where: { type: comp.type },
      update: {},
      create: comp,
    });
    console.log("注册组件:", comp.name);
  }

  // 创建示例页面
  const homePage = await prisma.page.upsert({
    where: { slug: "home" },
    update: {},
    create: {
      slug: "home",
      title: "首页",
      description: "网站首页",
      status: "PUBLISHED",
      content: JSON.stringify({
        version: "1.0",
        meta: { title: "首页" },
        root: {
          id: "root",
          type: "container",
          props: { maxWidth: "1200px" },
          children: [
            {
              id: "hero-1",
              type: "hero-section",
              props: {
                headline: "欢迎来到我们的企业",
                subheadline: "我们提供卓越的产品和服务",
                ctaText: "了解更多",
                alignment: "center",
              },
            },
          ],
        },
      }),
      authorId: admin.id,
      themeId: defaultTheme.id,
      publishedAt: new Date(),
    },
  });
  console.log("创建示例页面:", homePage.title);

  console.log("种子数据完成！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
